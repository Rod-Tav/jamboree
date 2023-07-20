import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("NOTES");
      setNotes(storedNotes ? JSON.parse(storedNotes) : []);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  // Reload notes whenever the screen is focused
  useFocusEffect(() => {
    loadNotes();
  });

  const deleteNote = async (noteId) => {
    try {
      // Filter out the note to be deleted from the 'notes' array
      const updatedNotes = notes.filter((note) => note.id !== noteId);

      // Update the 'notes' state to reflect the deletion
      setNotes(updatedNotes);

      // Save the updated 'notes' array to AsyncStorage
      await AsyncStorage.setItem("NOTES", JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.noteContainer}>
      {item.imageSources && (
        <ScrollView horizontal contentContainerStyle={styles2.imageContainer}>
          {item.imageSources.map((image, index) => (
            <View key={index} style={styles2.imageWrapper}>
              <Image
                source={{ uri: image.uri }}
                style={styles2.image}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      )}
      {item.mood ? (
        <Text style={styles.noteMood}>Mood: {item.mood}</Text>
      ) : null}
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteContent}>{item.content}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNote(item.id)}
      >
        <Ionicons name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>What's on your mind?</Text>
      </View>
      <FlatList
        data={notes.slice().reverse()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Convert the id to a string if it's not already
        contentContainerStyle={styles.list} // Add this style for spacing between list items
      />
    </View>
  );
};

const styles2 = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  imageWrapper: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
});

export default HomeScreen;
