import React, { useState } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

import { QUIZ_RESULTS, clearLocalNotification, setLocalNotification } from "../utils/helpers";

import QuestionCard from "./QuestionCard";
import QuizResult from "./QuizResult";

const Quiz = ({ navigation, deck = {} }) => {
  const { title = "", id: deckId } = deck;
  navigation.setOptions({ title: `Quiz: ${title}` });

  const { cards = [] } = deck;
  const totalQuestions = cards.length;

  const [questionNumber, setQuestionNumber] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [remaniningQuestions, setRemainingQuestion] = useState(totalQuestions);

  const resetQuiz = () => {
    setQuestionNumber(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setRemainingQuestion(totalQuestions);

    clearLocalNotification().then(setLocalNotification);
  };

  const onPress = (result) => {
    if (result === QUIZ_RESULTS.CORRECT) setCorrectAnswers(correctAnswers + 1);
    if (result === QUIZ_RESULTS.INCORRECT) setIncorrectAnswers(incorrectAnswers + 1);

    setQuestionNumber(questionNumber + 1);
    setRemainingQuestion(remaniningQuestions - 1);
  };

  return (
    <View style={styles.container}>
      {questionNumber >= cards.length && (
        <QuizResult
          navigation={navigation}
          deckId={deckId}
          correctAnswers={correctAnswers}
          totalQuestions={totalQuestions}
          resetQuiz={resetQuiz}
        />
      )}

      <View style={{ marginTop: 50 }}>
        {remaniningQuestions > 0 && (
          <Text style={styles.remainingText}>Remaining Questions: {remaniningQuestions}</Text>
        )}
        {cards.map((card, index) => {
          const { question = "", answer = "" } = card;
          const key = [question, answer].join(":");

          return (
            +index === +questionNumber && (
              <View key={key}>
                <QuestionCard {...card} onPress={onPress}></QuestionCard>
              </View>
            )
          );
        })}
      </View>
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
  container: { flex: 1 },
  remainingText: { textAlign: "right", marginRight: 15, marginBottom: 15, marginTop: -15 },
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
