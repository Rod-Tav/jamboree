import React, { useState, useEffect } from "react";
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import RootStack from "./navigation/RootStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox, Appearance } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppStateListener from "react-native-appstate-listener";
import { AppState, BackHandler } from "react-native";
import { Provider } from "react-redux";
import tokenReducer from "./store/reducers/token";
import { createStore, combineReducers } from "redux";
import { ThemeContext } from "./contexts/ThemeContext";

const rootReducer = combineReducers({
  token: tokenReducer,
});

const store = createStore(rootReducer);

export default function App() {
  // console.log("here");
  const [theme, setTheme] = useState({ mode: "light" });
  // console.log("mode is", theme.mode);

  // Define a state variable to track the app's state
  const [appState, setAppState] = useState(AppState.currentState);

  // Function to handle changes in the system's color scheme
  const handleSystemColorSchemeChange = () => {
    if (theme.system) {
      const systemColorScheme = Appearance.getColorScheme();
      updateTheme({ system: true, mode: systemColorScheme });
    }
  };

  // Update the appState variable when the app's state changes
  const handleAppStateChange = (nextAppState) => {
    setAppState(nextAppState);

    if (nextAppState === "active") {
      // The app has become active again, check for system color scheme changes
      handleSystemColorSchemeChange();
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch ({ message }) {
      alert(message);
    }
  };

  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = { mode, system: false };
    } else {
      if (newTheme.system) {
        const systemColorScheme = Appearance.getColorScheme();
        // console.log(systemColorScheme);
        mode = systemColorScheme === "dark" ? "dark" : "light";

        newTheme = { ...newTheme, mode };
      } else {
        newTheme = { ...newTheme, system: false };
      }
    }

    setTheme(newTheme);
    storeData("theme", newTheme);
  };

  // Monitor system for theme change when the app is in the foreground
  useEffect(() => {
    let appearanceSubscription;

    if (theme.system) {
      appearanceSubscription = Appearance.addChangeListener(
        ({ colorScheme }) => {
          updateTheme({ system: true, mode: colorScheme });
        }
      );
    }

    return () => {
      // Remove the event listener when the component unmounts
      if (appearanceSubscription) {
        appearanceSubscription.remove();
      }
    };
  }, [theme.system]);

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch ({ message }) {
      alert(message);
    }
  };

  const fetchStoredTheme = async () => {
    try {
      const themeData = await getData("theme");

      if (themeData) {
        updateTheme(themeData);
      }
    } catch ({ message }) {
      console.log("Error: ", message);
    } finally {
      // setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
  };

  useEffect(() => {
    fetchStoredTheme();
  }, []);

  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, updateTheme }}>
        <RootStack />
        <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
      </ThemeContext.Provider>
    </Provider>
  );
}
