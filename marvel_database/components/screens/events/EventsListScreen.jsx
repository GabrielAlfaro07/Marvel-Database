import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, ScrollView, Text } from "react-native";
import EventCard from "../../cards/EventCard";
import { fetchEvents } from "../../../services/eventsService";
import { loadFonts } from "../../../services/fontService";
import PreviousButton from "../../buttons/PreviousButton";
import NextButton from "../../buttons/NextButton";
import SidebarButton from "../../buttons/SidebarButton";

const EventsListScreen = ({ navigation, toggleSidebar }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const getEvents = async (offset, limit) => {
    setLoading(true);
    const data = await fetchEvents(offset, limit);
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      getEvents(offset, limit);
    }
  }, [fontsLoaded, offset]);

  if (!fontsLoaded || loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-300">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView className="bg-gray-100">
      <SidebarButton toggleSidebar={toggleSidebar} />
      <View className="flex-1 justify-center items-center p-8">
        <Text
          className="text-center text-2xl text-gray-800 mb-6"
          style={{ fontFamily: "MarvelRegular" }}
        >
          Marvel Events
        </Text>
        <Text
          className="text-center text-lg text-gray-600"
          style={{ fontFamily: "MarvelRegular" }}
        >
          The Marvel Events are the cornerstone of the plot that directs the
          adventures of our favorite characters!
        </Text>
      </View>
      <View className="flex justify-center items-center flex-row">
        <PreviousButton offset={offset} setOffset={setOffset} limit={limit} />
        <NextButton offset={offset} setOffset={setOffset} limit={limit} />
      </View>

      <View className="flex flex-wrap flex-row justify-around mt-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={{ ...event, title: event.title.toUpperCase() }}
            loading={!event.title}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default EventsListScreen;
