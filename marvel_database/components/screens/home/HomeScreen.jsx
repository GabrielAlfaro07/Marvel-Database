import React from "react";
import { View, Text, ScrollView } from "react-native";

const HomeScreen = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center p-8">
        <Text
          className="text-center text-2xl text-gray-800 mb-6"
          style={{ fontFamily: "MarvelRegular" }}
        >
          Welcome to our app!
        </Text>
        <Text
          className="text-center text-lg text-gray-600"
          style={{ fontFamily: "MarvelRegular" }}
        >
          Select something in the sidebar to explore the universe of Marvel!
        </Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
