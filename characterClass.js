// let’s find the first digit in the phone number:

let str = "+7(903)-123-45-67";
let regexp = /\d/; // "\d" is used for selecting the digits and return first digit
alert( str.match(regexp) ); // ["7"]
//------------------------------------------------------------------------------------------

// g flag to find all digits:
let str = "+7(903)-123-45-67";
let regexp = /\d/g; // "\d" ,  g used fo return all matching digits
alert( str.match(regexp) ); // ["7", "9", "0", "3", "1", "2", "3", "4", "5", "6", "7"]

// let's make the digits-only phone number of them:
console.log( str.match(regexp).join('') ); // 79031234567

//-----------------------OR---------------------------------
let str = "+7(903)-123-45-67";

console.log( str.match(/\D/g) ); //["+", "(", ")", "-", "-", "-"]

console.log( str.replace(/\D/g, "") ); ///D is used for non-digits


//A regexp may contain both regular symbols and character classes.
let str = "Is there HTML5?";
let regexp = /HTML\d/

console.log( str.match(regexp) ); // HTML5

console.log( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
console.log( "I love HTML5!".match(/\w/) ); // ["I"]
console.log( "I love HTML5!".match(/\w\w\w\w/) ); //["love"]
console.log( "I love HTML5!".match(/\w\w\w\w/g) );  //["love", "HTML"]
console.log( "I love HTML5!".match(/\w\w\w\w\d/) ); //["HTML5"]

//-----------------------------------------------------------------------------------------------------------

//A dot . is a special character class that matches “any character except a newline”.

let str = "+7(903)-123-45-67";

console.log( str.match(/./g) );  //["+", "7", "(", "9", "0", "3", ")", "-", "1", "2", "3", "-", "4", "5", "-", "6", "7"]

let regexp = /CS.4/; //using . special character

console.log( "CSS4".match(regexp) ); // CSS4
console.log( "CS-4".match(regexp) ); // CS-4
console.log( "CS 4".match(regexp) ); // CS 4 (space is also a character)

console.log( "CS4".match(/CS.4/) ); // null, no match because there's no character for the dot

//Dot as literally any character with “s” flag
//By default, a dot doesn’t match the newline character \n.
console.log( "A\nB".match(/A.B/) ); // null (no match)

console.log( "A\nB".match(/A.B/) ); // ["A"\n"B"]
//["A
//B"]
//-----------NOTE:Not supported in Firefox, IE, Edge------------
console.log( "A\nB".match(/A[\s\S]B/) ); // A\nB (match!)


//-------NOTE-Pay attention to spaces-----------
console.log( "1 - 5".match(/\d-\d/) ); //null

console.log( "1 - 5".match(/\d - \d/) ); // 1 - 5, now it works
// or we can use \s class:
console.log( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, also works



































