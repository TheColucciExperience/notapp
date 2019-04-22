
// This function will be responsible for creating message boxes in the UI

/**
  * We'll create an IIFE as we need a state object. We can only show one
  * message at a time.
  */

const createMessage = (function returnMessager() {

  'use strict';

  const stateObj = { messageAllowed: true };

  return function createMessage(message, displayTime = 3000) {

    if ( stateObj.messageAllowed ) {

      stateObj.messageAllowed = false;

      // Creating message container and the message text elements

      const msgContainerEl = window.document.createElement( 'div' ),
            msgTextEl      = window.document.createElement( 'p' );

      // Adding attributes to elements

      msgContainerEl.classList.add( 'message-container', 'message-container--animated-in' );
      msgTextEl.classList.add( 'message-text' );
      msgTextEl.innerHTML = message;

      /**
        * Appending items. Here we select the document body through a class to avoid
        * incompatibility issues between browsers (e.g using document.body)
        */

      msgContainerEl.appendChild( msgTextEl );
      window.document.querySelector( '.js-body' ).appendChild( msgContainerEl );

      /**
        * Timeouts animate out the message container and to remove it from the DOM.
        * Here we'll add 300 to the display time because of the animate in animation.
        */

      window.setTimeout( function animateOut() {

        msgContainerEl.classList.remove( 'message-container--animated-in' );
        msgContainerEl.classList.add( 'message-container--animated-out' );

        /**
          * This inner timeout will remove the element of the DOM after the
          * animation is finished and reallow the message creation.
          */

        window.setTimeout( function removeMsg() {
          msgContainerEl.parentNode.removeChild( msgContainerEl );
          stateObj.messageAllowed = true;
        }, 300 );

      }, displayTime + 300 );

    }



  }

})();

export default createMessage;
