import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";
import ImageViewing from "react-native-image-viewing";
import styles from "../styles/styles";

const ImagePickerScreen = ({ imageSources, changeImageSources }) => {
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImagePicker = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        allowsMultipleSelection: true,
        selectionLimit: 5,
      });

      if (!result.canceled && result.assets.length > 0) {
        changeImageSources(result.assets); // Update the selected images in the parent component
      }
    } catch (error) {
      console.error("Error selecting images:", error);
    }
  };

  const handleImagePress = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
    setIsImageViewVisible(true);
  };

  const closeImageView = () => {
    setIsImageViewVisible(false);
  };

  return (
    <View>
      <ScrollView horizontal contentContainerStyle={styles.imageContainer}>
        {imageSources.map((image, index) => (
          <TouchableOpacity
            key={image.uri}
            onPress={() => handleImagePress(index)}
          >
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: image.uri }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View>
        <TouchableOpacity
          onPress={handleImagePicker}
          style={styles.buttonContainer}
        >
          <View style={styles.iconContainer}>
            <Icon name="image" size={30} style={styles.icon} />
          </View>
          <Text>Add Images...</Text>
        </TouchableOpacity>
      </View>
      <ImageViewing
        images={imageSources.map((image) => ({ uri: image.uri }))}
        imageIndex={selectedImageIndex}
        visible={isImageViewVisible}
        onRequestClose={closeImageView}
      />
    </View>
  );
};

export default ImagePickerScreen;
