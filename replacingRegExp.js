//Replacing: str.replace

let str = "We will, we will rock you";
console.log( str.replace(/we/ig,"I" ) ); //output - "I will, I will rock you"
//if the regular expression has flag g,it returns an array of all matches 
//Please note that both We and we are found, because flag i makes the regular expression case-insensitive. and both replace by I

//-------------------------------------------------------------------------------------------------------------------------------
let string = "We will, we will rock you";
console.log( string.replace(/we/i,"I" ) ); //output - "I will, we will rock you"
//returns only the first match in the form of an array and replace by "I"

//----------------------------------------------------------------------------------------------------------------------------
let str = "We will, we will rock you";
console.log( str.replace(/we/,"I" ) );  //output - "We will, I will rock you"
//returns an array of all matches and match depended on case-sensitive in this match we and We both are treated as a different.
//and we replace by "I"
