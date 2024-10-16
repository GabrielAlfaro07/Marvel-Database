import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Button,
} from "react-native";
import { fetchAllFavorites } from "../../../services/favoritesService"; // Import your service
import Carousel from "../../carousel/Carousel"; // Use existing Carousel component
import ComicCard from "../../cards/ComicCard"; // Example of how you can reuse existing cards
import SeriesCard from "../../cards/SeriesCard";
import { fetchUserId } from "../../../services/supabaseService"; // Import function to get current user
import CharacterCard from "../../cards/CharacterCard";
import CreatorCard from "../../cards/CreatorCard";
import EventCard from "../../cards/EventCard";
import StoryCard from "../../cards/StoryCard";

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      const id = await fetchUserId();
      setUserId(id);

      if (id) {
        const userFavorites = await fetchAllFavorites(id);
        setFavorites(userFavorites);
      }
      setLoading(false);
    };

    loadFavorites();
  }, []);

  const Skeleton = () => (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#e63946" />
      <Text className="mt-2 text-gray-600">Loading favorites...</Text>
    </View>
  );

  const renderCarousel = (title, data, CardComponent, type) => {
    return data?.length ? (
      <View key={title} className="mb-5">
        <Text className="text-xl text-gray-800 mb-2">{title}</Text>
        <Carousel data={data} CardComponent={CardComponent} type={type} />
      </View>
    ) : null;
  };

  // If the user is not logged in, show a login prompt
  if (!userId && !loading) {
    return (
      <View className="flex-1 justify-center items-center p-8">
        <Text
          className="text-center text-2xl text-gray-800 mb-6"
          style={{ fontFamily: "MarvelRegular" }}
        >
          Please log in to see your favorites!
        </Text>
      </View>
    );
  }

  if (loading || !favorites) return <Skeleton />;

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="flex-1 justify-center items-center p-8">
        <Text
          className="text-center text-2xl text-gray-800 mb-6"
          style={{ fontFamily: "MarvelRegular" }}
        >
          Your Favorites
        </Text>
        <Text
          className="text-center text-lg text-gray-600"
          style={{ fontFamily: "MarvelRegular" }}
        >
          This is the place where you can find your favorite characters, comics,
          creators, events, series, and stories!
        </Text>
      </View>
      {renderCarousel(
        "Favorite Characters",
        favorites.character,
        CharacterCard,
        "character"
      )}
      {renderCarousel("Favorite Comics", favorites.comic, ComicCard, "comic")}
      {renderCarousel(
        "Favorite Creators",
        favorites.creator,
        CreatorCard,
        "creator"
      )}
      {renderCarousel("Favorite Events", favorites.event, EventCard, "event")}
      {renderCarousel(
        "Favorite Series",
        favorites.series,
        SeriesCard,
        "series"
      )}
      {renderCarousel("Favorite Stories", favorites.story, StoryCard, "story")}
    </ScrollView>
  );
};

export default FavoritesScreen;
