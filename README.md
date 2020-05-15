# regular_expression
In JavaScript, they are available via the RegExp object, as well as being integrated in methods of strings.
---
### Regular Expression
Regular Expression are patterns that provide a powerful way to search and replace in text.
A regular expression consist of pattern and flags.

There are two syntax of initializing the regular expression ->

* ```` regExp = new RegExp("pattern","flags"); ````


* ```` regExp = /pattern/;   (no flags)     & regExp = /pattern/gmi ;    (with flags) ````
---

**Differences** - 
* The main difference between these two syntaxes is that pattern using slashes /.../ does not allow for expressions to be inserted (like string template literals with ${...}). They are fully static.
* **Slashes** are used when we know the regular expression at the code writing time and **new RegExp** , is used when we need to create a regexp “on the run time” from a dynamically generated string.
---
**Flags**
Regular expressions may have 6 flags in JavaScript

*  **i**  ```search is case-insensitive: no difference between A and a```
*  **g**  ```search looks for all matches and all match is returned of array form.```
*  **m**  ``` multiline mode```
*  **s**  ```enables "dotall" mode ,allows a dot . to match newline character \n ```
*  **u**  ``` Enables full unicode support.```
*  **y**   ```“Sticky” mode: searching at the exact position in the text ```
----
**KeyPoints**
* Without flags and special symbols (that we’ll study later), the search by a regexp is the same as a substring search.
* The method ```str.match(regexp)``` looks for matches: all of them if there’s ```g flag```, otherwise, only the first one.
* The method ```str.replace(regexp, replacement)``` replaces matches found using regexp with replacement: all of them if there’s ```g flag```, otherwise only the first one.
* The method ```regexp.test(str)``` returns ```true``` if there’s at least one match, otherwise, it returns ```false.```
