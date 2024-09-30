import React from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 24;
const cardHeight = 280;

const SeriesCard = ({ series, loading }) => {
  const navigation = useNavigation(); // Use the hook to get navigation

  return (
    <TouchableOpacity
      onPress={() =>
        !loading && navigation.navigate("Series Details", { series })
      }
    >
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
                uri: `${series.thumbnail.path}.${series.thumbnail.extension}`,
              }}
              style={{ width: cardWidth, height: 200 }}
              className="rounded-none"
            />
            <View className="p-2 flex-1 justify-center items-center">
              <Text
                style={{
                  fontFamily: "MarvelRegular",
                  color: "white",
                }}
                className="text-center text-xl"
                numberOfLines={2}
              >
                {series.title}
              </Text>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SeriesCard;
