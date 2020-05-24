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

