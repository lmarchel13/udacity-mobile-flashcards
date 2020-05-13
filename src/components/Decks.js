import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { getDecks } from "../utils/helpers";
import { receiveDecks } from "../actions";
import { blue } from "../utils/colors";

import DeckInfo from "./DeckInfo";

const Decks = ({ dispatch, navigation, decks = {} }) => {
  useEffect(() => {
    getDecks().then((data) => dispatch(receiveDecks(data)));
  }, []);

  const onPress = (deckId) => navigation.navigate("Deck Detail", { deckId });

  return Object.keys(decks).length ? (
    <View style={styles.container}>
      <FlatList
        data={Object.values(decks)}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.deck} onPress={() => onPress(item.id)}>
              <DeckInfo {...item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  ) : (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Entypo name="emoji-happy" color={blue} size={100} style={{ marginTop: "50%" }} />
      <Text style={{ color: blue, textAlign: "center", marginTop: 10, fontSize: 30 }}>Create your first deck!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 20 },
  deck: { alignSelf: "center", width: 300, height: 100, marginBottom: 40 },
});

const mapStateToProps = (decks) => ({ decks });

export default connect(mapStateToProps)(Decks);
