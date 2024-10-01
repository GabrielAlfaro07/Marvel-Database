import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SidebarButton from "../buttons/SidebarButton"; // Make sure the path is correct

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigation = useNavigation();
  const [slideAnim] = React.useState(new Animated.Value(-300)); // Initial position off-screen

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -300, // Move in when open, out when closed
      duration: 300, // Duration of the animation
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <Animated.View
      style={{
        transform: [{ translateX: slideAnim }],
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "40%", // Adjusted for the width
        backgroundColor: "rgba(31, 41, 55, 1)", // Tailwind bg-gray-800
        zIndex: 50,
      }}
    >
      <View className="p-4 mt-24 ml-2">
        {/* Sidebar button to close */}
        <View className="absolute -top-1 -left-2">
          <SidebarButton toggleSidebar={toggleSidebar} isOpen={isOpen} />
        </View>
        <View className="mt-14">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
              toggleSidebar();
            }}
          >
            <Text
              className="text-white text-2xl mb-4"
              style={{ fontFamily: "MarvelRegular" }} // Marvel font
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Characters");
              toggleSidebar();
            }}
          >
            <Text
              className="text-white text-2xl mb-4"
              style={{ fontFamily: "MarvelRegular" }} // Marvel font
            >
              Characters
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Comics");
              toggleSidebar();
            }}
          >
            <Text
              className="text-white text-2xl mb-4"
              style={{ fontFamily: "MarvelRegular" }} // Marvel font
            >
              Comics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Creators");
              toggleSidebar();
            }}
          >
            <Text
              className="text-white text-2xl mb-4"
              style={{ fontFamily: "MarvelRegular" }} // Marvel font
            >
              Creators
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Events");
              toggleSidebar();
            }}
          >
            <Text
              className="text-white text-2xl mb-4"
              style={{ fontFamily: "MarvelRegular" }} // Marvel font
            >
              Events
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Series");
              toggleSidebar();
            }}
          >
            <Text
              className="text-white text-2xl mb-4"
              style={{ fontFamily: "MarvelRegular" }} // Marvel font
            >
              Series
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Stories");
              toggleSidebar();
            }}
          >
            <Text
              className="text-white text-2xl mb-4"
              style={{ fontFamily: "MarvelRegular" }} // Marvel font
            >
              Stories
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default Sidebar;
