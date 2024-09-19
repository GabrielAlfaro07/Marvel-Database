import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, ScrollView } from "react-native";
import CharacterCard from "../cards/CharacterCard";
import { fetchCharacters } from "../../services/characterService";
import { loadFonts } from "../../services/fontService";
import PreviousButton from "../buttons/PreviousButton";
import NextButton from "../buttons/NextButton";

const CharactersListScreen = () => {
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
    <ScrollView className="bg-gray-300">
      {/* Buttons at the top */}
      <View className="flex justify-center items-center mt-4 flex-row">
        <PreviousButton offset={offset} setOffset={setOffset} limit={limit} />
        <NextButton offset={offset} setOffset={setOffset} limit={limit} />
      </View>

      {/* Character list */}
      <View className="flex flex-wrap flex-row justify-around mt-4">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={{ ...character, name: character.name.toUpperCase() }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default CharactersListScreen;
