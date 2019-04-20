<?php

include_once '../config/Database.php';
include_once '../models/Notes.php';

use \Notapp\Database\Database as DB;
use \Notapp\Models\Notes\Notes as Notes;

// Configuring headers

header( 'Access-Control-Allow-Origin: *' );
header( 'Content-Type: application/json' );

// Instantiate and connect the database

$database = (new DB())->connect();

// Instatiate note object

$note = new Notes( $database );

// If we receive an id in the url, we'll read only this id entry

if ( isset( $_GET['id'] ) && is_numeric( $_GET['id'] ) ) {

  // We'll use htmlentities() here just to prevent any kind of XSS through URL
  $note->id = (int)htmlentities( $_GET['id'] );
}

// Notes query

$result = $note->read();

// Checking if there are any notes to return

if ( $result->rowCount() ) {

  // Notes array
  $notesArr = array(
    'data' => array(),
    'status' => 1
  );

  while( $row = $result->fetch( PDO::FETCH_ASSOC ) ) {

    // Looping through each item and pushing it to the 'data' array

    extract( $row );
    $noteItem = array(
      'id' => $id,
      'title' => $title,
      'description' => html_entity_decode( $description ),
      'last_modified' => $last_modified
    );
    array_push( $notesArr['data'], $noteItem );

  }

  // Turning data to json and outputing it
  echo json_encode( $notesArr );

}
else {
  // If no posts, return a warning message
  echo json_encode(
    array(
      'message' => 'No notes found',
      'status' => 0
    )
  );
}
