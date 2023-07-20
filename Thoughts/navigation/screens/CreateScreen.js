import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/styles";
import ImagePickerScreen from "../ImagePickerScreen";
import MoodPicker from "../MoodPicker";
import SkinnyIcon from "react-native-snappy";

const CreateScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [imageSources, setImageSources] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const formatDate = () => {
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

    const currentDate = new Date();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = monthsOfYear[currentDate.getMonth()];
    const dayOfMonth = currentDate.getDate();
    let daySuffix = "th";

    if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
      daySuffix = "st";
    } else if (dayOfMonth === 2 || dayOfMonth === 22) {
      daySuffix = "nd";
    } else if (dayOfMonth === 3 || dayOfMonth === 23) {
      daySuffix = "rd";
    }

    const formattedDay = dayOfWeek;
    const formattedDate = `${month} ${dayOfMonth}${daySuffix}`;
    const formattedTime = currentDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return {
      day: formattedDay,
      date: formattedDate,
      time: formattedTime,
    };
  };

  const handleAddThought = async () => {
    const formattedDate = formatDate();

    const thought = {
      id: new Date().getTime().toString(),
      title,
      content,
      mood,
      imageSources,
      day: formattedDate.day,
      date: formattedDate.date,
      time: formattedDate.time,
    };

    if (
      thought.title == "" &&
      thought.content == "" &&
      thought.mood == "" &&
      thought.imageSources.length == 0
    ) {
      return;
    }

    try {
      const existingThoughts = await AsyncStorage.getItem("THOUGHTS");
      const thoughts = existingThoughts ? JSON.parse(existingThoughts) : [];

      thoughts.push(thought);

      await AsyncStorage.setItem("THOUGHTS", JSON.stringify(thoughts));

      // Reset all states after successfully saving the thought
      setTitle("");
      setContent("");
      setMood("");
      setImageSources([]);

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error saving thought:", error);
    }
  };

  const changeImageSources = (newImageSources) => {
    setImageSources(newImageSources);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingBottom: 10 }]}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerText}>What's on your mind?</Text>
        </View>

        {/* Styled ImagePickerScreen */}
        <View>
          <ImagePickerScreen
            imageSources={imageSources}
            changeImageSources={changeImageSources}
          />
        </View>

        {/* Title Input */}
        <TextInput
          style={styles.titleInput}
          onChangeText={(text) => setTitle(text)}
          value={title}
          placeholder="Title"
          maxLength={50}
        />

        {/* Content Input */}
        <TextInput
          style={styles.contentInput}
          onChangeText={(text) => setContent(text)}
          value={content}
          placeholder="Write your thoughts here..."
          multiline
        />

        {/* Mood Picker */}
        <View>
          <MoodPicker value={mood} setValue={(value) => setMood(value)} />
        </View>

        {/* Styled Add Thought Button */}
        <TouchableOpacity onPress={handleAddThought} style={styles.addButton}>
          <SkinnyIcon
            name="check"
            size={16}
            strokeWidth={1.5}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={styles.addButtonText}>Log Your Thought</Text>
          <SkinnyIcon
            name="check"
            size={24}
            strokeWidth={1.5}
            color="#2F80ED"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateScreen;
