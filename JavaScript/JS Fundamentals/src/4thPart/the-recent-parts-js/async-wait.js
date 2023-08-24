function getFile(file) {
	return new Promise(function(resolve){   //To create a promise object, we have to pass in a resolve (Optional and reject) function (already created by the Promise constructor) through an
                                            // an anonymous function (called the executor function) so that 
		fakeAjax(file,resolve);
	});
}

async function loadFiles(files) {   //Reason why we have to use async here is because we use the keyword: await in the function
                                    //However, the function itself will be EXECUTED on runtime even though it has async(just means you are gonna use await)
    //Below these are the doing it chronologically which will be not what we want WE WANT CONCURRENT
    // var text1 = await getFile(files[0]);
    // var text2 = await getFile(files[1]);
    // var text3 = await getFile(files[2]);
    var prs = files.map(getFile);// Array of three files. We don't want to have to repeat this three lines in a row var text1 = getFile(files[0])...
    //Each Promise signifies an async operation to fetch a file's content using the getFile function.(Each Promise HAS NOT YET BEEN
    for (let pr of prs){       //
        console.log(await pr);  //hERE WHEN WE use AWAIT, the promise will execute and we suspend code until we get back the Promise completion on callback queue.
    }
	//OR
	// prs.forEach(function each(pr){
	// 	console.log(await pr);
	// });
}

loadFiles(["file1","file2","file3"]);


// **************************************


function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);    //When you call the resolve function, the promise is considered fufilled
	},randomDelay);
}
