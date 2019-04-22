
import toggleMenu    from './menu.js';
import resetNote     from './resetNote.js';
import createMessage from './createMessage.js'

// Function to edit notes

function editNote() {

  'use strict';

  // Closing the menu

  toggleMenu();

  // Fetching the note data

  window.fetch(
    'api/notes/read.php?id=' + this.dataset.id,
    { 'Content-Type': 'application/json' }
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
    }
  )
  .then(
    function handleData(jsonData) {

      // If status return 0, then we have no notes on the database.

      if ( jsonData.status ) {

        const noteObj = jsonData.data[0];
        resetNote( noteObj.title, noteObj.description, ['update', 'delete'], noteObj.id );

      }
      else {
        createMessage( 'Could not find note in the database.' );
      }

    }
  )
  .catch( function showError(e) {
    window.console.log(e);
    createMessage( 'Could not find note in the database.' );
  } );

}

export default editNote;
