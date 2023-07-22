import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import styles from "../../styles/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImageViewing from "react-native-image-viewing";

const DetailScreen = ({ route, navigation }) => {
  const { thought } = route.params;
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleImagePress = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setIsImageViewVisible(true);
  };
  const closeImageView = () => {
    setIsImageViewVisible(false);
  };

  // Function to handle edit option
  const handleEdit = () => {
    setIsOptionsVisible(false);
    // Implement your logic to navigate to the edit screen here
    // For example:
    // navigation.navigate('Edit', { thought });
  };

  // Function to handle delete option
  const handleDelete = () => {
    setIsOptionsVisible(false);
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
        <TouchableOpacity
          onPress={handleEdit}
          style={{ paddingHorizontal: 10 }}
        >
          <Ionicons name="ellipsis-horizontal" size={24} color="#828282" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  let currentPos = 0;
  const snapOffsets = thought.imageSources.map((image, index) => {
    const aspectRatio = image.width / image.height;
    const offset = currentPos;
    currentPos += 200 * aspectRatio;
    return offset;
  });

  return (
    <View style={styles.headerStyle}>
      {thought.imageSources && (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          centerContent={true}
          contentContainerStyle={styles.imageContainer}
          pagingEnabled={true}
          snapToOffsets={snapOffsets}
        >
          {thought.imageSources.map((image, index) => {
            const aspectRatio = image.width / image.height;
            const imageWidth = 200 * aspectRatio;

            return (
              <TouchableOpacity
                activeOpacity={0.85}
                key={image.uri}
                onPress={() => handleImagePress(index)}
              >
                <View style={[styles.imageWrapper, { width: imageWidth }]}>
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            );
          })}
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
      <ImageViewing
        images={thought.imageSources.map((image) => ({ uri: image.uri }))}
        imageIndex={selectedImageIndex}
        visible={isImageViewVisible}
        onRequestClose={closeImageView}
      />
    </View>
  );
};

export default DetailScreen;
