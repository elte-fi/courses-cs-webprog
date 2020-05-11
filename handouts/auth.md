# Az `AuthStorage` osztályok használata

- [Újrahasználható kód](#%c3%9ajrahaszn%c3%a1lhat%c3%b3-k%c3%b3d)
- [Rendelkezésre álló osztályok](#rendelkez%c3%a9sre-%c3%a1ll%c3%b3-oszt%c3%a1lyok)
- [Alapvető használat](#alapvet%c5%91-haszn%c3%a1lat)
- [Metódus referencia](#met%c3%b3dus-referencia)

## Újrahasználható kód

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
    public function isAuthenticated();
    public function login($user_id);
    public function logout();
  }

  class UserStorage extends JsonStorage implements IAuthStorage {
    public $user = NULL;
    public $userId = NULL;

    public function __construct() {
      parent::__construct("storage/users.json");
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

    public function __construct() {
      parent::__construct("storage/users.storage");
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

## Rendelkezésre álló osztályok

- `UserStorage`: a `JsonStorage` osztály kiterjesztése, felhasználók tömbökkel való kezelését valósítja meg JSON tárolás esetén
- `UserObjectStorage`: a `SerializeObjectStorage` osztály kiterjesztése, felhasználók osztályokkal és objektumokkal való kezelését valósítja meg "serialize" tárolás esetén
- `User`: egy felhasználót reprezentáló osztály, ezt használja a `UserObjectStorage`

## Alapvető használat

1. Hozzuk létre a felhasználók tárolásához szükséges adatfájlt (`storage/users.json` vagy `storage/users.storage`)!
2. Adjunk írási és olvasási jogot az adatfájlra a webszervernek (webprogramozás szerveren az "other" jogosultságcsoport)!
3. Indítsuk el a munkamenetet!
   ```php
   session_start();
   ```
4. Töltsük be a felhasználókat PHP-ban a megfelelő `AuthStorage` osztály példányosításával!
   ```php
   $user_storage = new UserStorage();
   ```
5. Dolgozzunk az `IAuthStorage` interfész metódusaival.

## Metódus referencia