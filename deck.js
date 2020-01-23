let deck = new Array();
const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];

function generateDeck() {
  let deck = new Array();

  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      let card = { Value: values[x], Suit: suits[i] };
      deck.push(card);
    }
  }
  return deck;
}

function shuffleCards() {
  for (let i = 0; i < 1000; i++) {
    let location1 = Math.floor(Math.random() * deck.length);
    let location2 = Math.floor(Math.random() * deck.length);
    let temporary = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = temporary;
  }

  renderDeck();
}

function renderDeck() {
  document.getElementById("deck").innerHTML = "";

  for (let i = 0; i < deck.length; i++) {
    let card = document.createElement("div");
    let value = document.createElement("div");
    let suit = document.createElement("div");
    card.className = "card";
    value.className = "value";
    suit.className = "suit " + deck[i].Suit;

    value.innerHTML = deck[i].Value;
    card.appendChild(value);
    card.appendChild(suit);

    document.getElementById("deck").appendChild(card);
  }
}

console.log(shuffleCards(deck));

// Creating the players profile

let players = new Array();
function createPlayers(num) {
  players = new Array();
  for (let i = 1; i <= num; i++) {
    let hand = new Array();
    let player = { Name: "Player " + i, ID: i, Points: 0, Hand: hand };
    players.push(player);
  }
}

//Creating player's UI
function createPlayerUI() {
  document.getElementById("players").innerHTML = "";
  for (let i = 0; i < players.length; i++) {
    const div_player = document.createElement("div");
    const div_playerid = document.createElement("div");
    const div_hand = document.createElement("div");
    const div_points = document.createElement("div");

    div_points.className = "points";
    div_points.id = "points_" + i;
    div_player.id = "player_" + i;
    div_player.className = "player";
    div_hand.id = "hand_" + i;

    div_playerid.innerHTML = players[i].ID;
    div_player.appendChild(div_playerid);
    div_player.appendChild(div_hand);
    div_player.appendChild(div_points);
    document.getElementById("players").appendChild(div_player);
  }
}

//Start the game.

function startGame() {
  let newGame = document.getElementById("deal");
  newGame.innerHTML = "";

  axios
    .get(`https://deckofcardsapi.com/api/deck/new/draw/?count=4`)
    .then(function(response) {
      newGame.innerHTML = generateNewGame(response);
    })
    .catch(function(error) {
      newGame.innerHTML = generateErrorNew(error);
    });
}

//Deal hand alternating cards to each player

function dealHands() {
  for (let i = 0; i < 2; i++) {
    for (let x = 0; x < players.length; x++) {
      let card = deck.pop();
      players[x].Hand.push(card);
      renderCard(card, x);
      updatePoint();
    }
  }
  updateDeck();
}

//Rendering the cards

function renderCard(card, player) {
  let hand = document.getElementById("hand_" + player);
  hand.appendChild(getCardUI(card));
}

function getCardUI(card) {
  let el = document.createElement("div");
  el.className = "card";
  el.innerHTML = card.Suit + " " + card.Value;
  return el;
}

//Hit button functionality

let currentPlayer = 0;
function hit() {
  //pop card from current player's deck
  //check if player new points are over 21

  let card = deck.pop();
  players[currentPlayer].Hand.push(card);
  renderCard(card, currentPlayer);
  updatePoints();
  checkPoints();
}

function checkPoints() {
  if (players[currentPlayer].Points > 21) {
    document.getElementById("status").innerHTML =
      "Player: " + players[currentPlayer].ID + " LOST";
  }
}

//Stay button

function stay() {
  //skip player after button is hit
  if (currentPlayer != players.length - 1) {
    document
      .getElementById("player_" + currentPlayer)
      .classList.remove("active");
    currentPlayer += 1;
    document.getElementById("player_" + currentPlayer).classList.add("active");
  } else {
    end();
  }
}
function end() {
  let winner = -1;
  let score = 0;

  for (let i = 0; i < players.length; i++) {
    if (players[i].Points > score && players[i].Points < 22) {
      winner = i;
    }

    score = players[i].Points;
  }
  document.getElementById("status").innerHTML =
    "Winner: Player " + players[winner].ID;
}

for (let i = 0; i < state.currentPlayer.cards.length; i++) {
  if (
    firstDeal[i].value == "KING" ||
    firstDeal[i].value == "QUEEN" ||
    firstDeal[i].value == "JACK"
  ) {
    firstDeal[i].value = 10;
  }
  if (firstDeal[i].value == "ACE") {
    firstDeal[i].value = 11;
  }
  if (
    firstDeal[i].value != "KING" &&
    firstDeal[i].value != "QUEEN" &&
    firstDeal[i].value != "JACK" &&
    firstDeal[i].value != "ACE"
  ) {
    firstDeal[i].value = parseInt(firstDeal[i].value);
  }
}
allCards = firstDeal;
