import React, { useState } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, TextInput } from "react-native";
import CustomButton from "./CustomButton";

import { gray } from "../utils/colors";
import { addCard } from "../actions";
import { saveCard } from "../utils/helpers";

const AddCard = ({ dispatch, navigation, deckId, deck = {}, goBack }) => {
  navigation.setOptions({ title: "Add Card" });

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const onSubmit = () => {
    if (!question || !answer) return;
    const card = { question, answer };
    const payload = { deckId, card };

    dispatch(addCard(payload));
    saveCard(payload);

    goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputText}
        placeholder="Question..."
        value={question}
        onChangeText={(text) => setQuestion(text)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Answer..."
        value={answer}
        onChangeText={(text) => setAnswer(text)}
      />
      <CustomButton text="Submit" onPress={onSubmit}></CustomButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
