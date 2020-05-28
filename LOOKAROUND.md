
# Lookahead and lookbehind

Sometimes we need to find only those matches for a pattern that are followed or preceeded by another pattern.
There’s a special syntax for that, called “lookahead” and “lookbehind”, together referred to as “lookaround”.

# Lookahead
The syntax is:``` X(?=Y)```, it means "look for X, but match only if followed by Y". There may be any pattern instead of X and Y.
```javascript
let str = "1 turkey costs 30€";

console.log( str.match(/\d+(?=€)/) ); //["30"]

```
**Please note:** the lookahead is merely a test, the contents of the parentheses (?=...) is not included in the result 30.
When we look for X(?=Y), the regular expression engine finds X and then checks if there’s Y immediately after it. If it’s not so, then the potential match is skipped, and the search continues.

# Negative lookahead

Let’s say that we want a quantity instead, not a price from the same string. That’s a number \d+, NOT followed by €.
For that, a negative lookahead can be applied.
The ```syntax is: X(?!Y)```, it means "search X, but only if not followed by Y".
```javascript

let str = "2 turkeys cost 60€";
alert( str.match(/\d+(?!€)/) ); // 2 (the price is skipped)

```
---
# Lookbehind
Lookahead allows to add a condition for “what follows”.
Lookbehind is similar, but it looks behind. That is, it allows to match a pattern only if there’s something before it.
The syntax is:

**Positive lookbehind:** (?<=Y)X, matches X, but only if there’s Y before it.
**Negative lookbehind:**  (?<!Y)X, matches X, but only if there’s no Y before it.

```javascript
let str = "1 turkey costs $30";

// the dollar sign is escaped \$
alert( str.match(/(?<=\$)\d+/) ); // 30 (skipped the sole number)

let str = "2 turkeys cost $60";

alert( str.match(/(?<!\$)\d+/) ); // 2 (skipped the price)
```
---
# Capturing groups
E.g. in the pattern \d+(?=€), the € sign doesn’t get captured as a part of the match. That’s natural: we look for a number \d+, while (?=€) is just a test that it should be followed by €.
But in some situations we might want to capture the lookaround expression as well, or a part of it. That’s possible. Just wrap that part into additional parentheses.
```javascript 
let str = "1 turkey costs 30€";
let regexp = /\d+(?=(€|kr))/; // extra parentheses around €|kr

alert( str.match(regexp) ); // 30, €

//lookbehind 
let str = "1 turkey costs $30";
let regexp = /(?<=(\$|£))\d+/;

alert( str.match(regexp) ); // 30, $
```
