#!/usr/bin/env node

"use strict";
//use strict 
//saying go find node in my system and use node to interpret the rest of my program
//tells the shell environment it knows what program to hand that execution towards.

import path from 'path'
import fs from 'fs'
import getStdin from 'get-stdin';
import minimist from 'minimist'
import {fileURLToPath} from 'url'
import {dirname} from 'path'

const __filename = fileURLToPath(import.meta.url)
const name = dirname(__filename)

var BASE_PATH = path.resolve(
    process.env.BASE_PATH || name
);

var args = minimist(process.argv.slice(2), {
    boolean: ["help", "in"],
    string: [ "file" ]
});

if (args.help){
    printHelp();
} else if (args.in || args._.includes("-")){
    //TODO: handle stdin
    //This is a promise return mechanism
    //
    getStdin().then(processFile).catch(error);
} else if (args.file){
    console.log('hi')
    console.log(path.join(BASE_PATH,args.file))
    fs.readFile(path.join(BASE_PATH,args.file), function onContents(err,contents){
        if (err){
            error(err.toString())
        }
        else{
            processFile(contents.toString());
        }
    });
} else {
    error("Incorrect usage",true)
}

function error(msg,includeHelp=false){
    console.error(msg);
    if (includeHelp){
        console.log("");
        printHelp();
    }
}

function printHelp(){
    console.log("ex1 usage: ")
    console.log("--help\t\tprint this help")
    console.log("  ex.j1 --file={FILENAME}\t\tprocess the file")
    console.log("--in, -\t\tprocess stdin")
}

function processFile(contents){
    contents = contents.toUpperCase()
    process.stdout.write(contents);
}