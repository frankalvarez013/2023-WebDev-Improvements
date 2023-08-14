//``````````````````````````````````
// PRIMITIVE TYPES
//``````````````````````````````````
//  Types
//      1. undefined
//      2. string
//      3. number
//      4. boolean
//      5. object!
//      6. symbol
//      7. bigint
//      8. undeclared ? is this a type?
//      9. null?
//      10. function?!
//      11. array?!

//      *everything in JS is an object is FALSE, everything in JS CAN act as an object but they aren't
//      *The ones in ? are actually subtypes rather than a top level type
//      *The ones in ! are Objects, the rest are not objects
//      typeof() allows gaurantees string (with the string being the type)

//      1. typeof array <- "object", class is - "symbol"
//      2. typeof doesntExist <- returns "undefined"
//      3. type of functionName <- returns "function"
//          ****If you wanted to offset a number type you would use undefined
//          ****If you wanted to offset a object type you would use null <-reason null returns objects and is more of a historic bug that never got fixed because it would break a bunch of code.

//  UNDEFINED VS UNDECLARED VS UNINITIALIZED
//      undefined means there is a variable and at the moment it has no value
//      undeclared means it has never been created in any scope
//      uninitialized (aka TDZ) Another concept of emptiness/ variable that was never created and that its undeclared

//  NaN & isNaN
//      NaN means this special value that indicates an invalid number. when you create a Number("n/a") "n/a" is an ivalid number so it returns NaN
//      myAge - "my son's age"; //NaN
//      Nan === Nan //THIS will return false - its the only value that does not have an identity property...
//          ...So we use Number.isNaN(myCatsAge) //true
//      So NaN is a type of number - in other words - an Invalid Number

//  Negative Zero
//      Object.is() <- like the quadruple ==== to test for the -0
//      However the === doesn't account for NaN and -0 so Object.is() will need to take that into account

//``````````````````````````````````
// COERCION
//``````````````````````````````````
//  Abstract Operations
//      Type Converion === Coercion
//      TO PRIMITIVE ARE NOT ACTUAL FUNCTIONS JUST A WAY OF EXPLAINING WHATS INSIDE THE ENGINE
//      ToPrimitive(hint)
//          hint: "number" | hint:"string"
//              1.valueOf()  |    1.toString()
//              2.toString() |    2.valueOf()
//      This ToPrimitive will use a function depending on hint and will run both functions in order so that it can get a primitive. Since ToPrimitive is recursive it
//      will run multiple times(toPrimitive()) and do the same thing

//  ToString()
//  !!!!! not the same as toString()
//      Function Instructions:
//          KEEP IN MIND THIS IS JUST AN ABSTRACT WAY FOR YOU TO THINK ABOUT IT
//          NOTICE HOW ToPrimitive() CONTAINS STRING and not the OBJECT or TYPE.
//          1. ToString(Object): <- ToPrimitive(string): <- toString(Object) if no answer go to valueOf(Object)

//      Example:
//          ToString(primitiveNumber): ToPrimitive(hint:String): toString(primitiveNumber)
//              null        "null"
//              undefined   "undefined"
//              true        "true"  
//              false       "false"
//              3.14159     "3.14159"
//              0           "0"
//              -0          "0"

//      Example:
//          ToString(Array):ToPrimitive(string): toString(Array)

//          Arrays have a built in toString so it has a cerealized way of doing it... so no need to go to valueOf()
//              []                  ""
//              [1,2,3]             "1,2,3"
//              [null,undefined]    ","         <-*Rant:why does null and undefined show up in arrays as if they're unrepresented, but the array above shows the values??
//              [[[],[],[]],[]]     ",,,"

//      Example:
//          object Object <- small object and TAG so instead of Object you could change (meta programming) no need to change if you don't need to

//          ToString(Object)    
//              {}  "[object Object]"           <-*Rant:Why did they add square brackets for objects and put quotes on Array??!
//              {a:2}  "[object Object]"
//              {toString(){return "X";}} "X"

