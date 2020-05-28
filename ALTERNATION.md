# Alternation (OR) |
Alternation is the term in regular expression that is actually a simple “OR”.

In a regular expression it is denoted with a vertical line character |.

For instance, we need to find programming languages: HTML, PHP, Java or JavaScript.

The corresponding ```regexp: html|php|java(script)?```.

```javascript
let regexp = /html|php|css|java(script)?/gi;

let str = "First HTML appeared, then CSS, then JavaScript";

console.log( str.match(regexp) ); // 'HTML', 'CSS', 'JavaScript'
```


We already saw a similar thing – ``` square brackets```. They allow to choose between ```multiple characters```, for instance gr[ae]y matches gray or grey.

Square brackets allow only characters or character sets.``` Alternation allows any expressions```. A regexp A|B|C means one of expressions ```A, B or C```.

For instance:

* gr(a|e)y means exactly the same as gr[ae]y.
* gra|ey means gra or ey.

To apply alternation to a chosen part of the pattern, we can enclose it in parentheses:

* I love HTML|CSS matches I love HTML or CSS.
* I love (HTML|CSS) matches I love HTML or I love CSS.
