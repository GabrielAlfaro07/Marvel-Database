import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import {
  fetchStoryCharacters,
  fetchStoryComics,
  fetchStoryCreators,
  fetchStoryEvents,
  fetchStorySeries,
} from "../../../services/storiesService";
import CharacterCard from "../../cards/CharacterCard";
import ComicCard from "../../cards/ComicCard";
import CreatorCard from "../../cards/CreatorCard";
import EventCard from "../../cards/EventCard";
import SeriesCard from "../../cards/SeriesCard";
import Carousel from "../../carousel/Carousel";

const StoryDetailsScreen = ({ route }) => {
  const { story } = route.params;

  const [characters, setCharacters] = useState([]);
  const [comics, setComics] = useState([]);
  const [creators, setCreators] = useState([]);
  const [events, setEvents] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoryDetails = async () => {
      setLoading(true);
      const [charactersData, comicsData, creatorsData, eventsData, seriesData] =
        await Promise.all([
          fetchStoryCharacters(story.id),
          fetchStoryComics(story.id),
          fetchStoryCreators(story.id),
          fetchStoryEvents(story.id),
          fetchStorySeries(story.id),
        ]);
      setCharacters(charactersData);
      setComics(comicsData);
      setCreators(creatorsData);
      setEvents(eventsData);
      setSeries(seriesData);
      setLoading(false);
    };

    loadStoryDetails();
  }, [story.id]);

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
                uri:
                  story.thumbnail &&
                  story.thumbnail.path &&
                  story.thumbnail.extension
                    ? `${story.thumbnail.path}.${story.thumbnail.extension}`
                    : "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg", // Fallback image
              }}
              className="w-full aspect-square rounded-xl"
              resizeMode="cover"
            />
          </View>

          <Text
            className="text-3xl text-center text-gray-800 mb-2"
            style={{ fontFamily: "MarvelRegular" }}
          >
            {story.title}
          </Text>
          <Text
            className="text-center text-lg text-gray-600 mb-5"
            style={{
              lineHeight: 22,
              fontFamily: story.description ? "System" : "MarvelRegular",
            }}
          >
            {story.description || "No description available."}
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
              title: "Series Available:",
              data: series,
              CardComponent: SeriesCard,
              type: "series",
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

export default StoryDetailsScreen;
