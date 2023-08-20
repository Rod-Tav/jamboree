import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
  StatusBar,
  Appearance,
} from "react-native";
import styles from "../../styles/styles";
import SkinnyIcon from "react-native-snappy";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import ProfileImagePicker from "./ProfileImagePicker";
import { useIsFocused } from "@react-navigation/native";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

const SettingsScreen = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  let dark = theme.mode == "dark";
  const navigation = useNavigation();

  const [isActive, setIsActive] = useState(theme.mode === "dark");
  const handleSwitch = () => {
    updateTheme();
    setIsActive((previousState) => !previousState);
  };

  // Set up the options for the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "", // Set the title of the header
      headerStyle: {
        backgroundColor: dark ? "#2B2B2B" : "white",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerShadowVisible: false,
      headerTitleStyle: {
        display: "none",
      },

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginHorizontal: "14%" }}
        >
          <SkinnyIcon
            name="arrow-left"
            size={25}
            strokeWidth={1.5}
            color={dark ? "white" : "#090A0A"}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, dark]);

  const imgDir = FileSystem.documentDirectory + "images/";

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
  };

  const saveImage = async (newImage) => {
    await ensureDirExists();
    const filename = new Date().getTime() + ".jpeg";
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: newImage, to: dest });
    return dest;
  };

  const changeImage = async (newImage) => {
    await AsyncStorage.setItem("HOME_IMAGE", await saveImage(newImage.uri));
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={[{ flex: 1 }, dark && { backgroundColor: "#535353" }]}>
      <View
        style={[
          styles.settingsContainer,
          dark && { backgroundColor: "#2b2b2b" },
        ]}
      >
        <View style={styles.headerStyle}>
          <Text style={[styles.headerText, dark && { color: "white" }]}>
            Settings
          </Text>
        </View>
        <View
          style={[styles.settingsContent, dark && { borderTopColor: "grey" }]}
        >
          <Text style={[styles.dayText, dark && { color: "lightgrey" }]}>
            Aesthetics
          </Text>

          <View style={styles}>
            <ProfileImagePicker settings={true} changeImage={changeImage} />
          </View>
          <View style={styles.section}>
            <SettingsButton
              label="Light"
              isActive={theme.mode === "light" && !theme.system}
              onPress={() => updateTheme({ mode: "light" })}
            />
            <SettingsButton
              label="Dark"
              isActive={theme.mode === "dark" && !theme.system}
              onPress={() => updateTheme({ mode: "dark" })}
            />
            <SettingsButton
              label="System"
              isActive={theme.system}
              onPress={() => updateTheme({ system: true })}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const SettingsButton = ({ label, isActive, ...props }) => {
  const { theme } = useContext(ThemeContext);
  let dark = theme.mode == "dark";

  return (
    <TouchableOpacity
      style={[
        dark
          ? {
              backgroundColor: "#2b2b2b",
            }
          : { backgroundColor: "white" },
      ]}
      {...props}
    >
      <View>
        <Text style={[dark ? { color: "#d1d5db" } : { color: "#4b5563" }]}>
          {label}
        </Text>
      </View>

      <Ionicons
        name={isActive ? "checkmark-circle" : "checkmark-circle-outline"}
        size={24}
        color={
          isActive
            ? dark
              ? "#0891b2"
              : "#0891b2"
            : dark
            ? "#d1d5db"
            : "#4b5563"
        }
      />
    </TouchableOpacity>
  );
};
