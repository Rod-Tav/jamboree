import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
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
  const [moodBgColor, setMoodBgColor] = useState("");
  const [moodTextColor, setMoodTextColor] = useState("");
  const [imageSources, setImageSources] = useState([]);
  const navigation = useNavigation();
  const [clearMoodToggle, setClearMoodToggle] = useState(false);

  const formatDate = () => {
    const date = new Date();
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });
    const formattedDate = year + "-" + month + "-" + day;
    const formattedTime = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return {
      date: formattedDate,
      time: formattedTime,
    };
  };

  const handleAddThought = async () => {
    const formattedDate = formatDate();

    setClearMoodToggle(!clearMoodToggle);

    const thought = {
      id: new Date().getTime().toString(),
      title,
      content,
      mood,
      moodBgColor,
      moodTextColor,
      imageSources,
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
      const thoughts = existingThoughts ? JSON.parse(existingThoughts) : {};

      // If there are no thoughts for the current date, create an empty array
      if (!thoughts[formattedDate.date]) {
        thoughts[formattedDate.date] = [];
      }

      thoughts[formattedDate.date].push(thought);

      await AsyncStorage.setItem("THOUGHTS", JSON.stringify(thoughts));

      // Reset all states after successfully saving the thought
      setTitle("");
      setContent("");
      setMood("");
      setMoodBgColor("");
      setMoodTextColor("");
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
    <View style={[styles.container]}>
      <KeyboardAvoidingView behavior={"padding"}>
        <ScrollView
          style={{ backgroundColor: "white", height: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.createContainer, { paddingBottom: 14 }]}>
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
                <MoodPicker
                  value={mood}
                  setValue={(mood) => setMood(mood)}
                  moodBgColorValue={moodBgColor}
                  setMoodBgColorValue={(bgColor) => setMoodBgColor(bgColor)}
                  moodTextColorValue={moodTextColor}
                  setMoodTextColorValue={(textColor) =>
                    setMoodTextColor(textColor)
                  }
                  clearMoodToggle={clearMoodToggle}
                />
              </View>

              {/* Styled Add Thought Button */}
              <TouchableOpacity
                onPress={handleAddThought}
                style={styles.addButton}
              >
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
                  color="transparent"
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateScreen;
