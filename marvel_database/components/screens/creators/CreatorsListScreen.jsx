import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, ScrollView, Text } from "react-native";
import CreatorCard from "../../cards/CreatorCard";
import { fetchCreators } from "../../../services/creatorsService";
import { loadFonts } from "../../../services/fontService";
import PreviousButton from "../../buttons/PreviousButton";
import NextButton from "../../buttons/NextButton";
import SidebarButton from "../../buttons/SidebarButton";
import SearchBar from "../../searchbars/Searchbar"; // Verifica que esta ruta sea la correcta

const CreatorsListScreen = ({ navigation, toggleSidebar }) => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la barra de búsqueda
  const limit = 30;

  const getCreators = async (offset, limit) => {
    setLoading(true);
    const data = await fetchCreators(offset, limit);
    setCreators(data);
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
      getCreators(offset, limit);
    }
  }, [fontsLoaded, offset]);

  if (!fontsLoaded || loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-300">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Filtramos los creadores según el nombre que coincida con la búsqueda
  const filteredCreators = creators.filter((creator) =>
    creator.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView className="bg-gray-100">
      <SidebarButton toggleSidebar={toggleSidebar} />
      <View className="flex-1 justify-center items-center p-8">
        <Text
          className="text-center text-2xl text-gray-800 mb-6"
          style={{ fontFamily: "MarvelRegular" }}
        >
          Marvel Creators
        </Text>
        <Text
          className="text-center text-lg text-gray-600"
          style={{ fontFamily: "MarvelRegular" }}
        >
          This is the place where all of the authors and creators of the Marvel
          Comic Books reunite!
        </Text>
      </View>

      {/* Barra de búsqueda */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <View className="flex justify-center items-center flex-row">
        <PreviousButton offset={offset} setOffset={setOffset} limit={limit} />
        <NextButton offset={offset} setOffset={setOffset} limit={limit} />
      </View>

      <View className="flex flex-wrap flex-row justify-around mt-4">
        {/* Mostramos los creadores filtrados */}
        {filteredCreators.map((creator) => (
          <CreatorCard
            key={creator.id}
            creator={{ ...creator, fullName: creator.fullName.toUpperCase() }}
            loading={!creator.fullName}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default CreatorsListScreen;
