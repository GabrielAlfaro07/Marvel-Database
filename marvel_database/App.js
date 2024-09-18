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
import { loadFonts } from "./services/fontService"; // Import the font service

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [offset, setOffset] = useState(0); // Dynamic offset state
  const limit = 20; // Static limit, you can change it as per need

  const getCharacters = async (offset, limit) => {
    setLoading(true);
    const data = await fetchCharacters(offset, limit); // Fetch with dynamic offset and limit
    setCharacters(data);
    setLoading(false);
  };

  // Load fonts on app mount
  useEffect(() => {
    const fetchData = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      getCharacters(offset, limit);
    }
  }, [fontsLoaded, offset]);

  if (!fontsLoaded || loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-300">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <ScrollView className="bg-gray-300">
        <Text className="text-xl" style={{ fontFamily: "MarvelRegular" }}>
          WELCOME TO THE MARVEL DATABASE
        </Text>
        <View className="flex flex-wrap flex-row justify-around">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </View>
        <View className="flex justify-center items-center mt-4">
          <Button title="Load More" onPress={() => setOffset(offset + limit)} />
        </View>
      </ScrollView>
    </>
  );
}
