import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, ScrollView } from "react-native";
import ComicCard from "../../cards/ComicCard";
import { fetchComics } from "../../../services/comicsService";
import { loadFonts } from "../../../services/fontService";
import PreviousButton from "../../buttons/PreviousButton";
import NextButton from "../../buttons/NextButton";

const ComicsListScreen = ({ navigation }) => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 30;

  const getComics = async (offset, limit) => {
    setLoading(true);
    const data = await fetchComics(offset, limit);
    setComics(data);
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
      getComics(offset, limit);
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
        {comics.map((comic) => (
          <ComicCard
            key={comic.id}
            comic={{ ...comic, title: comic.title.toUpperCase() }}
            loading={!comic.title}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ComicsListScreen;
