//Javascript: The New Hard Parts
//Foundations of JS

    //Intro & Schedule
        //Async JS (Callbacks, Promises)
        //Iterators
        //Generators & Async Await

    //Async JS
        //JS is single threaded model
        //Add Complementary Model to include asynchroncity.

    //API
        //setTimeOut Example
            //setTimeout(printHello,1000)
            //setTimeout will send itself to the web browser features where it will contain a timer, Complete, and OnCompletion
            //Once timer finishes, it will set itself as complete (the features constantly checks if something is complete), once its complete it will move whatever is inside(callback)
            //which is printHello and then send it to the call stack() after the global context has been finished.
        //Pros 
            //Super Explicit
        //Cons
            //Only Available in the callback function - Callback hell
            //Maybe

    //Promises
        //Introducing Promises
            // Special objects built into JS when we make a call to a web browser API thats set up to return promises
            //Promises do two things. They get started in the API(web browser) and ON JS its going to produce a special object thats returned immediately
            //Steps
                //When we call fetch, it auto. returns an empty PROMISE. Once oncompletion, on the web browser, it will fill in that promise immediately.

        //Promises
            //Solution 3: Example
                function display(data){
                    console.log(data);
                }
                const futureData = fetch(`URL`);    //Fetch returns data: When sent to the Web Browser its the XHR: XML is the format of the data it will get from the internet. HTTP is the rules of how we can get the data. Request is get data
                futureData.then(display);   //then fills the onfulfillment array on futureData
                console.log("Me First!");

                //Explanation: 
                //  Function fetch creates an execution context?? NO!! fetch is a facade function.
                //  FutureData is the return value of fetch
                //  Unlike setTimeout, fetch will actually do stuff before in jS!
                //  it will return an object with a property on it {value: undefined} value is where the return of fetch is.
                //  this object will have an onfulfillment:[function(data),function2(data)] These functions will trigger when the promise has been completed.
                //  Why do we do this? Since we don't know when the functions/promise will come back we can't on our global context estimate when the object gets finished.
                //  The only place I know when the value is absolutely filled is when we add to the .then(function())
                //  onCompletion (web browser feature) it will fill in the value of futureData.

                //Result:
                    //1. console.log('Me First!');
                    //2. console.log('hi'); //Because it takes a while to send all the stuff.

        //Promises & Microtask Queue
            //Example
                function display(data){console.log(data)}
                function printHello(){console.log("Hello")}
                function blockFor300ms(){/* blocks js thread for 300ms with long for loop */}

                setTimeout(printHello,0);

                const futureData1 = fetch('URL');
                futureData1.then(display);

                blockFor300ms()

                //Which will run first?

                console.log("Me First!");
            //Result:
                //setTimeout on web browser features/api.
                //on completion it will be on the callbackqueue.
                //fetch will create an empty promise and then moved into web browser feature (xhr) to get the data
                //We call block for 300ms which will still wiat for the onCompletion of futureData1.
                //Once onCompletion is finished it will return the promise and the onfulfillment methods into the Microtask Queue.
                //In this Microtask Queue, it will actually be called BEFORE the callbackqueue gets called after the global context has been finished.
                //So way the contexts are done are thru (Call Stack (Global Context) first) (microtask Queue Second) (callback Queue Third)
    //Iterators
        //Return Function Inside a Function
            //Iterators
                //Thoughts
                    //When Coding: Taking data storing it- functionality - apply that data
                    //Data is usually in a list: a collection of data
                    //Getting that data is a task in it of itself
                    //Using a for loop is not really a nice way of getting the data because its kind of static, very manual.
                    //Having a stream would be nice like just getting the next element of the array.
                //Example:
                    for (let i = 0; i < numbers.length; i++){
                        console.log(numbers[i]);
                    }
                    //This is the more traditional way of getting information.
                //Two parts to applying functions to collections of data
                    //The process of accessing each element
                    //What we want to do to each element.
                //Solution
                    //Iterators automate the accessing of each element. Makes our code more readable and more functional.
                //Example: RECAP - CLOSURE
                    function createNewFunction(){
                        function add2(num){
                            return num+2;
                        }
                        return add2;
                    }
                    const newFunction = createNewFunction();
                    const result = newFunction(3);  //Its not called add2, just newFunction. It removes the instance of the createNewFunction()
                    //How can we run/call add2 now? Outside of createNewFunction? Call newFunction
                //Example
                    function createFunction(array){
                        let i = 0;
                        function inner(){
                            const element = array[i];
                            i++;
                            return element;
                        }
                        return inner;
                    }
                    const returnNextElement = createFunction([3,4,5]);
                    //How can we access the first element of our list?
                    const element1 = returnNextElement();   //3
                    const element2 = returnNextElement();   //4
    //Generators
        //Generators
            //JS built in iterators are actually objects with a next method that when called returnes the next element
            //Example: Iterators
                function createFlow(array){
                    let i = 0;
                    const inner = {
                        next: function(){           //Produce an object with a value:, and a done: false or true
                            const element = array[i];
                            i++;
                            return element;
                        }
                    }
                    return inner;
                }
                const returnNextElement1 = createFlow([4,5,6]);
                const element12 = returnNextElement1.next() //4.... If it was the built-in iterator - {value: 4, done:false}

        //Generator Functions with Dynamic Data

            //Example: Generators
            function *createFlow(){ //returns intermediate values (This is a Generator)
                yield 4;
                yield 5;
                yield 6;
            }
            const returnNextElement2 = createFlow();    //createFlow() returns an object with a next()
            const element13 = returnNextElement.next(); //will call createFlow() (where next() CAME FROM!!!!) Kinda weird since createFlow was removed. Just suspending the execution context of createFlow
                                                        //grabs the first yield value will become the result of the element, and iterate to the next one once the next() is called again.
            
            //Example: Dynamic
                function *createFlow(){
                    const num = 10;
                    const newNum = yield num;
                    yield 5 + newNum;
                    yield 6;
                }
                const returnNextElement3 = createFlow()  //Object with property of next {next: function()}
                const element14 = returnNextElement.next(); //10 -> opens createFlow() and will create a const num = 10; Next line (Since yield is such a powerful keyword)
                //                                                  It will actually just return the value 10 and exit, leaving newNum to become undefined!!!
                const element24 = returnNextElement.next(2); //7 -> Then it returns to createFlow() and REMEMBER we left when yield was invoked. Whatever we pass into the .next() it will become
                //                                                  is going to be the evaluated result of the yield expression. Remember yield needed a return and that comes from the parameter!
                //                                                  You now store it into newNum, and go to the next line and then we do yield 5+ 2 which will be 7.
                //!!!!!!!!!!IMPORTANT
                // IN THE RETURNNEXTELEMENT OBJECT that contains the property of next {next: function()} we are also holding the proto(closure) which contains the value of num, newNum ANND
                // THE POSITION WE WERE IN CREATEFLOW

            // Introducing Async Generators
                //Remembers generators are just like iterators, they have a flow with the yield keyword and we are able to suspend the code while running it.
                //*We can use the ability to pause createFlow's running and then restart it only when our data returns.
                //Example: THIS IS BASICALLY ASYNC FUNCTION AWAIT
                    function doWhenDataReceived(value){
                        returnNextElement.next(value);
                    }
                    function* createFlow(){
                        const data = yield fetch('URL');    // remember data will be undefined cuz of yield and yield will return the fetch result which is an empty promise
                        console.log(data);
                    }
                    const returnNextElement4 = createFlow();
                    const futureData2 = returnNextElement.next();   //Creates createFlow function, function will return an empty promise
                    
                    futureData.then(doWhenDataReceived);    //attaches a function to the onFufilled array of functions that comes from the Empty Promise Object
                    //Explanation:
                        //We get to control when we return back to createFlow and continue executing - by setting up the trigger to do so
                        //(returnNextElement.next()) to be run by our function that was triggered by the promise resolution (when the value returned from twitter)

                        //Remember the fetch will be sent thru xhr which will be on web brwoser features. Once its onCompletion it will send itself to microtask Queue
                        //Then once the event loop finished, it will move the doWhenDataReceivbed method will then be sent to the call stack and be called
                        //In this case the data will be 'hi' that came from the xhr.
                        // It will then call returnNextElement which will call createFlow and be initiated to data. and then it will call the next line console.log(data).
        //Final
            //Async Await
                //Async/await simplifies all this and finally fixes the inversion of control problem of callbacks
                //The example above has a lot of complexity once you really get into it and its better with this new concept which is async/await
                    //Example: Async
                        async function createFlow(){
                            console.log('Me First');    
                            const data = await fetch('URL');
                            console.log(data);
                        }
                        createFlow();
                        console.log("Me Second!");
                        //Explanation:
                            //We will invoke createFlow()
                            //we then console.log('Me First');
                            //fetch will return an empty promise and then call the xhr thru web browser features
                            // await will get us out of the create flow function (kinda like yield!) and then the console.log("Me Second!") will be called.
                            // Once we finished the event loop we get the microtask queue which has the fetch url. and then it will return the promise with the filled data.
                            // await will yield this result and be initialized to data.
                            // then we call console.log(data).
                    //this is a cleaned up version of the generator
