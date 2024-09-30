import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigation = useNavigation();

  if (!isOpen) return null;

  return (
    <View className="absolute top-0 left-0 h-full w-2/3 bg-gray-800 z-40">
      <TouchableOpacity
        className="absolute top-4 right-4"
        onPress={toggleSidebar}
      >
        <Text className="text-white">X</Text>
      </TouchableOpacity>
      <View className="p-4 mt-16">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
            toggleSidebar();
          }}
        >
          <Text className="text-white text-xl mb-4">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Comics");
            toggleSidebar();
          }}
        >
          <Text className="text-white text-xl mb-4">Comics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Creators");
            toggleSidebar();
          }}
        >
          <Text className="text-white text-xl mb-4">Creators</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Events");
            toggleSidebar();
          }}
        >
          <Text className="text-white text-xl mb-4">Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Series");
            toggleSidebar();
          }}
        >
          <Text className="text-white text-xl mb-4">Series</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Stories");
            toggleSidebar();
          }}
        >
          <Text className="text-white text-xl">Stories</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sidebar;
