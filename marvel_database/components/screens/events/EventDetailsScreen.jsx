import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import {
  fetchEventCharacters,
  fetchEventComics,
  fetchEventCreators,
  fetchEventSeries,
  fetchEventStories,
} from "../../../services/eventsService";
import CharacterCard from "../../cards/CharacterCard";
import ComicCard from "../../cards/ComicCard";
import CreatorCard from "../../cards/CreatorCard";
import SeriesCard from "../../cards/SeriesCard";
import StoryCard from "../../cards/StoryCard";
import Carousel from "../../carousel/Carousel";
import FavoriteButton from "../../buttons/FavoriteButton";

const EventDetailsScreen = ({ route }) => {
  const { event } = route.params;

  const [characters, setCharacters] = useState([]);
  const [comics, setComics] = useState([]);
  const [creators, setCreators] = useState([]);
  const [series, setSeries] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEventDetails = async () => {
      setLoading(true);
      const [
        charactersData,
        comicsData,
        creatorsData,
        seriesData,
        storiesData,
      ] = await Promise.all([
        fetchEventCharacters(event.id),
        fetchEventComics(event.id),
        fetchEventCreators(event.id),
        fetchEventSeries(event.id),
        fetchEventStories(event.id),
      ]);
      setCharacters(charactersData);
      setComics(comicsData);
      setCreators(creatorsData);
      setSeries(seriesData);
      setStories(storiesData);
      setLoading(false);
    };

    loadEventDetails();
  }, [event.id]);

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
                uri: `${event.thumbnail.path}.${event.thumbnail.extension}`,
              }}
              className="w-full aspect-square rounded-xl"
              resizeMode="cover"
            />
            <View className="absolute top-4 right-4 z-10">
              <FavoriteButton itemId={event.id} itemType="event" />
            </View>
          </View>

          <Text
            className="text-3xl text-center text-gray-800 mb-2"
            style={{
              fontFamily: "MarvelRegular",
            }}
          >
            {event.title}
          </Text>
          <Text
            className="text-center text-lg text-gray-600 mb-5"
            style={{
              lineHeight: 22,
              fontFamily: event.description ? "System" : "MarvelRegular",
            }}
          >
            {event.description || "No description available."}
          </Text>

          {[
            {
              title: "Characters Available:",
              data: characters,
              CardComponent: CharacterCard,
              type: "character",
            },
            {
              title: "Comics Available:",
              data: comics,
              CardComponent: ComicCard,
              type: "comic",
            },
            {
              title: "Creators Available:",
              data: creators,
              CardComponent: CreatorCard,
              type: "creator",
            },
            {
              title: "Series Available:",
              data: series,
              CardComponent: SeriesCard,
              type: "series",
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
                style={{ fontFamily: "MarvelRegular" }}
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

export default EventDetailsScreen;
