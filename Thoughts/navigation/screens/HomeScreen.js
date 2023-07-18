import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles"; // Styles for the screens

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
    <View style={styles.noteItem}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteContent}>{item.content}</Text>
      <Text style={styles.noteMood}>Mood: {item.mood}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>What's on your mind?</Text>
      </View>
      <FlatList
        data={notes}
        renderItem={renderItem} // Use the renderItem function to render each task
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default HomeScreen;
