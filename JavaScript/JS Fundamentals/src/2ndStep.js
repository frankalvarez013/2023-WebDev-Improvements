// July 8 2023
// 2:38 PM (Estimated 4 HOURS)
// ```````````````````````````````````````````````````````````````````````
// 1. CONST is for constant value - Var is for varying value that will change
// 2. call a command (function call) means parantheses (identifier (function) + data)
// 3. Execution Context (Runs the small function ) 
// Global Execution Call (Runs the whole app/program)
// Output = multiplyBy2(3) <- inputNumber = parameter ; 3 - Argument 
// ````` 15 min Break
// 3:34 Break lasted
// 4:22 Break

// Higher Order - CopyArrayAndManipulate(array,instructions) <- Takes in a function and passes out a function
// CallBack Function - multiplyBy2(input) <- Used this in instructions

// Functions can be returned from other functions in JS
//## createFunction(){function-newFunc(val){return console.log(val)} return newFunc}
// Execution -
//## generatedFunc = createFunction()
//## result = generatedFunc(Bobo) <- Console will log "Bobo"
// **generatedFunc has nothing to do with createFunction() it will only take on the callback function that was returned.

// Retaining Function Memory / Closure

//_________________________________
//## function outer (){ 
//##     let counter = 0;
//##     function incrementCounter () {
//##         counter ++
//##     }
//##     return incrementCounter;
//## }

//## const myNewFunction = outer();
//## myNewFunction();
//## myNewFunction();
//_________________________________

// Explanation: So when we declare myNewFunction it will get the results of outer function and only remember the callback(the incrementCounter()) which was returned.
//              When we try to call myNewFunction it will find the reference of incrementCounter however, since we dont remember outer function 
//              that we threw out, the counter variable saved in that function also GETS SAVED.

// Solution: TURNS OUT CLOSURE AS IN THE FUNCTION INCREMENT COUNTER took with it all the surrounding data in the outer() and brought all of the data on the back of the
//  function myNewFunction (like a backpack). the reference to the counter will be global when calling myNewFunction and it will 
// function closure/returning function is not JUST A LABEL but it also is able to store data
// BUT WHERE DOES THE DATA GET SAVED???
// If we console.log increment incrementCounter() from inside the outer() we will notice that it has a hidden property that links 
// to where all the surrouding data is stored THAT WAS USED INSIDE THE INCREMENTCOUNTER() and generally stored in a place called [[scope]]. As long as myNewFunction is still there the 
// hidden property will always be there and taken into consideration inside the Call Stack.
// BackPack <- C.O.V.E Closed over variable environment; Also Known as CLOSURE
// Lexical or Static Scoping - where I save my function determines the life of the function what data it will have access to when that function runs. WHILE Dynamically scope changes where you call the function
// P.L.S.R.D <- Persistent Lexiscally Scope Reverenced Data; Also Known as CLOSURE
// REMEMBER IT GRABS THE FIRST REFERENCE - IF WE stored counter inside of incrementCounter() it would not touch the "backpack" or closure because it already hit the first reference - no need to get outside scope

// Closure gives our functions persistent memories and entirely new toolkit for writing professional code
// Helper functions will have "backpacks" which have counters such as "once" functions which are only 1 time uses.
// Helper function "memoize" <- if you want to only run 1 method with a unique input, the backpack will have the key and value so that you don't have to rerun it in case it took too long.
// Iterators can replace for loops so that we don't care about indexes and placing them.


//ASYNC --------------------------------------
//JS engine has 3 main parts:
    //Thread of Execution
    //Memoery/Variable Environment
    // Call Stack
// Web API Example
// Web Browser Features
//`````````````````````
// setTimeout()...gets called but since its a web browser feature it will act differently to that of the call stack in JS.
// JS is different from web browser features
// WHEN YOU CALL ASYNC its basically telling JS that the browser will handle the SO async means we can skip to the next line as the browser will handle the retrieved data and JS will handle the
// returned functionality.

//_________________________________
//## function printHello(){console.log("Hello")}
//## function blockFor1Sec(){}
//## setTimeout(printHello,0)
//## blockFor1Sec()
//## console.log("MeFirst")
//_________________________________

