---
title: Webprogramozás - Eseménykezelés
stylesheet-version: 1.0.11
---

::: title
Webprogramozás
:::

### Interaktív programok készítése a böngészőben: eseménykezelés

<div class="columns">
  <div class="column" width="33.333%">
  <small>
    <strong>Visnovitz Márton</strong><br>
    egyetemi tanársegéd<br>
    visnovitz.marton@inf.elte.hu
  </small>
  </div>
  <div class="column" width="33.333%">
  <small>
    <strong>Gerely Viktor</strong><br>
    demonstrátor<br>
    mohmas@inf.elte.hu
  </small>
  </div>
  <div class="column" width="33.333%">
  <small>
    <strong>Horváth Győző</strong><br>
    egyetemi docens<br>
    horvath.gyozo@inf.elte.hu
  </small>
  </div>
</div>

<small>
1117 Budapest, Pázmány Péter sétány 1/c., 2.408<br>
Tel: (1) 372-2500/8469\
</small>

------

## Ismétlés {data-state="new-section"}

------

## Ismétlés - nyelvi elemek

- [x] Dinamikusan típusos
- [x] Interpretált nyelv
- [x] Szintaxis C++-hoz hasonló
- [x] Adatszerkezetek (elemi, összetett)
- [x] Funkcionális aspektus
- [x] OOP-s aspektus

------

## Ismétlés - DOM

- [x] HTML elemek belső ábrázolása
- [x] Programozási interfész (API)
- [x] Bemeneti-kimeneti interfész

![](../../assets/images/architecture/js-dom-ui.png)

------

## Ismétlés -- DOM

- [x] Elemek kiválasztása
  - `document.querySelector('css selector')`
  - `document.querySelectorAll('css selector')`
- [x] Elem (JavaScript objektum) tulajdonságai
  - Analógia: Webfejlesztés → Webprogramozás
  - írás/olvasás
  - tulajdonságok (pl. `innerHTML`)
  - metódusok
- [x] Eseménykezelés
  - Eseménytípusok
  - `elem.addEventListener(type, handler)`

------

## Ismétlés - DOM

```html
<form>
  Name: <input type="text" id="name"> <br>
  <input type="button" value="Say hello!" id="hello">
  <br>
  <span id="output"></span>
</form>
```
```js
function greet(name) {
  return `Hello ${name}!`;
}

const input = document.querySelector('#name');
const output = document.querySelector('#output');
const hello = document.querySelector('#hello');

function handleHelloClick() {
  const name = input.value;
  const greeting = greet(name);
  output.innerHTML = greeting;
}

hello.addEventListener('click', handleHelloClick);
```

------

## Eseménykezelés {data-state="new-section" data-background="nature.jpg" }

Interaktív programok

------

## Fogalmak

- Interaktív programok
- Felhasználói tevékenység
- Esemény
- Eseménykezelő függvények
- → **ESEMÉNYVEZÉRELT PROGRAMOZÁS**

------

## Eseménykezelők mint mini programok

```js
function handleEvent() {
  // Read
  // Process
  // Write
}
```

------

## Események

- `click`: egérkattintás
- `mousemove`: egérmozgatás
- `mousedown`: egér gombjának lenyomása
- `mouseup`: egér gombjának felengedése
- `input`: input mező értékének megváltozása
- `keydown`: billentyűzet gombjának lenyomása
- `keyup`: billentyűzet gombjának felengedése
- `keypress`: billentyűzet gombjának megnyomása
- `submit`: űrlap elküldése
- `scroll`: görgetés az oldalon

