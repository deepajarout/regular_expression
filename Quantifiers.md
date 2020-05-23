# Quantifiers +, *, ? and {n}

Let’s say we have a string like +7(903)-123-45-67 and want to find all numbers in it. But unlike before, we are interested not in single digits, but full numbers: 7, 903, 123, 45, 67.

A number is a sequence of 1 or more digits \d. To mark how many we need, we can append a quantifier.


# Quantity{n}
The simplest quantifier is a number in curly braces: {n}.
The exact count: {5}
```\d{5}``` denotes exactly 5 digits, the same as ```\d\d\d\d\d```.
We can add \b to exclude longer numbers: ```\b\d{5}\b```.
To find numbers from 3 to 5 digits we can put the limits into curly braces:``` \d{3,5}```.
Then a regexp ```\d{3,}``` looks for sequences of digits of length 3 or more.

---

# Shorthands
There are shorthands for most used quantifiers:
+
Means “one or more”, the same as {1,}.
* ```?``` Means “zero or one”, the same as {0,1}. In other words, it makes the symbol optional.

For instance, the pattern ou?r looks for o followed by zero or one u, and then r.

So, colou?r finds both color and colour:
* ```*``` Means “zero or more”, the same as {0,}. That is, the character may repeat any times or be absent.

For example, \d0* looks for a digit followed by any number of zeroes (may be many or none):

