import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

import { white, blue } from "../utils/colors";
import CustomButton from "./CustomButton";

const QuizResult = ({ navigation, deckId, correctAnswers, totalQuestions, resetQuiz }) => {
  const getPercentage = () => {
    return Math.round((100 * correctAnswers) / totalQuestions);
  };

  const restart = () => {
    resetQuiz();
    return navigation.navigate("Quiz", { deckId });
  };

  const goBack = () => {
    resetQuiz();
    return navigation.navigate("Deck Detail", { deckId });
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Final Result</Text>
      <View style={{ flex: 1, marginTop: 50 }}>
        <View style={[styles.card, { marginBottom: 20 }]}>
          <Text style={styles.subtitle}>Correct Answers</Text>
          <View style={styles.badge}>
            <Text style={styles.value}>{correctAnswers}</Text>
          </View>
        </View>
        <View style={[styles.card, { marginTop: 20 }]}>
          <Text style={styles.subtitle}>Percentage</Text>

          <View style={styles.badge}>
            <Text style={styles.value}>{getPercentage()}</Text>
          </View>
        </View>
      </View>
      <CustomButton text="Back" onPress={goBack}></CustomButton>
      <CustomButton text="Restart" onPress={restart}></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { textAlign: "center", marginTop: 30, fontWeight: "bold", fontSize: 40 },
  subtitle: { fontWeight: "bold", fontSize: 20 },
  card: {
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: "70%",
    alignSelf: "center",
    padding: 30,
    borderRadius: 16,
  },
  value: {
    fontSize: 16,
    color: white,
  },
  badge: {
    height: 44,
    width: 44,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: blue,
  },
});

export default QuizResult;
