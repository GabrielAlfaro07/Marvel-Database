import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/search-icon.png")} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    margin: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchBar;
