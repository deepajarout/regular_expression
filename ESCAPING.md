# Escaping, special characters
As we’ve seen, a backslash \ is used to denote character classes, e.g. \d. So it’s a special character in regexps (just like in regular strings).

special characters list: **[ \ ^ $ . | ? * + ( ).**

**Escaping \**

we want to a dot . ```  use: \ with dot \. ``` backsalash \ also called “escaping a character”.
Parentheses() are also special characters, so if we want them, we should ``` use \( ``` 
If we’re looking for a backslash \ , it’s a special character in both regular strings and regexps, so we should double it (```\\```).

**slash /**
A slash symbol '/' is not a special character, but in JavaScript it is used to open and close the``` regexp: /...pattern.../ ```, so we should escape it too ``` using \/ ``` .
**NOTE:** if we’re not using /.../, but create a regexp using ```new RegExp```, then we don’t need to escape it:

**new RegExp**
If we are creating a regular expression with new RegExp, then we don’t have to escape /, but need to do some other escaping.

 **NOTE**  ```/\d\.\d/ ```work , but ```new RegExp("\d\.\d")``` doesn’t work, why?
 
 
**REASON:**```The reason is that backslashes are “consumed” by a string. As we may recall, regular strings have their own special characters, such as \n, and a backslash is used for escaping.```

String quotes “consume” backslashes and interpret them on their own, for instance:

* \n – becomes a newline character,
* \u1234 – becomes the Unicode character with such code,
* …And when there’s no special meaning: like \d or \z, then the backslash is simply removed.
So new RegExp gets a string without backslashes. That’s why the search doesn’t work!

To fix it, we need to ``` double backslashes` ```, because string quotes turn ``` \\ ``` into \:
