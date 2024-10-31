/**
 * @file Handles color change on scroll effect.
 * @author Pieter Huurman
 */

function controlColorInit() {
  /*--------------------------------------------------------------
  * Header and background color animation
  --------------------------------------------------------------*/

  const root = document.documentElement;
  const body = document.body;
  const elements = [root, body];
  const classes = {
    start: {
      name: "page-start-color",
      set: Boolean(controlParams[0]),
      active: Boolean(controlParams[0]),
    },
    end: {
      name: "page-end-color",
      set: Boolean(controlParams[1]),
      active: false,
    },
    default: {
      name: "page-default-color",
      active: !Boolean(controlParams[0]),
    },
  };

  root.style.transition = body.style.transition = "background-color 1s ease";

  /**
   * Sets active class entry and handles background-color classes.
   * @param {string} newKey - The entry to activate.
   */
  function setBackground(newKey) {
    for (let classKey of Object.keys(classes)) {
      if (classKey === newKey) {
        toggleBackgroundClasses(classes[classKey].name, false);
        classes[classKey].active = true;
      } else {
        toggleBackgroundClasses(classes[classKey].name, true);
        classes[classKey].active = false;
      }
    }
  }

  /**
   * Removes existing and adds new background-color classes.
   * @param {string} className - The class name to remove or add.
   * @param {boolean} remove - Remove (true) or add the class.
   */
  function toggleBackgroundClasses(className, remove) {
    elements.forEach((element) => {
      const classList = element.classList;

      if (remove) {
        classList.remove(className);
      } else {
        classList.add(className);
      }
    });
  }

  /**
   * Checks scroll position against page section in order to add a corresponding background-color class.
   */
  function checkPosition() {
    const y = (window.scrollY || window.pageYOffset) + window.innerHeight / 1.5;

    if (
      //Start
      classes.start.set &&
      y >= 0 &&
      y <= window.innerHeight
    ) {
      if (!classes.start.active) {
        setBackground("start"); //Set start color
      }
    } else if (
      //End
      classes.end.set &&
      y >= document.body.clientHeight - window.innerHeight
    ) {
      if (!classes.end.active) {
        setBackground("end"); //Set end color
      }
    } else {
      //Default
      if (!classes.default.active) {
        setBackground("default"); //Set default color
      }
    }
  }

  /**
   * Triggers on scroll
   */
  window.addEventListener("scroll", () => {
    checkPosition();
  });

  checkPosition();
}
window.addEventListener("DOMContentLoaded", controlColorInit, { once: true });
