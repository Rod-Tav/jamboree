import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import styles from "../../styles/styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const DetailScreen = ({ route, navigation }) => {
  const { thought } = route.params;

  // Function to handle edit option
  const handleEdit = () => {
    // Implement your logic to navigate to the edit screen here
    // For example:
    // navigation.navigate('Edit', { thought });
  };

  // Function to handle delete option
  const handleDelete = () => {
    // Implement your logic to delete the thought here
    // For example:
    // Call the deleteThought function or any other logic you have
  };

  const formatDate = (date) => {
    const month =
      date.charAt(5) == "0" ? date.substring(6, 7) : date.substring(5, 7);
    const day =
      date.charAt(8) == "0" ? date.substring(9, 10) : date.substring(8, 10);
    const year = date.substring(0, 4);
    return month + "/" + day + "/" + year;
  };

  // Set up the options for the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Thought Detail", // Set the title of the header
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={handleEdit}
            style={{ paddingHorizontal: 10 }}
          >
            <Ionicons name="create-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            style={{ paddingHorizontal: 10 }}
          >
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.headerStyle}>
      {thought.imageSources && (
        <ScrollView
          horizontal
          contentContainerStyle={styles.imageContainer}
          centerContent={true}
        >
          {thought.imageSources.map((image, index) => (
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

      <View style={styles.thoughtTimeAndMood}>
        <Text style={styles.dayText}>
          {formatDate(thought.date)} - {thought.time}
        </Text>
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
      {thought.title == "" ? null : (
        <Text style={styles.thoughtTitle}>{thought.title}</Text>
      )}
      <Text style={styles.thoughtContent}>{thought.content}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteThought(thought.id)}
      >
        <Ionicons name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default DetailScreen;