// What happens here is that setTimeout gets executed and sends that info into the Web Browser features "environment" where it will complete after 0ms. It will then send
// the printHello function INTO THE CALLBACK QUEUE.
// However the global context will need to be completely finished for the print Hello function to run and get into the call stack() so that means until the whole program finishes, then at the
// end the callback queue will work.
// "All normal code needs to run in order for anything in callback queue to finish"
// Event Loop is used to find out when the call stack is empty and it runs all the time until (always saying is the stack empty??!)
// the call stack finishes and that loop will trigger the callback queue
 
//ELITE EXAMPLE
// Write a function called debounce that accepts a function and returns a new function 
// that only allows invocation of the given function after interval milliseconds have passed
// since the last time the returned function ran.

// Additional calls to the returned function within the interval time should not be invoked or queued, but the timer should still get reset.

//_________________________________
//## function debounce(callback, interval) {
//##     let duration = 0
//##     let id
//##     return function(){
//##       //If set Interval has gone over or equal to 3 seconds
//##       if(duration <= 0) {
//##         //Reset the Timer
//##         duration = interval
//##         //Restart the Timer
//##         clearInterval(id)
//##         //Create the Timer again
//##           id = setInterval(() => {
//##           duration -= 100
//##         }, 100)
//##         //Keep Running this function
//##         //Return the callback and execute
//##         return callback()
//##       }
//##     }
//##   }
//## function giveHi() { return 'hi'; }

// Initiate and get the returning function this function is in the callstack

//## const giveHiSometimes = debounce(giveHi, 3000);

// We invoke the returning function and it will activate the setInterval() but since its from the WEB API we will ignore it and
// go to the next line and thus return callback()

//## console.log(giveHiSometimes()); // -> 'hi'
//_________________________________

// We call setTimeout but since its a global function
// We will actually be running all of them at 0ms and so basically none of them 
// are going to be synchronous in the way that the outer setTimeOuts will call
// but the callback functions will still have to wait in the web API, then move into the callback queue.
// This line below gets called and moved into the web browser feature(web API) and will actually be faster than the 
// other setTimeout that was called in the previous line before this which had 3 seconds, so the difference between
// the last and this line is off by 1 sec. Thus when the function gets called, it returns nothing since the if
// statement gets returned false

//_________________________________
//## setTimeout(function() { console.log(giveHiSometimes()); }, 2000); // -> undefined

// We know that since the setTimeout functions all get called at around the same time
// We know that the previous statement was off by 1000 seconds, so the function below,
// Will actually go over about 1000 seconds since 3000, and 4000 are off by 1000.
// Thus the function will be called and occur and the same thing happens over in the next few lines
//## setTimeout(function() { console.log(giveHiSometimes()); }, 4000); // -> 'hi'

//## setTimeout(function() { console.log(giveHiSometimes()); }, 8000); // -> 'hi'

//## setTimeout(function() { console.log(giveHiSometimes()); }, 11000); // -> 'hi'

//## setTimeout(function() { console.log(giveHiSometimes()); }, 12000); // -> 'hi'
//_________________________________

// PROMISES
//````````````````````````````````````````````````````````````````````````````````````````````````````````
// When we used setTimeOut its consequence came from the browser, we get no tracking between the states in the memory and the stuff that happens in the browser
// there is no mapping btween the two which is rather strange because you can't really console.log the setTimeout work
// However
// When you throw something in the browser, make it have a consequence in the JS so that (keep track of it in JS) ES6 facade function
// One of the browser features is Network Request - which allows the webbrowser to speak to the internet which comes thru FETCH
// Youre not just throwing something into the browser, you also hold that consequence into js memory
// Branch - Web Browser Engine contains JS engine and browser features(one of which is the network requests)
// Example fetch is gonna grab data from the internet and simulatanesosly return back a promise object and sits on memory and when the background info finishes, the promise object
// will be filled with the data we just got from the internet.
// Summary: Using two-pronged 'facade' functions that both: Initiate background web browser and Return a placeholder object (promise) immediately in Javascript

//_________________________________
//## function display(data){console.log(data)}
//## const futureData = fetch('blah')
//## futureData.then(display);
//## console.log("Me First!");
//_________________________________

// Explanation
// futureData will contain the value:... and onfulfilled:[]<-returns empty array (because fetch returns that info)
// futureData when the data has been retrieved from the Browser Features section, on completion it will set the Promise Object value into what was retreived.
// Then futureData.then(display) will actually pass a function into the Promise Object's onfulfilled array.
// HOWEVER REMEMBER:
// when we call the fetch, it will go to browser features and saved to object. But when we add the futureData.then(display) it will add it on the normal call stack.
// when the fetch feature gets called and COMPLETED and returns the info it got from fetch, it will store on the futureData.value and then CALL the onfufilled FUNCTIOn automatically.
// Its input will then be the value the promise object just obtained.

