import React from "react";
import { View, Text, Image } from "react-native";

const cardWidth = 180;

// Fixed height for the card content to allow for up to three lines of text
const cardHeight = 280; // Adjust this value as needed

const CharacterCard = ({ character }) => {
  return (
    <View
      className="m-2 rounded-lg overflow-hidden bg-gray-800"
      style={{ width: cardWidth, height: cardHeight }}
    >
      <Image
        source={{
          uri: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        }}
        style={{ width: cardWidth, height: 180 }}
        className="rounded-none"
      />
      <View className="p-2 flex-1 justify-between">
        <Text
          style={{
            fontFamily: "MarvelRegular", // Use the loaded font
            color: "white", // Set text color to white
            maxHeight: 60, // Ensure the text doesn't overflow
          }}
          className="text-center text-xl" // NativeWind classes
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          {character.name}
        </Text>
        <Text
          style={{
            fontFamily: "MarvelRegular", // Use the loaded font
            color: "white", // Set text color to white
          }}
          className="text-center text-base" // NativeWind classes
        >
          ID: {character.id}
        </Text>
      </View>
    </View>
  );
};

export default CharacterCard;
