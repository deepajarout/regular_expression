# Methods of RegExp and String

# str.match(regexp)
It has 3 modes:

**1** If the regexp doesn’t have flag g, then it returns the first match as an array with capturing groups and properties index (position of the match), input (input string, equals str):
```javascript

let str = "I love JavaScript";
let result = str.match(/Java(Script)/);

alert( result[0] );     // JavaScript (full match)
alert( result[1] );     // Script (first capturing group)
alert( result.length ); // 2

// Additional information:
alert( result.index );  // 0 (match position)
alert( result.input );  // I love JavaScript (source string)

```
**2** If the regexp has flag g, then it returns an array of all matches as strings, without capturing groups and other details.
```javascript

let str = "I love JavaScript";

let result = str.match(/Java(Script)/g);

alert( result[0] ); // JavaScript
alert( result.length ); // 1

```
**3** If there are no matches, no matter if there’s flag g or not, null is returned.

```javascript

let str = "I love JavaScript";
let result = str.match(/HTML/);

alert(result); // null
alert(result.length); // Error: Cannot read property 'length' of null


```
---

# str.matchAll(regexp)

The method str.matchAll(regexp) is a “newer, improved” variant of str.match.

It’s used mainly to search for all matches with all groups.

There are 3 differences from match:

**1** It returns an ```iterable object``` with matches instead of an array. We can make a regular array from it using ```Array.from```.
**2** Every match is returned as an array with capturing groups (the same format as str.match without flag g).
**3** If there are no results, it returns not null, but an empty iterable object.
```javascript

let str = "I love JavaScript";

let result = str.matchAll(/Java(Script)/g);
let matchAll = Array.from(result);
console.log(matchAll); //[["JavaScript", "Script"]]  we can also use for.. of insted of array.from
let firstMatch = matchAll[0];
console.log( firstMatch[0] );  // javascirpt
console.log( firstMatch[1] );  // script
console.log( firstMatch.index );  // 7
console.log( firstMatch.input ); //"I love JavaScript"

```
---






















