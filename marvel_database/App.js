import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Button,
} from "react-native";
import CharacterCard from "./components/CharacterCard";
import { fetchCharacters } from "./services/characterService";
// import Header from "./components/Header";
import * as Font from "expo-font"; // Import expo-font to load custom font
import { SafeAreaView } from "react-native";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0); // Dynamic offset state
  const limit = 20; // Static limit, you can change it as per need
  const [fontLoaded, setFontLoaded] = useState(false); // Font loading state

  const getCharacters = async (offset, limit) => {
    setLoading(true);
    const data = await fetchCharacters(offset, limit); // Fetch with dynamic offset and limit
    setCharacters(data);
    setLoading(false);
  };

  // Load the font when the app starts
  const loadFonts = async () => {
    await Font.loadAsync({
      MarvelRegular: require("./assets/fonts/MarvelRegular.ttf"), // Load custom font
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts(); // Load fonts on app start
    getCharacters(offset, limit); // Initial fetch
  }, [offset]);

  if (!fontLoaded || loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-300">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-gray-300 flex-1">
      <ScrollView>
        <Text className="text-xl" style={{ fontFamily: "MarvelRegular" }}>
          MARVEL DATABASE
        </Text>
        <View className="flex flex-wrap flex-row justify-around">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </View>
        <View className="flex justify-center items-center mt-4">
          {/* Button to load more characters by increasing the offset */}
          <Button title="Load More" onPress={() => setOffset(offset + limit)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
