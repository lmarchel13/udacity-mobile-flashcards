import React from "react";
import { View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import reducers from "./src/reducers";
import { blue, white } from "./src/utils/colors";
import { getOptionByOS } from "./src/utils/helpers";

import Decks from "./src/components/Decks";
import AddDeck from "./src/components/AddDeck";
import AddCard from "./src/components/AddCard";
import DeckDetail from "./src/components/DeckDetail";
import Quiz from "./src/components/Quiz";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const Home = () => (
  <Tab.Navigator
    navigationOptions={{
      header: null,
    }}
    tabBarOptions={{
      activeTintColor: getOptionByOS(blue, white),
      style: {
        backgroundColor: getOptionByOS(white, blue),
        shadowColor: "rgba(0,0,0,0.24)",
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        switch (route.name) {
          case "Decks":
            return <Ionicons name="ios-bookmarks" size={size} color={color} />;
          case "Add Decks":
            return <FontAwesome name="plus-square" size={size} color={color} />;
        }
      },
    })}
  >
    <Tab.Screen name="Decks" component={Decks} />
    <Tab.Screen name="Add Decks" component={AddDeck} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <Provider store={createStore(reducers)}>
      <CustomStatusBar backgroundColor={blue} barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Deck Detail"
            component={DeckDetail}
            options={{
              headerTintColor: white,
              headerStyle: { backgroundColor: blue },
            }}
          />
          <Stack.Screen
            name="Add Card"
            component={AddCard}
            options={{
              headerTintColor: white,
              headerStyle: { backgroundColor: blue },
            }}
          />

          <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={{
              headerTintColor: white,
              headerStyle: { backgroundColor: blue },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
