---
title: Webprogramozás
---

::: title
Webprogramozás
:::

### Követelmények, JavaScript nyelvi elemek

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

--------------------------

## Dinamikus webprogramozás {data-state="new-section"}

STATIKUS ⚡ DINAMIKUS

--------------------------

## Eddigi ismeretek

Statikus weblapok készítése: **Webfejlesztés**

- HTML5
- CSS 1, 2, 3
- Alapvető HTTP ismeretek
- CSS keretrendszerek (Bootstrap)

--------------------------

## Kliens-szerver architektúra

:::::::::::::: {.columns}
::: {.column width="75%"}

- **Web**: kliens és kiszolgáló kommunikációja  
- **HTTP**: a kommunikáció protokollja

- Kliens kérést intéz a szervernek
- Szerver válaszol
- A kliens feldolgozza a választ

:::
::: {.column width="25%"}

![](../../assets/images/architecture/server-client.png)

:::
:::::::::::::

--------------------------

## Statikus oldalak

- **Szerver szempontjából** statikus
  + Kérés pillanatában a szerveren megtalálható az a tartalom, amely leküldésre kerül a válaszban
  + Fájlkiszolgálás
- **Kliens szempontjából** statikus
  + A letöltött és a létrejött tartalom az oldal élettartamának a végéig ugyanaz
  + Nem változik meg sem a böngésző állapota, sem a betöltött dokumentum szerkezete
  + Nem fut le benne programkód, leíró nyelv, deklaratív

--------------------------

## Dinamikus oldalak

- **Szerver szempontjából** dinamikus
  + A válaszként leküldött tartalmat program állítja elő
  + A kérés pillanatában a válasz még nem létezik a szerveren
- **Kliens szempontjából** dinamikus
  + A letöltött tartalomban programkód fut le
  + Ez megváltoztathatja a böngésző állapotát és a dokumentum szerkezetét
- **⇒ PROGRAMOZÁS**

--------------------------

## Miről lesz szó?

- Dinamikus weblapkészítés
- Dinamikus web**programozás**
- Kliens-szerver architektúra mindkét oldalán
  + Kliensoldalon: **JavaScript**
  + Szerveroldalon: **PHP**
- Alapvető ismeretek, bevezetés
  + Új nyelvek
  + Új technológiák
  + Új programozási modellek

--------------------------

## Félév felépítése

::: {.roman-numbered}
1. Kliens oldali dinamikus webprogramozás: **JavaScript**
2. Szerver oldali dinamikus webprogramozás: **PHP**
:::

--------------------------

## Motiváció {data-state="new-section"}

--------------------------

## {data-background-iframe="http://webprogramozas.inf.elte.hu/user/gyozke/if2017/plumber/index.php" data-background-interactive="true"}

<!--
## {data-background-iframe="http://madebyevan.com/webgl-water/" data-background-interactive="true"}

## {data-background-iframe="http://jeremybouny.fr/ocean/demo/" data-background-interactive="true"}

## {data-background-iframe="http://webprogramozas.inf.elte.hu/user/gyozke/if2017/grafilogika/login.php" data-background-interactive="true"}

## {data-background-iframe="http://webprogramozas.inf.elte.hu/user/gyozke/if2017/labirintus/szrlab1.php" data-background-interactive="true"}

## {data-background-iframe="http://webprogramozas.inf.elte.hu/ebr/public/storage/tasks/1euvu0a7b05gq09q/DragonWarrior/" data-background-interactive="true"}

## {data-background-iframe="http://webprogramozas.inf.elte.hu/ebr/public/storage/tasks/78e0vff90vp1b4rs/tangram/" data-background-interactive="true"}

## {data-background-iframe="http://webprogramozas.inf.elte.hu/ebr/public/storage/tasks/o68e1p7uvjcsye1c/" data-background-interactive="true"}

## {data-background-iframe="http://webprogramozas.inf.elte.hu/webfejl2/gyak/verseny.html" data-background-interactive="true"} 
-->

--------------------------

