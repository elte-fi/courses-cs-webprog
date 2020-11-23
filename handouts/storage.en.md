# Usage of the `Storage` classes

- [Usage of the `Storage` classes](#usage-of-the-storage-classes)
  - [Reusable code](#reusable-code)
  - [Available `Storage` classes](#available-storage-classes)
  - [Basic usage](#basic-usage)
  - [Method reference](#method-reference)
    - [`__construct($data_file)`](#__constructdata_file)
      - [Parameters](#parameters)
      - [Return value](#return-value)
      - [Example](#example)
    - [`add($record)`](#addrecord)
      - [Parameters](#parameters-1)
      - [Return value](#return-value-1)
      - [Example](#example-1)
    - [`findById($id)`](#findbyidid)
      - [Parameters](#parameters-2)
      - [Return value](#return-value-2)
      - [Example](#example-2)
    - [`findAll($filter = [])`](#findallfilter--)
      - [Parameters](#parameters-3)
      - [Return value](#return-value-3)
      - [Example](#example-3)
    - [`findOne($filter = [])`](#findonefilter--)
      - [Parameters](#parameters-4)
      - [Return value](#return-value-4)
      - [Example](#example-4)
    - [`query($predicate)`](#querypredicate)
      - [Parameters](#parameters-5)
      - [Return value](#return-value-5)
      - [Example](#example-5)
    - [`update($id, $record)`](#updateid-record)
      - [Parameters](#parameters-6)
      - [Return value](#return-value-6)
      - [Example](#example-6)
    - [`delete($id)`](#deleteid)
      - [Parameters](#parameters-7)
      - [Return value](#return-value-7)
      - [Example](#example-7)

## Reusable code

<details>
  <summary>
    <code>IFileIO</code>
    <code>IStorage</code>
    <code>Storage</code>
    <code>JsonStorage</code>
    <code>SerializeStorage</code>
    <code>SerializeObjectStorage</code>
  </summary>

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

</details>

## Available `Storage` classes

- `JsonStorage`: Stores data in JSON format **without** retaing type information.
- `SerializeStorage`: Stores data in PHP's own format. Retains basic types, but when storing PHP objects (class instances), the search methods won't work.
- `SerializeObjectStorage`: Stores data in PHP's own format, and assumes data is class instances. Use this when you want to store PHP objects.

## Basic usage

1. Create the data file (recommended in a separate folder, eg. `storage/`)! The file extension can be anything, but when using `JsonStorage`, `.json` is recommended.
2. Set read and write permissions for the web server (the "other" group on `webprogramozas.inf.elte.hu`)!
3. Load the data file in PHP by instantiating the correct `Storage` class!
   ```php
   $item_storage = new JsonStorage(`storage/items.json`);
   ```
4. Use the `IStorage` interface's methods.

## Method reference

### `__construct($data_file)`

Constructor, loads the data file into memory.

#### Parameters

| name         | type   | description           |
| ------------ | ------ | --------------------- |
| `$data_file` | string | path of the data file |

#### Return value

`Storage`: The `Storage` object containing entries of the given data file.

#### Example

```php
$item_storage = new JsonStorage(`storage/items.json`);
```

### `add($record)`

Adds a new element into the data file.

#### Parameters

| name      | type          | description                 |
| --------- | ------------- | --------------------------- |
| `$record` | any \| object | The element to be stored`*` |

`*` : if using `ObjectStorage`, it has to be an object!

#### Return value

`string` : The ID of the inserted element

#### Example

```php
// insert $record to the data file
$record = [ "foo" => "bar" ];
$id = $item_storage->add($record);
```

### `findById($id)`

Query an element from the data source with the given ID

#### Parameters

| name  | type   | description                    |
| ----- | ------ | ------------------------------ |
| `$id` | string | the ID of the searched element |

#### Return value

`any | NULL` : The found element or `NULL` if it cannot be found.

#### Example

```php
// Find the element with ID "5eaee68181871"
$id = "5eaee68181871";
$item = $item_storage->findById($id);
```

### `findAll($filter = [])`

Find all elements in the data file which match the criteria.

#### Parameters

| name      | type  | description                                 |
| --------- | ----- | ------------------------------------------- |
| `$filter` | array | set of key-value pairs, the search criteria |

#### Return value

`array` : Array containing the found elements. Empty if no element matched the criteria.

#### Example

```php
// Query all elements
$all_items = $item_storage->findAll();
// Query all elements where the "foo" field's value is "bar"
$search_results = $item_storage->findAll([
  "foo" => "bar"
]);
```

### `findOne($filter = [])`

Find the first element in the data file which matches the criteria.  

#### Parameters

| name      | type  | description                                 |
| --------- | ----- | ------------------------------------------- |
| `$filter` | array | set of key-value pairs, the search criteria |

#### Return value

`any | NULL` : The found element. If no element matched the criteria, `NULL`.

#### Example

```php
// Find the first element where, ahol "foo" is "bar"
$search_results = $item_storage->findOne([
  "foo" => "bar"
]);
```

### `query($predicate)`

Find all elements in the data file which return `TRUE` from the provided function-condition.

#### Parameters

| name         | type     | description                                                      |
| ------------ | -------- | ---------------------------------------------------------------- |
| `$predicate` | callable | a function returning bool, which decides if an element is needed |

#### Return value

`array`: The array of elements which matched the criteria. Empty if no match was found.

#### Example

```php
// All elements where the value of the "foo" field is divisible by 2
$search_results = $item_storage->query(function ($elem) {
  return $elem["foo"] % 2 === 0;
});
```

### `update($id, $record)`

Update the record with the given ID in the data file

#### Parameters

| name      | type   | description                                                |
| --------- | ------ | ---------------------------------------------------------- |
| `$id`     | string | ID of the element to be updated                            |
| `$record` | any    | the record which will take place of the record in given ID |

#### Return value

`void`: No return value.

#### Example

```php
// Overwrite element "5eaee68181871" with $new_record
$id = "5eaee68181871";
$new_record = [ "foo" => "bar" ];
$item_storage->update($id, $new_record);
```

### `delete($id)`

Deletes the record with the given ID from the data file.

#### Parameters

| name  | type   | description                    |
| ----- | ------ | ------------------------------ |
| `$id` | string | ID of the element for deletion |

#### Return value

`void`: No return value.

#### Example

```php
// Delete element ID "5eaee68181871"
$id = "5eaee68181871";
$item_storage->delete($id);
```