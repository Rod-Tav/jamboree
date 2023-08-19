import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Appearance,
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

const ProfileScreen = ({ dark, setDark }) => {
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
  const dark = Appearance.getColorScheme() === "dark";
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

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    const selectedThoughts = thoughts[selectedDate];

    if (selectedThoughts && selectedThoughts.length > 0) {
      navigation.navigate("SelectedDateThoughts", {
        date: selectedDate,
        thoughts: selectedThoughts,
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
  Object.keys(thoughts).forEach((date) => {
    markedDates[date] = { marked: true };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[proStyles.container, dark && { backgroundColor: "#2b2b2b" }]}
      >
        <View style={proStyles.scrollContainer}>
          <View
            style={[
              proStyles.editProfileView,
              dark && { borderBottomColor: "grey" },
            ]}
          >
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
              <Text
                style={[
                  proStyles.name,
                  dark && { color: "white" },
                  !userName && { color: "grey" },
                ]}
              >
                {userName || "Your name"}
              </Text>
              {userBio && (
                <Text
                  style={[
                    proStyles.bio,
                    dark && { color: "white" },
                    !userBio && { color: "grey" },
                  ]}
                >
                  {userBio}
                </Text>
              )}
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
                  color={dark ? "lightgrey" : "#979C9E"}
                ></SkinnyIcon>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <SkinnyIcon
                  name="settings"
                  size={25}
                  strokeWidth={1.5}
                  color={dark ? "lightgrey" : "#979C9E"}
                ></SkinnyIcon>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView key={dark}>
            <Calendar
              style={[
                proStyles.calendar,
                dark && { backgroundColor: "#2b2b2b" },
              ]}
              current={currentMonth}
              onDayPress={handleDayPress}
              markingType={"period"}
              markedDates={markedDates}
              enableSwipeMonths={true}
              theme={{
                calendarBackground: dark ? "#2b2b2b" : "white",
                monthTextColor: dark ? "white" : "black",
                arrowColor: dark ? "white" : "blue",
                dayTextColor: dark ? "white" : "black",
                textDisabledColor: dark ? "grey" : "lightgrey",
              }}
            />
          </ScrollView>
        </View>
        <View>
          <TouchableOpacity
            style={[
              proStyles.search,
              dark && {
                backgroundColor: "#535353",
              },
            ]}
            onPress={() => navigation.navigate("Search", thoughts)}
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
