import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  useColorScheme,
} from "react-native";
import styles from "../../styles/styles";
import proStyles from "../../styles/profileStyles";
import SkinnyIcon from "react-native-snappy";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import DetailScreen from "./DetailScreen";
import { createStackNavigator } from "@react-navigation/stack";
import moodstyles from "../../styles/moodstyles";

const Stack = createStackNavigator();

const SelectedDateThoughtsScreen = ({ route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrueSelectedDate"
        component={SelectedDateThoughtsScreenContainer}
        initialParams={{
          thoughtsList: route.params.thoughts,
          date: route.params.date,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: "Thought Detail" }}
      />
    </Stack.Navigator>
  );
};

const SelectedDateThoughtsScreenContainer = ({ route }) => {
  const dark = useColorScheme() === "dark";
  const { thoughtsList, date } = route.params;
  const navigation = useNavigation();
  const [query, setQuery] = useState("");

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
  }, [navigation]);

  const renderItem = ({ item }) => {
    const thought = item;
    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity
          key={thought.id}
          style={[
            styles.thoughtContainer2,
            dark && { backgroundColor: "#2b2b2b", borderBottomColor: "grey" },
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
              {thought.mood ? (
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
              ) : null}
            </View>
            {thought.title == "" && thought.content == "" ? null : (
              <View style={styles.thoughtTextContainer}>
                {thought.title == "" ? null : (
                  <Text style={styles.thoughtTitle}>{thought.title}</Text>
                )}
                {thought.content == "" ? null : (
                  <Text numberOfLines={1} style={styles.thoughtContent}>
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
                  <Ionicons name="play" size={24} height={26} color="#D9D9D9" />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[proStyles.container2, dark && { backgroundColor: "#2b2b2b" }]}
      >
        <Text style={[styles.dayText2, dark && { color: "lightgrey" }]}>
          {formatDate(date)}
        </Text>
        <FlatList
          data={thoughtsList.slice()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectedDateThoughtsScreen;
