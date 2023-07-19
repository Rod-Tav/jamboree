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
import styles from "../../styles";
import ImagePickerScreen from "../ImagePickerScreen";
import MoodPicker from "../MoodPicker";

const CreateScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [imageSources, setImageSources] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Reset state when the screen is focused
  useEffect(() => {
    if (isFocused) {
      setTitle("");
      setContent("");
      setMood("");
      setImageSources([]);
    }
  }, [isFocused]);

  const handleAddNote = async () => {
    const note = {
      id: new Date().getTime().toString(),
      title,
      content,
      mood,
      imageUris: imageSources, // Include the selected image URIs
    };

    try {
      const existingNotes = await AsyncStorage.getItem("NOTES");
      const notes = existingNotes ? JSON.parse(existingNotes) : [];

      notes.push(note);

      await AsyncStorage.setItem("NOTES", JSON.stringify(notes));

      // Reset all states after successfully saving the note
      setTitle("");
      setContent("");
      setMood("");
      setImageSources([]);

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
          {/* Pass imageSources and setImageSources as props to ImagePickerScreen */}
          <ImagePickerScreen
            imageSources={imageSources}
            setImageSources={setImageSources}
          />
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
