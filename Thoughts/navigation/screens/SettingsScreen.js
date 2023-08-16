import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "../../styles/styles";
import SkinnyIcon from "react-native-snappy";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import ProfileImagePicker from "./ProfileImagePicker";

const Stack = createStackNavigator();

const SettingsScreen = () => {
  const navigation = useNavigation();

  // Set up the options for the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "", // Set the title of the header
      headerStyle: {
        backgroundColor: "white",
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
            color="#090A0A"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.settingsContainer}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerText}>Settings</Text>
        </View>
        <View style={styles.settingsContent}>
          <Text style={styles.dayText}>Aesthetics</Text>

          <View style={styles}>
            <ProfileImagePicker settings={true} changeImage={changeImage} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;