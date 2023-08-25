// August 15, 2023
// 1:00PM
//
//JAVASCRIPT: THE RECENT PARTS
    // Introduction

        // Javascript New Feature Process
            // ES3 - ES5 Dark Ages, no updates really happened. Stagnation of JS created CHROME FIREFOX.
            // 2009 JS Lots of people were in JS 
            // ES6 - 2015

        // Browser Support & Transpiler
            // Babble Takes your code to create the older form to ship a file that could support that older browser
        // Course Overview
        
            // Template Strings, String padding/trimming,  Destructuing, Array find()/includes(), Array flat()/flatMap(), Iterators, Generators, RegExp Improvements, Async await, Async yield await
 
    // Strings
        // Template Strings
            //Ex.1
                var name1 = "Kyle Simpson";
                var email = "getify@gmail.com";
                var title = "Teacher";
                var msg = "Welcome to this class! Your" + title + " is " + name1 + ", contact: " + email + ","; //Welcome to this class! Your Teacher is Kyle Simpson, contact: getify@gamil.com.
                var msg = `Welcome to this class! Your  
                ${title} is ${name1}, contact: ${email}`; //BackTick is done to show inlince code, also when you go into the next line just do this and it will present the msg like this format.
        //Tagged Templates
            //Ex.2
                var amount = 12.3;
                //This is an an example below of a function call using tagged template literal
                //When we drop 12.3 we wan it to formatted so we use this method.
                var msg = 
                        formatCurrency
                `The total for your order is ${amount}`;
                //The total for yyour order is 
                //Gets the string  `The total for your is`, and puts the variables like amount into another array called values
                function formatCurrency(strings,...values){
                    var str = "";
                    //Rest of code doesn't matter
                }
                str += `$${values[i-1]}`
        //Another Example
            //Ex3
                function logger(strings,...values){
                    //Do Something
                }
                var v = 42;
                var o = {a:1, b:[2,3,4]};
                logger`This is my value: ${v} and another: ${o}`;   //Logger does the console logging for us
                //This is my value: 42 and another: {"a":1,"b":[2,3,4]}

            //Tag function doesn't have to return a string
            //
        //String Padding & String Trimming
            var str = "Hello";
            str.padStart(5); //"Hello" Does nothing
            str.padStart(8); //"   Hello"
            str.padStart(8, "*");//"***Hello"
            str.padStart(8, "12345"); //"123Hello"
            str.padStart(8,"ab"); //"abaHello"
            str.padEnd(8);//"Hello   "
            var str = "    some stuff  \t\t";
            str.trim(); //"some stuff"
            str.trimStart(); //"some stuff      "
            str.trimEnd(); //"      some stuff"

    //Array Destructuring

        //Destructuring
            //decomposing a structure into its individual parts
            //Ex
                var tmp = getSomeRecords();
                var first = tmp[0];
                var second = tmp[1];
                var firstName = first.name;
                //If not present give default email
                var firstEmail = first.email !== undefined ?
                    first.email : "nobody@none.tld";
                var secondName = second.name;
                var secondEmail = second.email !== undefined ?
                    second.email : "nobody@none.tld";
            //Ex2 This pattern below is the same of the above example
                var [
                    {
                        name: firstName,    //Find the `name` property and set it to firstName
                        email:firstEmail = "nobody@none.tld"    //default value expression, if there is no email property present, use this back up value
                    },
                    {
                        name: secondName,
                        email:secondEmail = "nobody@none.tld"
                    }
                ] = getSomeRecords();
                //This is not an array of objects, because its on the left hand side of the equals its actually a pattern (the right side of the equals is the function)
                //Destructuring mainly accounts to the part of the value that you care about at that moment. Destructuring only accounts for the things we want so in this case
                //it only wants the first two objects, just a subset of all the things the function will return.

        //Coding Sesh (Refactoring Code Using Destructuring)
                //Ex.1
                    function data() {
                        return [1,2];
                    }

                //Explicit Form
                    var tmp = data();
                    var first = tmp[0];
                    var second = tmp[1] !== undefined ? tmp[1] : 10;
                    var third = tmp[2]; //Will give us undefined
                    var fourth = tmp.slice(3);

                //Destructuring (Implicit Form)
                    var [ //Square bracket is our pattern; This is the equivalent to the explicit form
                        first,
                        second = 10,
                        third,   //Will give us undefined
                        ...fourth // will give us all the values after the third index from the array
                    ] = tmp = data(); //Here we assign a var to the data function return value if we still want to reference the information later on
                    //  This is the same as line 104 because when we do the destructuring if we don't have the tmp var then we have no way of referencing the rest of the info left by data()

                //we could also do this to show that the destructuring doesn't have to do the declaration
                    var one, two, three;
                    [
                        one,
                        two,
                        three,
                    ] = tmp = data() || []; //This shows how we can default to an empty array if the return value is undefined

                //Below Example is to skip that next value using `,`
                    var[
                        one,
                        ,
                        two,
                        three,
                    ] = tmp = data();

                //We can use destructuring to get values we want
                //We also set it equal to [] in case its empty and we don't want a error
                    function data([
                        one,two,three
                    ] = []){
                        console.log(one);
                    }

                //Here we show that we do it one by one , gives 1,[],2,3,4, second destructuring gives us destructured second array
                    function data(){
                        return [1,[2,3],4];
                    }
                    var tmp;
                    var [
                        first = 10,
                        [
                            second,
                            third
                        ] = [],
                        fourth
                    ] = tmp = data() || [];
    //Object Destructuring
        //Object Destructuring
            function data(){
                return {a: 1, b: 2, c: 3};
            }  

            var tmp = data();
            var first = tmp.a;
            var second = tmp.b;
            var third = tmp.c;

            //Destructuring Version
            var {
                a: first,   //Source : Target
                b: second = 42,
                ...third    //Will include the rest of the values of the object
            } = data();
            //IF DESTRUCTURING
            var first, second;
            //Needs a paranthese because without the paranthese or var declaration it will think its a scope/block and not destructuring.
            (
                {
                    b: second,
                    a: first
                } = data()
            );
            //OR
            var tmp;
            tmp = {
                b: second,
                a:first
            } = data();
            // if data returned {a:1 b:{c:2,d:3}}
            var {
                a,
                b:{
                    c,
                    d
                } = {}
            } = data() || {};
    //Further Destructuring
        //Named Arguments
                function lookupRecord(store = "person-records", id = -1){   //Only useful if you want the first two values
                    // ..
                }
                function lookupRecord({ //Used to get the parameters of an object DESTRUCTURING
                    store = "person-records",   //Declare a function with an object parameter
                    id = -1
                }) {
                    // ..
                }
                lookupRecord( {id: 42}); //Naming of the argument at the call site
                //USE THIS SKILL AS MUCH AS POSSIBLE
            //Destructuring & Restructuring
            var defaults = {
                url: "url",
                method: "post",
                headers: [
                    "Content-Type: text/plain"
                ]
            };
            var settings = {
                url: "diff url",
                data: 42,
                callback: function(resp){ /** */}
            };

            ajax( _.extend({},defaults,settings)); //first copies defaults then overrides them based on settings object.
            //This is very imperative - needs libraries defintino on what extending does and you need documentation to remember how to overwrite an array element
            //Destructioning pattern is better tho cuz its easier to see whats going on

            function ajaxOptions({
                url = "url",
                method = "post",
                data,
                callback,
                headers : [
                    headers0 = "Content-Type: text/plain",
                    ...otherHeaders
                ] = []
            } = {}) {
                return {
                    url, method, data, callback,
                    headers: [
                        headers0,
                        ...otherHeaders
                    ]
                }
            }
            var defaults = ajeaxOptions();
            var settings = {
                url: "diff url",
                data: 42,
                callback: function(resp){ /** */}
            };
            ajax(ajaxOptions(settings));

    //Array Methods
        //find/findIndex & includes
            var arr = [{a:1}, {a:2}];
            arr.find(function match(v){
                return v && v.a > 1;
            });
            // {a:2}
        //flat & flatMap()
            var nestedValues = [1,[2,3],[[]],[4,[5]],6];
            nestedValues.flat(); // [1,2,3,[],4,[5],6]
            nestedValues.flat(2); //[1,2,3,4,5,6]

    //Iterators & Generators
        //Iterators
            var str = "Hello";
            var it = str[Symbol.iterator]();
            it.next(); // {value: "H", done:false}
            for (let v of it){
                console.log(v); // "H" "E" "L"...
            }

        //Declarativer Iterators
            var str = "Hello";
            var letters = [...str]; //this is an iterator
            letters; // ["H", "e", "l", "l", "o"]
        //Data Structure without Iterators
            var obj = {
                a: 1,
                b: 2,
                c: 3,
                [Symbol.iterator]: function(){
                    var keys = Object.keys(this);
                    var index = 0;
                    return {
                        next: () => (index < keys.length) ? {done: false, value: this[keys[index++]]} : {done: true, value: undefined}  //We use arrow function because of the .this to lexically adopt the parent context
                    }
                }
            }
            //This is an imperative approach to adopt the iterator for an object
        //Generators
            function *main(){   //The * Creates a Generator
                yield 1;        //yield allows us to produce additional values every time its iterated over.   
                yield 2;
                yield 3;
                return 4;       //Like restated below DO NOT RETURN use YIELD if you want this value to show up.
            }
            var it = main(); //When you invoke them they produce an interator and that iterator has a .next to it.

            it.next();  //Since its a standard iterator, when we invoke .next() next to an iterator attached to the generator, it will produce {value:1, done:false}
            it.next();
            it.next();
            it.next();  // {value: 4, done:true}

            [...main()];
            // [1,2,3] It doesn't keep the value after the 3. It doesn't keep the done:true iterator value it stops before it. SO DONT RETURN IT, YIELD IT

            //Iterators: Declarative Iterator
                var obj = {
                    a: 1,
                    b: 2,
                    c: 3,
                    *[Symbol.iterator](){   //This function will be a generator type and since we are using a short hand notation(not explicitly saying its a "function" type cuz of the *)
                                            //JS will automatically know that its a generator function. This will be considered the default generator function
                                            //If you want to create one with a name you can use "*functionName(){}"
                        for (let key of Object.keys(this)){ //Iterate over all the keys; We are using a let-of cuz object.keys returns an array and arrays are iterables
                            yield this[key];    //Understand that yield values are stored inside the generator function itself
                                                //Since we are using "this" (which carries the obj info) we it acts like an object so we can access the key like this -> ["key"]
                        }
                    }
                };
                [...obj]; // This will produce [1,2,3]
    //Regular Expressions
        //Look Ahead & Behind
            var msg = "Hello World";
            msg.match(/(l.)/g); // ["ll", "ld"]
            msg.match(/(l.)$/g);
        //Named Capture Groups
            msg.match(/[jkl])o Wor\1/); //["lo Worl","l"] What ever comes before the o match that same thing later in the pattern? Mtaches
            msg.match(/(?<cap>l.)/).groups; //{cap: "ll"} //
            msg.replace
        //dotall Mode
            var msg =  `
            The quick brown fox
            jumps over the lazy dog
            `;
            msg.match(/brown.*over/);
            //null Is able to match any character except it cant go over to the newline which gives us null cuz it cant go in
            msg.match(/brown.*over/s); // ["brown fox\njumps over"]

    //Async Await
        //Async Functions
            //.then are not good anymore(anti pattern) async replaces this
            //.then should be replaced
            //Ex
            //  Generators cuz there is an iterator it can pause itself by virtue of the yield keyword.
            runner(function *main(){    //Runner is a library utility  (co, koa, bluebird - all have utilities that run generators as if theyre async/sync it will wait for it to resolve)
                var user = yield fetchCurrentUser();    //fetch the current user and wait this whole statement pauses until it gets the promise back (only viable because of runner())
                var [archivedOrders, currentOrders ] = yield Promise.all([  
                    fetchArchivedOrders( user.id),
                    fetchCurrentOrders( user.id)
                ]);
            
            });//  fetch out the current user and yeild out the result of that which is a promise and wait for that to come back.
            //Can we do this without having a runner?
            //Now we have an Async function
                async function main() {
                    var user = await fetchCurrentUser();    //DOES THE SAME THING as the GENERATORS
                    var [archivedOrders, currentOrders] = 
                        await Promise.all([
                            fetchArchivedOrders(user.id),
                            fetchCurrentOrders( user.id)
                        ]);
                }
                main();

        //Async Iteration
            // Issues
            //  RUn a function and pass in ForEach, you might have noticed if you use await using forEach it won't work because the function callback will not be async
                // prs.forEach(function each(pr){
                //     console.log(await pr);
                // });
            // forEach does not know how to wait for a promise
            // There is a missing piece to the puzzle and what we need is an async iterator (we need it to pause at each iteration and wait for a promise.)
            //  The .map, .filter those are all sync iterators, they run eagerly over the value in the array, and they shouldn't know when to pause
            // so we need an eager async iterator, tries to go to each value, but if there is a promise it shouldw ait.
            // There is not yet any solution that JS provides.
        // FASY LIBRARY
            // provides that solution
                // async function fetchFiles(files){
                //     var prs = await fakeAjax.concurrent.map(getFile, files);

                //     await fakeAjax.serial.forEach(async function each(pr){
                //         console.log(await pr);
                //     })
                // }
        // Async Function Problems   
            // await Only Pronmises
                //This only works for 
                //Useful for a Func, useful for custom Promise.
                //Solution: Iterator/Generator
                        //:Generators can yield anytime of value
            //Scheduling (Starvation)
                //Promices when they need to resolve itself will be placed on the MicroTask Queue instead of the event loop
                //MircoTask Queue will be a cut to the front of hte line
                // Starvation: When Promises keep adding to the MicroTask Queue
            //BIG DEAL: External Cancelation
                //You can't tell a promise to stop, it iwll continue to consume resources until it finishes.
            //Async Generators with yield
                //await only pulls, generators push...WHy not both?
                //async* yield await
                    async function *fetchURLs(urls){
                        for (let url of urls){
                            let resp = await fetch( url );
                            if (resp.status == 200) {
                                let text = await resp.text(); //pull
                                yield text.toUpperCase();   //push
                            } else {
                                yield undefined;
                            }
                        }
                    }
            //Asyn Generators Iteration
                    //Past
                        async function main(favoriteSites){
                            var it = fetchURLs(favoriteSites);

                            while (true) {
                                let res = await it.next();  //Wihtout the await we receive the actual Promise, not the value so we add await
                                if (res.done) break;
                                let text = res.value;
                                console.log(text);
                            }
                        }
                    //NOW
                        async function main(favoriteSites) {    //The example above is nice, but for a better syntatic sugar we added an await on the for loop
                            for await (let text of fetchURLs( favoriteSites)){
                                console.log(text);
                            }
                        }