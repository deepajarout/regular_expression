# Character classes
A character class is a special notation that matches any symbol from a certain set.
---
example ->  we have a phone number like "+7(123)-456-78-90", and we need to turn it into pure numbers: 79031234567.

To do so, we can find and remove anything that’s not a number. ``` Character classes ``` can help with that.

---
There are Most used character classes as well.

* **\d** (“d” is from “digit”)
A digit: a character from 0 to 9.
* **\s** (“s” is from “space”)
A space symbol: includes spaces, tabs \t, newlines \n and few other rare characters, such as \v, \f and \r.
* **\w** (“w” is from “word”)
A “wordly” character: either a letter of Latin alphabet or a digit or an underscore _. Non-Latin letters (like cyrillic or hindi) do not belong to \w.

----
# Inverse classes
----
For every character class there exists an “inverse class”, denoted with the same letter, but uppercased.
* **\D**
Non-digit: any character except \d, for instance a letter.
* **\S**
Non-space: any character except \s, for instance a letter.
* **\W**
Non-wordly character: anything but \w, e.g a non-latin letter or a space.

---
**Any character**
```. ```– any character if with the regexp 's' flag, otherwise any except a newline \n.

----
----
# Unicode: flag "u" and class \p{...}
JavaScript uses Unicode encoding for strings. Most characters are encoded with 2 bytes, but that allows to represent at most 65536 characters.

That range is not big enough to encode all possible characters, that’s why some rare characters are encoded with 4 bytes, for instance like 𝒳 (mathematical X) or 😄 (a smile), some hieroglyphs and so on.


Character	Unicode |	Bytes | count in unicode
| ------------- |:-------------:| :-------------:|
|a	|0x0061|	2|
|≈	|0x2248	|2|
|𝒳|	0x1d4b3	|4|
|𝒴	|0x1d4b4|	4|
|😄	|0x1f604|	4|



So characters like a and ≈ occupy 2 bytes, while codes for 𝒳, 𝒴 and 😄 are longer, they have 4 bytes.
We can search for characters with a property, written as ```\p{…}. ``` To use ``` \p{…} ```, a regular expression must have flag u.
example : 
```javascript

let str = "A ბ ㄱ";
alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
alert( str.match(/\p{L}/g) ); // null (no matches, as there's no flag "u")

```

**Example: hexadecimal numbers**
For instance, let’s look for hexadecimal numbers, written as xFF, where F is a hex digit (0…1 or A…F).

A hex digit can be denoted as ``` \p{Hex_Digit}: ```

**Example: Chinese hieroglyphs**
There’s a unicode property Script (a writing system), that may have a value: Cyrillic, Greek, Arabic, Han (Chinese) and so on, here’s the full list.

To look for characters in a given writing system we should use Script=<value>, e.g. for ````Cyrillic letters: \p{sc=Cyrillic}````, for ``` Chinese hieroglyphs: \p{sc=Han}``` 
  
  **Example: currency**
Characters that denote a currency, such as $, €, ¥, have unicode property ``` \p{Currency_Symbol}```, the short alias: ```\p{Sc}```.

Here’s the main character categories and their subcategories:

* Letter L:
lowercase Ll
modifier Lm,
titlecase Lt,
uppercase Lu,
other Lo.
* Number N:
decimal digit Nd,
letter number Nl,
other No.
* Punctuation P:
connector Pc,
dash Pd,
initial quote Pi,
final quote Pf,
open Ps,
close Pe,
other Po.
* Mark M (accents etc):
spacing combining Mc,
enclosing Me,
non-spacing Mn.
* Symbol S:
currency Sc,
modifier Sk,
math Sm,
other So.
* Separator Z:
line Zl,
paragraph Zp,
space Zs.
* Other C:
control Cc,
format Cf,
not assigned Cn, – private use Co,
surrogate Cs.

----
----
# Anchors: string start ^ and end $

The ```caret ^ ``` and ``` dollar $ ``` characters have special meaning in a regexp. They are called “anchors”.

The caret ^ matches at the beginning of the text, and the dollar $ – at the end.

# Testing for a full match

Both anchors together ^...$ are often used to test whether or not a string fully matches the pattern. For instance, to check if the user input is in the right format.

Let’s check whether or not a string is a time in ```` 12:34 format ```` . That is: two digits, then a colon, and then another two digits.

In regular expressions language that’s \d\d:\d\d:
Here the match for \d\d:\d\d must start exactly after the beginning of the text ^, and the end $ must  
```` /^\d\d:\d\d$/ ````

**Anchors have “zero width”**
Anchors ^ and $ are tests. They have zero width.

In other words, they do not match a character, but rather force the regexp engine to check the condition (text start/end)

----

# Multiline mode of anchors ^ $, flag "m"
The multiline mode is enabled by the ```flag m.```

It only affects the behavior of ```^ and $.```

In the multiline mode they match not only at the beginning and the end of the string, but also at start/end of line.

**Searching at line start ^**
The pattern ``` /^\d/gm ``` takes a digit from the beginning of each line.Without the flag ```m ``` only the first digit is matched.

**Searching at line end $**
The regular expression ```\d$``` finds the last digit in every line.Without the flag m, the dollar $ would only match the end of the whole text, so only the very last digit would be found.


**Searching for \n instead of ^ $**
To find a newline, we can use not only anchors ^ and $, but also the newline character \n.
Here we search for ```\d\n``` instead of ``` \d$```.

```javascript
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

alert( str.match(/\d\n/gm) ); // 1\n,2\n
```
s we can see, there are 2 matches instead of 3.

That’s because there’s no newline after 3 (there’s text end though, so it matches $).

Another difference: now every match includes a newline character \n. Unlike the anchors ^ $, that only test the condition (start/end of a line), \n is a character, so it becomes a part of the result.

So, a \n in the pattern is used when we need newline characters in the result, while anchors are used to find something at the beginning/end of a line.