//  ToNumber()
//      Function Instructions:
//          1. ToNumber(object): <- ToPrimitive(number): <- valueOf() then toString()
//
//              //For Arrays and Objects, toNumber(Arr/Obj) moves to valueOf(Arr/Obj) AUTOMATICALLY RETURNS {.this} (so nothing happens) and automatically moves to toString()
//              //...so it doesn't matter if its passed thru valueOf() cuz...
//              //Numberfication of toNumber(Array/Object) is basically Stringification of it.
//          
//      Example:
//          toNumber(string): toPrimitive(hint:Number): valueOf(string)
//              ""          0
//              "0"         0
//              "-0"        -0
//              " 009 "     9
//              "."         NaN
//              "0xaf"      175
//              other primitives
//              false       0
//              true        1
//              null        0   <- Rant - Why isnt this NaN??
//              undefined   NaN <- Rant - Why is this ONLY NaN ??

//      Example:
//          toNumber(Array/Object) toPrimitive(hint:Number): valueOf(ArrayObject): toString(Array/Object)
//              [""]        0   //[""] becomes ""   so it starts again and calls toPrimitive() then valueOf() ""->0
//              ["0"]       0   //["0"] becomes "0"
//              [null]      0   //[null] becomes "" 
//              [undefined] 0   //[undefined] becomes ""
//              "{1,2,3}"   NaN //using toString becomes "[object Object]" then stuffed into valueOf() and returns NaN
//              [1,2,3]     NaN <-since {1,2,3} is an Object- then it automatically gets NaN BECAUSE toString({}) returns [object Object] which is NOT A valid NUMBER in valueOf() so its NaN
//              [[[]]]      0

//  ToBoolean() really just a look up it, IT HAS NO COERCION

//  + OPERATOR ON DIFFERENT TYPES CREATE COERCION AND THE + OPERATOR INVOKES THE ToString()!!!!!!
//      Example:
//          var numStudents = 16;
//          console.log(
//              'There are ${String(numStudents)} students. '
//          );
            //There are 16 students

//       Example:
//          function addAStudent(numStudents){
//              return numStudents + 1;     //"16" + 1
//          }
//          addAStudent(studentsInputElem.value);
//          161 OOPS

//       Example:
//          function addAStudent(numStudents){
//              return numStudents + 1;     //"16" + 1
//          }
//          addAStudent(
//              +studentsInputElem.value    //+ takes string into number
//          );
//          17
//          addAStudent(
//              Number(studentsInputElem.value)    //More proper way of doing the above function call
//          );
//          ******IF THE COERCION DOESN"T WORK LIKE IF AN EMPTY ARRAY POPS UP THE VALUE WILL BE 0 SINCE {} TO STRING IS 0

//  - OPERATOR ON DIFFERENT TYPES CREATE COERCION AND THE - OPERATOR INVOKES THE ToNumber()!!!!!!

//      Example:
//          function kickStudentOut(numStudents){
//              return numStudents - 1
//          }
//          kickStudentOut(
//              studentsInputElem.value //Since its a number alr, it will actually just minus
//          );
//      

//  Boolean Coercion
//      Example:
//            if (studentsInputElem.value){
//                numStudents = Number(studentsInputElem.value);
//            }
//            while(newStudents.length){
//                enrollStudent(newStudents.pop())
//            }
//              Here the coercion is telling us to convert the number INTO A BOOLEAN which we know is a look up thing so check if its truthy or falsy

//            while(newStudents.length > 0){
//                enrollStudent(newStudents.pop())
//            }
//              This is more semantic than the last while loop because its stating to continue until the value hits 0
//              Instead of the other coercion value which uses Boolean to check if its truthy.

//  A Case for Boolean Coercion
//      This usually works for Objects/undefined/and null values where Boolean will work more, however when it comes to numbers, strings, since they have so many corner cases, that implicit coercion
//      carries its own weight :(.

//  Boxing
//      Example
//          if (studentNameElem.value.length > 50) {console.log("Student's name too long.");}
//          How do we access a .length of a primitive string or number?
//          So how does it work that we get a method from a primitive value?
//          This is called boxing, its a FORM of coercion 
//          Its saying use it like an object, so JS automatically creates it for you in order for you to access that method.

