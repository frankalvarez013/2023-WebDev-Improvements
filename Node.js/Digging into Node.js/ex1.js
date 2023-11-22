#!/usr/bin/env node

"use strict";

var util = require("util")
var path = require('path')
var fs = require('fs')

//streams are first class citizens - kind of data structure
//to write to steam we write we call .write()
// process.stdout.write("Hello World")
// console.log("Hello World")
//difference is that console.log adds a trailing new line at the end of its result

//Reason this should be known is because using this I/O model to be efficient and for us to know its efficient is just for us
//to get the string itself.

//What about std.error

// console.error("Oops");

//when we print it, they will be interpreted as string, but they have diff environments.

//if we redirect the console.error we do node ex1.js 1>null 
//that means that we redirected the standard out (console.log() invocation) stream to null
//while if we did node ex1.js 2>null
// its critical to know this because if we want to create/write a command line shell tool - a strong convention is doing 
// regular debug output on standard out and any error output on standard error, becuase system monitoring systems will hook
// into the standard error stream and write those to log files. we want it to go to the error stream. good for us to write to console.error

// three standard IO streams
// standard IN --we could access it like process.stdin.read() and read a character or bite off the standard in the stream
//               but we won't use the stand in cuz they are more finkey then the output stream and quirks
//               so when we get to the point where we need to use it we will use a library.

//access args

// console.log(process.argv);

//the argv will return to us two urls of where it was written
//so we can just remove slice

var args = require("minimist")(process.argv.slice(2), {
    boolean: ["help"],
    string: [ "file" ]
});

if (args.help){
    printHelp();
}
else if (args.file){
        // let filepath = path.resolve(args.file);
        // console.log(__dirname)
        //dir is the current directory of the current file that we're accessing it in (invoking the node ex1.js)
        // console.log(filepath);
    processFile(path.resolve(args.file))
}
//its implying that there is a local file with the args.file name
//if we use ../hello it will assume and shove the filepath into the root...(explain better..)
else {
    error("Incorrect usage",true)
}

// console.log(args)

function error(msg,includeHelp=false){
    console.error(msg);
    if (includeHelp){
        console.log("");
        printHelp();
    }
}

function printHelp(){
    console.log("ex1 usage: ")
    console.log("  ex.j1 --file={FILENAME}")
    console.log("--help\tprint this help")
}

function processFile(filepath){
    fs.readFile(filepath, function onContents(err,contents){
        if (err){
            //err is going to be another object so we want to toString() it.
            error(err.toString())
        }
        else{
            contents = contents.toString().toUpperCase();
            process.stdout.write(contents)
        }
    });
    // console.log(contents)    /** This will print out the buffer since we didn't specify what type of thing we are passing thru (generic)*/
    /** by the time it got to the shell, console.log already stringified it and just showed the thing that represented into a buffer.*/
    /** actually tries to do some processing behind the value */
    // process.stdout.write(contents) /** This will pass the buffer to this shell; the shell knew what to do with these bytes and it translated them into charcters*/
}