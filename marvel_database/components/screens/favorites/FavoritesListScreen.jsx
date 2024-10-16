import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { fetchFavoritesData } from "../../../services/favoritesService";
import Carousel from "../../carousel/Carousel";
import CharacterCard from "../../cards/CharacterCard";
import ComicCard from "../../cards/ComicCard";
import SeriesCard from "../../cards/SeriesCard";
import EventCard from "../../cards/EventCard";
import StoryCard from "../../cards/StoryCard";
import CreatorCard from "../../cards/CreatorCard";
import { fetchUserId, checkUser } from "../../../services/supabaseService"; // Import the new service function
import SidebarButton from "../../buttons/SidebarButton";
import ProfileButton from "../../buttons/ProfileButton";

const FavoritesScreen = ({ navigation, toggleSidebar }) => {
  const [favorites, setFavorites] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);

      // Check if a user is logged in
      const user = await checkUser();
      if (user) {
        setUserId(user.id); // Set the logged-in user ID

        // Fetch the user's favorites
        const favoritesData = await fetchFavoritesData(user.id);
        setFavorites(favoritesData);
      } else {
        setUserId(null); // If no user is logged in, reset the userId
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
      <View key={title} className="px-4">
        <Text
          className="text-2xl text-gray-800"
          style={{ fontFamily: "MarvelRegular" }}
        >
          {title}
        </Text>
        <Carousel data={data} CardComponent={CardComponent} type={type} />
      </View>
    ) : null;
  };

  // If the user is not logged in, show a login prompt
  if (!userId && !loading) {
    return (
      <View className="flex-1 justify-center items-center p-8">
        <Text className="text-center text-2xl text-gray-800 mb-6">
          Please log in to see your favorites!
        </Text>
      </View>
    );
  }

  if (loading || !favorites) return <Skeleton />;

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <SidebarButton toggleSidebar={toggleSidebar} />
      <ProfileButton />
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
        "Characters",
        favorites.character,
        CharacterCard,
        "character"
      )}
      {renderCarousel("Comics", favorites.comic, ComicCard, "comic")}
      {renderCarousel("Series", favorites.series, SeriesCard, "series")}
      {renderCarousel("Events", favorites.event, EventCard, "event")}
      {renderCarousel("Stories", favorites.story, StoryCard, "story")}
      {renderCarousel("Creators", favorites.creator, CreatorCard, "creator")}
    </ScrollView>
  );
};

export default FavoritesScreen;
