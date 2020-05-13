import { RECEIVE_DECKS, ADD_CARD, ADD_DECK, DELETE_DECK } from "../actions";

const decksReducer = (decks = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return { ...decks, ...action.decks };
    case ADD_CARD:
      const { deckId, card } = action.payload;

      return {
        ...decks,
        [deckId]: {
          ...decks[deckId],
          cards: [...decks[deckId].cards, card],
        },
      };
    case ADD_DECK:
      return { ...decks, ...action.deck };
    case DELETE_DECK:
      delete decks[action.deckId];

      return { ...decks };
    default:
      return decks;
  }
};

export default decksReducer;
