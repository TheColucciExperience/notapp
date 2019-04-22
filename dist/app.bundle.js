/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/scss/styles.scss
var styles = __webpack_require__(0);

// CONCATENATED MODULE: ./src/js/menu.js

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

/* harmony default export */ var menu = (toggleMenu);

// CONCATENATED MODULE: ./src/js/createMessage.js

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

/* harmony default export */ var js_createMessage = (createMessage);

// CONCATENATED MODULE: ./src/js/resetNote.js

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

/* harmony default export */ var js_resetNote = (resetNote);

// CONCATENATED MODULE: ./src/js/editNote.js





// Function to edit notes

function editNote() {

  'use strict';

  // Closing the menu

  menu();

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
      js_createMessage( 'An error occurred. Try again later.' );
    }
  )
  .then(
    function handleData(jsonData) {

      // If status return 0, then we have no notes on the database.

      if ( jsonData.status ) {

        const noteObj = jsonData.data[0];
        js_resetNote( noteObj.title, noteObj.description, ['update', 'delete'], noteObj.id );

      }
      else {
        js_createMessage( 'Could not find note in the database.' );
      }

    }
  )
  .catch( function showError(e) {
    window.console.log(e);
    js_createMessage( 'Could not find note in the database.' );
  } );

}

/* harmony default export */ var js_editNote = (editNote);

// CONCATENATED MODULE: ./src/js/readNotes.js




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
      js_createMessage( 'An error occurred. Try again later.' );
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
          listItemEl.addEventListener( 'click', js_editNote );
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
    js_createMessage( 'Could not read from database.' );
  } );

}

/* harmony default export */ var js_readNotes = (readNotes);

// CONCATENATED MODULE: ./src/js/CUDNotes.js





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
      js_createMessage( 'An error occurred. Try again later.' );
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
          js_resetNote();
        }

        js_readNotes();

      }

      js_createMessage( jsonData.message );

      // Enabling note buttons

      window.setTimeout( function enableBtns() {
        Array.from( noteBtns ).forEach( function(btn) {
          btn.disabled = false;
        } );
      }, 300 );

    }
  )
  .catch( function showError(e) {

    js_createMessage( 'Could not complete operation.' );
    window.console.log(e);
    window.setTimeout( function enableBtns() {
      Array.from( noteBtns ).forEach( function(btn) {
        btn.disabled = false;
      } );
    }, 300 );

  } );


}

/* harmony default export */ var js_CUDNotes = (CUDNotes);

// CONCATENATED MODULE: ./src/js/loader.js

// This script will load the necessary functions and add the listeners to the DOM

// Importing necessary functions






window.addEventListener( 'load', function() {

  'use strict';

  // Adding menu listeners

  window.document.querySelector( '.js-menu-btn' ).addEventListener( 'click', menu );
  window.document.querySelector( '.js-menu-overlay' ).addEventListener( 'click', menu );

  // Reset note button listener

  window.document.querySelector( '.js-reset-note-btn' ).addEventListener(
    'click',
    function callReseter() {
      // This is because we don't want the 'e' argument as the title for the note.
      js_resetNote();
    }
  );

  // Adding listener to note buttons to perform create, update and delete actions

  window.document.querySelectorAll( '.js-note-btn' ).forEach(
    function addBtnListener(btn) {
      btn.addEventListener( 'click', js_CUDNotes );
    }
  );

  // Reading database notes and resetting note

  js_readNotes();
  js_resetNote();

} );

// CONCATENATED MODULE: ./src/main.js

/**
  * Main script for the application. We'll use it only to import styles
  * and scripts in the application.
  */

// Importing styles and scripts





/***/ })
/******/ ]);