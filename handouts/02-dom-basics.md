# DOM Basics

**DOM**: *Document Object Model* - JavaScript API for programming the browser content

### [Finding elements][querySelector]

```js
// Find an element with a CSS selector
const element = document.querySelector(selector);
// Find multiple elements with a CSS selector as an array
const elements = [...document.querySelectorAll(selector)];
```

[querySelector]: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

### [Modifying HTML content][innerHTML]

```js
// Change HTML content
element.innerHTML = "<div>New HTML content</div>";
element.insertAdjacentHTML("afterbegin", "<div>New HTML content</div>");
// Change text-only content
element.textContent = "New Text";
element.insertAdjacentText("afterbegin", "New Text");
```

[innerHTML]: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML

### [Creating elements][createElement]

```js
// Create new Element in memory
const element = document.createElement("div");
// Insert it into the document
referenceElement.insertAdjacentElement("beforeend", element)
```

[createElement]: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

### [Working with HTML Attributes][getAttribute]

```js
// Get attribute value
const attributeValue = element.getAttribute("attribute-name");
// Set attribute value
element.setAttribute("attribute-name", "newValue");
// Use attribute property shorthand
element.attributeName = "newValue";
```

[getAttribute]: https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute

### [Working with Classes][classlist]

```js
const element = document.querySelector("div");
// Getting list of classes as an array
const classesAsArray = [...element.classList];
// Modifying list of classes
element.classList.add("foo");
element.classList.remove("bar");
element.classList.toggle("baz");
```

[classlist]: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

### [Working with Style][style]

```js
const element = document.querySelector("div");
// Modifying style property
element.style.backgroundImage = "url('test.png')'";
```

[style]: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration

### [Handling events][addEventListener]

```js
const onEventName = () => {};
const element = document.querySelector(selector);
element.addEventListener("event-name", onEventName);
```

[addEventListener]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener