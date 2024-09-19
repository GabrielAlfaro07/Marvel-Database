import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

// Get the screen width to calculate the card size
const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 24; // Dividing the screen width by 2 and accounting for margins

// Fixed height for the card content to allow for up to three lines of text
const cardHeight = 280; // Adjust this value as needed

const StoryCard = ({ story }) => {
  return (
    <View
      className="m-2 rounded-lg overflow-hidden bg-gray-800"
      style={{ width: cardWidth, height: cardHeight }}
    >
      <Image
        source={{
          uri: `${story.thumbnail.path}.${story.thumbnail.extension}`,
        }}
        style={{ width: cardWidth, height: 180 }}
        className="rounded-none"
      />
      <View className="p-2 flex-1 justify-between">
        <Text
          style={{
            fontFamily: "MarvelRegular", // Use the loaded font
            color: "white", // Set text color to white
            minHeight: 40, // Ensures space for at least 1 line of text, but centers it
            maxHeight: 60, // Ensure the text doesn't overflow more than 2 lines
          }}
          className="text-center text-2xl" // NativeWind classes
          numberOfLines={2}
        >
          {story.title}
        </Text>
      </View>
    </View>
  );
};

export default StoryCard;
