import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import SkinnyIcon from "react-native-snappy";
import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from "./DetailScreen";
import { useIsFocused } from "@react-navigation/native";

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
  const [thoughts, setThoughts] = useState({});
  const isFocused = useIsFocused(); // Get the focused state of the screen

  useEffect(() => {
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

  return <RenderHomeContent thoughts={thoughts} />;
};

const HomeImage = () => {};

const RenderHomeContent = ({ thoughts }) => {
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
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.dayText}>{formatDate(item.date)}</Text>
        {item.thoughts.map((thought) => (
          <TouchableOpacity
            key={thought.id}
            style={styles.thoughtContainer}
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
                <Text style={styles.thoughtTime}>{thought.time}</Text>
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
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const groupedThoughts = Object.entries(thoughts).map(
    ([date, thoughtsArray]) => ({
      date,
      thoughts: thoughtsArray,
    })
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={groupedThoughts.slice().reverse()}
        renderItem={renderItem}
        keyExtractor={(item) => item.date} // Use the date as the key for each rendered date group
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.topOfHome}>
            <View style={styles.headerStyle}>
              <Text style={styles.headerText}>Welcome back!</Text>
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
    </View>
  );
};

export default HomeScreen;
