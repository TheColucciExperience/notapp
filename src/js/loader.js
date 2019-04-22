
// This script will load the necessary functions and add the listeners to the DOM

// Importing necessary functions

import toggleMenu from './menu.js';
import readNotes  from './readNotes.js';
import resetNote  from './resetNote.js';
import CUDNotes   from './CUDNotes.js';

window.addEventListener( 'load', function() {

  'use strict';

  // Adding menu listeners

  window.document.querySelector( '.js-menu-btn' ).addEventListener( 'click', toggleMenu );
  window.document.querySelector( '.js-menu-overlay' ).addEventListener( 'click', toggleMenu );

  // Reset note button listener

  window.document.querySelector( '.js-reset-note-btn' ).addEventListener(
    'click',
    function callReseter() {
      // This is because we don't want the 'e' argument as the title for the note.
      resetNote();
    }
  );

  // Adding listener to note buttons to perform create, update and delete actions

  window.document.querySelectorAll( '.js-note-btn' ).forEach(
    function addBtnListener(btn) {
      btn.addEventListener( 'click', CUDNotes );
    }
  );

  // Reading database notes and resetting note

  readNotes();
  resetNote();

} );
