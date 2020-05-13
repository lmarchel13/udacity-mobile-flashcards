import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { connect } from "react-redux";

import CustomButton from "./CustomButton";

import { gray } from "../utils/colors";
import { addDeck } from "../actions";
import { saveDeck, createDeck } from "../utils/helpers";

const AddDeck = ({ dispatch, navigation }) => {
  const [title, setTitle] = useState("");

  const onPress = () => {
    const deck = createDeck(title);

    dispatch(addDeck(deck));
    saveDeck(deck);

    navigation.navigate("Deck Detail", { deckId: Object.keys(deck)[0] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.center}>Create Deck</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Deck name"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <CustomButton text="Submit" onPress={onPress}></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  center: { textAlign: "center", marginBottom: 20, fontSize: 30 },
  container: { flex: 1, marginTop: 150 },
  inputText: {
    width: "80%",
    height: 50,
    borderColor: gray,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 15,
    textAlign: "center",
  },
});

export default connect()(AddDeck);