[Események referenciája](https://developer.mozilla.org/en-US/docs/Web/Events)

------

## Eseménykezelő függvények regisztrálása

```js
// Egyszerűbb esetekben
element.addEventListener(eventType, eventHandler);
element.removeEventListener(eventType, eventHandler);

// Például
const button = document.querySelector("button");

button.addEventListener("click", handleButtonClick);
button.removeEventListener("click", handleButtonClick);

function handleButtonClick() {
  // mi történjen kattintáskor
}

// helyben definiálva
element.addEventListener(eventType, function () {});
```

------

## Eseménykezelő függvények regisztrálása

```js
target.addEventListener(eventType, eventListener[, options]);
// `options` object:
// - capture: Boolean (elkapás iránya)
// - once: Boolean (egyszeri hívás, majd eltávolítás)
// - passive: Boolean (nincs preventDefault() hívás)

target.removeEventListener(eventType, eventListener[, options]);
// options object
// - capture: Boolean

// Csak a capture flag számít az eseménykezelő azonosításában 
// a type és listener mellett
// Névtelen függvényt nem lehet eltávolítani (nincs rá referencia)
// kivéve: `once` option

target.addEventListener('click', onClick, { once: true });
```

------

## Eseménykezelő függvények regisztrálása

```js
// Egy elem egy eseményéhez több eseménykezelő függvény
button.addEventListener("click", handleButtonClick1);
button.addEventListener("click", handleButtonClick2);

// Több eseményhez ugyanaz az eseménykezelő függvény
button1.addEventListener("click", handleButtonClick);
button2.addEventListener("click", handleButtonClick);
```

------

## Eseménykezelő példa

```html
<form>
  Name: <input type="text" id="name"> <br>
  <input type="button" value="Say hello!" id="hello">
  <br>
  <span id="output"></span>
</form>
```
```js
function greet(name) {
  return `Hello ${name}!`;
}

const input = document.querySelector('#name');
const output = document.querySelector('#output');
const hello = document.querySelector('#hello');

function handleHelloClick() {
  const name = input.value;
  const greeting = greet(name);
  output.innerHTML = greeting;
}

hello.addEventListener('click', handleHelloClick);
```

------

## Példa

- Feladat: 
  - Adott hivatkozások felsorolása
  - Cél: SHIFT gomb nyomva tartásával kattintva a konzolra kiírjuk a megnyitandó oldal URL-jét

<div class="example">
  <ul id="linkList">
    <li><a id="link1" href="http://www.elte.hu">ELTE</a></li>
    <li><a id="link2" href="http://www.inf.elte.hu">ELTE IK</a></li>
    <li><a id="link3" href="http://www.inf.elte.hu/mot">ELTE IK MOT</a></li>
  </ul> 
</div>

<script>
  const linkList = document.querySelector("#linkList");
  function handleLinkClick(event) {
    if (!event.shiftKey) {
      return;
    }

    event.preventDefault();
    const target = event.target;

    if (target.matches("li a")) {
      const href = target.href;
      console.log(href);
    }
  } 

  linkList.addEventListener("click", handleLinkClick);
</script>

------

## Kérdések

- Honnan tudjuk, hogy a SHIFT billentyű le van-e nyomva?
- Hogyan tiltom le a hivatkozás követését?
- Hogyan skálázható a megoldás a hivatkozások számával?

```html
<ul>
  <li>
    <a href="http://www.elte.hu">ELTE</a>
  </li>
  <li>
    <a href="http://www.inf.elte.hu">ELTE IK</a>
  </li>
  <li>
    <a href="http://www.inf.elte.hu/mot">ELTE IK MOT</a>
  </li>
</ul>
```

------

## Az eseményobjektum

Az eseménykezelő függvények első paraméterként automatikusan megkapják

```js
function handleEvent(event) {
  console.log(event);
}
```

------

## Az eseményobjektum

Tartalma az eseménytől függ:

|                         |                                        |
| ----------------------- | -------------------------------------- |
| Általános tulajdonságok | pl. `type`, `target`                   |
| Egéresemény             | pl. `screenX`, `screenY`, `buttons`    |
| Billentyűzetesemény     | pl. `key`, `code`, `altKey`, `ctrlKey` |

[Referencia](https://developer.mozilla.org/en-US/docs/Web/API/Event)

------

## Billentyűzetesemény tulajdonságai

`key`, `code`

<div class="example columns">
  <div class="column" width="50%">
  <input id="keyboardInput" style="width: 100%;height: 100%">
  </div>
  <div class="column" width="50%">
  <div id="keyboardOutput" style="height: 200px"></div>
  </div>
</div>

<script>
  const keyboardInput = document.querySelector("#keyboardInput");
  const keyboardOutput = document.querySelector("#keyboardOutput");
  function handleKeyDown(event) {
    event.preventDefault();
    keyboardOutput.innerHTML = `
      Key: <code>${event.key}</code><br>
      Code: <code>${event.code}</code>
    `;
  } 
  keyboardInput.addEventListener("keydown", handleKeyDown);
</script>

------

## Egéresemény tulajdonságai

`screenX`, `screenY`, `offsetX`, `offsetY`, `clientX`, `clientY`

<div class="example columns">
  <div class="column" width="50%">
  <input id="mouseInput" style="width: 100%;height: 100%">
  </div>
  <div class="column" width="50%">
  <div id="mouseOutput" style="height: 200px"></div>
  </div>
</div>

<script>
  const mouseInput = document.querySelector("#mouseInput");
  const mouseOutput = document.querySelector("#mouseOutput");
  function handleMouseMove(event) {
    mouseOutput.innerHTML = `
      ScreenX/Y: <code>${event.screenX};${event.screenY}</code><br>
      OffsetX/Y: <code>${event.offsetX};${event.offsetY}</code><br>
      ClientX/Y: <code>${event.clientX};${event.clientY}</code><br>
    `;
  } 
  mouseInput.addEventListener("mousemove", handleMouseMove);
</script>

------

## A megoldás lépései

- [ ] SHIFT lenyomásának vizsgálata
- [ ] Kattintott elem elérése
- [ ] Alapértelmezett esemény letiltása
- [ ] Hozzárendelés az összes elemhez

---

## Eseményobjektum -- példa

```js
const link = document.querySelector('#link1');

function handleLinkClick(event) {
  if (✒>!event.shiftKey<✒) {
    return;
  }

  const href = link.href;
  console.log(href);
  alert('stop');
}

link.addEventListener('click', handleLinkClick);
```

<div class="example">
  <ul id="linkList2">
    <li><a id="link2_1" href="http://www.elte.hu">ELTE</a></li>
    <li><a id="link2_2" href="http://www.inf.elte.hu">ELTE IK</a></li>
    <li><a id="link2_3" href="http://www.inf.elte.hu/mot">ELTE IK MOT</a></li>
  </ul> 
</div>

<script>
  const link2 = document.querySelector('#link2_1');

  function handleLinkClick2(event) {
    if (!event.shiftKey) {
      return;
    }

    const href = link2.href;
    console.log(href);
    alert('stop');
  }

  link2.addEventListener('click', handleLinkClick2);
</script>

------

## A megoldás lépései

- [X] SHIFT lenyomásának vizsgálata
- [ ] Kattintott elem elérése
- [ ] Alapértelmezett esemény letiltása
- [ ] Hozzárendelés az összes elemhez

------

## Alapértelmezett művelet megakadályozása

- Alapértelmezett műveletek:
  - Linkre kattintás → oldal betöltése
  - Submit gombra kattintás → űrlap elküldése
  - Beviteli mezőbe gépelés → karakterek beíródnak
- Megakadályozása
  - eseményobjektum `preventDefault()` metódusa

```js
function handleEvent(event) {
  event.preventDefault();
}
```

------

## Alapértelmezett művelet megakadályozása -- példa

```js
const link = document.querySelector('#link1');

function handleLinkClick(event) {
  if (!event.shiftKey) {
    return;
  }

  ✒>event.preventDefault();<✒
  const href = link.href;
  console.log(href);
}

link.addEventListener('click', handleLinkClick);
```

<div class="example">
  <ul id="linkList3">
    <li><a id="link3_1" href="http://www.elte.hu">ELTE</a></li>
    <li><a id="link3_2" href="http://www.inf.elte.hu">ELTE IK</a></li>
    <li><a id="link3_3" href="http://www.inf.elte.hu/mot">ELTE IK MOT</a></li>
  </ul> 
</div>

<script>
  const link3 = document.querySelector('#link3_1');

  function handleLinkClick3(event) {
    if (!event.shiftKey) {
      return;
    }

    event.preventDefault();
    const href = link3.href;
    console.log(href);
  }

  link3.addEventListener('click', handleLinkClick3);
</script>

------

## A megoldás lépései

- [X] SHIFT lenyomásának vizsgálata
- [ ] Kattintott elem elérése
- [X] Alapértelmezett esemény letiltása
- [ ] Hozzárendelés az összes elemhez

------

## Hatékonysági megfontolások

```js
const link1 = document.querySelector('#link1');
const link2 = document.querySelector('#link2');
const link3 = document.querySelector('#link3');

function handleLinkClick1(event) { /* ... */ }
function handleLinkClick2(event) { /* ... */ }
function handleLinkClick3(event) { /* ... */ }

link1.addEventListener('click', handleLinkClick);
link2.addEventListener('click', handleLinkClick2);
link3.addEventListener('click', handleLinkClick3);
```

------

## Hatékonysági megfontolások

|                |                                   |
| -------------- | --------------------------------- |
| `this`         | az eseményre **figyelő** objektum |
| `event.target` | az eseményt **kiváltó** objektum  |

```js
const link1 = document.querySelector('#link1');
const link2 = document.querySelector('#link2');
const link3 = document.querySelector('#link3');

function handleLinkClick(event) {
  if (!event.shiftKey) {
    return;
  }

  event.preventDefault();
  ✒>const href = this.href;<✒ 
  // VAGY
  // const href = event.target.href;
  console.log(href);
}

link1.addEventListener('click', handleLinkClick);
link2.addEventListener('click', handleLinkClick);
link3.addEventListener('click', handleLinkClick);
```

------

<div class="example">
  <ul id="linkList4">
    <li><a id="link4_1" href="http://www.elte.hu">ELTE</a></li>
    <li><a id="link4_2" href="http://www.inf.elte.hu">ELTE IK</a></li>
    <li><a id="link4_3" href="http://www.inf.elte.hu/mot">ELTE IK MOT</a></li>
  </ul> 
</div>

<script>
  const link4_1 = document.querySelector('#link4_1');
  const link4_2 = document.querySelector('#link4_2');
  const link4_3 = document.querySelector('#link4_3');

  function handleLinkClick4(event) {
    if (!event.shiftKey) {
      return;
    }

    event.preventDefault();
    const href = this.href;
    console.log(href);
  }

  link4_1.addEventListener('click', handleLinkClick4);
  link4_2.addEventListener('click', handleLinkClick4);
  link4_3.addEventListener('click', handleLinkClick4);
</script>

------

## A megoldás lépései

- [X] SHIFT lenyomásának vizsgálata
- [X] Kattintott elem elérése
- [X] Alapértelmezett esemény letiltása
- [ ] Hozzárendelés az összes elemhez

------

## Hatékonysági megfontolások

```js
const linkList = document.querySelectorAll('#linkList li a');

function handleLinkClick(event) {
  if (!event.shiftKey) {
    return;
  }

  event.preventDefault();
  const href = event.target.href;
  console.log(href);
}

for (const link of linkList) {
  link.addEventListener('click', handleLinkClick);
}
```

<div class="example">
  <ul id="linkList5">
    <li><a href="http://www.elte.hu">ELTE</a></li>
    <li><a href="http://www.inf.elte.hu">ELTE IK</a></li>
    <li><a href="http://www.inf.elte.hu/mot">ELTE IK MOT</a></li>
  </ul>
</div>

<script>
  const linkList5 = document.querySelectorAll('#linkList5 li a');

  function handleLinkClick5(event) {
    if (!event.shiftKey) {
      return;
    }
    
    event.preventDefault();
    const href = event.target.href;
    console.log(href);
  }

  for (const link of linkList5) {
    link.addEventListener('click', handleLinkClick);
  }
</script>

------

## A megoldás lépései

- [X] SHIFT lenyomásának vizsgálata
- [X] Kattintott elem elérése
- [X] Alapértelmezett esemény letiltása
- [X] Hozzárendelés az összes elemhez

------

## Események buborékolása és delegálása

- Forrásobjektum: az eseményt kiváltó objektum (`e.target`)
- Kezelőobjektum: az az objektum, amelyhez az eseménykezelő hozzá van rendelve (`this`)
- Események buborékolása: az esemény a forrásobjektumtól kezdve sorban mindegyik szülőjén is bekövetkezik
- Lehetséges magasabb szinten kezelni az eseményt, mint ahol bekövetkezik

```
forrás → szülő → szülő → ... → body → html → document → window
```

------

## Események buborékolása és delegálása

- Delegálás: az eseményt magasabb szinten kezeljük, de egy alacsonyabb szintű objektummal dolgozunk
- Delegált objektum: az az objektum, amellyel az eseménykezelőben dolgozni szeretnénk
- Buborékolás megakadályozása: `e.stopPropagation()`
- Pontosabban
  1. Föntről lefele (event capture)
  2. Lentről felfele (event bubbling)


```
forrás → szülő → szülő → ... → body → html → document → window
```

------

## Esemény delegálása -- példa

:::::: {.columns}
::: {.column width="85%"}
```html
<ul id="linkList">
  <li>
    <a href="http://www.elte.hu">ELTE</a>
  </li>
  <li>
    <a href="http://www.inf.elte.hu">ELTE IK</a>
  </li>
  <li>
    <a href="http://www.inf.elte.hu/mot">ELTE IK MOT</a>
  </li>
</ul>
```
:::

::: {.column width="15%"}
![](../../assets/images/examples/delegation-1.png)
:::
::::::

------

## Esemény delegálása -- példa


```js
const linkList = document.querySelector('#linkList');

function handleListClick(event) {
  if (!event.shiftKey) {
    return;
  }

  const target = event.target;

  if (✒>!target.matches('li a')<✒) {
    return;
  }

  event.preventDefault();
  const href = target.href;
  console.log(href);
}

linkList.addEventListener('click', handleListClick);
```

------

## Esemény delegálása -- példa

:::::::::::::::::: {.columns}
::: {.column width="85%"}
```html
<ul>
  <li>
    <a href="http://www.elte.hu">
      <span>ELTE</span>
    </a>
  </li>
  <li>
    <a href="http://www.inf.elte.hu">
      ELTE <span>IK</span>
    </a>
  </li>
  <li>
    <a href="http://www.inf.elte.hu/mot">
      Médiainformatikai Tanszék
    </a> 
  </li>
</ul>
```

A delegált elem közbülső elem!
:::

::: {.column width="15%"}
![](../../assets/images/examples/delegation-2.png)
:::
::::::::::::::::::::

------

<div class="example">
  <ul id="linkList6">
    <li>
      <a href="http://www.elte.hu">
        <span style="color: red">ELTE</span>
      </a>
    </li>
    <li>
      <a href="http://www.inf.elte.hu">
        ELTE <span style="color: red">IK</span>
      </a>
    </li>
    <li>
      <a href="http://www.inf.elte.hu/mot">
        Médiainformatikai Tanszék
      </a> 
    </li>
  </ul>
</div>

<script>
  const linkList6 = document.querySelector('#linkList6');

  function handleListClick6(event) {
    if (!event.shiftKey) {
      return;
    }

    const target = event.target;

    if (!target.matches('li a')) {
      return;
    }

    event.preventDefault();
    const href = target.href;
    console.log(href);
  }

  linkList6.addEventListener('click', handleListClick6);
</script>

------

## Esemény delegálása

:::::::::::::::::: {.columns}
::: {.column width="82%"}
```js
function handleClick(event) {
  const handlerElement = this;
  const sourceElement = event.target;
  const selector = '.foo';

  let element = sourceElement;

  while (
    element !== handlerElement && 
    !element.matches(selector)
  ) {
    element = element.parentNode;
  }

  if (element !== handlerElement) {
    const targetElement = element;
    console.log(targetElement);
  }
}
```
:::

::: {.column width="18%"}
![](../../assets/images/examples/delegation-3.png)
:::
::::::::::::::::::::

------

## Esemény delegálása

:::::::::::::::::: {.columns}
::: {.column width="82%"}
```js
function handleClick(event) {
  const handlerElement = this;
  const sourceElement = event.target;
  const selector = '.foo';

  const closestElement = 
    sourceElement.closest(selector);

  if (handlerElement.contains(closestElement)) {
    const targetElement = closestElement;
    console.log(targetElement);
  }
}
```
:::

::: {.column width="18%"}
![](../../assets/images/examples/delegation-3.png)
:::
::::::::::::::::::::

------

## Esemény delegálása -- példa

:::::::::::::::::: {.columns}
::: {.column width="82%"}
```js
function onClick(event) {
  const handlerElement = this;
  const sourceElement = event.target;
  const selector = 'li a';

  const closestElement = 
    sourceElement.closest(selector);

  if (handlerElement.contains(closestElement)) {
    const targetElement = closestElement;

    if (!event.shiftKey) {
      return;
    }
      
    event.preventDefault();
    console.log(targetElement.href);
  }
}
```
:::

::: {.column width="18%"}
![](../../assets/images/examples/delegation-2.png)
:::
::::::::::::::::::::
------

## "Okos" `delegate` segédfüggvény

:::::::::::::::::: {.columns}
::: {.column width="82%"}
```js
function delegate(parent, type, selector, handler) {

  ✒>function delegatedFunction(event) {
    const handlerElement = this;
    const sourceElement = event.target;

    const closestElement = 
      sourceElement.closest(selector);

    if (handlerElement.contains(closestElement)) {
      const targetElement = closestElement;
      handler.call(targetElement, event);
    }
  }<✒

  parent.addEventListener(type, delegatedFunction);
}
```
:::

::: {.column width="18%"}
![](../../assets/images/examples/delegation-3.png)
:::
::::::::::::::::::::

------

## "Rövid-okos" `delegate` segédfüggvény

```js
function delegate(parent, type, selector, handler) {
  parent.addEventListener(type, function (event) {
    const targetElement = event.target.closest(selector);

    if (this.contains(targetElement)) {
      handler.call(targetElement, event);
    }
  });
}
```

<script>
  function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
      const targetElement = event.target.closest(selector);

      if (this.contains(targetElement)) {
        handler.call(targetElement, event);
      }
    });
  }
