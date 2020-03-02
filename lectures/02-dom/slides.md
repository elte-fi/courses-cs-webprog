---
title: Webprogramozás - DOM
---

::: title
Webprogramozás
:::

### Felületi elemek programozása: a DOM

:::::: {.columns}
::: {.column width="33%"}
<small>
**Visnovitz Márton**  
egyetemi tanársegéd  
visnovitz.marton@inf.elte.hu
</small>
:::
::: {.column width="33%"}
<small>
**Gerely Viktor**  
demonstrátor  
mohmas@inf.elte.hu
</small>
:::
::: {.column width="33%"}
<small>
**Horváth Győző**  
egyetemi docens  
horvath.gyozo@inf.elte.hu
</small>
:::
::::::

<small>
1117 Budapest, Pázmány Péter sétány 1/c., 2.408  
Tel: (1) 372-2500/8469\
</small>

------

## Ismétlés {data-state="new-section"}

------

## JavaScript nyelvi elemek

<ul class="tasklist">
  <li class="complete">Alapok 
    <ul>
      <li>C-alapú szintaxis</li>
      <li>vezérlési szerkezetek</li>
    </ul>
  </li>
  <li class="complete">Típusok: 
    <ul>
      <li>Egyszerű: szöveg, szám, logikai</li>
      <li>Összetett: objektum, tömb, függvény</li>
    </ul>
  </li>
</ul>

------

## Felületi elemek programozása {data-state="new-section"}

------

## Példa

- Feladat
  + Bekérni a nevet, pl. "Senki bácsi" 
  + Kiírni: "Hello Senki bácsi!"
- Űrlap
  + Gomb lenyomása
  + Érték kiolvasása
  + Eredmény megjelenítése

------

## Megoldás lépései

<ul class="tasklist">
  <li>Reagálni a gomb lenyomására.</li>
  <li>Kiolvasni a szöveges beviteli mező értékét (beolvasás).</li>
  <li>Előállítani a bemenet alapján a kimenetet, azaz az üdvözlő szöveget (feldolgozás). </li>
  <li>Megjeleníteni az üdvözlő szöveget (kiírás).</li>
</ul>

------

::: {.example}

<form>
  Name: <input type="text" id="name"> <br>
  <input type="button" value="Say hello!" id="hello">
  <br>
  <span id="output"></span>
</form>

:::

<script>
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
</script>

```html
<form>
  Name: <input type="text" id="name"> <br>
  <input type="button" value="Say hello!" id="hello">
  <br>
  <span id="output"></span>
</form>
```

------

## Megoldás lépései (1)

<ul class="tasklist">
  <li>Reagálni a gomb lenyomására.</li>
  <li>Kiolvasni a szöveges beviteli mező értékét (beolvasás).</li>
  <li class="complete">Előállítani a bemenet alapján a kimenetet, azaz az üdvözlő szöveget (feldolgozás). </li>
  <li>Megjeleníteni az üdvözlő szöveget (kiírás).</li>
</ul>

```js
function greet(name) {
  return `Hello ${name}!`;
}
```

------

## Felhasználói felület

- Interaktivitás
  + adatok megadása (beolvasás)
  + információ megjelenítése (kiírás)
- Elemei
  + **HTML**: oldal szerkezetének leírása
  + **CSS**: megjelenés, stílus
  + **JavaScript**: program a felület működtetésére
- **→ INTERFÉSZ A HTML ELEMEKHEZ**

------

## Dokumentum Objektum Modell (DOM)

- HTML elemek belső ábrázolása
- HTML elemeknek megfelelő JS objektumok hierarchiája

![](../../assets/images/architecture/dom-ui.png)

------

## Dokumentum Objektum Modell (DOM)

![](../../assets/images/examples/html-dom.png)

<small>A forrás és a DOM eltérhet egymástól.</small>

------

## Dokumentum Objektum Modell (DOM)

- Programozási interfész (a felület felé)
- Bemeneti-kimeneti interfész

![](../../assets/images/architecture/js-dom-ui.png)

------

:::::: {.columns}
::: {.column}
<h2 style="color: rgb(80, 124, 128);">DOM Core</h2>

