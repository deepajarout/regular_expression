
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
