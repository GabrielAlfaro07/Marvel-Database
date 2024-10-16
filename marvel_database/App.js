import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { loadFonts } from "./services/fontService"; // Adjust the path accordingly
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CharactersListScreen from "./components/screens/characters/CharactersListScreen";
import CharacterDetailsScreen from "./components/screens/characters/CharacterDetailsScreen";
import ComicsListScreen from "./components/screens/comics/ComicsListScreen";
import ComicDetailsScreen from "./components/screens/comics/ComicDetailsScreen";
import CreatorsListScreen from "./components/screens/creators/CreatorsListScreen";
import CreatorDetailsScreen from "./components/screens/creators/CreatorDetailsScreen";
import EventsListScreen from "./components/screens/events/EventsListScreen";
import EventDetailsScreen from "./components/screens/events/EventDetailsScreen";
import SeriesListScreen from "./components/screens/series/SeriesListScreen";
import SeriesDetailsScreen from "./components/screens/series/SeriesDetailsScreen";
import StoriesListScreen from "./components/screens/stories/StoriesListScreen";
import StoryDetailsScreen from "./components/screens/stories/StoryDetailsScreen";
import Sidebar from "./components/sidebars/Sidebar";
import HomeScreen from "./components/screens/home/HomeScreen";
import FavoritesScreen from "./components/screens/favorites/FavoritesListScreen";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
        setFontsLoaded(true);
      } catch (error) {
        console.warn("Error loading fonts", error);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    loadResources();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const toggleSidebar = () => {
    console.log("Toggling Sidebar:", !isSidebarOpen); // Add this to check state
    setSidebarOpen((prev) => !prev);
  };

  return (
    <NavigationContainer>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {() => <HomeScreen toggleSidebar={toggleSidebar} />}
        </Stack.Screen>
        <Stack.Screen name="Characters">
          {() => <CharactersListScreen toggleSidebar={toggleSidebar} />}
        </Stack.Screen>
        <Stack.Screen
          name="Character Details"
          component={CharacterDetailsScreen}
        />
        <Stack.Screen name="Comics">
          {() => <ComicsListScreen toggleSidebar={toggleSidebar} />}
        </Stack.Screen>
        <Stack.Screen name="Comic Details" component={ComicDetailsScreen} />
        <Stack.Screen name="Creators">
          {() => <CreatorsListScreen toggleSidebar={toggleSidebar} />}
        </Stack.Screen>
        <Stack.Screen name="Creator Details" component={CreatorDetailsScreen} />
        <Stack.Screen name="Events">
          {() => <EventsListScreen toggleSidebar={toggleSidebar} />}
        </Stack.Screen>
        <Stack.Screen name="Event Details" component={EventDetailsScreen} />
        <Stack.Screen name="Series">
          {() => <SeriesListScreen toggleSidebar={toggleSidebar} />}
        </Stack.Screen>
        <Stack.Screen name="Series Details" component={SeriesDetailsScreen} />
        <Stack.Screen name="Stories">
          {() => <StoriesListScreen toggleSidebar={toggleSidebar} />}
        </Stack.Screen>
        <Stack.Screen name="Story Details" component={StoryDetailsScreen} />
        <Stack.Screen name="Favorites">
          {() => <FavoritesScreen toggleSidebar={toggleSidebar} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
