import { Platform, AsyncStorage } from "react-native";

let decks = {};
const DECKS_STORAGE_KEY = "flashcards:storage:key";
const NOTIFICATION_KEY = "flashcards:notification";

export const PERMISSION_STATUS = {
  INITIAL_STATUS: null,
  DENIED: "denied",
  UNDETERMINED: "undetermined",
  GRANTED: "granted",
};

export const QUIZ_RESULTS = {
  CORRECT: "CORRECT",
  INCORRECT: "INCORRECT",
};

const generateId = () => Math.floor(Math.random() * 10e6);

export const createDeck = (title) => {
  const id = generateId();
  return { [id]: { id, title, cards: [] } };
};

export const getOptionByOS = (ios, android) => {
  return Platform.OS === "ios" ? ios : android;
};

export const saveAllDecks = (decks) => {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
};

export const saveDeck = (deck) => {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck));
};

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => {
    return !!data ? JSON.parse(data) : decks;
  });
};

export const getDeck = (id) => {
  return getDecks().then((decks) => decks[id]);
};

export const saveCard = ({ deckId, card }) => {
  return getDeck(deckId).then((deck) => {
    deck.cards.push(card);
    return saveDeck({ [deck.id]: deck });
  });
};

export const removeDeck = (deckId) => {
  return getDecks().then((decks) => {
    delete decks[deckId];
    return saveAllDecks(decks);
  });
};

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync);
};

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (!data) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === PERMISSION_STATUS.GRANTED) {
            Notifications.cancelAllScheduledNotificationsAsync();

            const tomorrow = new Date();

            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(10);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day",
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
};