//  Corner Cases
//      When two or more unusual operating circumstances happen to coincide
//      Example
//          Number ( "" ); //0
//          String ( -0 ); //0
//          Number ( [null] )
//
//  Root of All (Coercion) Evil
//      Example:
//          studentsInput.value = "";
//          Number(studentsInput.value);    //0
//          studentsInput.value = "       \t\n" //0
//      Example:
//          Number(true) // 1
//          Number(false) //0
//      
//          (3 > 2) > 1;
//          (true) > 1;
//          1 > 1;      //false!!!

//```````````````````````````````````````````````````````````````````
// Equality
//```````````````````````````````````````````````````````````````````
//  Double & Triple Equals

//      1.If type(x) same as type(y) then return x === y
//      Type and value are not indicators of distinguishable values for == and ===
//      Example
//          var studentName1 = "Frank"
//          var studentName2 = "${studentName1}"
//          console.log(studentName1 == studentName2)   //  true
//          console.log(studentName1 === studentName2)  //  true
//          When types match - do the triple equals

//      strict equality vs loose equality means whether or not we are allowing coercion to be.

//  Coercive Equality

//      2. if x is null and y is undefined vice versa return true
//      == allows coercion when types are different
//      === disallow coercion when types are the same (compares two objects and it wont run unless they point or reference to the same object)

//      Example
//          var workshop1 = { topic: null};
//          var workshop2 = {};

//          if(
//              workshop1.topic == null && workshop2.topic == null
//          ) {
//              // ..
//          }


//  Double Equals Algorithm

//      3. IF Type(x) is Number and Type(y) is String compare x == ! ToNumber(y)
//      After the first rules is applied and second rule is applied (type == then ===) then check null THEN
//      If type is Number and other type is string - return the result of toNumber() from both vars and compare
//      Example
//          var workshopEnrollment = 16;
//          var workshopEnrollment2 = workshop2Elem.value;
//          if (Number(workshopEnrollment1) === Number(workshopEnrollment2)){
//
//          }
//          if(workshopEnrollment1 == workshopEnrollment2){
//
//          }
//
//      4. if type(x) are either string, number, symbol and type(y) is object compare x == ToPrimitive(y)
//      
//      Example
            // var workshop1Count = 42;
            // var workshop2Count = [42];

            // if(workshop1Count == workshop2Count){
            //     //true
            // }
//      This shouldn't work BUT IT DOES. because of the array stringification and only accidentally working because it only stringifies the 42 and doesn't have additional numbers cuz then it
//      would be like 42,1 if it had another value
//      Explanation ->Primitive() (42 == "42") ->Primitive() (42 === 42) goes into triple equals cuz of Rule 1.

//!!!!!!!!!!!!!!!!!!!!!!!!!
//If the types are the same: ===
//If null or undefined: equal
//If non-primitives: ToPrimitive
//Prefer: ToNumber

//The Corner Cases:
//      Example
//          [] == ![]; //This says true this is a false constract never compare the value of the negation of itself
//              [] == false -> "" == false -> 0 == false -> 0 === 0 -> true!
//          [] !- []
//              workshop != workshop2 -> !(workshop == workshop2) -> !(false) ->  true 

//AVOID using ==
// 1. == when either side can become 0 or "" (or even " ")
// 2. == with non-primitives
// 3. == true or == false: allow ToBoolean or use ===

//The case for preferring ==
// == is NOT about comparisons with unkown types, DONT USE IT WHEN YOU DON"T KNOW THE TYPES
// == is about comparisons with known type(s), optionally where conversions are helpful.
// if both types are the same, == is identical to ===
// Using === would be unnecessary so prefer the shorter ==
// if the types are different, the equivalent of == would be two so don't do it urself since JS will be able to do it.
// IF YOU DON"T KNOW THE TYPES USE ===


