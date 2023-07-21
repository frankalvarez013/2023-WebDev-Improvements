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