## Követelmények {data-background="../../assets/images/backgrounds/gandalf.jpg" data-state="new-section"}

--------------------------

## Információk a tárgyról

<http://canvas.elte.hu>

- Előadások
- Gyakorlati anyagok
- Beadandók
- Eredmények


--------------------------

![](../../assets/images/generic/bug-bounty.svg)

<i class="fa fa-github"></i>
[elte-fi/courses-webprogramming](https://github.com/elte-fi/courses-webprogramming)

--------------------------

## Általános információk

- Óraszám: 1 előadás + 2 gyakorlat + 1 konzultáció
- Előfeltétel: Webfejlesztés
- Számonkérés: **folyamatos számonkérésű tárgy**

--------------------------

## Követelmények (általános)

- Előadás kötelező
- Gyakorlatok kötelezők (max. 3 hiányzás)
- Összesen **120 pont** szerezhető a félév során

--------------------------

## Követelmények (BSc nappali, FOSZK)

- **Két csoport ZH** 
  + **JavaScript**: 45 perc, 4. JS gyakorlat (10 pont)
  + **PHP**: 45 perc, 4. PHP gyakorlat (10 pont)
- **Két beadandó**
  + **JavaScript**: félév közepe - TBA (20 pont)
  + **PHP**: félév vége - TBA (20 pont)
- **Két évfolyam ZH**
  + **JavaScript**: 2 óra, félév közepe - TBA (30 pont)
  + **PHP**: 2 óra, félév vége - TBA (30 pont)

--------------------------

## Követelmények (BSc esti)

- **Két beadandó**
  + **JavaScript**: félév közepe - TBA (30 pont)
  + **PHP**: félév vége - TBA (30 pont)
- **Két évfolyam ZH**
  + **JavaScript**: 2 óra, félév közepe - TBA (30 pont)
  + **PHP**: 2 óra, félév vége - TBA (30 pont)

--------------------------

## Jegyszerzés feltételei

- Részvétel az előadásokon
- Részvétel a gyakorlatokon
- Két elfogadott csoport ZH (legalább 40%) - kiv. esti
- Két elfogadott beadandó (legalább 40%)
- Két elfogadott évfolyam ZH (legalább 40%)

A ZH-k esetében 1 hiányzás megengedett (pótolni kell)

--------------------------

## Kliensoldali webprogramozás {data-state="new-section"}

--------------------------

## JavaScript története

::: {.timeline}
- **1991**: világháló születése
- **1993**: első grafikus böngészők
- **1994**: Netscape Navigator böngésző
- **1995. 04**: Netscape 
  + Brendan Eich: olyan programozási nyelv, amelyekkel interaktívvá tehetők weboldalak
- **1995. 12**: bejelentik a JavaScriptet
:::

--------------------------

::: {.timeline}
- **1996-1999**: I. böngészőháború ⚔️ (Netscape vs IE)
  + A kliensoldal megbízhatatlan
- **1999-2004**: Sötét középkor
  + Szerveroldali technológiák fejlődése
- **2004-2017**: II. böngészőháború ⚔️ (IE vs Firefox, Opera, ...)
- **2006-**: JavaScript újrafelfedezése (AJAX, jQuery)
- **2008**: New kid on the block: Google Chrome
  + Versengés a JS sebességén: böngészőháború ⚔️
- **2009-**: parancssori JavaScript (Node.js)
- **2017**: Google Chrome 👑 (Chromium)
- **2019-**: III. böngészőháború ⚔️? (Chrome vs Edge)
:::

--------------------------

## Név és szabvány

- Elnevezések:
  + LiveScript: eredeti név
  + JavaScript: marketing miatt a Java programozók átcsábítására (web Visual Basic-je)
- Szabvány: ECMAScript
  + Európai Informatikai és Kommunikációs Rendszerek Szabványosítási Szövetsége (ECMA)
- Microsoft
  + JScript

--------------------------

## ECMAScript verziók

::: {.timeline}
- 1997: 1. verzió 
- 1999: **3. verzió**
- 2009: **5. verzió** (ES5)
    + hibajavítások, apróbb fejlesztések
- 2015: **6. verzió** (ES6, ECMAScript 2015)
    + nagyobb fejlesztések, modern nyelvi tulajdonságok
- 2016: 7. verzió (ES7, ECMAScript 2016)
- 2017: 8. verzió (ES8, ECMAScript 2017)
- ...
:::

**Stages**: 0, 1, 2, 3, 4 → szabvány

--------------------------

## Fejlesztőeszközök {data-state="new-section"}

Szerkesztők, böngészők, eszköztárak, dokumentáció

--------------------------

## Szerkesztők

- Text editorok
  + Notepad++
  + Sublime Text 3
  + Atom
  + **Visual Studio Code**
- Integrált fejlesztőkörnyezetek (IDE)
  + NetBeans IDE
  + Visual Studio
  + WebStorm

Tetszőleges modern kódszerkesztő használható

--------------------------

## Böngészők

- **Google Chrome**
- **Microsoft Edge**
- **Opera**
- Mozilla Firefox
- Safari

--------------------------

## Webfejlesztési eszközök

- Webfejlesztő eszköztár (F12)
    + Elemek
    + JavaScript konzol (`console`)
    + Debugger
    + Erőforrások
    + Hálózati forgalom
    + Teljesítményprofilozás
- Parancssori eszközök 

--------------------------

## Dokumentáció

- Hivatalos dokumentáció az [ECMAScript szabvány](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
- Mozilla Developer Network: JavaScript
    + [Főoldal](https://developer.mozilla.org/en-US/docs/JavaScript)
    + [JavaScript referencia](https://developer.mozilla.org/en-US/docs/JavaScript/Reference)
    + [JavaScript guide](https://developer.mozilla.org/en-US/docs/JavaScript/Guide)
    + Firefox specifikus dolgok, de a dokumentáció megfelelően jelzi

--------------------------

## Futtató környezet {data-state="new-section"}

--------------------------

## Futási környezet

A JavaScriptnek szüksége van egy futtató környezetre

- **Böngésző**
- Parancssor (Node.js)

--------------------------

## Hova írhatjuk a kódot?

- JavaScript konzolba (böngésző)
  + Az adott oldal kontextusában értelmezésre kerül
  + Kipróbálásra jó
- **HTML kódba** (böngésző)
  + Inline szkript, `<script>` tag, bárhova rakhatjuk
  + Külső állományba, `<script>` tag src attribútumával töltjük be
- Parancssori értelmezőbe (parancssor, Node.js)

--------------------------

## JavaScript kód helye

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webfejlesztés 2.</title>
    <script>
      //JavaScript kód helye
    </script>
    <script src="jskod.js"></script>
  </head>
  <body>
    <script>
      //JavaScript kód helye
    </script>
    <p>Hello világ!</p>
    <script src="jskod2.js"></script>
  </body>
</html>
```

--------------------------

## JavaScript kód helye

```html
<!doctype html>
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->
    <script src="kod.js"></script>
  </body>
</html>
```

--------------------------

## A JavaScript nyelv {data-state="new-section"}

Alapok

--------------------------

## Mintaként szolgáló nyelvek

![](../../assets/images/javascript-languages.png)

--------------------------

:::::::::::::: {.columns}
::: {.column width="50%"}
```cpp
#include <iostream>
using namespace std; 
int main() { 
  //declaration 
  const int n=5; 
  double x[]={1,3,5,7,9}; 
  double s; 
  //process
  s=0; 
  for(int i=0; i<n; i++) { 
    s=s+x[i]; 
  } 
  //write output
  cout<<"Sum: "<<s<<endl; 
  return 0; 
} 
```
<footer>C++</footer>
:::

::: {.column width="50%"}
```js
//declaration 
const x=[1,3,5,7,9];
let s;
//process 
s=0;
for(let i=0; i<x.length; i++) {
    s=s+x[i];
}
//write output 
console.log('Sum: ', s);
```
<footer>JavaScript</footer>
:::
::::::::::::::

--------------------------

:::::::::::::: {.columns}
::: {.column width="50%"}
### C++

- Erősen típusos
- Fordított
- Általános célú programozási nyelv
:::

::: {.column width="50%"}
### JavaScript

- Dinamikusan típusos
- Interpretált
- Szkriptnyelv
:::
::::::::::::::

--------------------------

## Dinamikusan típusos

- A változók típusa a benne tárolt érték típusától függ
- Vagy másképp: a típusok az értékekhez tartoznak, nem a változókhoz.
- Automatikus típuskonverziók (lehetőleg kerüljük)

```js
a = 'alma';
a = 12;
a == '12'; //true
```

--------------------------

## Interpretált

- A böngészőben futó értelmező értelmezi a JavaScript kódsorokat sorról sorra
- Nincs fordítási fázis, nem a lefordított kód fut
- Minimális előfeldolgozás történik
- A kód a hibáig lefut, ott elakad:
  + Az adott `<script>` blokk futása megáll
  + A `<script>` blokk után folytatódik az oldal betöltése

--------------------------

## További jellemzők

- Kis és nagybetűk különböznek (case sensitive)
- Nincs főprogram (`main`)
- Nincs input/output (csak API-kon keresztül)
- Nincs fájlkezelés (csak API-kon keresztül)
- Objektumorientált
- Prototípusos
- Automatikus pontosvessző beszúrás ❗

```js
let a = 12  // --> let a = 12;
a = a + 1   // --> a = a + 1;
```

--------------------------

## Típusok

:::::: {.columns}
::: {.column width="33%"}
**Primitív értékek**  

|             |
| ----------- |
| `null`      |
| `undefined` |

:::

::: {.column width="33%"}
**Egyszerű típusok**
  
|         |           |
| ------- | --------- |
| Logikai | `Boolean` |
| Szám    | `Number`  |
| Szöveg  | `String`  |
:::

::: {.column width="33%"}
**Összetett típusok**
  
|          |            |
| -------- | ---------- |
| Objektum | `Object`   |
| Tömb     | `Array`    |
| Függvény | `Function` |
:::
::::::

--------------------------

## Literálformák

Adott típus megjelenési formája

:::::::::::::: {.columns}
::: {.column}
```js
// Logikai literál
true
false

// Szám literál
12
12.34
```
:::

::: {.column}
```js
// Szöveg literál
'Szöveg'
"Szöveg"
`Szöveg`

`Tetszőleges ${kifejezés}`

'Idézőjelben "így" macsakörmölök'
"Macskakörömben 'így' idézek"
'Idézőjelben \' idézőjel'
"Macskakörömben \" macskaköröm"
'Escape: \t \n \\ '
```
:::
::::::::::::

--------------------------

## Változók

- ~~`var`~~, `let`, `const` kulcsszóval deklarálunk új változót
- Ezek elhagyásával → globális változó -- KERÜLENDŐ!!!
- Ha nincs kezdőérték → undefined

```js
let nev = 'Győző'; // 'Győző'
let masik;         // undefined
```

--------------------------

## Operátorok

- Aritmetikai operátorok
    + `+`, `-`, `*`, `/`, `%`, `++`, `--`, unáris `-`, unáris `+`
- Értékadás operátorai
    + `=`, `*=`, `/=`, `%=`, `+=`, `-=`, stb.
- Összehasonlító operátor
    + **`===`**, **`!==`**, `==`, `!=`, `>`, `>=`, `<`, `<=`
    + `===` és `!==` típus és érték szerint
    + `==` és `!=` érték szerint (automatikus konverziók)

```js
12 ==  '12'  // true
12 === '12'  // false
``` 

--------------------------

## Operátorok

- Logikai operátorok
    + `&&`, `||`, `!`
- Szövegösszefűzés operátorai
    + `+`, `+=`
- Speciális operátorok
    + `? :` feltételes operátor
    + **`,`** több kifejezés végrehajtása egy utasításban, visszatérési értéke az utolsó kifejezés

--------------------------

## Vezérlési szerkezetek

:::::::::::::: {.columns}
::: {.column width="22%"}
```js
// Elágazás
if (felt) {
  utasítások
}

if (felt) {
  utasítások
} else {
  utasítások
}
```
:::

::: {.column width="37%"}
```js
// Többirányú elágazás
switch(kifejezés) {
  case érték1:
    utasítások
    break;
  case érték2:
    utasítások
    break;
  default:
    utasítások 
}
```
:::

::: {.column width="41%"}
```js
// Ciklusok
while (felt) {
  utasítások
}

do {
  utasítások
} while (felt);

for (let i=1; i<=n; i++) {
  utasítások
}
```
:::
:::::::::::::::

--------------------------

## A JavaScript nyelv {data-state="new-section"}

Függvények

--------------------------

:::::::::::::: {.columns}
::: {.column}
```cpp
int factorial(int n) {
    int f = 1;
    for (int i=2; i<=n; i++) {
        f *= i;
    }
    return f;
}
```
<footer>C++</footer>
:::
::: {.column}
```js
function factorial(n) {
    let f = 1;
    for (let i=2; i<=n; i++) {
        f *= i;
    }
    return f;
}
```
<footer>JavaScript</footer>
:::
::::::::::::::

--------------------------

## Alapértelmezett értékek

```js
// függvénydeklarációó
function add(a, b = 3) {
  return a + b;
}

// függvényhívás
add(40, 2);      // 42
add(10);         // 13
add(50, 20, 10); // 70
add();           // NaN
```

--------------------------

## Létrehozási formák

```js
// függvénydeklaráció
function add(a, b) {
  return a + b;
}

// függvénykifejezés
const add = function (a, b) {
  return a + b;
}

// fat arrow
const add = (a, b) => {
  return a + b;
}
const add = (a, b) => a + b;
```

--------------------------

## Literálforma

```js
function (a, b) {
  return a + b;
}

// or

(a, b) => a + b;
```

--------------------------

## Függvény mint paraméter

```js
function countA(str) {
  let count = 0;
  for (const c of x) {
    if (c === 'a') {
      count++;
    }
  }
  return count;
}

console.log( countA("apple") ); // 1
```

--------------------------

## Függvény mint paraméter

```js
function count(str, fn) {
  let db = 0;
  for (const c of x) {
    if (fn(c)) {
      db++;
    }
  }
  return db;
}

console.log(
  count("apple", c => c === 'a')
);
```

--------------------------

## A JavaScript nyelv {data-state="new-section"}

Tömb

--------------------------

## Tömb

- Értékek rendezett sorozata
- Vektor, verem, sor, lista szimulálható
- JavaScriptben nagyon fontos szerepük van

--------------------------

## Létrehozás

Literálforma: `[]`

```js
// creation
const uresTomb = [];
const tomb = [12, 'alma', true];

// referencing an element
tomb[0]; // => 12;
tomb[1]; // => 'alma';
tomb[2]; // => true;

// length
tomb.length; // => 3
```

--------------------------

## Módosítás

```js
const tomb = [12, 'alma', true];

// modification
tomb[0] = 13;

// new element at the end
tomb.push("new");

// new element somewhere (not recommended)
tomb[100] = 'far away';
tomb.length; // => 101
tomb[99]; // => undefined

// deleting (size remains the same)
delete tomb[1];
tomb[1]; // => undefined
tomb.length; // => 101
```

--------------------------

## Mátrix

Tömbök tömbje

```js
const m = [
  [1, 2, 3], 
  [4, 5, 6],
];

m[1][2]; // => 6
```

--------------------------

## Iteratív feldolgozás

```js
const gyumolcsok = [
  'alma',
  'korte',
  'szilva'
];

//A gyümölcsök kiírása a konzolra
for (let i = 0; i < gyumolcsok.length; i++) {
  console.log(gyumolcsok[i]);
}

// for..of ciklus (ES6)
for (const gyumolcs of gyumolcsok) {
  console.log(gyumolcs);
}
```

--------------------------

## Tömb műveletek

- `pop()`, `push(e)`, `shift(e)`, `unshift()`
    - végéről, végére, elejére,elejéről
- `reverse()`
    - megfordít
- `splice(honnan, mennyit)`
    - kivág
- `join(szeparátor)`
    - szöveggé fűz
- `indexOf(elem)`
    - keresés
- `includes(elem)`
    - eldöntés

--------------------------

```js
const t = [1, 2, 3, 4, 5];

t.push(6);      // [1, 2, 3, 4, 5, 6]
t.pop();        // --> 6, [1, 2, 3, 4, 5]
t.unshift(0);   // [0, 1, 2, 3, 4, 5]
t.shift();      // --> 0, [1, 2, 3, 4, 5]
t.reverse();    // [5, 4, 3, 2, 1]
t.splice(2, 1); // [5, 4, 2, 1]
t.join('###');  // "5###4###2###1"
```

--------------------------

## Tömbfüggvények

Programozási tételek megvalósítása

- `forEach`: általános ciklus
- `some`: eldöntés
- `every`: optimista eldöntés
- `map`: másolás
- `filter`: kiválogatás
- `reduce`: összegzés (sorozatszámítás)
- `find`: keresés (elem)
- `findIndex`: keresés (index)

--------------------------

## Példa -- kiválogatás

```js
const numbers = [1, 2, 3, 4, 5];

function filter(x, fn) {
  const out = [];
  for (const e of x) {
    if (fn(e)) {
        out.push(e);
    }
  }
  return out;
}
const evens = filter(numbers, e =>e % 2 === 0);

// instead

const evens = numbers.filter(e =>e % 2 === 0);
```

--------------------------

## Példa -- összegzés

```js
function sum(x) {
  let s = 0;
  for (const e of x) {
    s = s + e;
  }
  return s;
}

// instead

x.reduce((s, e) => s + e, 0);
```

--------------------------

## Destructuring and spread

```js
const numbers = [1, 2, 3, 4, 5];
const a = numbers[0];
const b = numbers[1];

// instead
const [a, b] = numbers;

// default values
const [a = 10, b = 20] = [100] // a:100, b:20

// rest
const [a, b, ...rest] = numbers; // --> rest:[3, 4, 5]

// swapping variables
[a, b] = [b, a]

// ignoring
const [a,,b] = numbers; // a:1, b:3

// spread
const a = [1, 2, 3];
const b = [9, ...a, 10]; // b:[9, 1, 2, 3, 10]
```

--------------------------

## A JavaScript nyelv {data-state="new-section"}

Objektum

--------------------------

## Objektum

- Kulcs-érték párok gyűjteménye
- Asszociatív tömbhöz hasonlít (hash)
- Rekord, osztálypéldány szimulálható
- JavaScriptben nagyon fontos szerepük van
- Majdnem minden objektum
- Ha az érték függvény → metódus

--------------------------

## Létrehozás

Literálforma: `{ }`

```js
// creation
const uresObj = {};
const obj = {
  mezo1: 12,
  'mezo2': 'alma',
};

// referencing
obj.mezo1;      // => 12
obj['mezo1'];   // => 12
```

--------------------------

## Módosítás

```js
const obj = {
  mezo1: 12,
  'mezo2': 'alma',
};

// modification
obj.mezo2 = 'korte';

// extending
obj.mezo3 = true;

// deletion
delete obj.mezo1;
obj.mezo1; // => undefined
```

--------------------------

## Metódus (függvény mint adattag)

```js
const obj = {
  data: 42,
  metodus: function () {
    console.log('Foo: ', this.data);
  },
  metodus2() {
    console.log('Foo: ', this.data);
  }
};

obj.metodus();
obj.metodus2();
```

--------------------------

## Getter és setter

```js
const obj = {
  _data: 42,
  get data() {
    return _data;
  },
  set data(value) {
    _data = value;
  }
};

obj.data = 52;
obj.data; // 52
```

--------------------------

## Dinamikus mezőnév

```js
// Computed property names
const prop = 'foo';
const o = {
  [prop]: 'something',
  ['b' + 'ar']: 'new'
};

o.foo; // 'something'
o.bar; // 'new'
```

--------------------------

## Példák

:::::::::::::: {.columns}
::: {.column}
```js
//Tömb az objektumban
const zsofi = {
  kor: 7,
  kedvencEtelek: [
    'krumplipüré',
    'rántott hús',
    'tejberizs'
  ]
};
//Elem elérése
zsofi.kedvencEtelek[1]; 
// => 'rántott hús'
```
:::

::: {.column}
```js
//Objektum az objektumban
const david = {
  kor: 4,
  cim: {
    iranyitoszam: '1241',
    varos: 'Budapest',
    utca: 'Egyszervolt utca',
    hazszam: 63
  }
};
//Elem elérése
david.cim.utca; 
// => 'Egyszervolt utca'
```
:::
::::::::::::::

--------------------------

## Feldolgozás

```js
const matyi = {
  kor: 1.5,
  fiu: true,
  cuki: true
}

// Feldolgozás a for..in ciklussal
for (const i in matyi) {
  console.log(i, matyi[i]);
}
// Eredmény
// => kor 1.5
// => fiu true
// => cuki true
```

--------------------------

## Adatszerkezetek modellezése

:::::::::::::: {.columns}
::: {.column width="50%"}
```js
//C++ vector --> JS tömb
const kutyuk = [
  'telefon',
  'fülhallgató',
  'pendrive',
  'e-könyv olvasó'
];
```

```js
//C++ struct --> JS objektum
const hallgato = {
  nev: 'Mosolygó Napsugár',
  neptun: 'kod123',
  szak: 'Informatika BSc'
};
```
:::

::: {.column width="50%"}
```js
//Rekordok tömbje
const hallgatok = [
  {
    nev: 'Mosolygó Napsugár',
    neptun: 'kod123',
    szak: 'Informatika BSc'
  },
  {
    nev: 'Kék Ibolya',
    neptun: 'kod456',
    szak: 'Informatika BSc'
  }
];
```
:::
:::::::::::::::

--------------------------

## Adatszerkezetek modellezése

```js
//Tömböt tartalmazó rekordok tömbje
const hallgatok = [
  {
    nev: 'Mosolygó Napsugár',
    neptun: 'kod123',
    szak: 'Informatika BSc',
    targyak: [
      'Programozás',
      'Webfejlesztés 2.',
      'Számítógépes alapismeretek'
    ]
  },
  {
    nev: 'Kék Ibolya',
    neptun: 'kod456',
    szak: 'Informatika BSc',
    targyak: [
      'Programozás',
      'Webfejlesztés 2.',
      'Diszkrét matematika',
      'Testnevelés'
    ]
  }
];
```

--------------------------

## Destructuring and spread

```js
const o = {
  a: 42,
  b: 28,
}
const a = o.a
const b = o.b

// instead
const {a, b} = o;

// renaming
const {a: c, b: d} = o;

// default values
const {a = 10, b = 20} = {a: 42};
const {a: c = 10, b: d = 20} = {a: 42};

// rest
const o = {
  a: 42,
  b: 28,
  c: 12
};
const {a, ...rest} = o; // rest={b:28, c:12}
```

--------------------------

## Destructuring and spread

```js
// nested objects
const david = {
  kor: 4,
  cim: {
    iranyitoszam: '1241',
    varos: 'Budapest',
    utca: 'Egyszervolt utca',
    hazszam: 63
  }
};
const { cim: { utca }} = david
```

--------------------------

## `class` (ES6)

```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
```

--------------------------

## `class` -- publikus mezők

```js
class Product {
  name;
  tax = 0.2;
  basePrice = 0;
  price;

  constructor(name, basePrice) {
    this.name = name;
    this.basePrice = basePrice;
    this.price = (basePrice * (1 + this.tax)).toFixed(2);
  }
}
```

--------------------------

## Összefoglalás {data-state="topic"}

- C++ → JavaScript
- Adatszerkezetek
    + egyszerű: logikai, szám, szöveg
    + összetett: tömb, objektum, függvény
- Programozási tételek tömbfüggvényekként