// Rules by Which our promise-deferred functionality runs by

//`````````````````````````````````````````````````````````
// Any code we return from the fetch must be saved on promise object, adding useing .htne to the hidden proproety onfulfilment
// Promise objects will AUTOMATICALLY trigger the attached function to run with its input being the returned data

//EXAMPLE

//_________________________________
//## function display(data){console.log(data)}
//## function printHello(){console.log("Hello");}
//## function blockFor300ms(){/**blocks js thread for 300ms}
//## setTimeout(printHello, 0);

//## const futureData = fetch('https://twitter.com/will/tweets/1')
//## futureData.then(display)
//## blockFor300ms()
//## console.log("Me First")
//_________________________________

// EXPLANATION
// Basically Promises work just like normal browser features, however promises enter into the Microtask Queue instead of the
// callback queue, in which the microtask gets called first before the callback queue. So it waits until the whole global stack finishes
// and then calls the microtask and then the callback.

// Promises also have onRejection array which holds functions as well as onFulfilment.
// When we interact with network stuff you get error functions - onRejection handles those errors by logging that error, if error occurs, it will trigger any functions
// on onRejection
//
// use futureData.catch() <- enters into onRejection


//``````````````````````````````````````````````````````````````````````````````````````````````````````````
// CLASSES & PROTOTYPES 
//``````````````````````````````````````````````````````````````````````````````````````````````````````````
//
// Inefficent:

//_________________________________
// function userCreator(name,score){
//    const newUser = {};
//    newUser.name = name;
//    newUser.score = score;
//    newUser.increment = function() {
//        newUser.score++;
//    };
//    return newUser;
// };

// const user1 = userCreator("Will",3);
// const user2 = userCreator("Tim",5);
// user1.increment;
//_________________________________
// We can generate objects using a function however we have to understand that this method is not efficient nor practical because each object...
//...will have the same function copied over for all objects when really we only need 1 over the whole application and if we wanted to add another function...
//...we would have to add it to every single object that pertains to that type.
// Anyways back the example, when we store the "userCreator return value" into the new variable, we will notice how the function increment will have a BACKPACK or CLOSURE
// because the function increment originally is pointing to a "newUser" and in this case global memory doesn't have that variable, so the closure will actually get the user object that was
// created inside userCreator() and in this case its referring to the new variable(user1) we created!
 
// The solution to this problem is to find the function not into the objects, but rather a link to the function store object to access that one function. you do this by doing to 
// Object.create() function

// Efficient

//_________________________________
//## function userCreator(name,score){
//##     const newUser = Object.create(userFunctionStore);
//##     newUser.name = name;
//##     newUser.score = score;
//##     newUser.increment = function() {
//##         newUser.score++;
//##     };
//##     return newUser;
//## };

//## const userFunctionStore = {
//##   increment: function(){this.score++;},
//##   login: function(){console.log("Logged in");}
//## };

//## const user1 = userCreator("Will",3);
//## const user2 = userCreator("Tim",5);
//## user1.hasOwnProperty('score')
//_________________________________

// Explanation
// When we use Object.create, the object (user1) will actually have a hidden property called __proto__ which LINKS to the function found in the userFUnctionStore().
// Which should contain the function increment and login.
// Cool thing about js is that when a function is called from an object that function will have an implicit parameter (this) which is called this which will contain the object it came from
// Object prototype are going to be available to all objects. Each Objet will link to the Object Prototype in which one of its functions is hasOwnProperty.
// So it goes from user1.hasOwnProperty('score') to user1 in global memory, then it moves to userFunctionstore, then it moves to Object prototype to access that method.
// ````````````````````````````````````````````````````````````````````````````````````


// Imagine we replace userFunctionStore with this:
//_________________________________
//## const userFunctionStore = {
//##   increment: function(){
//##      function add1(){ this.score++;}
//##      add1()
//##}
//## };
//_________________________________

// When we run userFunctionStore, the increment function will contain:this:user1 and add1(), and when we run add1() its this: property will be empty and it will be undefined because it refers to global.
// So in this case add1() will not be able to find this.
// So in order for us to call add1(this) with the .this (the user1) it will need to be add1.call()
// Updated
// Imagine we replace userFunctionStore with this:

