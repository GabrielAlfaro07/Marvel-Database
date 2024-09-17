import React from "react";
import { View, Text, Image } from "react-native";

const CharacterCard = ({ character }) => {
  return (
    <View className="bg-white p-4 m-2 rounded-lg shadow-lg">
      <Image
        source={{
          uri: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        }}
        style={{ width: 150, height: 120 }}
        className="rounded"
      />
      <Text className="text-center font-bold mt-2">{character.name}</Text>
      <Text className="text-center text-gray-500">ID: {character.id}</Text>
    </View>
  );
};

export default CharacterCard;
