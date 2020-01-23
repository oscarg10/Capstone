import axios from "axios";

// let deckID = null;

// function drawCards() {
//   axios
//     .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
//     .then(response => {
//       deckID = response.data.deck_id;
//       console.log(deckID);
//     });
// }
// console.log(deckID);
//   axios
//     .get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
//     .then(response => console.log(response));
// //}

// console.log(drawCards());
let deck;
const createDeck = () => {
  return axios
    .get(`https://deckofcardsapi.com/api/deck/new/draw/?count=4`)
    .then(response => {
      // console.log(response.data);
      deck = response.data;
      return response.data;
    });
};
// createDeck();
// console.log(deck);

// console.log("about to create deck");
// createDeck()
//   .then(data => {
//     console.log(data.deck_id);
//     return data.deck_id;
//   })
//   .then(deckId =>
//     axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=4`)
//   )
//   .then(data => {
//     console.log("cards drawn");
//     console.log(data.data);
//     console.log(deck);
//   });
// console.log("end of file");

//Deal Function
let playerHand;
let dealerHand;
document.getElementById("deal-btn").onclick = function deal() {
  return (
    (playerHand = data.data.cards.slice(0, 2)) &&
    (dealerHand = data.data.cards.slice(2, 5))
  );
};
console.log(playerHand, dealerHand);
//Hit function
// let currentPlayer = 0;
// document.getElementById("hit-btn").onclick = function hit() {
//   let card = deck.pop();
//   players[currentPlayer].Hand.push(card);
//   renderCard(card, currentPlayer);
// };
// document.getElementById("stand-btn").onclick = function() {
//   console.log("It's happening");
// };

function startGame() {
  let newGame = document.getElementById("deal");

  axios
    .get(`https://deckofcardsapi.com/api/deck/new/draw/?count=4`)
    .then(function(response) {
      newGame.innerHTML = generateNewGame(response);
    })
    .catch(function(error) {
      newGame.innerHTML = generateErrorNew(error);
    });
}
startGame();
