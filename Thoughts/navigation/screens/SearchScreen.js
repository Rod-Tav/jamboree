import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import styles from "../../styles/styles";
import SkinnyIcon from "react-native-snappy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import DetailScreen from "./DetailScreen";
import { useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";

const Stack = createStackNavigator();

const SearchScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TrueSearch" component={SearchScreenContainer} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: "Thought Detail" }}
      />
    </Stack.Navigator>
  );
};

const SearchScreenContainer = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [thoughts, setThoughts] = useState({});

  const isFocused = useIsFocused();

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

  const groupedThoughts = Object.entries(thoughts).map(
    ([date, thoughtsArray]) => ({
      date,
      thoughts: thoughtsArray,
    })
  );

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

  const filterData = () => {
    console.log("hi");
    // Filter the thoughts based on the query
    const filteredThoughts = groupedThoughts
      .map(({ date, thoughts }) => ({
        date,
        thoughts: thoughts.filter(
          (thought) =>
            thought.title.toLowerCase().includes(query.toLowerCase()) ||
            thought.content.toLowerCase().includes(query.toLowerCase()) ||
            thought.mood.toLowerCase().includes(query.toLowerCase())
        ),
      }))
      .filter((entry) => entry.thoughts.length > 0);

    return filteredThoughts;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search your thoughts..."
          value={query}
          onChangeText={setQuery}
          multiline={true}
        />

        <FlatList
          data={filterData().slice().reverse()}
          renderItem={renderItem}
          keyExtractor={(item) => item.date} // Use the date as the key for each rendered date group
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
