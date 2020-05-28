# Sticky flag "y", searching at position

The flag y allows to perform the search at the given position in the source string.


**Example**-  we have a code string let varName = "value", and we need to read the variable name from it, that starts at position 4.
We’ll look for variable name using regexp \w+. A call to str.match(/\w+/) will find only the first word in the line. Or all words with the flag g. But we need only one word at position 4.
To **search from the given position**, we can use method ```regexp.exec(str)```.


* If the regexp doesn’t have flags g or y, then this method looks for the first match in the string str, exactly like str.match(regexp). Such simple no-flags case doesn’t interest us here.


* If there’s flag g, then it performs the search in the string str, starting from position stored in its regexp.lastIndex property. And, if it finds a match, then sets regexp.lastIndex to the index immediately after the match.
When a regexp is created, its lastIndex is 0.

```javascript
let str = 'let varName';

let regexp = /\w+/g;
console.log(regexp.lastIndex); // 0 (initially lastIndex=0)

let word1 = regexp.exec(str);
console.log("ji",word1)
console.log(word1[0]); // let (1st word)
console.log(regexp.lastIndex); // 3 (position after the match)

let word2 = regexp.exec(str);
console.log(word2[0]); // varName (2nd word)
console.log(regexp.lastIndex); // 11 (position after the match)

let word3 = regexp.exec(str);

console.log(word3); // null (no more matches)
console.log(regexp.lastIndex); // 0 (resets at search end)

```
**Please note:**the search starts at position lastIndex and then goes further.
If there’s no word at position lastIndex, but it’s somewhere after it, then it will be found:
…So, with flag g property lastIndex sets the starting position for the search.
Flag y makes regexp.exec to look exactly at position lastIndex, not before, not after it.
```javascript

let str = 'let varName = "value"';
let regexp = /\w+/g; // without flag "g", property lastIndex is ignored

regexp.lastIndex = 4;
let word = regexp.exec(str);
console.log(word); // varName
//Or
regexp.lastIndex = 3;

let word = regexp.exec(str);
alert(word[0]); // varName
alert(word.index); // 4
//----------------------------------------------using y--------------------------


let str = 'let varName = "value"';

let regexp = /\w+/y;

regexp.lastIndex = 3;
alert( regexp.exec(str) ); // null (there's a space at position 3, not a word)

regexp.lastIndex = 4;
alert( regexp.exec(str) ); // varName (word at position 4)

```
As we can see, regexp /\w+/y doesn’t match at position 3 (unlike the flag g), but matches at position 4.
Imagine, we have a long text, and there are no matches in it, at all. Then searching with flag g will go till the end of the text, and this will take significantly more time than the search with flag y.
In such tasks like lexical analysis, there are usually many searches at an exact position. Using flag y is the key for a good performance.

