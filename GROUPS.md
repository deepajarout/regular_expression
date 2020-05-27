# Capturing groups

A part of a pattern can be enclosed in ```parentheses (...)```. This is called a **“capturing group”**.
That has two effects:

* It allows to get a part of the match as a separate item in the result array.
* If we put a quantifier after the parentheses, it applies to the parentheses as a whole.
Without parentheses, the pattern go+ means g character, followed by o repeated one or more times. For instance, goooo or gooooooooo.

Parentheses group characters together, so (go)+ means go, gogo, gogogo and so on.
```javascript

let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

console.log("my@mail.com @ his@site.com.uk".match(regexp));

```

**Parentheses contents in the match**

Parentheses are numbered from left to right. The search engine memorizes the content matched by each of them and allows to get it in the result.

The method str.match(regexp), if regexp has no flag g, looks for the first match and returns it as an array:

* At index 0: the full match.
* At index 1: the contents of the first parentheses.
* At index 2: the contents of the second parentheses.
* …and so on…


---

# Nested groups


Parentheses can be nested. In this case the numbering also goes from left to right.

For instance, when searching a tag in ```<span class="my">``` we may be interested in:

* The tag content as a whole: span class="my".
* The tag name: span.
T* he tag attributes: class="my".
Let’s add parentheses for them:``` <( ([a-z]+) \s* ([^>]*) )>```.

```javascript
let str = '<span class="my">';

let regexp = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(regexp);
alert(result[0]); // <span class="my">
alert(result[1]); // span class="my"
alert(result[2]); // span
alert(result[3]); // class="my"

```

The zero index of result always holds the full match.

Then groups, numbered from left to right by an opening paren. The first group is returned as result[1]. Here it encloses the whole tag content.

Then in result[2] goes the group from the second opening paren ([a-z]+) – tag name, then in result[3] the tag: ([^>]*).

---
# Optional groups

Even if a group is optional and doesn’t exist in the match (e.g. has the quantifier (...)?), the corresponding result array item is present and equals undefined.

```javascript

let match = 'ac'.match(/a(z)?(c)?/)

alert( match.length ); // 3
alert( match[0] ); // ac (whole match)
alert( match[1] ); // undefined, because there's nothing for (z)?
alert( match[2] ); // c

```

**Searching for all matches with groups: matchAll**The method matchAll is not supported in old browsers.

# Difference between match and matchAll
there are 3 differences:

* It returns not an array, but an iterable object.
* When the flag g is present, it returns every match as an array with groups.
* If there are no matches, it returns not null, but an empty iterable object.

**match**
```javascript

let results = '<h1> <h2>'.match(/<(.*?)>/gi);
console.log(results); // ["h1","h2"]

```

**matchAll**
```javascript

let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

// results - is not an array, but an iterable object
console.log(results); // [object RegExp String Iterator]

console.log(results[0]); // undefined (*)

results = Array.from(results); // let's turn it into array

console.log(results[0]); // <h1>,h1 (1st tag)
console.log(results[1]); // <h2>,h2 (2nd tag)

```
As we can see, the first difference is very important, as demonstrated in the line (*). We can’t get the match as results[0], because that object isn’t pseudoarray. We can turn it into a real Array using Array.from.


**Why is a result of matchAll an iterable object, not an array?**

**REASON:** Why is the method designed like that? The reason is simple – for the optimization.

The call to matchAll does not perform the search. Instead, it returns an iterable object, without the results initially. The search is performed each time we iterate over it, e.g. in the loop.

So, there will be found as many results as needed, not more.

E.g. there are potentially 100 matches in the text, but in a for..of loop we found 5 of them, then decided it’s enough and make a break. Then the engine won’t spend time finding other 95 matches.

---

# Named groups

Remembering groups by their numbers is hard. For simple patterns it’s doable, but for more complex ones counting parentheses is inconvenient. We have a much better option: give names to parentheses.

That’s done by putting ?<name> immediately after the opening paren.
  
  ```javascript
  let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
let str = "2019-04-30";

let groups = str.match(dateRegexp).groups;

console.log(groups.year); // 2019
console.log(groups.month); // 04
console.log(groups.day); // 30
```
To look for all dates, we can add flag g.

---

# Capturing groups in replacement
Method str.replace(regexp, replacement) that replaces all matches with regexp in str allows to use parentheses contents in the replacement string. That’s done using $n, where n is the group number.
```javascript
let str = "John Bull";
let regexp = /(\w+) (\w+)/;

alert( str.replace(regexp, '$2, $1') ); // Bull, John
```
---

# Non-capturing groups with ?:
Sometimes we need parentheses to correctly apply a quantifier, but we don’t want their contents in results.

A group may be excluded by adding ?: in the beginning.

For instance, if we want to find (go)+, but don’t want the parentheses contents (go) as a separate array item, we can write: (?:go)+.
```javascript
let str = "Gogogo John!";

// ?: exludes 'go' from capturing
let regexp = /(?:go)+ (\w+)/i;

let result = str.match(regexp);

alert( result[0] ); // Gogogo John (full match)
alert( result[1] ); // John
alert( result.length ); // 2 (no more items in the array)
```
---
# Backreferences in pattern: \N and \k``` <name> ```
  
  **Backreference by number: \N**
  A group can be referenced in the pattern using \N, where N is the group number.
  We need to find quoted strings: either single-quoted '...' or a double-quoted "..." – both variants should match.
  How to find them?
  We can put both kinds of quotes in the square brackets: ['"](.*?)['"], but it would find strings with mixed quotes, like "...' and '...". That would lead to incorrect matches when one quote appears inside other ones, like in the string "She's the one!":
  ```To make sure that the pattern looks for the closing quote exactly the same as the opening one, we can wrap it into a capturing group and backreference it: (['"])(.*?)\1.```
  
  ```javascript
  // without using Backreferences 
  let str = `He said: "She's the one!".`;
  let regexp = /['"](.*?)['"]/g;
// The result is not what we'd like to have
  console.log( str.match(regexp) ); // "She'

//--------------------------------------
 //Using Backreferences
 let str = `He said: "She's the one!".`;
 let regexp = /(['"])(.*?)\1/g;
 console.log( str.match(regexp) ); // "She's the one!"
 ```
 
 **Please note:**
If we use ?: in the group, then we can’t reference it. Groups that are excluded from capturing (?:...) are not memorized by the engine.

**Don’t mess up: in the pattern \1, in the replacement: **$1

In the replacement string we use a dollar sign: $1, while in the pattern – a backslash \1.

**Backreference by name: \k```<name> ```**
  
  If a regexp has many parentheses, it’s convenient to give them names.

To reference a named group we can use \k``` <name> ```.

In the example below the group with quotes is named ?<quote>, so the backreference is \k<quote>:
  
  ```javascript
  let str = `He said: "She's the one!".`;

let regexp = /(?<quote>['"])(.*?)\k<quote>/g;

alert( str.match(regexp) ); // "She's the one!"
```
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


