//Searching: str.match

let str = "We will, we will rock you";
console.log( str.match(/we/gi) );   //output - ["We", "we"]

//if the regular expression has flag g,it returns an array of all matches 
//Please note that both We and we are found, because flag i makes the regular expression case-insensitive.

//-----------------------------------------------------------------------------------------------------------------------

let str = "We will, we will rock you";
console.log( str.match(/we/g) ); //output - ["we"]
//returns an array of all matches and match depended on case-sensitive in this match we and We both are treated as a different.

//------------------------------------------------------------------------------------------------------------------------

let str = "We will, we will rock you";
console.log( str.match(/we/i) );  //output - ["We"]
//returns only the first match in the form of an array 
//with the full match at index 0 and some additional details in properties:
let rst = str.match(/we/i);
console.log(rst[0])  // "We"
console.log(rst.length) //  1
console.log(rst.index)   // o
console.log(rst.input)   // "We will, we will rock you"

//important  -> If there are no matches, we don’t receive an empty array, but instead receive null.
