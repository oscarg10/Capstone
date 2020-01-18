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

const createDeck = () => {
  return axios
    .get("https://deckofcardsapi.com/api/deck/new/")
    .then(response => {
      return response.data;
    });
};
createDeck()
  .then(data => {
    console.log(data.deck_id);
    return data.deck_id;
  })
  .then(deckId =>
    axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=2
`)
  )
  .then(data => console.log(data.data));