</script>

------

## "Buta" delegálás

```js
function handleEvent(event) {
  if (!event.target.matches(selector)) {
    return;
  }

  // Do magic...
}
parent.addEventListener(type, handleEvent);
```

------

## Esemény delegálása -- példa

```js
const list = document.querySelector('ul')

function handleListClick(event) {
  if (!event.shiftKey) {
    return;
  }

  event.preventDefault();
  // A this itt a delegate segédfüggvény által van beállítva
  console.log(this.href);
}

delegate(list, 'click', 'li a', handleListClick);
```

<div class="example">
  <ul id="linkList7">
    <li>
      <a href="http://www.elte.hu">
        <span style="color: red">ELTE</span>
      </a>
    </li>
    <li>
      <a href="http://www.inf.elte.hu">
        ELTE <span style="color: red">IK</span>
      </a>
    </li>
    <li>
      <a href="http://www.inf.elte.hu/mot">
        Médiainformatikai Tanszék
      </a> 
    </li>
  </ul>
</div>

<script>
  const linkList7 = document.querySelector('#linkList7');

  function handleListClick7(event) {
    if (!event.shiftKey) {
      return;
    }

    event.preventDefault();
    console.log(this.href);
  }

  delegate(linkList7, 'click', 'li a', handleListClick7);
</script>

------

## Események delegálása

- Hatékony programozási minta  
  (egy elem - egy eseménykezelő)
- Sok elemnél / valamilyen típusú elemre átlalánosan
- Dinamikusan beszúrt elemeknél
- Viselkedés hozzárendelése elemekhez deklaratívan

<!-- https://javascript.info/event-delegation -->

------

## Összefoglalás {data-state="topic"}

- Eseménykezelés
  - `elem.addEventListener(type, handler)`
  - Interakció eszköze
  - Eseményobjektum
  - Alapértelmezett műveletek megakadályozása
  - Buborékolás
  - Delegálás
