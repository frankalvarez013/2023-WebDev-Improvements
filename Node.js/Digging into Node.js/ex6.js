#!/usr/bin/env node

"use strict";
import util from 'util'
import path from "path";
import sqlite3  from "sqlite3";
import { fileURLToPath } from 'url';
import staticAlias from 'node-static-alias';
import http from 'http';
import express from 'express'
//express works by calling it
var app = express()

// ************************************
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname,"my.db");
const WEB_PATH = path.join(__dirname,"web");
const HTTP_PORT = 8039;

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

var httpserv = http.createServer(app);
//app - basically an automatically generated handle request function just like our last example ex5.js where we call handleRequest(). basically
//the same thing but way better obv

main();


// ************************************

function main() {
	defineRoutes() //place for our handle requests and our alias requests.
	

	httpserv.listen(HTTP_PORT);
	console.log(`Listening on http://localhost:${HTTP_PORT}...`);
}

function defineRoutes(){
	//**these functions like .get .use are adding these functions into an internal array and express, whenever a request gets called it 
	//just loops over the array and checks if that function fully handles that response and keeps going onto the next function so the order matters*/
	// lets handle our API Endpoint
	// first off we have to tell app (function object) - tell it what routes to set up
	// do it by definiing the middleware
	// MW - a function that gets called if the incoming requqest matches some particular criteria.
	app.get("/get-records", async function(req,res){
		await delay(1000);
		var records = await getAllRecords();
		res.writeHead(200,{
			"Content-Type": "application/json",
			"Cache-Control": "no-cache"
		});
		res.end(JSON.stringify(records));
	});
	//use regular expression matching and replacing them
	//use app.use middleware and what you should be aware of
	//if youre receiving it
	//if they are async - you need a third parameter (callback) and call it
	
	app.use(function(req,res,next){
		if (/^\/(?:index\/?)?(?:[?#].*$)?$/.test(req.url)) {
			req.url = "/index.html";
		}
		else if (/^\/js\/.+$/.test(req.url)) {
			next();
			return;
		}
		else if (/^\/(?:[\w\d]+)(?:[\/?#].*$)?$/.test(req.url)) {
			let [,basename] = req.url.match(/^\/([\w\d]+)(?:[\/?#].*$)?$/);
			req.url = `${basename}.html`;
		} else{
			req.url = "/404.html"
		}
		//to flow to the next thing you need to call next, since we are not handling the response, we are just redirecting it to the next route which
		//will be the static file
		next()
	})	//this function will pass on the below function after


	//we want a route for handling any of the static file requests
	//app.get is for get requests, app.use is for all incoming requests
	app.use(express.static(WEB_PATH, {
		maxAge: 100,
		//function here is called when we have an outbound request and we need to add custom headers
		//this is what static alias was doing for us
		//express.static is a static file server tahts exactly identical to node static
		setHeaders: function setHeaders(res){
			res.setHeader("Server", "Node Workshop: ex6")
		}
	}))
	// TODO: define routes
	//
	// Hints:
	//
	// {
	// 	match: /^\/(?:index\/?)?(?:[?#].*$)?$/,
	// 	serve: "index.html",
	// 	force: true,
	// },
	// {
	// 	match: /^\/js\/.+$/,
	// 	serve: "<% absPath %>",
	// 	force: true,
	// },
	// {
	// 	match: /^\/(?:[\w\d]+)(?:[\/?#].*$)?$/,
	// 	serve: function onMatch(params) {
	// 		return `${params.basename}.html`;
	// 	},
	// },
	// {
	// 	match: /[^]/,
	// 	serve: "404.html",
	// },
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
