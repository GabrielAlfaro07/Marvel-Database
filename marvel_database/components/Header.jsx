import React from "react";
import { View, Text } from "react-native";

const Header = () => {
  return (
    <View className="flex flex-row justify-start items-center bg-gray-800 p-4">
      <Text
        className="text-2xl text-white"
        style={{ fontFamily: "MarvelRegular" }}
      >
        MARVEL DATABASE
      </Text>
    </View>
  );
};

export default Header;
