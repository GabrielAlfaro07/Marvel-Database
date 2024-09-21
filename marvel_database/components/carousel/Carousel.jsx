import React from "react";
import { ScrollView, Text, View } from "react-native";

const Carousel = ({ data, CardComponent, type }) => {
  if (data.length === 0) {
    return (
      <Text
        className="italic text-center text-gray-500 pt-1 pb-3"
        style={{
          fontFamily: "MarvelRegular",
        }}
      >
        No {type} available.
      </Text>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-5"
    >
      {data.map((item) => (
        <CardComponent
          key={item.id}
          {...{ [type]: { ...item, title: item.title.toUpperCase() } }}
        />
      ))}
    </ScrollView>
  );
};

export default Carousel;
