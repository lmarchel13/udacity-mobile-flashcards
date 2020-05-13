import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";

import DeckInfo from "./DeckInfo";
import CustomButton from "./CustomButton";

import { deleteDeck } from "../actions";
import { red } from "../utils/colors";
import { removeDeck } from "../utils/helpers";

const DeckDetail = ({ dispatch, navigation, deckId, deck = {} }) => {
  const { title } = deck || "Deck details";
  const { cards = [] } = deck;

  navigation.setOptions({ title });

  const addCard = () => {
    return navigation.navigate("Add Card", { deckId });
  };
  const startQuiz = () => {
    return navigation.navigate("Quiz", { deckId });
  };

  const onPressDelete = () => {
    return Alert.alert(
      "Delete Deck?",
      `Do you want to delete deck ${deck.title || ""}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: handleDelete },
      ],
      { cancelable: true }
    );
  };

  const handleDelete = () => {
    dispatch(deleteDeck(deckId));
    removeDeck(deckId);

    return navigation.navigate("Decks");
  };

  return (
    <View style={styles.container}>
      <DeckInfo {...deck} />
      <CustomButton text="Add Card" onPress={addCard} />
      <CustomButton text="Start Quiz" onPress={startQuiz} disabled={!cards.length} />
      <TouchableOpacity style={styles.deleteText} onPress={onPressDelete}>
        <Text style={{ color: red }}>Delete Deck</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state, props) => {
  const { deckId } = props.route.params;
  const deck = state[deckId];

  return { deckId, deck };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    dispatch,
    goBack: () => props.navigation.goBack(),
  };
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 150 },
  deleteText: { justifyContent: "center", alignItems: "center" },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);
