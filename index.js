// 'Destructoring' each of the named components from the components directories.
import { Header, Nav, Main, Footer } from "./components";
// this is a node_moduleso we don't include './'
import * as state from "./store";

import capitalize from "lodash.capitalize";

/**
 *
 * @param {Object} st - a piece of state
 */

function render(st = state.Home) {
  //Query the document using a CSS selector
  console.log(st);
  document.querySelector("#root").innerHTML =
    //INVOKE each FUNCTIONAL COMPONENT passing in a piece of state each time.
    `
${Header(st)}
${Nav(state.Links)}
${Main(st)}
${Footer(st)}
`;
  //TODO: Listen for clicks on our menu and log what was clicked on.
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(event) {
      //'stop the link from linking'
      event.preventDefault();

      /**
       * Grab 'textContent from 'whoever' caused this event to fire.
       * Providing that our 'link names' match up with a key in 'state',
       * we can pass that piece of 'state' into our 'render' fxn.
       */
      render(state[capitalize(event.target.textContent)]);
    });
  });
}
render();
