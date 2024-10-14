import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import {
  fetchSeriesCharacters,
  fetchSeriesComics,
  fetchSeriesCreators,
  fetchSeriesEvents,
  fetchSeriesStories,
} from "../../../services/seriesService";
import CharacterCard from "../../cards/CharacterCard";
import ComicCard from "../../cards/ComicCard";
import CreatorCard from "../../cards/CreatorCard";
import EventCard from "../../cards/EventCard";
import StoryCard from "../../cards/StoryCard";
import Carousel from "../../carousel/Carousel";
import FavoriteButton from "../../buttons/FavoriteButton";

const SeriesDetailsScreen = ({ route }) => {
  const { series } = route.params;

  const [characters, setCharacters] = useState([]);
  const [comics, setComics] = useState([]);
  const [creators, setCreators] = useState([]);
  const [events, setEvents] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSeriesDetails = async () => {
      setLoading(true);
      const [
        charactersData,
        comicsData,
        creatorsData,
        eventsData,
        storiesData,
      ] = await Promise.all([
        fetchSeriesCharacters(series.id),
        fetchSeriesComics(series.id),
        fetchSeriesCreators(series.id),
        fetchSeriesEvents(series.id),
        fetchSeriesStories(series.id),
      ]);
      setCharacters(charactersData);
      setComics(comicsData);
      setCreators(creatorsData);
      setEvents(eventsData);
      setStories(storiesData);
      setLoading(false);
    };

    loadSeriesDetails();
  }, [series.id]);

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
                uri: `${series.thumbnail.path}.${series.thumbnail.extension}`,
              }}
              className="w-full aspect-square rounded-xl"
              resizeMode="cover"
            />
            <View className="absolute top-4 right-4 z-10">
              <FavoriteButton itemId={series.id} itemType="series" />
            </View>
          </View>

          <Text
            className="text-3xl text-center text-gray-800 mb-2"
            style={{ fontFamily: "MarvelRegular" }}
          >
            {series.title}
          </Text>
          <Text
            className="text-center text-lg text-gray-600 mb-5"
            style={{
              lineHeight: 22,
              fontFamily: series.description ? "System" : "MarvelRegular",
            }}
          >
            {series.description || "No description available."}
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

export default SeriesDetailsScreen;
