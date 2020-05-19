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

**Excluding ranges**  “excluding” ranges that look like [^…].
* [^aeyo] – any character except 'a', 'e', 'y' or 'o'.
* [^0-9] – any character except a digit, the same as \D.
* [^\s] – any non-space character, same as \S.

**Escaping in […]**
Usually when we want to find exactly a special character, we need to escape it like \.. And if we need a backslash, then we use \\, and so on.

In square brackets we can use the vast majority of special characters without escaping:

* Symbols . + ( ) never need escaping.
* A hyphen - is not escaped in the beginning or the end (where it does not define a range). when we used - first or last that time no need of backslash but in middle we need otherwise it give you error/[()/.\-+]/g
* A caret ^ is only escaped in the beginning (where it means exclusion or when we use caret after [ we need backslash). /[\^()-.+]/g or /[()-.^+]/g
* The closing square bracket ] is always escaped (if we need to look for that symbol).

**Ranges and flag “u”**
If there are surrogate pairs in the set, flag u is required for them to work correctly.
example: [x,y] or [x-y]
```javascript
console.log( '𝒳'.match(/[𝒳𝒴]/) ); // not correct
console.log( '𝒳'.match(/[𝒳𝒴]/u) ); //correct ["x"]
```
The result is incorrect, because by default regular expressions “don’t know” about surrogate pairs.

The regular expression engine thinks that [𝒳𝒴] – are not two, but four characters:

left half of 𝒳 (1),
right half of 𝒳 (2),
left half of 𝒴 (3),
right half of 𝒴 (4).


