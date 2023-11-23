#!/usr/bin/env node

"use strict";

import util from 'util'
import childProcess from 'child_process';


// ************************************

const HTTP_PORT = 8039;
const MAX_CHILDREN = 5;

var delay = util.promisify(setTimeout);


main().catch(console.error);


// ************************************
//SIMPLE VERSION
//In this example we don't need any promises because we aren't dealing with anything synchronous
//so since thats the case, we don't need to await anything since its all just async anyways.
// async function main() {
//     // console.log(`Load testing http://localhost:${HTTP_PORT}...`);
//     //child has elements on it where we can listen to an event for it. and we can also read and write from its standard I/O
//     var child = childProcess.spawn("node",["ex7-child.js"])
//     //we just ask did if finish?
//     child.on("exit", function(code){
//         // the function returns a default 0
//         console.log("Child finished",code)
//     })
// }

//MEDIUM VERSION (I CREATED IT)
//In this example, we need promises and await because since we are using more complex
//code - in this case for loop, which is synchronous, we need the async to basically finish before the execution of the
//rest of the for loop, so we need a promise to hold that. The resolve is what will be returned
// async function main() {
// 	// console.log(`Load testing http://localhost:${HTTP_PORT}...`);
// 	//child has elements on it where we can listen to an event for it. and we can also read and write from its standard I/O
// 	let checkErr = 0;
// 	let checkCnt = 0;
// 	async function loopChild() {
// 		var child = childProcess.spawn("node", ["ex7-child.js"]);
// 		//promise - resolve param - callback function that is part of the Promise API.
// 		//							when you call resolve(value), you are telling promise to fulfill with the provided value.
// 		//							the value passed to resolve is what will be passed to the 'then' callback if the promise is consumed using.then
// 		return new Promise(function c(resolve){	//Promise has a callback function to return specific data
// 			child.on("exit", function (code) {	//child.on has a callback function to return the data based on exit event. check if function resolved correctly.
// 				if (code === 0) {
// 					resolve(0);
// 				} else {
// 					resolve(1);
// 				}
// 			});
// 		});
// 	}
// 	while (checkErr === 0 && checkCnt < MAX_CHILDREN) {
//         checkErr = await loopChild();
//         console.log(checkErr);
//         checkCnt += 1;
//         await delay(500);
//     }
// }
async function main() {
    console.log(`Load testing http://localhost:${HTTP_PORT}...`);
   while(true){
	process.stdout.write(`Sending ${MAX_CHILDREN} requests...`)
	let children = [];
	//create an array of children
	for (let i =0; i < MAX_CHILDREN; i++){
		children.push(
			childProcess.spawn("node",["ex7-child.js"])
		);
		}
	//turn those children into promises whether they are succesful or not.
	//each child will listen to the exit event.
	let resps = children.map(function wait(child){
		return new Promise(function c(res){	//1.Promise
			child.on("exit", function(code){
				if (code === 0) res(true);
				res(false);
			})
		})
		
	})	
	resps = await Promise.all(resps);

	if (resps.filter(Boolean).length == MAX_CHILDREN){
		console.log("success!")
	} else {
		console.log("failures");
	}

	}
	
}