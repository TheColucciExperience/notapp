<?php

namespace Notapp\Database;

use PDO;

class Database {

  // Database parameters

  private $host = 'localhost';
  private $dbname = 'notapp';
  private $username = 'root';
  private $password = 'toor';
  private $conn;

  // Database connection

  public function connect() {
    $this->conn = null;

    // Try-catch to see if we can connect to the database;

    try {
      $this->conn = new PDO( "mysql:host=$this->host;dbname=$this->dbname;",
                              $this->username, $this->password );
      $this->conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    } catch (PDOException $e) {
      echo 'Connection error: ' . $e->getMessage();
    }

    return $this->conn;

  }

}
