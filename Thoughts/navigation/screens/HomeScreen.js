import React, { useState } from "react";
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
  const [thoughts, setThoughts] = useState([]);

  const loadThoughts = async () => {
    try {
      const storedThoughts = await AsyncStorage.getItem("THOUGHTS");
      setThoughts(storedThoughts ? JSON.parse(storedThoughts) : []);
    } catch (error) {
      console.error("Error loading thoughts:", error);
    }
  };

  // Reload thoughts whenever the screen is focused
  useFocusEffect(() => {
    loadThoughts();
  });

  const deleteThought = async (thoughtId) => {
    try {
      // Filter out the thought to be deleted from the 'Thoughts' array
      const updatedThoughts = thoughts.filter(
        (thought) => thought.id !== thoughtId
      );

      // Update the 'Thoughts' state to reflect the deletion
      setThoughts(updatedThoughts);

      // Save the updated 'thoughts' array to AsyncStorage
      await AsyncStorage.setItem("THOUGHTS", JSON.stringify(updatedThoughts));
    } catch (error) {
      console.error("Error deleting thought:", error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View key={item.id} style={styles.thoughtContainer}>
        {item.imageSources && (
          <ScrollView horizontal contentContainerStyle={styles.imageContainer}>
            {item.imageSources.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  source={{ uri: image.uri }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>
        )}
        <Text>{item.time}</Text>
        {item.mood ? <Text style={styles.thoughtMood}>{item.mood}</Text> : null}
        <Text style={styles.thoughtTitle}>{item.title}</Text>
        <Text style={styles.thoughtContent}>{item.content}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteThought(item.id)}
        >
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>What's on your mind?</Text>
      </View>
      <FlatList
        data={thoughts.slice().reverse()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Convert the id to a string if it's not already
        contentContainerStyle={styles.list} // Add this style for spacing between list items
      />
    </View>
  );
};

export default HomeScreen;
