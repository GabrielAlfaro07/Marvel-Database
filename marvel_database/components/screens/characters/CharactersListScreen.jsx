import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  ImageBackground,
} from "react-native";
import CharacterCard from "../../cards/CharacterCard";
import { fetchCharacters } from "../../../services/charactersService";
import { loadFonts } from "../../../services/fontService";
import PreviousButton from "../../buttons/PreviousButton";
import NextButton from "../../buttons/NextButton";
import SidebarButton from "../../buttons/SidebarButton";
import SearchBar from "../../searchbars/Searchbar"; // Verifica que esta ruta sea la correcta

import ProfileButton from "../../buttons/ProfileButton";

// URL of the background image
const backgroundImage =
  "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL3Jhd3BpeGVsX29mZmljZV8zN19waG90b19vZl9nYWxheHlfd2FsbHBhcGVyX2Flc3RoZXRpY19taW5pbWFsX2Y1NWFjNGU1LTkxOWQtNGEwZS1hNzA2LTlhMGExMTI1YzAxZS5qcGc.jpg";

const CharactersListScreen = ({ navigation, toggleSidebar }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la barra de búsqueda
  const limit = 30;

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

  // Filtramos los personajes según el nombre que coincida con la búsqueda
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={{ flex: 1 }}
      resizeMode="cover" // or "contain", depending on how you want it to fit
    >
      <ScrollView className="flex-1">
        <SidebarButton toggleSidebar={toggleSidebar} />
        <ProfileButton />
        <View className="flex-1 justify-center items-center p-8">
          <Text
            className="text-center text-2xl text-white mb-6"
            style={{ fontFamily: "MarvelRegular" }}
          >
            Marvel Characters
          </Text>
          <Text
            className="text-center text-lg text-gray-200"
            style={{ fontFamily: "MarvelRegular" }}
          >
            Here, you can explore the characters that shape and partake in the
            events of the Marvel Universe!
          </Text>
        </View>

        {/* Barra de búsqueda */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <View className="flex justify-center items-center flex-row">
          <PreviousButton offset={offset} setOffset={setOffset} limit={limit} />
          <NextButton offset={offset} setOffset={setOffset} limit={limit} />
        </View>

        <View className="flex flex-wrap flex-row justify-around mt-4">
          {/* Mostramos los personajes filtrados */}
          {filteredCharacters.map((character, index) => (
            <CharacterCard
              key={index}
              character={character}
              loading={!character.name}
            />
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default CharactersListScreen;
