import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, ScrollView, Text } from "react-native";
import StoryCard from "../../cards/StoryCard";
import { fetchStories } from "../../../services/storiesService";
import { loadFonts } from "../../../services/fontService";
import PreviousButton from "../../buttons/PreviousButton";
import NextButton from "../../buttons/NextButton";
import SidebarButton from "../../buttons/SidebarButton";
import ProfileButton from "../../buttons/ProfileButton";

const StoriesListScreen = ({ navigation, toggleSidebar }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const getStories = async (offset, limit) => {
    setLoading(true);
    const data = await fetchStories(offset, limit);
    setStories(data);
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
      getStories(offset, limit);
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
          Marvel Stories
        </Text>
        <Text
          className="text-center text-lg text-gray-600"
          style={{ fontFamily: "MarvelRegular" }}
        >
          Here you can find the main stories that occur inside the Marvel
          Universe!
        </Text>
      </View>
      <View className="flex justify-center items-center flex-row">
        <PreviousButton offset={offset} setOffset={setOffset} limit={limit} />
        <NextButton offset={offset} setOffset={setOffset} limit={limit} />
      </View>

      <View className="flex flex-wrap flex-row justify-around mt-4">
        {stories.map((story) => (
          <StoryCard
            key={story.id}
            story={{ ...story, title: story.title.toUpperCase() }}
            loading={!story.title}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default StoriesListScreen;
