import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CharactersListScreen from "./components/screens/characters/CharactersListScreen";
import CharacterDetailsScreen from "./components/screens/characters/CharacterDetailsScreen";
import ComicsListScreen from "./components/screens/comics/ComicsListScreen";
import ComicDetailsScreen from "./components/screens/comics/ComicDetailsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Comics">
        <Stack.Screen name="Characters" component={CharactersListScreen} />
        <Stack.Screen
          name="Character Details"
          component={CharacterDetailsScreen}
        />
        <Stack.Screen name="Comics" component={ComicsListScreen} />
        <Stack.Screen name="Comic Details" component={ComicDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
