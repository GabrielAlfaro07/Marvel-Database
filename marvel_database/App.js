import React, { useEffect, useState } from "react";
import { ScrollView, View, ActivityIndicator, Button } from "react-native";
import CharacterCard from "./components/CharacterCard";
import { fetchCharacters } from "./services/characterService";
import { loadFonts } from "./services/fontService";
import Header from "./components/Header"; // Import the header component

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const getCharacters = async (offset, limit) => {
    setLoading(true);
    const data = await fetchCharacters(offset, limit);
    setCharacters(data);
    setLoading(false);
  };

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
        {/* Include the header component */}
        <Header />
        <View className="flex flex-wrap flex-row justify-around">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={{ ...character, name: character.name.toUpperCase() }} // Transform name to uppercase
            />
          ))}
        </View>
        <View className="flex justify-center items-center mt-4">
          <Button title="Load More" onPress={() => setOffset(offset + limit)} />
        </View>
      </ScrollView>
    </>
  );
}
