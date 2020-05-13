import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { blue, white, gray } from "../utils/colors";

export default function CustomButton({ text, onPress, disabled, bgColor = null }) {
  const customStyle = { backgroundColor: disabled ? gray : blue };
  if (bgColor) customStyle.backgroundColor = bgColor;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, customStyle]} disabled={disabled}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    height: 50,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "center",
  },
  text: {
    color: white,
  },
});
