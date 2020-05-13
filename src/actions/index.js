export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_CARD = "ADD_CARD";
export const SAVE_CARD = "SAVE_CARD";
export const ADD_DECK = "ADD_DECK";
export const DELETE_DECK = "DELETE_DECK";

export const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks,
});

export const addCard = (payload) => ({
  type: ADD_CARD,
  payload,
});

export const addDeck = (deck) => ({
  type: ADD_DECK,
  deck,
});

export const deleteDeck = (deckId) => ({
  type: DELETE_DECK,
  deckId,
});
