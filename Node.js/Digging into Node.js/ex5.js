#!/usr/bin/env node

"use strict";
import util from 'util'
import path from "path";
import sqlite3  from "sqlite3";
import { fileURLToPath } from 'url';
import staticAlias from 'node-static-alias';
import http from 'http';
// require("console.table");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// var http = require("http");
// var staticAlias = require("node-static-alias");


// ************************************

const DB_PATH = path.join(__dirname,"my.db");
//nobody will be able to make a malicious http request on our file system thru the web path.
const WEB_PATH = path.join(__dirname,"web");
const HTTP_PORT = 8039;	//we use this port cuz why not.

var delay = util.promisify(setTimeout);

// define some SQLite3 database helpers
//   (comment out if sqlite3 not working for you)
var myDB = new sqlite3.Database(DB_PATH);
var SQL3 = {
	run(...args) {
		return new Promise(function c(resolve,reject){
			myDB.run(...args,function onResult(err){
				if (err) reject(err);
				else resolve(this);
			});
		});
	},
	get: util.promisify(myDB.get.bind(myDB)),
	all: util.promisify(myDB.all.bind(myDB)),
	exec: util.promisify(myDB.exec.bind(myDB)),
};
//we give it a path web_path - document root
//it will never allow a relative access o fo any file outside of that document route.
var fileServer = new staticAlias.Server(WEB_PATH,{
	cache: 100,
	serverInfo: "Node Workshop: ex5",
	alias: [
		//if url (doesn't include http part) if there is a slash at beginning, or with /index and optionally
		//followed by a path seperated url question mark or # symbol then serve up index.html
		{
			match: /^\/(?:index\/?)?(?:[?#].*$)?$/,
			serve: "index.html",
			force: true,
		},
		//if incoming has /js server it as is.
		{
			match: /^\/js\/.+$/,
			serve: "<% absPath %>",
			force: true,
		},
		// if any has words followed by url seperated, server up just that with .html
		// like /about <- server about.html
		{
			match: /^\/(?:[\w\d]+)(?:[\/?#].*$)?$/,
			serve: function onMatch(params) {
				return `${params.basename}.html`;
			},
		},
		// this the last resort
		{
			match: /[^]/,
			serve: "404.html",
		},
	],
});

var httpserv = http.createServer(handleRequest);

main();


// ************************************

function main() {
	httpserv.listen(HTTP_PORT);
	console.log(`Listening on http://localhost:${HTTP_PORT}...`);
}

async function handleRequest(req,res){
	//if incoming req looks like an api, do it manually, if not hand to file server
	if (req.url == "/get-records"){
		await delay(1000);
		let records = await getAllRecords();

		res.writeHead(200,{
			"Content-Type": "application/json",
			"Cache-Control": "no-cache"
			});
		res.end(JSON.stringify(records));
	}else {
		fileServer.serve(req,res);
	}

	//ex....
	// if (req.url == "/hello"){
	// 	//these req and res are http streams so you can pipe a request stream into a respond stream
	// 	res.writeHead(200, {"Content-Type": "text/plain"});
	// 	res.end("Hello world");
	// } else {
	// 	res.writeHead(404);
	// 	res.end();
	// }
}



// *************************
// NOTE: if sqlite3 is not working for you,
//   comment this version out
// *************************
async function getAllRecords() {
	var result = await SQL3.all(
		`
		SELECT
			Something.data AS "something",
			Other.data AS "other"
		FROM
			Something
			JOIN Other ON (Something.otherID = Other.id)
		ORDER BY
			Other.id DESC, Something.data
		`
	);
	return result;
}

// *************************
// NOTE: uncomment and use this version if
//   sqlite3 is not working for you
// *************************
// async function getAllRecords() {
// 	// fake DB results returned
// 	return [
// 		{ something: 53988400, other: "hello" },
// 		{ something: 342383991, other: "hello" },
// 		{ something: 7367746, other: "world" },
// 	];
// }
