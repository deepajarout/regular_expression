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
