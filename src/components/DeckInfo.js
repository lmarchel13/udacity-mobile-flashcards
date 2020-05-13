import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { white } from "../utils/colors";

export default function DeckInfo({ title, cards }) {
  const getDeckLength = (deck = []) => (!deck.length ? "No cards" : `${deck.length} card${deck.length > 1 ? "s" : ""}`);

  return (
    <View style={[styles.deck]}>
      <Text style={[styles.center, { fontSize: 18, fontWeight: "bold" }]}>{title}</Text>
      <Text style={[styles.center, { fontSize: 12, marginTop: 5 }]}>{getDeckLength(cards)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { textAlign: "center" },
  deck: {
    padding: 30,
    borderWidth: 1,
    borderRadius: 10,
    width: 300,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 45,
    backgroundColor: white,
    height: 100,
  },
});
