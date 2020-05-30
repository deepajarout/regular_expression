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

# str.split(regexp|substr, limit)

Splits the string using the regexp (or a substring) as a delimiter.

We can use split with strings, like this:
```alert('12-34-56'.split('-')) // array of [12, 34, 56]```
But we can split by a regular expression, the same way:
```alert('12, 34, 56'.split(/,\s*/)) // array of [12, 34, 56]```

---

# str.search(regexp)
   The method str.search(regexp) returns the position of the first match or -1 if none found:
   ```let str = "A drop of ink may make a million think";
    alert( str.search( /ink/i ) ); // 10 (first match position)
```
The important limitation: search only finds the first match.
If we need positions of further matches, we should use other means, such as finding them all with str.matchAll(regexp).
```let str = "A drop of Ink may make a million think";
let c =Array.from( str.matchAll( /ink/gi ));
console.log(c); //[["Ink"], ["ink"]]
 console.log(c[0].index ); // 10 (first match position)
console.log(c[1].index ); //35
```
---
# str.replace(str|regexp, str|func)

This is a generic method for searching and replacing, one of most useful ones. The swiss army knife for searching and replacing.
```javascript
// replace a dash by a colon
alert('12-34-56'.replace("-", ":")) // 12:34-56 
//When the first argument of replace is a string, it only replaces the first match.
//To find all hyphens, we need to use not the string "-", but a regexp /-/g, with the obligatory g flag:
// replace all dashes by a colon
alert( '12-34-56'.replace( /-/g, ":" ) )  // 12:34:56

```

**2**   The second argument is a replacement string. We can use special character in it:

| Symbols        | Action in the replacement string | 
| ------------- |:-------------:| 
| $&    | inserts the whole match | 
| $\`   | inserts a part of the string before the match     | 
| $' |inserts a part of the string after the match       |  
| $n | if n is a 1-2 digit number, then it inserts the contents of n-th parentheses     |  
|$<name>| inserts the contents of the parentheses with the given name |  
|	$$ |inserts character $ |


**For situations that require “smart" replacements, the second argument can be a function.**
It will be called for each match, and the returned value will be inserted as a replacement.
The function is called with arguments func(match, p1, p2, ..., pn, offset, input, groups):
* match – the match,
* p1, p2, ..., pn – contents of capturing groups (if there are any),
* offset – position of the match,
* input – the source string,
* groups – an object with named groups.
If there are no parentheses in the regexp, then there are only 3 arguments: func(str, offset, input).

```javascript

let str = "html and css";

let result = str.replace(/html|css/gi, (str,offset,input)=>{
    console.log("offset",offset);
   console.log("input",input);
  return str.toUpperCase();
  

} );

console.log(result); // HTML and CSS

```

---

# regexp.exec(str)

The method regexp.exec(str) method returns a match for regexp in the string str. Unlike previous methods, it’s called on a regexp, not on a string.
It behaves differently depending on whether the regexp has flag g.
If there’s no g, then regexp.exec(str) returns the first match exactly as **str.match(regexp)**. This behavior doesn’t bring anything new.
But if there’s flag g, then:

* A call to regexp.exec(str) returns the first match and saves the position immediately after it in the property **regexp.lastIndex**.
* The next such call starts the search from position **regexp.lastIndex**, returns the next match and saves the position after it in regexp.lastIndex.
…And so on.
* If there are no matches, regexp.exec returns null and resets **regexp.lastIndex** to 0.
In the past, before the method str.matchAll was added to JavaScript, calls of regexp.exec were used in the loop to get all matches with groups:

```javascript
let str = 'More about JavaScript at https://javascript.info';
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  console.log(result)
    console.log(regexp.lastIndex)
  console.log( `Found ${result[0]} at position ${result.index}` );
  // Found JavaScript at position 11, then
  // Found javascript at position 33
}
```
This works now as well, although for newer browsers **str.matchAll** is usually more convenient.
We can use regexp.exec to search from a given position by manually setting lastIndex.

---

# regexp.test(str)
The method regexp.test(str) looks for a match and returns true/false whether it exists.
```javascript

let str = "I love JavaScript";
// these two tests do the same
console.log( /love/i.test(str) ); // true
console.log( str.search(/love/i) != -1 ); // true

```
If the regexp has **flag g**, then regexp.test looks from **regexp.lastIndex** property and updates this property, just like regexp.exec.

----
**Notes**:**Same global regexp tested repeatedly on different sources may fail**
If we apply the same global regexp to different inputs, it may lead to wrong result, because regexp.test call advances regexp.lastIndex property, so the search in another string may start from non-zero position.
For instance, here we call regexp.test twice on the same text, and the second time fails:
```javascript
let regexp = /javascript/g;  // (regexp just created: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (regexp.lastIndex=10 now)
alert( regexp.test("javascript") ); // false
```
That’s exactly because ```regexp.lastIndex is non-zero in the second test```.

To work around that, we can set regexp.lastIndex = 0 before each search. Or instead of calling methods on regexp, use string methods str.match/search/..., they don’t use lastIndex.



















