
/**
  * This function will be responsible for resetting the note to a certain custom
  * state, based on it's arguments.
  */

const resetNote = (function returnReset() {

  'use strict';

  const stateObj = { canReset: true };

  return function resetNote(title = '', description = 'Note text...', buttons = ['confirm'], noteId) {

    // Getting DOM element references to manipulate

    const note            = window.document.querySelector( '.js-note' ),
          noteTitle       = window.document.querySelector( '.js-note-title' ),
          noteDescription = window.document.querySelector( '.js-note-description' ),
          noteBtns        = window.document.querySelectorAll( '.js-note-btn' );

    if ( stateObj.canReset ) {

      stateObj.canReset = false;

      if ( note.classList.contains( 'note--animated-in' ) ) {
        note.classList.add( 'note--animated-out' );
        note.classList.remove( 'note--animated-in' );
      }

      // Timeout to change note properties

      window.setTimeout( function changeNote() {

        note.classList.add( 'note--animated-in' );
        note.classList.remove( 'note--animated-out' );
        noteTitle.value = title;
        noteDescription.value = description;

        noteBtns.forEach( function filterBtns(btn) {

          if ( buttons.includes( btn.dataset.type ) ) {
            btn.classList.add( 'note__btn--active' );
          }
          else {
            btn.classList.remove( 'note__btn--active' );
          }

        } );

        // If we have an id, we'll attach it to the note

        note.dataset.id = noteId ? noteId : '';

        // This inner timeout will reallow the note reset

        window.setTimeout( function reallowReset() {
          stateObj.canReset = true;
        }, 300 );

      }, 300 );

    }

  }

})();

export default resetNote;
