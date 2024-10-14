import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, ScrollView, Text } from "react-native";
import SeriesCard from "../../cards/SeriesCard";
import { fetchSeries } from "../../../services/seriesService";
import { loadFonts } from "../../../services/fontService";
import PreviousButton from "../../buttons/PreviousButton";
import NextButton from "../../buttons/NextButton";
import SidebarButton from "../../buttons/SidebarButton";
import ProfileButton from "../../buttons/ProfileButton";

const SeriesListScreen = ({ navigation, toggleSidebar }) => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const getSeries = async (offset, limit) => {
    setLoading(true);
    const data = await fetchSeries(offset, limit);
    setSeries(data);
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
      getSeries(offset, limit);
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
    <ScrollView className="bg-gray-100">
      <SidebarButton toggleSidebar={toggleSidebar} />
      <ProfileButton />
      <View className="flex-1 justify-center items-center p-8">
        <Text
          className="text-center text-2xl text-gray-800 mb-6"
          style={{ fontFamily: "MarvelRegular" }}
        >
          Marvel Series
        </Text>
        <Text
          className="text-center text-lg text-gray-600"
          style={{ fontFamily: "MarvelRegular" }}
        >
          The Marvel Series are small collections of events and stories that
          happen inside the Marvel Universe!
        </Text>
      </View>
      <View className="flex justify-center items-center flex-row">
        <PreviousButton offset={offset} setOffset={setOffset} limit={limit} />
        <NextButton offset={offset} setOffset={setOffset} limit={limit} />
      </View>
      <View className="flex flex-wrap flex-row justify-around mt-4">
        {series.map((serie) => (
          <SeriesCard
            key={serie.id}
            series={{ ...serie, title: serie.title.toUpperCase() }}
            loading={!serie.title}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default SeriesListScreen;
