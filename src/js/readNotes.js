
import createMessage from './createMessage.js';
import editNote      from './editNote.js';

/**
  * This function will be responsible for reading the database records and
  * displaying them in the menu.
  */

function readNotes() {

  'use strict';

  // Getting DOM element references to manipulate

  const notesListEl        = window.document.querySelector( '.js-notes-list' ),
        notesListWarningEl = window.document.querySelector( '.js-notes-list-warning' );

  // Sending request to read the database

  window.fetch(
    'api/notes/read.php',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
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
    }
  )
  .then(
    function handleData(jsonData) {

      // If status return 0, then we have no notes on the database.

      if ( jsonData.status ) {

        // Sorting the data to show the most recent used notes first

        const sortedData = jsonData.data.sort( function(a, b) {
          return a.last_modified > b.last_modified;
        } );

        // Removing 'no notes' warning in the list

        notesListWarningEl.classList.remove( 'show-block' );

        // Cleaning the list

        notesListEl.innerHTML = '';

        // Creating the html for each item

        sortedData.forEach( function( obj ) {

          const listItemEl = window.document.createElement( 'li' );
          listItemEl.addEventListener( 'click', editNote );
          listItemEl.classList.add( 'notes-list__item' );
          listItemEl.dataset.id = obj.id;
          listItemEl.innerText = obj.title;
          notesListEl.appendChild( listItemEl );

        } );


      }
      else {
        notesListWarningEl.classList.add( 'show-block' );
        notesListEl.innerHTML = '';
      }

    }
  )
  .catch( function showError(e) {
    window.console.log(e);
    createMessage( 'Could not read from database.' );
  } );

}

export default readNotes;
