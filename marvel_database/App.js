import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Button,
} from "react-native";
import CharacterCard from "./components/CharacterCard";
import { fetchCharacters } from "./services/characterService"; // Import the service

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0); // Dynamic offset state
  const limit = 20; // Static limit, you can change it as per need

  const getCharacters = async (offset, limit) => {
    setLoading(true);
    const data = await fetchCharacters(offset, limit); // Fetch with dynamic offset and limit
    setCharacters(data);
    setLoading(false);
  };

  useEffect(() => {
    getCharacters(offset, limit); // Initial fetch
  }, [offset]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-300">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView className="bg-gray-300">
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
  );
}
