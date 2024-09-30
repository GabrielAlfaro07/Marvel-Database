import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, ScrollView, Text } from "react-native";
import CharacterCard from "../../cards/CharacterCard";
import { fetchCharacters } from "../../../services/charactersService";
import { loadFonts } from "../../../services/fontService";
import PreviousButton from "../../buttons/PreviousButton";
import NextButton from "../../buttons/NextButton";

const CharactersListScreen = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 30; // Increased limit to load 30 characters per page

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
      <View className="flex justify-center items-center mt-4 flex-row">
        <PreviousButton offset={offset} setOffset={setOffset} limit={limit} />
        <NextButton offset={offset} setOffset={setOffset} limit={limit} />
      </View>

      <View className="flex flex-wrap flex-row justify-around mt-4">
        {characters.map((character, index) => (
          <CharacterCard
            key={index}
            character={character}
            loading={!character.name} // Mark as loading if name isn't available
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default CharactersListScreen;
