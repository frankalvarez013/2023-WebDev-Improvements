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
import { Transform } from 'stream';
import zlib from 'zlib';
import {CAF} from "caf";
const __filename = fileURLToPath(import.meta.url)
const name = dirname(__filename)

var BASE_PATH = path.resolve(
    process.env.BASE_PATH || name
);

var args = minimist(process.argv.slice(2), {
    boolean: ["help", "in", "out", "compress" ,"uncompress"],
    string: [ "file" ]
});

processFile = CAF(processFile);

//helper function
function streamComplete(stream){
    return new Promise(function c(res){
        //the.pipe utility is listening for events
        //like an end event
        //so if we listen for it
        //then we know it has finished.
        stream.on("end",function(){
            //call c to signal that the stream
            //has reached the end
            res();
        })
    })
}

var OUTFILE = path.join(BASE_PATH, "out.txt");

if (args.help){
    printHelp();
} else if (args.in || args._.includes("-")){
    let tooLong = CAF.timeout(13, "took too long!");

    processFile(tooLong,process.stdin).catch(error);
} else if (args.file){
    let stream = fs.createReadStream(path.join(BASE_PATH,args.file));
    
    let tooLong = CAF.timeout(13, "took too long!");

    processFile(tooLong,stream).then(function(){
        console.log("Complete!"); 
    }).catch(error)
} else {
    error("Incorrect usage",true);
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
//turn to a generator to use CAF
function *processFile(signal,inStream){
    var outStream = inStream;

    if (args.uncompress){
        let gUnzipStream = zlib.createGunzip();
        outStream = outStream.pipe(gUnzipStream);
    }

    var upperStream = new Transform({
        transform(chunk,enc,cb){
            this.push(chunk.toString().toUpperCase());
            // setTimeout(cb,500);
            cb()
        }
    })
    //below line is used to add the transformed chunk to
    //the intial stream that we have been using
    outStream = outStream.pipe(upperStream);

    if (args.compress){
        //that makes us a fnrasform stream like the one we did manually
        //that already understands the gzip protocol
        let gzipStream = zlib.createGzip();
        outStream = outStream.pipe(gzipStream)
        OUTFILE = `${OUTFILE}.gz`
    }

    var targetStream;
    //we check which file we will use
    if (args.out){
        targetStream = process.stdout;
    } else {
        targetStream = fs.createWriteStream(OUTFILE)
    }

    outStream.pipe(targetStream);
    //used to straight up cancel the stream cuz we used a timeout
    signal.pr.catch(function f(){
        //in the middle of that pipe stop sending chunks
        outStream.unpipe(targetStream);
        //telling the rest of the stream to not do work
        //effect of pushing that signal back up to the other streams
        //and telling them there is no piping happening because there is no 
        //target
        //kills streaming processing.
        outStream.destroy();
    })

    
    //remember this is all async so
    //yield is await but in generator talk
    yield streamComplete(outStream);
}