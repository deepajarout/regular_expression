#  Sets and ranges [...]
Several characters or character classes inside square brackets […] mean to “search for any character among given”.



**SET**
For instance, [eao] means any of the 3 characters: 'a', 'e', or 'o'.
That’s called a set. Sets can be used in a regexp along with regular characters:
```javascript
console.log( "Mop top".match(/[tm]op/gi) );//output should be [ "Mop","top"]
//from set one character match  
console.log( "Voila".match(/V[oi]la/) ); // null, no matches
console.log( "Voila".match(/V[i]la/) ); // output Vila
```
Please **note** that although there are multiple characters in the set, they correspond to ```exactly one character in the match.```

**Ranges**
Square brackets may also contain character ranges.For instance, ```[a-z] is a character in range``` from a to z, and ```[0-5] is a digit``` from 0 to 5.
We can also use character classes inside […]. If we’d like to look for a wordly character \w or a hyphen -, then the set is [\w-].

**Character classes are shorthands for certain character sets**
* \d – is the same as [0-9],
* \w – is the same as [a-zA-Z0-9_], has three anges: it searches for a character that is either a digit from 0 to 9 or a letter from A to F or lowercase letter a to z (using i ) eg: /[a-zA-Z0-9_]/gi
* \s – is the same as [\t\n\v\f\r ], plus few other rare unicode space characters.



**Example: multi-language \w**
As the character class \w is a shorthand for [a-zA-Z0-9_], it can’t find Chinese hieroglyphs, Cyrillic letters, etc.

We can write a more universal pattern, that looks for wordly characters in any language. That’s easy with unicode properties: ```[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]```.

Alphabetic (Alpha) – for letters,
Mark (M) – for accents,
Decimal_Number (Nd) – for digits,
Connector_Punctuation (Pc) – for the underscore '_' and similar characters,
Join_Control (Join_C) – two special codes 200c and 200d, used in ligatures, e.g. in Arabic.

```**NOTE** Unicode properties p{…} are not yet implemented in Edge and Firefox. If we really need them, we can use library XRegExp.Or just use ranges of characters in a language that interests us, e.g. [а-я] for Cyrillic letters.```
