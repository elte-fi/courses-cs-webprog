# Usage of the `AuthStorage` classes

- [Usage of the `AuthStorage` classes](#usage-of-the-authstorage-classes)
  - [Reusable code](#reusable-code)
  - [Available classes](#available-classes)
  - [Alapvető használat](#alapvető-használat)
  - [Method reference](#method-reference)
    - [restore()](#restore)
    - [register($username, $password, $fullname)](#registerusername-password-fullname)
      - [Parameters](#parameters)
      - [Return value](#return-value)
      - [Example](#example)
    - [authenticate($username, $password)](#authenticateusername-password)
      - [Return value](#return-value-1)
      - [Example](#example-1)
    - [isAuthenticated()](#isauthenticated)
      - [Return value](#return-value-2)
      - [Example](#example-2)
    - [authorize($roles = [])](#authorizeroles--)
      - [Parameters](#parameters-1)
      - [Return value](#return-value-3)
      - [Example](#example-3)
    - [login($user_id)](#loginuser_id)
      - [Parameters](#parameters-2)
      - [Example](#example-4)
    - [logout()](#logout)

## Reusable code

<details>
  <summary>
    <code>User</code>
  </summary>

  ```php
  class User {
    public $username;
    public $fullname;
    public $roles;
    private $password;

    public function __construct($username, $password, $fullname, $roles = ["user"]) {
      $this->username = $username;
      $this->password = $password;
      $this->fullname = $fullname;
      $this->roles = $roles;
    }

    public function hasRole($role) {
      return in_array($role, $this->roles);
    }

    public function verifyPassword($password) {
      return password_verify($password, $this->password);
    }
  }
  ```
</details>

<details>
  <summary>
    <code>IAuthStorage</code>,
    <code>UserStorage</code>,
    <code>UserObjectStorage</code>
  </summary>

  ```php
  interface IAuthStorage {
    public function restore();
    public function register($username, $password, $fullname);
    public function authenticate($username, $password);
    public function authorize($roles = []);
    public function isAuthenticated();
    public function login($user_id);
    public function logout();
  }

  class UserStorage extends JsonStorage implements IAuthStorage {
    public $user = NULL;
    public $userId = NULL;

    public function __construct($data_file = "storage/users.json") {
      parent::__construct($data_file);
      $this->restore();
    }

    public function restore() {
      if (isset($_SESSION["user-id"])) {
        $user_id = $_SESSION["user-id"];
        $this->user = $this->findById($user_id);
        $this->userId = $user_id;
      }
    }

    public function register($username, $password, $fullname) {
      $user = [
        "username" => $username,
        "password" => password_hash($password, PASSWORD_DEFAULT),
        "fullname" => $fullname,
        "roles" => ["user"]
      ];

      return $this->add($user);
    }

    public function authenticate($username, $password) {
      $users = $this->query(function ($user) use ($username, $password) {
        return $user["username"] === $username && password_verify($password, $user["password"]);
      });

      if (empty($users)) {
        return FALSE;
      }

      $user_id = array_keys($users)[0];
      return $user_id;
    }

    public function isAuthenticated() {
      return !is_null($this->user);
    }

    public function authorize($roles = []) {
      if (!$this->isAuthenticated()) {
        return FALSE;
      }

      foreach ($roles as $role) {
        if (in_array($role, $this->user["roles"])) {
          return TRUE;
        }
      }

      return FALSE;
    }

    public function login($user_id) {
      $this->user = $this->findById($user_id);
      $this->userId = $user_id;
      $_SESSION["user-id"] = $user_id;
    }

    public function logout() {
      $this->user = NULL;
      $this->userId = NULL;
      unset($_SESSION["user-id"]);
    }
  }

  class UserObjectStorage extends SerializeObjectStorage implements IAuthStorage {
    public $user = NULL;
    public $userId = NULL;

    public function __construct($data_file = "storage/users.storage") {
      parent::__construct($data_file);
      $this->restore();
    }

    public function restore() {
      if (isset($_SESSION["user-id"])) {
        $user_id = $_SESSION["user-id"];
        $this->user = $this->findById($user_id);
      }
    }

    public function register($username, $password, $fullname) {
      $password_hash = password_hash($password, PASSWORD_DEFAULT);
      $user = new User($username, $password, $fullname);
      return $this->add($user);
    }

    public function authenticate($username, $password) {
      $users = $this->query(function ($user) use ($username, $password) {
        return $user->username === $username && $user->verifyPassword($password);
      });

      if (empty($users)) {
        return FALSE;
      }

      $user_id = array_keys($users)[0];
      return $user_id;
    }

    public function isAuthenticated() {
      return !is_null($this->user);
    }

    public function authorize($roles = []) {
      if (!$this->isAuthenticated()) {
        return FALSE;
      }

      foreach ($roles as $role) {
        if ($this->user->hasRole($role)) {
          return TRUE;
        }
      }

      return FALSE;
    }

    public function login($user_id) {
      $this->user = $this->findById($user_id);
      $this->userId = $user_id;
      $_SESSION["user-id"] = $user_id;
    }

    public function logout() {
      $this->user = NULL;
      $this->userId = NULL;
      unset($_SESSION["user-id"]);
    }
  }
  ```

</details>

## Available classes

- `UserStorage`: Extension of the `JsonStorage` class. Implements user handling with arrays when using JSON storage.
- `UserObjectStorage`: Extends the `SerializeObjectStorage` class.Implements user handling with classes and objects while using "serialize" storage.
- `User`: A class representing an user, used by `UserObjectStorage`

## Alapvető használat

1. Create a data file for the users (`storage/users.json` or `storage/users.storage`)!
2. Set read and write permissions for the web server (the "other" group on `webprogramozas.inf.elte.hu`)!
3. Start the session!
   ```php
   session_start();
   ```
4. Load the users into PHP with creating the necessary `AuthStorage` object!
   ```php
   $user_storage = new UserStorage();
   ```
5. Work with the methods of the `IAuthStorage` interface.

## Method reference

### restore()

Restores the logged in user from session. Called by the constructor.

### register($username, $password, $fullname)

Registers a new user with the given username, password and full name.

#### Parameters

| name        | type   | description                        |
| ----------- | ------ | ---------------------------------- |
| `$username` | string | username of the user               |
| `$password` | string | password of the user in plain text |
| `$fullname` | string | full name of the user              |

#### Return value

`$user_id`: ID of the newly registered user.

#### Example

```php
$han_id = $user_storage->register("hansolo", "iloveyou.iknow", "Han Solo");
```

### authenticate($username, $password)

Authenticating an user with checking the username-password combination

| name        | type   | description                 |
| ----------- | ------ | --------------------------- |
| `$username` | string | user name                   |
| `$password` | string | user password in plain text |

#### Return value

`string` | `FALSE`: The ID of the user is authentication was successful, otherwise `FALSE`

#### Example

```php
$leia = $user_storage->authenticate("princessleia", "scruffylookingnerfherder11");
if ($leia) {
  print("Login successful");
} else {
  print("login failed");
}
```

### isAuthenticated()

Check if someone is logged in.

#### Return value

`bool` : `TRUE`, if someone is logged in, otherwise `FALSE`.

#### Example

```php
if ($user_storage->isAuthenticated()) {
  print("Logged in: " . $user_storage->user["fullname"]);
} else {
  print("You're not logged in");
}
```

### authorize($roles = [])

Checks if the logged in user has any of the queried roles.

#### Parameters

| name     | type  | description             |
| -------- | ----- | ----------------------- |
| `$roles` | array | array of possible roles |

#### Return value

`bool`: `FALSE`, if noone is logged in or the user has none of the queried roles, `TRUE` otherwise.

#### Example

```php
if(!$user_storage->authorize(["admin"])) {
  print("Only admins can come here");
}
```

### login($user_id)

Logs in an user with the given ID and stores login information in the session.

#### Parameters

| name       | type   | description    |
| ---------- | ------ | -------------- |
| `$user_id` | string | ID of the user |

#### Example

```php
$user_storage->login($han_id);
```

### logout()

Logs out the user and clears login information from session.

