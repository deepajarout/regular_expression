
let str1 = "Mary had a little lamb";
console.log( /^Mary/.test(str1) ); // true   caret ^ matches at the beginning of the text
console.log( /^had/.test(str1) ); //false

let str1 = "Mary had a little Mary lamb";
console.log(str1.match(/^Mary/g)); //return only starting Mary


let str1 = "it's fleece was white as snow";
alert( /snow$/.test(str1) ); // true   caret $ matches at the ending of the text


let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
console.log( regexp.test(goodInput) ); // true
console.log( regexp.test(badInput) ); // false
