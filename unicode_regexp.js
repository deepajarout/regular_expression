
let str = "A ბ ㄱ";

console.log( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
console.log( str.match(/\p{L}/g) ); // null (no matches, as there's no flag "u")
console.log( str.match(/\p{Ll}/gu) ); // ["ბ"]    {Ll} used for lowercase letter
console.log( str.match(/\p{Lu}/gu) ); // ["A"]     {Lu} used for Uppercase letter
console.log( str.match(/\p{Lo}/gu) ); // ["ㄱ"]    {Lu} used for other letter 

console.log


//----------------------- hexadecimal numbers------------------------------------

let regexp = /x\p{Hex_Digit}\p{Hex_Digit}/u;  // {Hex_Digit} used for hexadecimal number

console.log("number: xAF".match(regexp)); // xAF


//--------------------------Chinese hieroglyphs------------------------------------

let regexp = /\p{sc=Han}/gu; // returns Chinese hieroglyphs {sc=Han}

let str = `Hello Привет 你好 123_456`;

console.log( str.match(regexp) ); // 你,好



//------------------------------Currency--------------------------------------------

let regexp = /\p{Sc}\d/gu; // {Sc} used for Currency

let  str = `Prices: $2, €1, ¥9`;

console.log( str.match(regexp) ); // $2,€1,¥9
