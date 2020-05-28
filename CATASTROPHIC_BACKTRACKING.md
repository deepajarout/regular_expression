# Catastrophic backtracking

Some regular expressions are looking simple, but can execute veeeeeery long time, and even “hang” the JavaScript engine.
The typical symptom – a regular expression works fine sometimes, but for certain strings it “hangs”, consuming 100% of CPU.
In such case a web-browser suggests to kill the script and reload the page.
For server-side JavaScript it may become a vulnerability if regular expressions process user data.
**Example**
```javascript

let regexp = /^(\w+\s?)*$/;

alert( regexp.test("A good string") ); // true
alert( regexp.test("Bad characters: $@#") ); // false


```
It seems to work. The result is correct. Although, on certain strings it takes a lot of time. So long that JavaScript engine “hangs” with 100% CPU consumption.

# How to fix?

There are two main approaches to fixing the problem.

**1**- The first is to lower the number of possible combinations.
Let’s rewrite the regular expression as ^(\w+\s)*\w* – we’ll look for any number of words followed by a space (\w+\s)*, and then (optionally) a word \w*.
This regexp is equivalent to the previous one (matches the same) and works well:

```javascript

let regexp = /^(\w+\s)*\w*$/;
let str = "An input string that takes a long time or even makes this regex to hang!";

alert( regexp.test(str) ); // false

```

Why did the problem disappear?

Now the star * goes after \w+\s instead of \w+\s?. It became impossible to represent one word of the string with multiple successive \w+. The time needed to try such combinations is now saved.
 The previous pattern, due to the optional \s allowed variants \w+, \w+\s, \w+\w+ and so on.
With the rewritten pattern (\w+\s)*, that’s impossible: there may be \w+\s or \w+\s\w+\s, but not \w+\w+. So the overall combinations count is greatly decreased.

---

**2** Preventing backtracking -
