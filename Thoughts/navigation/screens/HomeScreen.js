import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import SkinnyIcon from "react-native-snappy";
import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from "./DetailScreen";
import { useIsFocused } from "@react-navigation/native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet"; // Import BottomSheetScrollView
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView
import {} from "react-native";

const Stack = createStackNavigator();

const HomeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrueHome"
        component={HomeScreenContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: "Thought Detail" }}
      />
    </Stack.Navigator>
  );
};

const HomeScreenContainer = () => {
  const dark = global.dark;
  const [thoughts, setThoughts] = useState({});
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const loadThoughts = async () => {
        try {
          // get thoughts
          const storedThoughts = await AsyncStorage.getItem("THOUGHTS");
          setThoughts(storedThoughts ? JSON.parse(storedThoughts) : {});
          // get images
          const coverImage = await AsyncStorage.getItem("HOME_IMAGE");
          setCoverImage(
            !coverImage
              ? {
                  height: 2000,
                  uri: "",
                  width: 1500,
                }
              : {
                  height: 2000,
                  uri: coverImage,
                  width: 1500,
                }
          );
          // get name
          const userName = await AsyncStorage.getItem("userName");
          setName(
            userName == null || userName == ""
              ? ""
              : ", " + userName.split(" ")[0]
          );
        } catch (error) {
          console.error("Error loading thoughts:", error);
        }
      };
      loadThoughts();
    }
  }, [isFocused]);

  const bottomSheetRef = useRef(null);

  const navigation = useNavigation();

  const handleWrite = () => {
    navigation.navigate("Create");
  };

  const formatDate = (ogDate) => {
    const year = ogDate.substring(0, 4);
    const month = ogDate.substring(5, 7);
    const day = ogDate.substring(8, 10);
    const date = new Date(year, month - 1, day);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const monthOfYear = monthsOfYear[month - 1];
    const dayOfMonth = date.getDate();
    let daySuffix = "th";

    if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
      daySuffix = "st";
    } else if (dayOfMonth === 2 || dayOfMonth === 22) {
      daySuffix = "nd";
    } else if (dayOfMonth === 3 || dayOfMonth === 23) {
      daySuffix = "rd";
    }

    const formattedDay = dayOfWeek;
    const formattedDate = `${monthOfYear} ${dayOfMonth}${daySuffix}`;

    return formattedDay + " - " + formattedDate;
  };

  const renderItem = ({ item }) => {
    const dateKey = item; // Date key from the thoughts object
    const thoughtsArray = thoughts[dateKey]; // Array of thoughts for the current date

    return (
      <View style={styles.headerStyle}>
        <Text style={[styles.dayText, dark && { color: "lightgrey" }]}>
          {formatDate(dateKey)}
        </Text>
        {thoughtsArray.map((thought) => (
          <TouchableOpacity
            key={thought.id}
            style={[
              styles.thoughtContainer,
              dark && {
                backgroundColor: "#2B2B2B",
                borderBottomColor: "grey",
              },
            ]}
            onPress={() => navigation.navigate("Detail", { thought })}
          >
            {thought.imageSources && thought.imageSources.length > 0 && (
              <View
                style={[
                  styles.imageWrapperHome,
                  {
                    aspectRatio:
                      thought.imageSources[0].width /
                      thought.imageSources[0].height,
                  },
                ]}
              >
                <Image
                  source={{ uri: thought.imageSources[0].uri }}
                  style={styles.imageHome}
                  resizeMode="cover"
                />
              </View>
            )}
            <View style={styles.thoughtTimeAndMoodAndText}>
              <View style={styles.thoughtTimeAndMood}>
                <Text
                  style={[styles.thoughtTime, dark && { color: "lightgrey" }]}
                >
                  {thought.time}
                </Text>
                {thought.mood && (
                  <Text
                    style={[
                      styles.thoughtMood,
                      {
                        backgroundColor: thought.moodBgColor,
                        color: thought.moodTextColor,
                      },
                    ]}
                  >
                    {thought.mood}
                  </Text>
                )}
              </View>
              {thought.title == "" && thought.content == "" ? null : (
                <View style={styles.thoughtTextContainer}>
                  {thought.title == "" ? null : (
                    <Text
                      style={[styles.thoughtTitle, dark && { color: "white" }]}
                    >
                      {thought.title}
                    </Text>
                  )}
                  {thought.content == "" ? null : (
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.thoughtContent,
                        dark && { color: "white" },
                      ]}
                    >
                      {thought.content}
                    </Text>
                  )}
                </View>
              )}
              {thought.songName && thought.songName != "" && (
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(thought.songLink);
                  }}
                >
                  <View
                    style={[
                      styles.songContainer,
                      dark && { backgroundColor: "#535353" },
                    ]}
                  >
                    <Image
                      source={{ uri: thought.songImage }}
                      style={styles.songImage}
                    />
                    <View style={styles.songTextContainer}>
                      <Text
                        numberOfLines={2}
                        style={[styles.songName2, dark && { color: "white" }]}
                      >
                        {thought.songName}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.songArtist2,
                          dark && { color: "lightgrey" },
                        ]}
                      >
                        {thought.songArtist}
                      </Text>
                    </View>
                    <Ionicons
                      name="play"
                      size={24}
                      height={26}
                      color="#D9D9D9"
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.imageWrapperHome2, { aspectRatio: 0.75 }]}>
        {coverImage.uri == "" ? (
          <Image
            source={require("../../images/placeholder.png")}
            style={styles.homeBackground}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={{ uri: coverImage.uri }}
            style={styles.homeBackground}
            resizeMode="cover"
          />
        )}
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["64%", "94%"]}
        initialSnapIndex={0}
        handleHeight={0}
        handleIndicatorStyle={{ display: "none" }}
        backgroundStyle={[dark && { backgroundColor: "#2B2B2B" }]}
        style={{ ...styles.container, paddingTop: 0 }}
      >
        <BottomSheetFlatList
          data={Object.keys(thoughts).reverse()}
          initialNumToRender={5}
          renderItem={renderItem}
          keyExtractor={(dateKey) => dateKey}
          contentContainerStyle={[
            styles.list,
            dark && { backgroundColor: "#2B2B2B" },
          ]}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.topOfHome}>
              <View style={styles.headerStyle}>
                <Text style={[styles.headerText, dark && { color: "white" }]}>
                  Welcome back{name}!
                </Text>
              </View>
              <TouchableOpacity onPress={handleWrite} style={styles.addButton}>
                <Ionicons
                  name="create-outline"
                  size={24}
                  height={26}
                  color="white"
                />
                <Text style={styles.addButtonText}>What's new?</Text>
                <SkinnyIcon
                  name="check"
                  size={24}
                  strokeWidth={1.5}
                  color="transparent"
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
            </View>
          }
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

export default HomeScreen;
