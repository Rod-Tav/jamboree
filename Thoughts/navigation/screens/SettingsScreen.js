import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
  Appearance,
} from "react-native";
import styles from "../../styles/styles";
import SkinnyIcon from "react-native-snappy";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import ProfileImagePicker from "./ProfileImagePicker";

const Stack = createStackNavigator();

const SettingsScreen = () => {
  const [dark, setDark] = useState(global.dark);
  const navigation = useNavigation();

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

  const handleThemeChange = async () => {
    await AsyncStorage.setItem("theme", global.dark ? "dark" : "light");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          <View style={styles}>
            <TouchableOpacity
              onPress={() => {
                Appearance.setColorScheme(
                  Appearance.getColorScheme() == "dark" ? "light" : "dark"
                );
                setDark(!dark);
                setDark(!dark);
                global.dark = !global.dark;
                handleThemeChange();
              }}
            >
              <Text>Toggle Dark</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
