import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 24;
const cardHeight = 280;

const StoryCard = ({ story, loading }) => {
  return (
    <View
      className="m-2 rounded-lg overflow-hidden bg-gray-800"
      style={{ width: cardWidth, height: cardHeight }}
    >
      {loading ? (
        <View className="flex-1 justify-center items-center bg-gray-500">
          <Text
            className="text-center text-white text-xl"
            style={{ fontFamily: "MarvelRegular" }}
          >
            Loading details...
          </Text>
        </View>
      ) : (
        <>
          <Image
            source={{
              uri: story.thumbnail
                ? `${story.thumbnail.path}.${story.thumbnail.extension}`
                : "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
            }}
            style={{ width: cardWidth, height: 200 }}
            className="rounded-none"
          />
          <View className="p-2 flex-1 justify-between">
            <Text
              style={{
                fontFamily: "MarvelRegular",
                color: "white",
                minHeight: 40,
                maxHeight: 60,
              }}
              className="text-center text-xl"
              numberOfLines={2}
            >
              {story.title}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default StoryCard;
