// 'Destructuring' each of the named components from the components directories.
import { Header, Nav, Main, Footer } from "./components";

import * as state from "./store";

// this is a node_modules we don't include './'
import capitalize from "lodash.capitalize";

import Navigo from "navigo";

import axios from "axios";

const router = new Navigo(location.origin);

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

  // Add event listeners for 'buttons' on 'new' 'page.'
  if (capitalize(router.lastRouteResolved().url.slice(1)) === "") {
    document.querySelector("#hit").addEventListener("click", () => {
      axios
        .get(`https://deckofcardsapi.com/api/deck/${st.deckID}/draw/?count=1`)
        .then(response => {
          state.New.currentPlayer.push(response.data.cards[0]);

          // TODO{oscar}: Update st.currentPlayer.pointCount using the point value of the last card in st.currentPlayer.cards

          // TODO{oscar}: Add a 'lib' function to check if 'busted' or not.
        });

      // TODO{oscar}: Add a handler for 'stand' that will do something similar 👆🏽for dealer.
    });
  }
}

router
  // 'on' is Navigo's way of handling a specific type of event
  .on(":page", params => {
    render(state[capitalize(params.page)]);
  })
  .on("/", () => render())
  // Resolve is required for all navigo methods.
  .resolve();

axios
  .get("https://deckofcardsapi.com/api/deck/new/")
  .then(response => {
    // Build up an ARRAY of PROMISES from 'axios' calls to API drawing 1 card at a time.
    // (https://deckofcardsapi.com/)
    let promiseDraws = [];

    const deckID = response.data.deck_id;
    // Keep this for further API usage
    state.New.deckID = deckID;

    // Draw cards 1 at a time for dealer and player
    /**
     * For a multi-player game,
     * this would loop over the number of players in the game (and once for dealer).
     */
    for (let i = 0; i < 4; i++) {
      promiseDraws.push(
        axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=2`)
      );
      // console.log(promiseDraws);
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    Promise.all(promiseDraws)
      .then(response => {
        // '0' and '2' go to player
        // '1' and '3' go to dealer
        // TODO: Update this logic with a 'lib' function that 'sorts' out the cards for a multi-player game
        state.New.currentPlayer.cards.push(
          // 'cards' from 'data' is an ARRAY with 1 element since we drew just 1 card 👆🏽
          response[0].data.cards[0],
          response[2].data.cards[0]
        );

        state.New.dealerCards.cards.push(
          response[1].data.cards[0],
          response[3].data.cards[0]
        );
        let dealerCard = [];
        dealerCard.push(
          state.New.dealerCards.cards[0].value,
          state.New.dealerCards.cards[1].value
        );
        let playerCard = [];
        playerCard.push(
          state.New.currentPlayer.cards[0].value,
          state.New.currentPlayer.cards[1].value
        );
        state.New.dealerCards.pointCount.push(dealerCard);
        state.New.currentPlayer.pointCount.push(playerCard);

        // TODO{oscar}: Also check for 'new' route
        if (capitalize(router.lastRouteResolved().url.slice(1)) === "") {
          // Render the page with the updated state
          render();
        }
      })
      .catch(error => {
        console.log(`Error dealing cards! ${error}`);
      });
  })
  .catch(error => {
    console.error(`Error fetching deck! ${error}`);
  });
// console.log(state.New.dealerCards.cards);
// console.log(state.New.currentPlayer.cards);
// console.log(dealerCard1);
console.log(state.New.dealerCards.pointCount);
console.log(state.New.currentPlayer.pointCount);
let dealerHand = state.New.dealerCards.pointCount;
