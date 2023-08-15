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
import * as FileSystem from "expo-file-system";
import styles from "../../styles/styles";
import proStyles from "../../styles/profileStyles";
import SkinnyIcon from "react-native-snappy";
import EditScreen from "./EditScreen";
import SettingsScreen from "./SettingsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./SearchScreen";
import placeholder from "../../assets/icon.png";

const Stack = createStackNavigator();

const ProfileScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrueProfile"
        component={ProfileScreenContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Edit" component={EditScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
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

  // Load user data from AsyncStorage on component mount
  useEffect(() => {
    loadUserData();
  }, [isFocused]);

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

  const changeImageSources = (newImageSources) => {
    setImageSources(newImageSources);
    setUserImage(newImageSources[0]);
  };

  const handleChangeImage = () => {
    alert("no");
  };

  const handleEdit = () => {};

  const handleSettings = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={proStyles.container}>
        <View style={proStyles.scrollContainer}>
          <View style={styles.editProfileView}>
            <View>
              {userImage != "" && (
                <View>
                  <Image
                    source={{ uri: userImage }}
                    style={proStyles.profilePic}
                    resizeMode="cover"
                  />
                </View>
              )}
            </View>
            <Text style={proStyles.name}>{userName}</Text>
            <Text style={proStyles.bio}>{userBio}</Text>
            <View style={proStyles.icons}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Edit", { userImage, userName, userBio })
                }
              >
                <SkinnyIcon
                  name="edit"
                  size={30}
                  strokeWidth={2}
                  color="#979C9E"
                ></SkinnyIcon>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <SkinnyIcon
                  name="settings"
                  size={30}
                  strokeWidth={2}
                  color="#979C9E"
                ></SkinnyIcon>
              </TouchableOpacity>
            </View>
          </View>
          <View style={proStyles.calendar}>
            <Text>Calendar</Text>
          </View>
        </View>
        <View>
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
