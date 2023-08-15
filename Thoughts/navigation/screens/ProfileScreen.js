import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePickerScreen from "../ImagePickerScreen";
import * as FileSystem from "expo-file-system";
import styles from "../../styles/styles";
import proStyles from "../../styles/profileStyles";
import SkinnyIcon from "react-native-snappy";

import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./SearchScreen";

const Stack = createStackNavigator();

const ProfileScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrueProfile"
        component={ProfileScreenContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ProfileScreenContainer = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [imageSources, setImageSources] = useState([]);
  const [showImagePicker, setShowImagePicker] = useState(true);

  // Load user data from AsyncStorage on component mount
  useEffect(() => {
    loadUserData();
  }, [isFocused]);

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

  const loadUserData = async () => {
    try {
      const imageUri = await AsyncStorage.getItem("userImage");
      const name = await AsyncStorage.getItem("userName");
      const bio = await AsyncStorage.getItem("userBio");

      setUserImage(imageUri || "");
      setUserName(name || "");
      setUserBio(bio || "");
    } catch (error) {
      console.log("Error loading user data:", error);
    }
  };

  const imgDir = FileSystem.documentDirectory + "images/";

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
  };

  // Save image to file system
  const saveImage = async () => {
    if (userImage != "") {
      await ensureDirExists();
      const filename = new Date().getTime() + ".jpeg";
      const dest = imgDir + filename;
      await FileSystem.copyAsync({ from: userImage, to: dest });
      return dest;
    }
    return "";
  };

  const saveProfile = async () => {
    try {
      // Save user name and bio to AsyncStorage
      await AsyncStorage.setItem("userName", userName);
      await AsyncStorage.setItem("userBio", userBio);
      await AsyncStorage.setItem("userImage", await saveImage());
    } catch (error) {
      console.log("Error saving profile:", error);
    }
  };

  const changeImageSources = (newImageSources) => {
    setImageSources(newImageSources);
    setShowImagePicker(false);
    setUserImage(newImageSources[0]);
  };

  const handleChangeImage = () => {
    alert("no");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={proStyles.container}>
        <View style={proStyles.scrollContainer}>
          {userImage != "" && (
            <View>
              <Image
                source={{ uri: userImage }}
                style={styles.homeBackground}
                resizeMode="cover"
              />
              <TouchableOpacity onPress={handleChangeImage}>
                <Text>Change Image</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.editProfileView}>
            <View style={proStyles.image}>
              <ImagePickerScreen
                imageSources={imageSources}
                changeImageSources={changeImageSources}
                multiple={false}
                showPicker={showImagePicker}
              />
            </View>

            <View style={styles.profileTextInput}>
              <TextInput
                style={styles.nameInput}
                placeholder="Name"
                value={userName}
                onChangeText={setUserName}
              />
              <TextInput
                style={styles.bioInput}
                placeholder="Bio"
                value={userBio}
                onChangeText={setUserBio}
                multiline={true}
              />
            </View>
            <TouchableOpacity onPress={saveProfile} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          <View style={proStyles.calendar}>
            <Text>Calendar</Text>
          </View>
        </View>
        <View style={proStyles.searchContainer}>
          <TouchableOpacity
            style={proStyles.search}
            onPress={() => navigation.navigate("Search")}
          >
            <View style={proStyles.searchIcon}>
              <SkinnyIcon
                name="magnifier"
                size={16}
                strokeWidth={1.5}
                color="#979C9E"
              />
            </View>

            <Text style={proStyles.searchText}>Search your thoughts...</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ProfileScreen;
