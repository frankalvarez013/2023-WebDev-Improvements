alert("Hello World!");

let message;

message = 'Hello';
let message1 = 'Hello!';

let uuser = 'John',
    age = 25,
    message2 = "Hello?";

    //
        //message = 12;
//Cannot Declare a variable twice
//let message = ....let message = ....

// That’s because JavaScript does not assume a semicolon before square brackets [...]. So, the code in the last example is treated as a single statement.

// Here’s how the engine sees it:

// alert("Hello")[1, 2].forEach(alert);
//----------------------------------------------------------------------------------------------------
// Why do we need an operator that throws away everything except the last expression?

// Sometimes, people use it in more complex constructs to put several actions in one line.

// For example:
// three operations in one line
// for (a = 1, b = 3, c = a * b; a < 10; a++) {
//     ...
//    }

// "" + 1 + 0 = "10" // (1)
// "" - 1 + 0 = -1 // (2)
// true + false = 1
// 6 / "3" = 2
// "2" * "3" = 6
// 4 + 5 + "px" = "9px"
// "$" + 4 + 5 = "$45"
// "4" - 2 = 2
// "4px" - 2 = NaN
// "  -9  " + 5 = "  -9  5" // (3)
// "  -9  " - 5 = -14 // (4)
// null + 1 = 1 // (5)
// undefined + 1 = NaN // (6)
// " \t \n" - 2 = -2 // (7)
//---------------------------
//AND, JS HINT: && will return the first False value and ignore the rest, if all values are true returns the last true value
//OR, JS HINT: ||  if all values are false returns the last value, will return the first True value
//IF, ELSE, JS HINT: ? "let result = condition ? value1: value 2;" If value1 meets condition return it, otherwise value 2
// The nullish coalescing operator ?? provides a short way to choose the first “defined” value from a list.
// ?? "a ?? b" if a is defined, then a, if a isn't defined then b. ?? returns the first argument if its not null/undefined.
// Example---------------
// let height = 0;
// alert(height || 100); // 100
// alert(height ?? 100); // 0
//End of Example---------
//if (!value) break; // (*) <- GTFO of the loop
//if (i % 2 == 0) continue; <- SKip a turn
//outer: for (let i = 0; i < 3; i++) {...
    //for loops{...
//...if (!input) break outer; // (*) <- GTFO ALL THE LOOPS
//-------------------------------------------------------------
//let sum = (a, b) => {  // the curly brace opens a multiline function
//  let result = a + b;
//  return result; // if we use curly braces, then we need an explicit "return"
//};
//alert( sum(1, 2) ); // 3
//alert( sum(1,2)) -> actually creates not only the number 3 but also a prototype so that