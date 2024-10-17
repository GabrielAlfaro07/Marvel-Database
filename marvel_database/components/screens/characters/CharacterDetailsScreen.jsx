import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import {
  fetchCharacterComics,
  fetchCharacterSeries,
  fetchCharacterEvents,
  fetchCharacterStories,
} from "../../../services/charactersService";
import ComicCard from "../../cards/ComicCard";
import EventCard from "../../cards/EventCard";
import SeriesCard from "../../cards/SeriesCard";
import StoryCard from "../../cards/StoryCard";
import Carousel from "../../carousel/Carousel"; // Import the Carousel component
import FavoriteButton from "../../buttons/FavoriteButton"; // Import the FavoriteButton

const CharacterDetailsScreen = ({ route }) => {
  const { character } = route.params;

  const [comics, setComics] = useState([]);
  const [series, setSeries] = useState([]);
  const [events, setEvents] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCharacterDetails = async () => {
      setLoading(true);
      const [comicsData, seriesData, eventsData, storiesData] =
        await Promise.all([
          fetchCharacterComics(character.id),
          fetchCharacterSeries(character.id),
          fetchCharacterEvents(character.id),
          fetchCharacterStories(character.id),
        ]);
      setComics(comicsData);
      setSeries(seriesData);
      setEvents(eventsData);
      setStories(storiesData);
      setLoading(false);
    };

    loadCharacterDetails();
  }, [character.id]);

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
          <View className="relative items-center mb-5">
            <Image
              source={{
                uri: `${character.thumbnail.path}.${character.thumbnail.extension}`,
              }}
              className="w-full aspect-square rounded-xl"
              resizeMode="cover"
            />
            <View className="absolute top-4 right-4 z-10">
              <FavoriteButton itemId={character.id} itemType="character" />
            </View>
          </View>

          <Text
            className="text-3xl text-center text-gray-800 mb-2"
            style={{
              fontFamily: "MarvelRegular",
            }}
          >
            {character.name}
          </Text>
          <Text
            className="text-center text-lg text-gray-600 mb-5"
            style={{
              lineHeight: 22, // Reduced line height for less space between lines
              fontFamily: character.description ? "System" : "MarvelRegular", // Apply Marvel font if no description
            }}
          >
            {character.description || "No description available."}
          </Text>

          {[
            {
              title: "Comics Available:",
              data: comics,
              CardComponent: ComicCard,
              type: "comic",
            },
            {
              title: "Series Available:",
              data: series,
              CardComponent: SeriesCard,
              type: "series",
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

export default CharacterDetailsScreen;
