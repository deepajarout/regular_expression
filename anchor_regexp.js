
let str1 = "Mary had a little Mary lamb";
console.log( /^Mary/.test(str1) ); // true   caret ^ matches at the beginning of the text
console.log( /^had/.test(str1) ); //false
console.log(str1.match(/^Mary/g)); //return only starting Mary
console.log(str1.match(/\w\w\w\w$/)) //["lamb"]
console.log(str1.match(/^\w\w\w\w/)) //["Mary"]


let str2 = "it's fleece was white as snow";
alert( /snow$/.test(str2) ); // true   caret $ matches at the ending of the text


let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
console.log( regexp.test(goodInput) ); // true
console.log( regexp.test(badInput) ); // false

//---------------------------------Multiline mode--------------------------------------------------
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;
console.log( str.match(/^\d/g) ); //["1"] without m mode it gave only firstline first digit or letter
console.log( str.match(/^\d/gm) ); // ["1", "2", "3"]
console.log (str.match(/^\d\w\w/gm)); // ["1st", "2nd", "3rd"]
console.log (str.match(/\w\w\w\w\w\w$/g));// ["Winnie"]
console.log (str.match(/\w\w\w\w\w\w$/gm));// ["Winnie", "Piglet", "Eeyore"]

//-------------------Searching for \n instead of ^ $-------------------------------------------------


let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

console.log( str.match(/\d\n/gm) ); // 1\n,2\n   \n in the pattern is used when we need newline characters in the result, while anchors are used to find something at the beginning/end of a line.
//["1
//", "2
//"]
console.log( str1.match(/\d$/gm) );  //["1", "2", "3"]
