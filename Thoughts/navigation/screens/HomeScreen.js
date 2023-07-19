import React, { useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles";

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

  const renderItem = ({ item }) => (
    <View style={styles.noteContainer}>
      {/* Use condition to check if imageUri is available */}
      {item.imageUri && (
        <Image
          source={{ uri: item.imageUri }}
          style={styles.noteImage}
          onError={() => console.warn("Failed to load image")}
        />
      )}
      <Text style={styles.noteMood}>Mood: {item.mood}</Text>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteContent}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>What's on your mind?</Text>
      </View>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} // Use the 'id' property as the keyExtractor
        contentContainerStyle={styles.list} // Add this style for spacing between list items
      />
    </View>
  );
};

export default HomeScreen;
