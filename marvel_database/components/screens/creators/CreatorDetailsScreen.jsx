import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import {
  fetchCreatorComics,
  fetchCreatorEvents,
  fetchCreatorSeries,
  fetchCreatorStories,
} from "../../../services/creatorsService";
import ComicCard from "../../cards/ComicCard";
import EventCard from "../../cards/EventCard";
import SeriesCard from "../../cards/SeriesCard";
import StoryCard from "../../cards/StoryCard";
import Carousel from "../../carousel/Carousel"; // Import the Carousel component
import FavoriteButton from "../../buttons/FavoriteButton";

const backgroundImage =
  "https://i.pinimg.com/736x/27/83/d6/2783d6cda989c6da4a591e9f83adcb7c.jpg";

const CreatorDetailsScreen = ({ route }) => {
  const { creator } = route.params;

  const [comics, setComics] = useState([]);
  const [events, setEvents] = useState([]);
  const [series, setSeries] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCreatorDetails = async () => {
      setLoading(true);
      const [comicsData, eventsData, seriesData, storiesData] =
        await Promise.all([
          fetchCreatorComics(creator.id),
          fetchCreatorEvents(creator.id),
          fetchCreatorSeries(creator.id),
          fetchCreatorStories(creator.id),
        ]);
      setComics(comicsData);
      setEvents(eventsData);
      setSeries(seriesData);
      setStories(storiesData);
      setLoading(false);
    };

    loadCreatorDetails();
  }, [creator.id]);

  const Skeleton = () => (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#e63946" />
      <Text className="mt-2 text-gray-200">Loading details...</Text>
    </View>
  );

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={{ flex: 1 }}
      resizeMode="cover" // or "contain", depending on how you want it to fit
    >
      <ScrollView className="flex-1 p-4">
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <View className="relative items-center mb-5">
              <Image
                source={{
                  uri: `${creator.thumbnail.path}.${creator.thumbnail.extension}`,
                }}
                className="w-full aspect-square rounded-xl"
                resizeMode="cover"
              />
              <View className="absolute top-4 right-4 z-10">
                <FavoriteButton itemId={creator.id} itemType="creator" />
              </View>
            </View>

            <Text
              className="text-3xl text-center text-white mb-2"
              style={{
                fontFamily: "MarvelRegular",
              }}
            >
              {creator.fullName}
            </Text>

            {[
              {
                title: "Comics Available:",
                data: comics,
                CardComponent: ComicCard,
                type: "comic",
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
              {
                title: "Stories Available:",
                data: stories,
                CardComponent: StoryCard,
                type: "story",
              },
            ].map(({ title, data, CardComponent, type }) => (
              <View key={title}>
                <Text
                  className="text-xl text-white mb-2"
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
    </ImageBackground>
  );
};

export default CreatorDetailsScreen;
