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
import SidebarButton from "./components/buttons/SidebarButton";
import Sidebar from "./components/sidebars/Sidebar";
import HomeScreen from "./components/screens/home/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Prevent the splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();
        // Load fonts
        await loadFonts();
        setFontsLoaded(true);
      } catch (error) {
        console.warn("Error loading fonts", error);
      } finally {
        // Hide the splash screen once the fonts are loaded
        await SplashScreen.hideAsync();
      }
    };

    loadResources();
  }, []);

  if (!fontsLoaded) {
    return null; // You can return null while the fonts are loading
  }

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <NavigationContainer>
      <SidebarButton toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Characters" component={CharactersListScreen} />
        <Stack.Screen
          name="Character Details"
          component={CharacterDetailsScreen}
        />
        <Stack.Screen name="Comics" component={ComicsListScreen} />
        <Stack.Screen name="Comic Details" component={ComicDetailsScreen} />
        <Stack.Screen name="Creators" component={CreatorsListScreen} />
        <Stack.Screen name="Creator Details" component={CreatorDetailsScreen} />
        <Stack.Screen name="Events" component={EventsListScreen} />
        <Stack.Screen name="Event Details" component={EventDetailsScreen} />
        <Stack.Screen name="Series" component={SeriesListScreen} />
        <Stack.Screen name="Series Details" component={SeriesDetailsScreen} />
        <Stack.Screen name="Stories" component={StoriesListScreen} />
        <Stack.Screen name="Story Details" component={StoryDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
