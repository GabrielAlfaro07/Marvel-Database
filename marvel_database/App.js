import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CharactersListScreen from "./components/screens/characters/CharactersListScreen";
import CharacterDetailsScreen from "./components/screens/characters/CharacterDetailsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Characters">
        <Stack.Screen name="Characters" component={CharactersListScreen} />
        <Stack.Screen
          name="Character Details"
          component={CharacterDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
