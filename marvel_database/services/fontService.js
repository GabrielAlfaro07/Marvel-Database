import * as Font from "expo-font";

export const loadFonts = async () => {
  await Font.loadAsync({
    MarvelRegular: require("../assets/fonts/MarvelRegular.ttf"),
  });
};