//_________________________________
//## const userFunctionStore = {
//##   increment: function(){
//##      function add1(){ this.score++;}
//##      add1.call(this)
//##}
//## };
//_________________________________

// this will contain user1 and it will work this time
//
// The => actually overrides the normal this rules so instead of having to .call(this) we can declare the function as

//_________________________________
//## const add1 = () => { this.score++; }
//## add1()
//_________________________________

// Due to the arrow functions Lexiscally scope, we know that it comes from the parent function and thus carries (.this)
//..
//..
// however what if we set the increment function itself as a arrow function.
// If we ran it, would the .this be determined by where it was being run, or where it was stored?
// if it was determined by where it was being run
// the .this would actually point then it would grab from the scope/object that it came from
// if it was determined by where it was stored(which is actually the answer and not the solution we want) it would be from where it was stored which would come from global which is something we dont want.
// since we want to have user object attached to the .this we want a normal function rather than the arrow function in this case.
// WE DONT WANT TO INCLUDE THE ARROW FUNCTIONS ON OUR METHODS ON OBJECTS but for the functions inside of those functions you can add the arrow to point to what you want.

// This solution is super sophisticated but not standard.

// ``````````````````````````````````````````````````````
// That is why we should use for now "new"
// ````````````````````````````````````````````````````

//_________________________________
//## function userCreator(name,score){
//##   this.name = name;
//##   this.score = score;
//## };

//## userCreator.prototype; //just showing that proto is empty []
//## userCreator.porototype.increment = function(){ this.score++ };
//## const user1 = new userCreator("Will", 3);
//_________________________________

// Above code is actually so much more easier than all the rest
// We dont have to return the object in userCreator
// Its going to set the proto type for us already
// We don't have to keep track of the prototype anymore just assign it

//* All functions are both objects and functions so you can add a .(name) = 5 to a function for example
//SMALL EXAMPLE BELOW

//_________________________________
//## function add(num){return num*2}
//## add.stored = 5
//## add(5) //10
//## add.stored //5
//_________________________________

// as long as we don't use the paranthesis, it will act as an object.
// all functions have prototype (the name of this prototype is just 'prototype') but the default is an empty function.
// So in the function userCreator:
// We added a new .prototype object into userCreator and then add another object .increment that will equal to its declared function.
// the .prototype is just a property that is an empty object.

//The new keyword allows us to insert the auto created object(that contains the values like name and score) inside the userCreator function's prototype default object.
//SUMMARY: use new keyword so that the newly created auto-object gets returned from the function and since that function has a default prototype we add the function so every user... 
//...is able to access(make sure use .this) it as the new keyword links all those objects to the function userCreator prototype.
//Keyword Example (again)
//_________________________________
//## function userCreator(name,score){
//##   this.name = name;
//##   this.score = score;
//## };

//## userCreator.prototype; //just showing that proto is empty []
//## userCreator.porototype.increment = function(){ this.score++ };
//## const user1 = new userCreator("Will", 3);
//_________________________________
//We know that when we use "new" keyword, we actually auto-create a new object which will be referenced by the this. found in the function userCreator()
//When we create this object, we want to make sure that this newly created object will link to the function prototype so WE KNOW THAT THE OBJECT...
//...HAS ITS OWN __PROTO__ which will then link to the prototype object found in userCreator().
//STEP by STEP Layman Instructions of what happens with 'new' keyword.
//1. initialize this: create function userCreator()
//2.set __proto__ : userCreator.prototype.(ObjectFunction) <-just comes from the new keyword
//3.this: new userCreator()<- pass the parameters inside object .this
//4.Return .this

//````````````````````````````````````````````````
//class keyword
//````````````````````````````````````````````````
//
//Solution 4: The class 'syntactic sugar'
//We're writing our shared methods separately from our object 'constructor' as we have function linked to the 
//Other languages let us do this all on one place which is CLASS
// class UserCreator {
//     constructor(name,score){
//         this.name = name;
//         this.score = score;
//     }
//     increment (){this.score++;}
//     login () {console.log("login");}
// }
// const user1 = new UserCreator("Eva",9);
// user1.increment();
//Explanation
//Constructor becomes the default function from the class userCreator
//The prototype are just the functioned bundled under the class.