//```````````````````````````````````````````````
//TypeScript
//```````````````````````````````````````````````
//
// TypeScript & FLow
//  Benefits
//      1. Catch type-related mistackes
//      2. Communicate type intent
//      3. Provide IDE feedback
//
//  Caveats
//      1. Inferencing is best-guess, not a guarantee. We are guessing something at compile time, we are not sure at run time
//      2. Annotations are optionals, Devs might not put into it, it will give an any time so you have to be very aware of whats going on.
//      3. Any part of the application that isn't typed introduces uncertainty
//  Examples
        // var teacher: string = "Kyle";
        // var teacher = "Kyle";
        // teacher = { name: "Kyle" }; //Error: can't assign object to string

        //  Custom Typing (student)
        //  type student = {name: string};
        //  function getName(studentRec: student): string {
        //     return studentRec.name;
        //  }
        // var firstStudent: student = {name: "Frank"};
        // var firstStudentName: string = getName(firstStudent);
//
//  Validating Operand Types
        //  var studentName: string = "Frank";
        //  var studentCount: number = 16 - studentName; //Error: can't subtract string;

//  Pros:
//      They make types more obvious in code
//      Familiarity: they look like other language's type systems
//      Extremely popular these days
//      They're very sophisticated and good at what they do
//  Cons:
//      They use "non-JS-standard" syntax (or code comments)
//      They require* a build process, which raises the barrier to entry
//      Their sophistication can be intimidating to those without prior formal types experience
//      They focus more on "static types" (Containers that they must always have one type which isn't what JS is about) than value types.

//  Javascript has adynamic type system which uses various forms of coercion for value type conversion including equality comparisons

//````````````````````````````````````````````````````````````
//Scope
//````````````````````````````````````````````````````````````
// JS is a Compiled Language or parsed or a processing.
// We discover the source position at complie time but we don't use that information until run time
// There is a processing and execution of a JS engine aligning yourself to two different stages.
// One stage where we figure out all the scopes, all the buckest, all the marbles,
// Second stage where we use all that information to execute the code.

// "use strict";
// ReferenceErrors will show up when using Strict Mode. Its different from valueError because reference is asking for a source that isn't there.
// Undefined means its declared but never given a value
// Undeclared means its not declared in any scope we have access to.

//`````````````````````````````````````````````````````````````
//Scope & Function Expressions
//`````````````````````````````````````````````````````````````
//
// function teacher () {/* */}
// var myTeacher = function anotherTeacher(){console.log(anotherTeacher)}
// Teacher is in global scope source
// myTeacher is in golbal scope source
// function anotherTeacher is in myTeacher variable source

// Advanced Scope
//      var teacher = "Kyle";
//      var teacher = "Suzy";
//      They both use the same name in the same scope. Use a function to be able to remove name collision.
//      Example -
//              function anotherTeacher(){console.log("Teacher")};
//              (anotherTeacher) (); //Gets the value inside parantheses and then the second set of parenthesis will be able to call it.

//      why don't we just add the parantheses around the function declaration and do the same thing we did on line 374 so that we can call it on declaration? Yes you can!!

//      (function anotherTeacher(){console.log("Teacher")})(); This is called IIFE (immediately-invoked-function-expression)
//      HOWEVER THIS IS NOT A FUNCTION DECLARATION BECAUSE of the () is the first thing it reads
// Var
//      Var is used for the entirety of the scope in the function
//      Let us used only for that portion of the code(couple lines of code)
//      VAR HOISTS - attaches itself to the function scope.

//
//      function lookupRecord(searchStr){
//              try{
//                      var id = getRecord( searchStr );
//              }
//              catch (err){
//                      var id = -1
//              }
//              return id;
//              }
//      function above shows how var can be used. You can also redeclare the variable if you want to specify to the reader where you want to use in a scope (so its more behavioural)

//      function formatStr(str){
//      {
//         let prefix, rest;
//         prefix = str.slice(0,3);
//         rest = str.slice( 3 );
//         str = prefix.toUpperCase() + rest;
//      }
//      if (/^FOO:/.test(str)){
//         return str;
//      }
//      return str.slice( 4 );
//      }
//      function above shows how if you have a variable that only exists for a couple of lines to create a scope. In this case we create prefix and rest to just modify variable str.
//      this means that they only exist and only used within the limits of the scope and don't exist anywhere else within the function.


