import React, { useState, useEffect } from "react";
import { StatusBar, Appearance, useColorScheme } from "react-native";
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import MainContainer from "./navigation/MainContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Sending"]);
import { Provider } from "react-redux";
import tokenReducer from "./store/reducers/token";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  token: tokenReducer,
});

const store = createStore(rootReducer);

export default function App() {
  const [theme, setTheme] = useState();
  useEffect(() => {
    loadTheme();
  });
  const dark = global.dark;
  global.dark = useColorScheme() === "dark";

  const loadTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem("theme");
      console.log(theme);
      if (theme) {
        setTheme(theme);
        Appearance.setColorScheme(theme);
        global.dark = theme === "dark";
      } else {
        setTheme(Appearance.getColorScheme());
        global.dark = useColorScheme() === "dark";
      }
    } catch (error) {
      console.log("Error loading theme:", error);
    }
  };

  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  if (dark) {
    StatusBar.setBarStyle("light-content");
  } else {
    StatusBar.setBarStyle("dark-content");
  }

  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
}
