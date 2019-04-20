<?php

namespace Notapp\Models\Notes;

class Notes {

  // Database porperties

  private $conn;
  private $table = 'Notes';

  // Notes properties

  public $id;
  public $title;
  public $description;

  // Constructor with database as a parameter

  public function __construct($db) {
    $this->conn = $db;
  }

  // Function to read all notes in the database

  public function read() {

    // If it has an id we'll read only a single one, else we read it all

    if ( $this->id ) {
      $query = "SELECT * FROM $this->table WHERE id = $this->id LIMIT 0,1";
    }
    else {
      $query = "SELECT * FROM $this->table ORDER BY last_modified DESC";
    }

    $stmt = $this->conn->prepare( $query );
    $stmt->execute();
    return $stmt;

  }

  public function create() {

    $query = "INSERT INTO $this->table SET title = ?, description = ?";
    $stmt = $this->conn->prepare( $query );

    if( $this->title && $stmt->execute( array( $this->title, $this->description ) ) ) {
      return true;
    }

    // Print error if something goes wrong

    print 'An Error Occurred';

    return false;

  }

  public function update() {

    $query = "UPDATE $this->table
              SET title = ?, description = ?, last_modified = CURRENT_TIME
              WHERE id = ?";
    $stmt = $this->conn->prepare( $query );

    if( $this->id && $this->title && $stmt->execute( array( $this->title, $this->description, $this->id ) ) ) {
      return true;
    }

    // Print error if something goes wrong

    print 'An Error Occurred';

    return false;

  }

  public function delete() {

    $query = "DELETE FROM $this->table WHERE id = ?";
    $stmt = $this->conn->prepare( $query );

    if ( $this->id && $stmt->execute( array( $this->id ) ) ) {
      return true;
    }

    print 'An Error Occurred';

    return false;

  }

}
