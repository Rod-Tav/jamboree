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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles"; // Styles for the screens
import ImagePickerScreen from "../ImagePickerScreen";
import MoodPicker from "../MoodPicker";

const CreateScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const navigation = useNavigation(); // Navigation hook

  const handleAddNote = async () => {
    const note = {
      id: new Date().getTime().toString(),
      title,
      content,
      mood,
    };

    try {
      // Get the existing notes from AsyncStorage
      const existingNotes = await AsyncStorage.getItem("NOTES");
      const notes = existingNotes ? JSON.parse(existingNotes) : [];

      // Add the new note to the array
      notes.push(note);

      // Save the updated notes to AsyncStorage
      await AsyncStorage.setItem("NOTES", JSON.stringify(notes));

      // Reset the form fields
      setTitle("");
      setContent("");
      setMood("");

      // Navigate back to the HomeScreen
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, { paddingBottom: 10 }]}>
          <View style={styles.headerStyle}>
            <Text style={styles.headerText}>Submit Note</Text>
          </View>
          <ImagePickerScreen />
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setTitle(text)}
            value={title}
            placeholder="Title"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setContent(text)}
            value={content}
            placeholder="Content"
            multiline
          />
          <MoodPicker value={mood} onValueChange={(value) => setMood(value)} />
          <TouchableOpacity onPress={handleAddNote} style={styles.button}>
            <Text>Add Note</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;
