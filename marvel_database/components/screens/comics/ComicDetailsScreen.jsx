import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import {
  fetchComicCharacters,
  fetchComicCreators,
  fetchComicEvents,
  fetchComicStories,
} from "../../../services/comicsService";
import CharacterCard from "../../cards/CharacterCard";
import CreatorCard from "../../cards/CreatorCard";
import EventCard from "../../cards/EventCard";
import StoryCard from "../../cards/StoryCard";
import Carousel from "../../carousel/Carousel"; // Import the Carousel component

const ComicDetailsScreen = ({ route }) => {
  const { comic } = route.params;

  const [characters, setCharacters] = useState([]);
  const [creators, setCreators] = useState([]);
  const [events, setEvents] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComicDetails = async () => {
      setLoading(true);
      const [charactersData, creatorsData, eventsData, storiesData] =
        await Promise.all([
          fetchComicCharacters(comic.id),
          fetchComicCreators(comic.id),
          fetchComicEvents(comic.id),
          fetchComicStories(comic.id),
        ]);
      setCharacters(charactersData);
      setCreators(creatorsData);
      setEvents(eventsData);
      setStories(storiesData);
      setLoading(false);
    };

    loadComicDetails();
  }, [comic.id]);

  const Skeleton = () => (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#e63946" />
      <Text className="mt-2 text-gray-600">Loading details...</Text>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <View className="items-center mb-5">
            <Image
              source={{
                uri: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
              }}
              className="w-full aspect-square rounded-xl"
              resizeMode="cover"
            />
          </View>

          <Text
            className="text-3xl text-center text-gray-800 mb-2"
            style={{
              fontFamily: "MarvelRegular",
            }}
          >
            {comic.title}
          </Text>
          <Text
            className="text-center text-lg text-gray-600 mb-5"
            style={{
              lineHeight: 22, // Reduced line height for less space between lines
              fontFamily: comic.description ? "System" : "MarvelRegular", // Apply Marvel font if no description
            }}
          >
            {comic.description || "No description available."}
          </Text>

          {[
            {
              title: "Characters Available:",
              data: characters,
              CardComponent: CharacterCard,
              type: "character",
            },
            {
              title: "Creators Available:",
              data: creators,
              CardComponent: CreatorCard,
              type: "creator",
            },
            {
              title: "Events Available:",
              data: events,
              CardComponent: EventCard,
              type: "event",
            },
            {
              title: "Stories Available:",
              data: stories,
              CardComponent: StoryCard,
              type: "story",
            },
          ].map(({ title, data, CardComponent, type }) => (
            <View key={title}>
              <Text
                className="text-xl text-gray-800 mb-2"
                style={{
                  fontFamily: "MarvelRegular",
                }}
              >
                {title} {data.length}
              </Text>
              <Carousel
                data={data.map((item) => ({ ...item, loading: !item.title }))}
                CardComponent={CardComponent}
                type={type}
              />
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default ComicDetailsScreen;