- csomópontok fája
- ábrázolás és műveletek
:::
::: {.column}
<h2 style="color: rgb(122, 129, 116);">HTML DOM</h2>

- HTML elemek fája
:::
::::::

![](../../assets/images/architecture/dom.png)

------

## Dokumentum Objektum Modell

- HTML és XML dokumentumok programozási felülete
- Szabványos interfész fa struktúra alapú hierarchiához
- DOM gyökere: `document`
- DOM csomópontok:
  + dokumentum
  + elem
  + attribútum
  + szöveges csomópont

------

## Szöveges csomópontok

:::::: {.columns}
::: {.column style="width: 50%"}
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <p>Lorem ipsum.</p>
    <p class="active">
      Dolor sit amet.
    </p>
  </body>
</html>
```
:::

::: {.column style="width: 50%"}
<pre><code>┣ <strong>DOCTYPE</strong>: html
┣ <strong>HTML</strong>
┣━━ <strong>HEAD</strong>
┣━━━━ #text:
┣━━━━ <strong>META</strong> charset="utf-8"
┣━━━━ #text:
┣━━━━ <strong>TITLE</strong>
┣━━━━ #text:
┣━━ #text:
┣━━ <strong>BODY</strong>
┣━━━━ #text:
┣━━━━ <strong>P</strong>
┣━━━━━━ #text: Lorem ipsum.
┣━━━━ #text:
┣━━━━ <strong>P</strong> class="active"
┣━━━━━━ #text: Dolor sit amet.
┣━━━━ #text:
┗━━ #text:
</code></pre>
:::
::::::

------

## Műveletcsoportok

- Elemek kiválasztása
- Szerkezet bejárása
- Szerkezet módosítása
  + attribútumok
  + új elem/attribútum létrehozása
  + módosítás
  + törlés

------

## Elem(ek) kiválasztása {data-state="new-section"}

------

## Elem(ek) kiválasztása

CSS szelektorral:

|            |                                  |
| ---------- | -------------------------------- |
| Egy elem:  | `document.querySelector(sel)`    |
| Több elem: | `document.querySelectorAll(sel)` |

```html
<form>
  Név: 
  <input id="name" value="Luke">
  <button>Click me!</button>
</form>
<script>
  console.log( document.querySelector("#name") );
  console.log( document.querySelectorAll("form > *") );
</script>
```
------

## CSS szelektorok

|                      |                          |
| -------------------- | ------------------------ |
| névvel               | `button`                 |
| azonosítóval         | `#navbar`                |
| stílusosztállyal     | `.important`             |
| attribútummal        | `[name=password]`        |
| univerzális          | `*`                      |
| kombinálva           | `input.error[type=text]` |
| közvetlen gyerek     | `form >input`            |
| leszármazott         | `#wrapper div`           |
| következő testvér    | `ul + p`                 |
| utána jövő testvérek | `ul ~ p`                 |

------

## Több elem kiválasztása

```html
<ul>
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
</ul>
```
```js
const listItems = document.querySelectorAll('ul > li')

// Array-like object (NodeList)
for (const li of listItems) { /*...*/ }     // OK
listItems.forEach(li => { /*...*/ })        // Wrong: not an array

// Transforming to array
const listItemsArray = Array.from(listItems);
listItemsArray.forEach(li => { /*...*/ });  // OK
```

------

## Kiválasztás leszármazottak közül

- `elem.querySelector(sel)`
- `elem.querySelectorAll(sel)`

```html
<div class="first">
    <span>Apple</span>
</div>
<div class="second">
    <span>Pear</span>
</div>
```
```js
const firstDiv = document.querySelector('div.first')
const spanInFirstDiv = ✒>firstDiv<✒.querySelector('span')
```

------

## DOM elem tulajdonságai és metódusai {data-state="new-section"}

------

## DOM elem tulajdonságai és metódusai

