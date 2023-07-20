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