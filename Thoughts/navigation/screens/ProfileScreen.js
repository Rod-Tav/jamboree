import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import proStyles from "../../styles/profileStyles";
import SkinnyIcon from "react-native-snappy";
import EditScreen from "./EditScreen";
import SettingsScreen from "./SettingsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./SearchScreen";
import { Calendar } from "react-native-calendars";
import SelectedDateThoughtsScreen from "./SelectedDateThoughtsScreen";

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
      <Stack.Screen
        name="SelectedDateThoughts"
        component={SelectedDateThoughtsScreen}
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
  const [thoughts, setThoughts] = useState({});

  // Load user data from AsyncStorage on component mount
  useEffect(() => {
    loadUserData();
    if (isFocused) {
      const loadThoughts = async () => {
        try {
          const storedThoughts = await AsyncStorage.getItem("THOUGHTS");
          setThoughts(storedThoughts ? JSON.parse(storedThoughts) : {});
        } catch (error) {
          console.error("Error loading thoughts:", error);
        }
      };
      loadThoughts();
    }
  }, [isFocused]);

  const groupedThoughts = Object.entries(thoughts).map(
    ([date, thoughtsArray]) => ({
      date,
      thoughts: thoughtsArray,
    })
  );

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

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    const selectedThoughts = groupedThoughts.find(
      (group) => group.date === selectedDate
    );

    if (selectedThoughts) {
      navigation.navigate("SelectedDateThoughts", {
        date: selectedDate,
        thoughts: selectedThoughts.thoughts,
      });
    }
  };

  // Get the current month and year in the format "YYYY-MM"
  const currentDate = new Date();
  const currentMonth = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;

  const markedDates = {};
  // Iterate through groupedThoughts to mark dates with thoughts
  groupedThoughts.forEach((group) => {
    markedDates[group.date] = { marked: true };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={proStyles.container}>
        <View style={proStyles.scrollContainer}>
          <View style={proStyles.editProfileView}>
            {userImage != "" ? (
              <View>
                <Image
                  source={{ uri: userImage }}
                  style={proStyles.profilePic}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View>
                <Image
                  source={require("../../images/profile.png")}
                  style={proStyles.profilePic}
                  resizeMode="cover"
                />
              </View>
            )}
            <View style={proStyles.textInfo}>
              <Text style={proStyles.name}>{userName}</Text>
              <Text style={proStyles.bio}>{userBio}</Text>
            </View>

            <View style={proStyles.icons}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Edit", { userImage, userName, userBio })
                }
                style={proStyles.icon}
              >
                <SkinnyIcon
                  name="edit"
                  size={25}
                  strokeWidth={1.5}
                  color="#979C9E"
                ></SkinnyIcon>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <SkinnyIcon
                  name="settings"
                  size={25}
                  strokeWidth={1.5}
                  color="#979C9E"
                ></SkinnyIcon>
              </TouchableOpacity>
            </View>
          </View>

          <View style={proStyles.calendar}>
            <Calendar
              current={currentMonth}
              onDayPress={handleDayPress}
              markedDates={markedDates}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={proStyles.search}
            onPress={() => navigation.navigate("Search", groupedThoughts)}
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
