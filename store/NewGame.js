export default {
  heading: "New",
  mainContent: "New",
  deckID: null,

  // TODO{oscar}: Consider an ARRAY of players for multi-player games where each player has an 'isCurrent' attribute that gets updated if it's their turn.

  currentPlayer: {
    // Updated if/when user logs in (https://firebase.google.com/docs/auth/admin/manage-users)
    id: null,
    cards: [],
    // This will determine if 'busted' or not.
    pointCount: []
  },
  dealerCards: {
    cards: [],
    pointCount: []
  }
};
