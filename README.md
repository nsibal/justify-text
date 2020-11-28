# Justify Text

This project can be found in [Educative.io](https://www.educative.io/)'s [JavaScript in Detail: From Beginner to Advanced](https://www.educative.io/courses/javascript-in-detail-from-beginner-to-advanced) course.


## Problem Description
Outline to problems pertaining to justifying text in JavaScript.


## Topics Covered
- [Background](#background)
- [Task](#task)
  - [Sub-tasks](#sub-tasks)
      1. [Split line](#1-split-line)
      2. [Line breaks](#2-line-breaks)
      3. [Blank insertions](#3-blank-insertions)
      4. [Line cost](#4-line-cost)
      5. [Best line break](#5-best-line-break)
      6. [Final step to justify an array of text](#6-final-step-to-justify-an-array-of-text)


## Background
A documentation company **MoogleSoft** is working on new, user-requested features. One requested feature is document **alignments**. Engineers are working on adding alignments “Center,” “Left,” and “Right.” But the engineers can’t figure out how to let users **justify text**. Your job is to implement **justify text features** in **JavaScript** for this company!


## Task
Use your **JavaScript** knowledge to help a given **textual string** break down into an **array** of lines so that each line is **justified**.


### Sub-tasks
The **sub-tasks** of the project are listed here.


#### 1. Split line
The fundamental aspect of a document is *splitting the line* with respect to width. Here, break an array of words into *two separate* **arrays**. The first **array** has the maximum number of words that fit in a line of a certain length.

```javascript
['He', 'who', 'controls', 'it'] 15
=>
[['He', 'who', 'controls'], ['it']]
```

As we can see above, an **array** is broken into *two* **sub-array**. The left contains the maximum number of words that fit in a line. The right **array** has the remaining words.


#### 2. Line breaks
This part builds on the previous. Here, we introduce the **hyphenation** in order to split words into two parts. An **object** is provided with values containing *possible* **hyphenation** as follows.

```javascript
enHyp = {
	'controls' : ["co","nt","ro","ls"],
	'creative' : ["cr","ea","ti","ve"],
}
```

Using the **object**, attempt to find all possible ways of splitting a line, with an attempt to include the hyphenated part in the left **array** if possible.

```javascript
enHyp ['He', 'who', 'controls', 'it'] 12
=>
[
	[['He', 'who'], ['controls', 'it']],
	[['He', 'who', 'co-'], ['ntrols', 'it']],
	[['He', 'who', 'cont-'], ['rols', 'it']], 
]
```

With this function, we have more options when splitting a line.


#### 3. Blank insertions
To make a line equivalent to the width, it is common to *add spaces* between the words. To increase the ways we can **justify text**, implement a **function** that adds a certain number of spaces between words in a line. This **function** also add spaces and find all the possible combinations for adding spaces between the words:

```javascript
2 ["A", "creative", "man"]
=>
[
	["A", " ", " ", "creative", "man"],
	["A", " ", "creative", " ", "man"],
	["A", "creative", " ", " ", "man"]
]
```

The final output has an **array** of possible combinations of *adding spaces* within an **array** of words, excluding the ends. This **function** is essential in padding to the line.


#### 4. Line cost
Using previous functions. we end up with many line combinations. Some use *hyphenated words* while others use *spaces*. We want to establish a **function** that calculates the **cost** of using either approach in order to choose the combinations with the *minimum cost*. Account for these variables.

* **blankCost**: the cost of introducing each blank in the list
* **blankProxCost**: the cost of having blanks close to each other
* **blankUnevenCost**: the cost of having blanks spread unevenly
* **hypCost**: the cost of hyphenating the last word in the list

When considering the above variables, use the following formula.

```javascript
var totalCost = (blankCost * totalBlanks)
	+ (blankProxCost * (arrLength - avgDist)
	+ (blankUnevenCost * varainceDist)
	+ (hypCost * totalHyphens);
```

Where:

* **`totalBanks`**: total number of blanks introduced
* **`arrLength`**: the length of the array of the line
* **`avgDist`**: average distance between blanks
* **`varianceDist`**: variance of the distances between blanks
* **`totalHyphens`**: total number of hyphens

Using the above format, we can calculate the **cost** of different combinations. Remember, the *minimum* **cost** is our goal.


#### 5. Best line break
Here, take a line and break it to a specific width. The function takes a certain line and creates every combination of lines while *maximizing* the **length** of the line. It eventually returns the line with the *minimum* **cost**, according to a certain **cost function**.

```javascript
lineCostFunc enHyp 12 ["He", "who", "controls", "it"]
=>
[["He", "who", "cont-"], ["rols", "it"]]
```

This part is vital to our solution. Additionally, it depends on the success of all previous implementations.


#### 6. Final step to justify an array of text
In this step, take a **string** to justify. Use any number of functions previously written. In the end, you want a **justified text** in the form of a **two-dimensional array** as follows.

```javascript
var text = "He who controls the past controls the future. He who controls the present controls the past."

linCostFunc enHyp 15 test
=>
[
	[ 'He', 'who', 'controls' ],
	[ 'the', 'past', ' ', 'cont-' ],
	[ 'rols', 'the', ' ', 'futu-' ],
	[ 're.', 'He', ' ', 'who', 'co-' ],
	[ 'ntrols', 'the', 'pre-' ],
	[ 'sent', ' ', ' ', 'controls' ],
	[ 'the', 'past.' ],
]

```

Moreover, this output can be transformed as follows.

```none
He who controls
the past  cont-
rols the  futu-
re. He  who co-
ntrols the pre-
sent   controls
the past.
```

As we can see, the implementation makes it possible to **justify** any text for a given **cost function** and **hyphenation dictionary**.
