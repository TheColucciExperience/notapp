<?php

include_once '../config/Database.php';
include_once '../models/Notes.php';

use \Notapp\Database\Database as DB;
use \Notapp\Models\Notes\Notes as Notes;

// Configuring headers

header( 'Access-Control-Allow-Origin: *' );
header( 'Content-Type: application/json' );
header( 'Access-Control-Allow-Methods: PUT' );
header( 'Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Authorization, X-Requested-With' );


// Instantiate and connect the database

$database = (new DB())->connect();

// Instatiate note object

$note = new Notes( $database );

// Getting raw posted data

$data = json_decode( file_get_contents( 'php://input' ) );

$note->id = htmlentities( strip_tags( $data->id ) );
$note->title = htmlentities( strip_tags( $data->title ) );
$note->description = htmlentities( strip_tags( $data->description ) );


if ( $note->update() ) {
  $responseData = array(
    'message' => 'Note Updated Successfully',
    'status' => 1
  );
}
else {
  $responseData = array(
    'message' => 'Note Update Failed',
    'status' => 0
  );
}

echo json_encode( $responseData );
