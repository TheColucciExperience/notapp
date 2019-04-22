
import readNotes     from './readNotes.js';
import resetNote     from './resetNote.js';
import createMessage from './createMessage.js';

// This function will be responsible for doing the CUD logic for the notes

function CUDNotes() {

  // Getting DOM elements to manipulate

  const note            = window.document.querySelector( '.js-note' ),
        noteTitle       = window.document.querySelector( '.js-note-title' ).value,
        noteDescription = window.document.querySelector( '.js-note-description' ).value,
        noteBtns        = window.document.querySelector( '.js-note-btn' );

  // Disabling note buttons to avoid request overload

  Array.from( noteBtns ).forEach( function(btn) {
    btn.disabled = true;
  } );

  /**
    * Variables to make the request. We'll set them to a specific value
    * depending on the request type.
    */

  let url,
      body = {},
      method;

  // Figuring out the request type and setting variables

  switch ( this.dataset.type ) {
    case 'confirm':
      url = 'api/notes/create.php';
      method = 'POST';
      body.title = noteTitle;
      body.description = noteDescription;
      break;
    case 'update':
      url = 'api/notes/update.php';
      method = 'PUT';
      body.id = note.dataset.id;
      body.title = noteTitle;
      body.description = noteDescription;
      break;
    case 'delete':
      url = 'api/notes/delete.php';
      method = 'DELETE';
      body.id = note.dataset.id;
      break;
    default:
      window.console.log( 'Method not found.' );
  }

  window.fetch(
    url,
    {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( body )
    }
  )
  .then(
    function fulfilled(response) {

      if ( response.ok ) {
        return response.json();
      }

      throw new Error( 'Network Error' );

    },
    function rejected(error) {
      console.log( 'Error: ' + error );
      createMessage( 'An error occurred. Try again later.' );
      window.setTimeout( function enableBtns() {
        Array.from( noteBtns ).forEach( function(btn) {
          btn.disabled = false;
        } );
      }, 300 );
    }
  )
  .then(
    function handleData(jsonData) {

      // If status return 0, then we have failed the operation.

      if ( jsonData.status ) {

        if ( method == 'POST' || method == 'DELETE' ) {
          resetNote();
        }

        readNotes();

      }

      createMessage( jsonData.message );

      // Enabling note buttons

      window.setTimeout( function enableBtns() {
        Array.from( noteBtns ).forEach( function(btn) {
          btn.disabled = false;
        } );
      }, 300 );

    }
  )
  .catch( function showError(e) {

    createMessage( 'Could not complete operation.' );
    window.console.log(e);
    window.setTimeout( function enableBtns() {
      Array.from( noteBtns ).forEach( function(btn) {
        btn.disabled = false;
      } );
    }, 300 );

  } );


}

export default CUDNotes;
