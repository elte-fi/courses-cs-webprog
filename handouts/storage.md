# A `Storage` osztályok használata

- [Újrahasználható kód](#%c3%9ajrahaszn%c3%a1lhat%c3%b3-k%c3%b3d)
- [Rendelkezésre álló `Storage` osztályok](#rendelkez%c3%a9sre-%c3%a1ll%c3%b3-storage-oszt%c3%a1lyok)
- [Alapvető használat](#alapvet%c5%91-haszn%c3%a1lat)
- [Metódus referencia](#met%c3%b3dus-referencia)
  - [`__construct($data_file)`](#constructdatafile)
  - [`add($record)`](#addrecord)
  - [`findById($id)`](#findbyidid)
  - [`findAll($filter = [])`](#findallfilter)
  - [`findOne($filter = [])`](#findonefilter)
  - [`query($predicate)`](#querypredicate)
  - [`update($id, $record)`](#updateid-record)
  - [`delete($id)`](#deleteid)

## Újrahasználható kód

```php
interface IFileIO {
  function save();
  function load();
}

interface IStorage {
  function add($record);
  function findById($id);
  function findAll($params = []);
  function findOne($params = []);
  function query($condition);
  function update($id, $record);
  function delete($id);
}

abstract class Storage implements IStorage, IFileIO {
  protected $contents;
  protected $filepath;

  abstract function load();
  abstract function save();

  public function __construct($filename) {
    if (!is_readable($filename) || !is_writable($filename)) {
      throw new Exception("Data source ${filename} is invalid.");
    }

    $this->filepath = realpath($filename);
    $this->load();
  }

  public function __destruct() {
    $this->save();
  }

  public function add($record) {
    $id = uniqid();
    $this->contents[$id] = $record;
    return $id;
  }

  public function findById($id) {
    return $this->contents[$id] ?? NULL;
  }

  public function findAll($params = []) {
    return array_filter($this->contents, function ($item) use ($params) {
      foreach ($params as $key => $value) {
        if ($item[$key] !== $value) {
          return FALSE;
        }
      }

      return TRUE;
    });
  }

  public function findOne($params = []) {
    $found_items = $this->findAll($params);
    $first_index = array_keys($found_items)[0] ?? NULL;
    return $found_items[$first_index] ?? NULL;
  }

  public function query($condition) {
    return array_filter($this->contents, $condition);
  }

  public function update($id, $record) {
    $this->contents[$id] = $record;
  }

  public function delete($id) {
    unset($this->contents[$id]);
  }
}

abstract class ObjectStorage extends Storage {
  public function findAll($params = []) {
    return array_filter($this->contents, function ($item) use ($params) {
      foreach ($params as $key => $value) {
        if ($item->$key !== $value) {
          return FALSE;
        }
      }

      return TRUE;
    });
  }
}

class JsonStorage extends Storage {
  public function load() {
    $file_contents = file_get_contents($this->filepath);
    $this->contents = json_decode($file_contents, TRUE) ?: [];
  }

  public function save() {
    $json_content = json_encode($this->contents, JSON_PRETTY_PRINT);
    file_put_contents($this->filepath, $json_content);
  }
}

class SerializeStorage extends Storage {
  public function load() {
    $file_contents = file_get_contents($this->filepath);
    $this->contents = unserialize($file_contents) ?: [];
  }

  public function save() {
    $file_content = serialize($this->contents);
    file_put_contents($this->filepath, $file_content);
  }
}

class SerializeObjectStorage extends ObjectStorage {
  public function load() {
    $file_contents = file_get_contents($this->filepath);
    $this->contents = unserialize($file_contents) ?: [];
  }

  public function save() {
    $file_content = serialize($this->contents);
    file_put_contents($this->filepath, $file_content);
  }
}
```

## Rendelkezésre álló `Storage` osztályok

- `JsonStorage`: JSON formátumban tárolja az adatokat, típusinformációk (osztályok) elvesznek.
- `SerializeStorage`: a PHP saját formátumában tárolja az adatokat, az alapvető típusokat megőrzi, de PHP objektumokat (osztálypéldányokat) tárolva a keresések nem működnek.
- `SerializeObjectStorage`: a PHP saját formátumában tárolja az adatokat, objektumokat feltételezve. Akkor kell használni, ha a tárolt adatokat osztálypéldányokként kívánjuk tárolni.

## Alapvető használat

1. Hozzunk létre egy adatfájlt (praktikusan külön mappában, pl. `storage`)! Az adatfájl kiterjesztése bármi lehet, de `JsonStorage` esetén érdemes a `.json` kiterjesztést használni.
2. Adjunk írási és olvasási jogot az adatfájlra a webszervernek (webprogramozás szerveren az "other" jogosultságcsoport)!
3. Töltsük be az adatfájlt PHP-ban a megfelelő `Storage` osztály példányosításával!
   ```php
   $item_storage = new JsonStorage(`storage/items.json`);
   ```
4. Dolgozzunk az adatokkal a `Storage` beépített metódusaival.

## Metódus referencia

### `__construct($data_file)`

Konstruktor, adatfájl betöltése a memóriába.

#### Paraméterek

| név          | típus  | leírás                   |
| ------------ | ------ | ------------------------ |
| `$data_file` | string | az adatfájl elérési útja |

#### Visszatérési érték

`Storage`: Az adott adatfájl adatait tartalmazó `Storage` objektum.

#### Példa

```php
$item_storage = new JsonStorage(`storage/items.json`);
```

### `add($record)`

Új elem felvétele az adatfájlba.

#### Paraméterek

| név       | típus         | leírás                 |
| --------- | ------------- | ---------------------- |
| `$record` | any \| object | az eltárolandó elem`*` |

`*` : `ObjectStorage` esetén mindenképpen objektumpéldány

#### Visszatérési érték

`string` : A beszúrt elem azonosítója.

#### Példa

```php
// a $record beszúrása az adatfájlba
$record = [ "foo" => "bar" ];
$id = $item_storage->add($record);
```

### `findById($id)`

Adott azonosítójú elem lekérdezése az adatfájlból.

#### Paraméterek

| név   | típus  | leírás                      |
| ----- | ------ | --------------------------- |
| `$id` | string | a keresett elem azonosítója |

#### Visszatérési érték

`any | NULL` : A megtalált elem vagy `NULL` ha az elem nem található.

#### Példa

```php
// Az "5eaee68181871" azonosítójú elem lekérdezése
$id = "5eaee68181871";
$item = $item_storage->findById($id);
```

### `findAll($filter = [])`

Az összes, a megadott kritériumot teljesítő elem lekérdezése az adatfájlból. 

#### Paraméterek

| név       | típus | leírás                                     |
| --------- | ----- | ------------------------------------------ |
| `$filter` | array | név-érték párok halmaza, keresési feltétel |

#### Visszatérési érték

`array` : A megtalált elemek tömbje. Ha nincs találat, akkor üres tömb.

#### Példa

```php
// Összes elem lekérdezése
$all_items = $item_storage->findAll();
// Azon elemek lekérdezése, ahol a "foo" mező értéke "bar"
$search_results = $item_storage->findAll([
  "foo" => "bar"
]);
```

### `findOne($filter = [])`

Az első olyan elem lekérdezése az adatfájlból, ami teljesíti a megadott kritériumot. 

#### Paraméterek

| név       | típus | leírás                                     |
| --------- | ----- | ------------------------------------------ |
| `$filter` | array | név-érték párok halmaza, keresési feltétel |

#### Visszatérési érték

`any | NULL` : A megtalált elem. Ha nincs találat, akkor `NULL`.

#### Példa

```php
// Az első olyan elem lekérdezése, ahol a "foo" mező értéke "bar"
$search_results = $item_storage->findOne([
  "foo" => "bar"
]);
```

### `query($predicate)`

Az összes olyan elem lekérdezése az adatfájlból, amire teljesül egy megadott függvény-feltétel. 

#### Paraméterek

| név          | típus    | leírás                                                             |
| ------------ | -------- | ------------------------------------------------------------------ |
| `$predicate` | callable | bool-nal visszatérő függvény, ami eldönti egy elemről, hogy kell-e |

#### Visszatérési érték

`array`: A függvényfeltételt teljesítő elemek tömbje. Ha nincs találat, akkor üres tömb.

#### Példa

```php
// Az összes olyan elem lekérdezése, ahol a "foo" mező értéke 2-vel oszható
$search_results = $item_storage->query(function ($elem) {
  return $elem["foo"] % 2 === 0;
});
```

### `update($id, $record)`

Adott azonosítójú elem frissítése az adatfájlban.

#### Paraméterek

| név       | típus  | leírás                                                  |
| --------- | ------ | ------------------------------------------------------- |
| `$id`     | string | a frissítendő elem azonosítója                          |
| `$record` | any    | a rekord, amivel felülírjuk az adott azonosítójú elemet |

#### Visszatérési érték

`void`: Nincs visszatérési érték.

#### Példa

```php
// A "5eaee68181871" id-jú elem felülírása a $new_record változóval.
$id = "5eaee68181871";
$new_record = [ "foo" => "bar" ];
$item_storage->update($id, $new_record);
```

### `delete($id)`

Adott azonosítójú elem törlése az adatfájlból.

#### Paraméterek

| név   | típus  | leírás                      |
| ----- | ------ | --------------------------- |
| `$id` | string | a törlendő elem azonosítója |

#### Visszatérési érték

`void`: Nincs visszatérési érték.

#### Példa

```php
// Az "5eaee68181871" id-jú elem törlése.
$id = "5eaee68181871";
$item_storage->delete($id);
```