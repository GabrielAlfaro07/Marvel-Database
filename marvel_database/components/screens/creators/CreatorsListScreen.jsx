import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, ScrollView } from "react-native";
import CreatorCard from "../../cards/CreatorCard";
import { fetchCreators } from "../../../services/creatorsService";
import { loadFonts } from "../../../services/fontService";
import PreviousButton from "../../buttons/PreviousButton";
import NextButton from "../../buttons/NextButton";

const CreatorsListScreen = ({ navigation }) => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
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

  return (
    <ScrollView className="bg-gray-300">
      <View className="flex justify-center items-center mt-4 flex-row">
        <PreviousButton offset={offset} setOffset={setOffset} limit={limit} />
        <NextButton offset={offset} setOffset={setOffset} limit={limit} />
      </View>

      <View className="flex flex-wrap flex-row justify-around mt-4">
        {creators.map((creator) => (
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
