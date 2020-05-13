import React, { useState } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
import { gray, green, red } from "../utils/colors";

import CustomButton from "./CustomButton";
import { QUIZ_RESULTS } from "../utils/helpers";

const SIDES = {
  FRONT: "FRONT",
  BACK: "BACK",
};

const QuestionCard = ({ question, answer, onPress }) => {
  const [side, setSide] = useState(SIDES.FRONT);

  const animatedValue = new Animated.Value(0);

  animatedValue.addListener(({ value }) => {
    if (value >= 180) {
      setSide(SIDES.BACK);
    } else {
      setSide(SIDES.FRONT);
    }
  });

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateX: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateX: backInterpolate }],
  };

  const flipCard = () => {
    Animated.timing(animatedValue, {
      toValue: 180,
      duration: 800,
    }).start();
  };

  return (
    <View>
      <View>
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <Text style={styles.text}>Question: {question}</Text>
        </Animated.View>

        <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
          <Text style={styles.text}>Answer: {answer}</Text>
        </Animated.View>
      </View>

      {side === SIDES.FRONT ? (
        <CustomButton text="Show Answer" onPress={flipCard}></CustomButton>
      ) : (
        <View>
          <CustomButton text="Correct" onPress={() => onPress(QUIZ_RESULTS.CORRECT)} bgColor={green}></CustomButton>
          <CustomButton text="Incorrect" onPress={() => onPress(QUIZ_RESULTS.INCORRECT)} bgColor={red}></CustomButton>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: gray,
    borderRadius: 16,
    padding: 50,
    width: "70%",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    backfaceVisibility: "hidden",
  },
  cardBack: {
    position: "absolute",
    top: 0,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default QuestionCard;
