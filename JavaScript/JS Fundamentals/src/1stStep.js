const js = {
    name: "JavaScript",
    abbreviation: "JS",
    isAwesome: true,
    officialSpec: "ECMAScript",
}

js.snack = "chips"  //you can declare a new object if you wanna add it -- MUTABLE

//TIP BELOW
//````````````````````
//JS > Operator > this

//TIP BELOW
//````````````````````
//Strings are primitive values(not objects)
//But JS automatically wrapts them in String objects
// JS> Standard built-in objects > String

js.snack.toUpperCase() //Strings are immutable so that means that the value wont change automatically --IMMUTABLE

//DOM Exercise

//const statement = docuement.getElementById("statement")
//document.querySelector("#options") <- Gets the Div
//document.querySelector(#options).children <- Gets the Buttons
//document.querySelectorAll("buttons") <- Gets the Buttons
//document.querySelectorAll("#options buttons") <- Gets the Buttons within the options div

const fact = {
    statement: "Arrays are like objects",
    answer: true,
    explanation: "Arrays are a kind of object with special properties"
};
//if you notice the properties inside the object (parameters) are strings when looking at the console. Because you can set the parameters as any name JS needs to call them
//you can access the values by doing fact["My long Property Name"] while doing this fact.My Long Property Name - will give us an error

//TODO set the text of the statement element to the fact's statement
//statement.textContent = fact.statement

//FUNCTIONS//``````````````````````````````````````````
// function(Params){return 0}

//TIP BELOW//``````````````````````````````
//typeof NaN <- NaN is a "number"
//*if parameter is asking for a number and you call it, it wont throw out errors
//*If you pass a value thru functions that it doesnt need (say parameter is empty and not needed) the function will still run

//TIP BELOW//``````````````````````````````
//If you set a variable equal to a function call that doesnt return anything - it will execute whatever is inside the function but the variable will be undefined

//function expression assigned to a variable - ANONYMOUS FUNCTION
//const yell = function (saying) { return saying.toUpperCase();}

//Arrow Functions
// the => allows us to create an unmaed function without much code
// const add = (x, y) => x + y;
// function add(x,y) { return x + y};

// function square(x) {return x*x};
// const square = (x) => x*x;
// x => x*x
// you don't need parantheses above - , FOR MULTIPLE PARAMETERS, PARANTHESES ARE REQUIRED************

//TIP BELOW`````````````````````````````````
// const addAndLog = (x,y) => {}
// const addAndLog(x,y){ }
// "This" keyword is what seperates the differences between the two statements above as each function types react differently

//TIP BELOW`````````````````````````````````
// let feeling = "free"
// function trap() {feeling="boxedIn";}
// trap()
// console.log(feeling)

//VAR**
//var newVariable = "hello" <- value = hello
//newVariable = "goodbye" <-value = goodbye
//function messWith(){newVariable="messed"} <- value = messed
// { var newVariable = "more messed"; } <- value = more messed!!

//LET
// let newVar = "goodbye" <-value = goodbye
//function messWith(){newVar="messed"} <- value = messed
// { var newVar = "more messed"; } <- value = messed!!

//EVENT LISTENER
//trueButton.addEventListener("click", (event) -> {
//  trueButton.textContent = trueButton.textContent.toUpperCase();
//});

//If Statement
// let mood = forecast === "sunny" ? "happy" : "sad";
// f

//For Loop 
// for (let n of numbers){console.log(n)}

//TIP BELOW ``````````````````````````````
//Line below uses javascript ${}
// s => `${s.nickname} Spice`;
// s=> s.nickname + " Spice";

//SPREAD
// const oldBurns = ["square", "wack"]
// const newBurns = ["basic", "dusty", "sus"]
// const burnBook = [...oldBurns,...newBurns] <-Equivalent to burnBook = oldBurns.concat(newBurns)
// or
// use it to pass items from an array as arguments to a function or method
// const skills = ["HTML", "CSS", "JS"]
// const newSkills = ["React", "TypeScript", "Node"]
// skills.push(...newSkills);
// console.log(...skills);
// const [one, ...others] = [1,2,3,4]
// one = 1
// others = [2,3,4]


//DATA FETCHING & PROMISES``````````````````````
//setTimeout(()=> console.log("This will print third"),1000); 
//fetch("url")
//returns a Promise
// 3 possible states in a promise : pending, fulfilled, rejected <- Promises are asynchronous
// AWAIT
// let response = await fetch("URL");
// response.json() <- .json will convert it into an object - json is a asynchronous function so use await
// let body = await response.json() will be useful

//DESTRUCTURING OBJECTS AND ARRAYS
//````````````````````````````````````````````
// By "extracting" values from an object with their property names
// const spices = [{name: "Emma",nickname: "Baby"}]
// let {name1, nickname1} = spices[0];
// let {nickname} = spices[0]; <- Grabs the value in nickname and ignores the "name"
// OBJECT PROPERTIES IN JS ARE NOT ORDERED UNLIKE ARRAYS thats why when we grab the values from the objects the order will not depend just the name inside let {"name"} = extractThisVal
// let [ten,twenty] = [10,20,30,40]
// ten = 10; twenty = 20
// let [,,thirty] = [10,20,30,40]
// thirty = 30


//When we call await it only works in an async function
//We cant use await outside of function
// we can call it when youre defining it
// When we look at our script tag, its actually a <script type="module">

//MODULE SCOPE
// Modules create their own scope, when we try to access the breeds variable
// NORMAL JS SCRIPTS YOU CAN ACCESS THE VARIABLES OUTSIDE OF THE SCOPE
// JS MODULES YOU CAN'T ACCESS THE VARIABLES OUTSIDE OF THE SCOPE UNTIL YOU EXPORT & IMPORT
// EXPORT ALLOWS US TO ACCESS THOSE VALUES THRU IMPORT

// DEBUGGER
// Go into developer tools, go to debugger make sure that on the code where you want to pause, you type debugger or click on the line on the browser which creates a breackpoint

//TRY CATCH ERROR HANDLING
// thisThrowsAnError() <- throw an error
// try {
    //Call Method
// } catch (error) {
    //console.error("If Error",error)
// }

