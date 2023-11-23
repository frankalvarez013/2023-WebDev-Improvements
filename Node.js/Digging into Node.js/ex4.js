#!/usr/bin/env node

"use strict";

import util from 'util'
import path from "path";
import fs from 'fs';
import sqlite3  from "sqlite3";
import { fileURLToPath } from 'url';
import minimist from 'minimist';
// require("console.table");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ************************************
//store database
const DB_PATH = path.join(__dirname,"my.db");
//store schema
const DB_SQL_PATH = path.join(__dirname,"mydb.sql");

var args = minimist(process.argv.slice(2),{
	string: ["other",],
});

main().catch(console.error);


// ************************************

var SQL3;

async function main() {
	if (!args.other) {
		error("Missing '--other=..'");
		return;
	}

	// define some SQLite3 database helpers
	//creating db file that sqlite needs
	var myDB = new sqlite3.Database(DB_PATH);
	SQL3 = {
		run(...args) {
			return new Promise(function c(resolve,reject){
				myDB.run(...args,function onResult(err){
					if (err) reject(err);
					else resolve(this);
				});
			});
		},
		//each of these helpers/ methods that
		//is exposed by the sqlite extension
		//they're callback expecting functions
		//but we wnat to work with promises
		//so we use promisitify where we pass in a function
		//that expects callbacks and you get back a function
		//that gives you back promises.
		get: util.promisify(myDB.get.bind(myDB)),
		all: util.promisify(myDB.all.bind(myDB)),
		exec: util.promisify(myDB.exec.bind(myDB)),
	};
	//we c ould do this with async file reading
	var initSQL = fs.readFileSync(DB_SQL_PATH,"utf-8");
	// TODO: initialize the DB structure
	await SQL3.exec(initSQL);


	var other = args.other;
	var something = Math.trunc(Math.random() * 1E9);

	// ***********

	// TODO: insert values and print all records
	//the id of the record of the other table or if we 
	//had to make a new record or look it up, the func does that.
	var otherID = await insertOrLookupOther(other);
	//check if the func worked
	if (otherID){
		//do something with the value
		//insert the value into the something table
		let result = await insertSomething(otherID,something)
		if (result){
			var records = await getAllRecords();
			if (records && records.length > 0) {
				console.table(records);
			}
		}

		return;
	}

	// error("Oops!");
}

async function insertSomething(otherID, something){
	var result = await SQL3.run(
		`
		INSERT INTO 
			Something (otherID,data)
		VALUES
			(?,?)
		`,
		otherID,
		something
	)

	if (result && result.changes > 0){
		return true;
	}
	return false;
}

async function getAllRecords(){
	var result = await SQL3.all(
		`
		SELECT Other.data AS 'other',
		Something.data AS 'something'
		FROM Something JOIN Other ON (Something.otherID = Other.id)
		ORDER BY Other.id DESC, Something.data ASC
		`
	);

	if (result && result.length > 0){
		return result;
	}
}


//decide whether or not the other that we have been provided
// is already in the database or not. If it's not,
// we need to insert it. If it is we need to get
// its ID. 
//So I'm gonna make a function that's called 
//insertOrLookup, we'll call it insertOrLookupOther.
async function insertOrLookupOther(other){
	//thats why we use .get cuz we just want 1 record
	//we use await cuz its a promise
	//this checks if we have an id
	var result = await SQL3.get(
		`
			SELECT id FROM Other
			WHERE data = ?
		`,
		other
	);
	//check if result returns a database object if so return it

	if (result && result.id){
		return result.id;
	//else run
	} else {
		result = await SQL3.run(
			`
				INSERT INTO Other (data)
				VALUES (?)

			`,
			//will insert other into the other table?
			other
		);
		//if it succeeded, it will check if it is present.
		if (result && result.lastID){
			return result.lastID;
		}
	}
}

function error(err) {
	if (err) {
		console.error(err.toString());
		console.log("");
	}
}