- [Szabvány](https://www.w3.org/TR/2017/REC-html52-20171214/)
- [Dokumentáció](https://developer.mozilla.org/en-US/docs/Web/API)
- Analóg módszer (HTML, az esetek 80%-ban OK)
- Felfedező módszer (fejlesztői eszköztár, óvatosan)

------

## Analóg módszer

- CamelCase átírási mód
- Tulajdonságok

| HTML attribútum | DOM tulajdonság |
| --------------- | --------------- |
| `type`          | `type`          |
| `value`         | `value`         |
| `readonly`      | `readOnly`      |
| `maxlength`     | `maxLength`     |

------

## További fontosabb tulajdonságok

- `innerHTML`, `innerText`: az elem nyitó- és záróelem közötti HTML vagy szöveg

```html
<p>This is a <span>text</span></p>
```
```js
const p = document.querySelector('p');
// reading
p.innerHTML; // 'This is a <span>text</span>'
p.innerText; // 'This is a text'
// writing
p.innerHTML = 'This is a <strong>new</strong> text';
```

------

## Megoldás lépései (2)

<ul class="tasklist">
  <li>Reagálni a gomb lenyomására.</li>
  <li class="complete">Kiolvasni a szöveges beviteli mező értékét (beolvasás).</li>
  <li class="complete">Előállítani a bemenet alapján a kimenetet, azaz az üdvözlő szöveget (feldolgozás). </li>
  <li class="complete">Megjeleníteni az üdvözlő szöveget (kiírás).</li>
</ul>

```js
// Reading
const input = document.querySelector('#name');
const name = input✒>.value<✒;
// Writing
const output = document.querySelector('#output');
output✒>.innerHTML<✒ = greet(name);
```

------

## Elemi eseménykezelés {data-state="new-section"}

------

## Eseménykezelés

1. Az eseményt kiváltó elem (pl. egy gomb)
2. Az esemény típusa (pl. kattintás)
3. Az eseményt kezelő függvény

`elem.addEventListener('eventType', eventHandler)`

```js
const button = document.querySelector('button');

function handleButtonClick() {
  console.log('clicked');
}

button.addEventListener('click', handleButtonClick);
```

------

## Megoldás lépései (3)

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

## Megoldás lépései (3)

<ul class="tasklist">
  <li class="complete">Reagálni a gomb lenyomására.</li>
  <li class="complete">Kiolvasni a szöveges beviteli mező értékét (beolvasás).</li>
  <li class="complete">Előállítani a bemenet alapján a kimenetet, azaz az üdvözlő szöveget (feldolgozás). </li>
  <li class="complete">Megjeleníteni az üdvözlő szöveget (kiírás).</li>
</ul>

------

## A DOM mint I/O {data-state="new-section"}

------

## A DOM mint I/O

- A felhasználó a felhasználói felületen keresztül lép kapcsolatba a programmal
- A program számára a DOM az I/O

```js
// Typical JavaScript program:

// Reading (from DOM)
// Processing (independent from I/O)
// Writing (to DOM)
```

------

## A DOM mint I/O

- Beolvasás: DOM objektum tulajdonságának lekérdezése
- Kiírás: DOM objektum tulajdonságának módosítása

```html
<!-- Reading -->
<input type="checkbox" id="accept" checked>
<script>
  const elfogad = document.querySelector("#accept").checked;
</script>

<!-- Writing -->
<img src="" id="image">
<script>
  const url = "http://images.io/example.png";
  const image = document.querySelector("#image");
  image.src = url;
</script>
```

------

## Példa DOM I/O

```html
<input type="radio" name="gender" value="male" checked> Male
<input type="radio" name="gender" value="female"> Female
Maiden name: <input id="maidenName">
<script>
  // Reading
  const femaleRadio = 
    document.querySelector("[name=gender][value=female]");
  const isFemale = famaleRadio.checked;
  // Writing
  document.querySelector("#maidenName").hidden = !isFemale;
</script>
```

------

## Elemek kiválasztása

- `document`
    + `getElementById(id)`
    + `getElementsByName(name)`
- `document`/elem
    + `getElementsByTagName(tagName)`
    + `getElementsByClassName(className)`
    + **`querySelector(cssSelector)`**
    + **`querySelectorAll(cssSelector)`**

------

## Összefoglalás {data-state="topic"}

- DOM a felhasználói felület programozási interfésze
- Elemek kiválasztása:  
  `document.querySelector(css-selector)`
- Alap eseménykezelés:  
  `elem.addEventListener('click', onClick)`
- Tulajdonságai: analóg módszer
