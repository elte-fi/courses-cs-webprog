# JavaScript Basics

## Basic Types

### [Undefined][undefined]
```js
// typeof -> "undefined"
undefined
```

[undefined]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined

### [Boolean][boolean]
```js
// typeof -> "number"
true, false
```

[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean

### [Number][number]
```js
// typeof -> "number", to check NaN use Number.isNaN()
42, 3.14, Infinity, NaN
```

[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number

### [String][string]
```js
// typeof -> "string"
"foo", 'bar', `1+2=${1+3}`
```

[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

### [Array][array]
```js
// typeof -> "object", to check use Array.isArray()
[undefined, true, 2, "4", []]
```

[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

### [Object][object]
```js
// typeof -> "object"
{ key: value, otherKey: otherValue }, null
```

[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object

### [Function][function]
```js
// typeof -> "function"
function foo() { /* code goes here */ }
const bar = () => { /* code goes here */ };
const baz = () => /* return value goes here */;
```

[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function

---

## Basic Algorithms

### [Map][map]
```js
const convertItem = (item) => /* value of any type*/;
const inputArray = [ /*...*/ ];

// Procedural style
const outputArray = [];
for (const item of inputArray) {
  outputArray.push(convertItem(item));
}

// Functional style
const outputArray = inputArray.map((item) => convertItem(item));
```

[map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

### [Filter][filter]
```js
const isItemValid = (item) => /* boolean value */;
const inputArray = [ /*...*/ ];

// Procedural style
const outputArray = [];
for (const item of inputArray) {
  if (isItemValid(item)) {
    outputArray.push(item);
  }
}

// Functional style
const outputArray = inputArray.filter((item) => isItemValid(item));
```

[filter]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

### [Find][find] / [Find index][find-index]
```js
const isItemValid = (item) => /* boolean value */;
const inputArray = [ /*...*/ ];

// Procedural style
let foundItem, foundItemIndex;
for (const [index, item] of inputArray.entries()) {
  if (isItemValid(item)) {
    foundItem = item;
    foundItemIndex = index;
    break;
  }
}

// Functional style
const foundItem = inputArray.find((item) => isItemValid(item));
const foundItemIndex = inputArray.findIndex((item) => isItemValid(item));
```

[find]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
[find-index]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex

### [Some][some] / [Every][every]
```js
const isItemValid = (item) => /* boolean value */;
const inputArray = [ /*...*/ ];

// Procedural style
let hasValidItem = false;
for (const item of inputArray) {
  if (isItemValid(item)) {
    hasValidItem = true;
    break;
  }
}

let allItemsValid = true;
for (const item of inputArray) {
  if (!isItemValid(item)) {
    allItemsValid = false;
    break;
  }
}

// Functional style
const hasValidItem = inputArray.some((item) => isItemValid(item));
const allItemsValid = inputArray.every((item) => isItemValid(item));
```

[some]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
[every]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every