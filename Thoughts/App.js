import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import MainContainer from "./navigation/MainContainer";

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
  const dark = useColorScheme() === "dark";

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