//  CONST
//      CONST means semantic meaning as placeholders!!! Just a special Name
//      CONST - means a thing that doesn't change. HOWEVER THATS NOT WHAT IT REALLY MEANS.
//      Make sure that Const variable is set up as a whole digit when creating
//      For the rest of this block it will not get reassigned. CONST
//      For arrays and objects just do deep freeze? (object.freeze) a shallow read only.


//  HOISTING
//      --English language convention for lexiscal scoping.
//      Magically looked ahead at all the definitions and moves them to the top of the function scope. However this doesn't happen. Very sophisticated and fancy process that does this which is (parsing)
//      Shorthand to describe something that is pretty complex and hard to explain.
//      FUNCTIONS assigned to variables have to be placed before the variable declaration.
//      Example
                // function teacher(){
                //         return "Kyle";
                // }
                // var otherTeacher;

                // teacher(); //Kyle
                // otherTeacher(); //TypeError

                // otherTeacher = function(){
                //         return "Suzy";
                // }
        var teacher = "Kyle";
        otherTeacher();

        function otherTeacher(){
                console.log(teacher);   //IN THIS CASE SINCE WE ARE HOISTING OR CALLING THE FUNCTION BEFORE THE CALL WE ALSo HOIST the var teacher line below into undefined. But we will get back a 
                //                        undefined because it still hasn't been defined up until the second call.
                var teacher = "Suzy";
        }

// LET DOESN"T HOIST
//      Let does Hoist however it is not declared(so let is uninitialized) unlike a var which when hoisted will be undefined which is why we get a TDZ error(for let)
//      Reason why let has a different behavior because CONST initialized itself to undefined and line one of that scope you console.log that const and later on that block you saw it with the value of 42.
//      CONST shouldn't have that behavior of having two different values so they invented TDZ error to remove that feature so you can't access a value before it was undeclared/uninitialized.
//      **Declarative Code will be hoisted, not executable code so just anything that has a name.

//`````````````````````````````
// Closure
//`````````````````````````````
//      Solid Definition
//              Closure is when a function "remembers its lexical scope even when the function is executed outside that lexical scope"
//

//EX:1
function ask(question){
        setTimeout(function waitASec(){
                console.log(question);  //By the time waitASec() gets called, the ask question already finished so we know that waitASec() held onto the variable question using closure to memorize.
        }, 100);
}
ask("What is closure");

//Closure is preserving access to a variable. Closure will only capture the variables value when it was initialized.

//EX:2
var teacher = "Kyle";
var myTeacher = function(){
        console.log(teacher);
};
teacher = "Suzy";
myTeacher();    //prints out Kyle

//EX:3
for(var i = 1; i <= 3; i++){
        setTimeout(function(){
                console.log('i: ${i}'); //The reason i will be 4 every time is because the closure only ends until the end of the for loop and since i is a var it will only capture 4.
        }, i * 1000);
}
// i : 4
// i : 4
// i : 4
//The solution would be to make let i = 1;
//**** Let(creates multiple) in example is created every single time, Var(only one) just redeclares it, keeps the memory.

//Modules
        var workshop = {        //Module putting set of functions and data and putting them inside an object putting them as porperties instead of variables
                teacher: "Kyle",
                ask(question){
                        console.log(teacher,question);
                },
        };
        workshop.ask("Is this a module?");
        //THIS IS NOT A MODULE needs encapsulation needs hiding data and behavior!!!!! Things that are public and private.

        var workshop = (function Module(teacher){
                var publicAPI = {ask, };
                return publicAPI;

                function ask(question){
                        console.log(teacher,question);
                }
        })("Kyle");

        workshop.ask("Its a module, right?");   //The ask question in this case is like a singleton because the Kyle call expression of the ask function will actually keep the kyle private.

        function WorkshopModule(teacher){
                var publicAPI = {ask, };
                return publicAPI;
                
                function ask(question){
                        console.log(teacher, question);
                }
        };

        var workshop = WorkshopModule("Kyle");
        workshop.ask("Its a module, right?")    //We effectively created a factory functions. workshop module  factory function
        //      (take some behavior and data that that behavior operates on, and encapsulate it into a data structure. )