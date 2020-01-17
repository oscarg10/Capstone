// 'Destructoring' each of the named components from the components directories.
import { Header, Nav, Main, Footer } from "./components";
// this is a node_modules we don't include './'
import * as state from "./store";

import capitalize from "lodash.capitalize";

import Navigo from "navigo";

import axios from "axios";

const router = new Navigo(location.origin);

if (!location.pathname.slice(1) === "") {
  render(state[capitalize(location.pathname.slice(1))]);
}
/**
 *
 * @param {Object} st - a piece of state
 */

function render(st = state.New) {
  //Query the document using a CSS selector
  document.querySelector("#root").innerHTML =
    //INVOKE each FUNCTIONAL COMPONENT passing in a piece of state each time.
    `
${Header(st)}
${Nav(state.Links)}
${Main(st)}
${Footer(st)}
`;
  router.updatePageLinks();
}

router
  // 'on' is navigo's way of handling a specific type of event
  .on(":page", params => {
    render(state[capitalize(params.page)]);
  })
  .on("/", () => render())
  // Resolve is required for all navigo methods.
  .resolve();
