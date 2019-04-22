
// This function will be responsible for toggling the menu

const toggleMenu = (function returnToggler() {

  'use strict';

  // We'll need a state object, so we create an iife to return the toggler

  const stateObj = {
    menuOpen: false,
    canToogle: true
  };

  return function toggleMenu() {

    // Getting DOM elements to manipulate

    const menuBtnEl = window.document.querySelector( '.js-menu-btn' ),
          notesListEl = window.document.querySelector( '.js-notes-list-container' ),
          menuOverlayEl = window.document.querySelector( '.js-menu-overlay' );

    if ( stateObj.canToogle ) {

      // So we can allow the clicks only after the animation is done

      stateObj.canToogle = false;

      if ( !stateObj.menuOpen ) {

        menuBtnEl.classList.add( 'menu__btn--active' );
        notesListEl.classList.remove( 'notes-list-container--animated-out' );
        notesListEl.classList.add( 'notes-list-container--animated-in', 'show-block' );
        menuOverlayEl.classList.remove( 'menu-overlay--animated-out' );
        menuOverlayEl.classList.add( 'menu-overlay--animated-in', 'show-block' );

      }
      else {

        menuBtnEl.classList.remove( 'menu__btn--active' );
        notesListEl.classList.remove( 'notes-list-container--animated-in' );
        notesListEl.classList.add( 'notes-list-container--animated-out' );
        menuOverlayEl.classList.remove( 'menu-overlay--animated-in' );
        menuOverlayEl.classList.add( 'menu-overlay--animated-out' );

        window.setTimeout( function hideMenuEls() {
          notesListEl.classList.remove( 'show-block' );
          menuOverlayEl.classList.remove( 'show-block' );
        }, 300 );

      }

      stateObj.menuOpen = !stateObj.menuOpen;

      window.setTimeout( function returnUserControl() {
        stateObj.canToogle = true;
      }, 320 );

    }

  }

})();

export default toggleMenu;
