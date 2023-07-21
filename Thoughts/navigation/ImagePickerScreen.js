import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Feather";
import SkinnyIcon from "react-native-snappy";
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
      <View style={styles.imagesEntireContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          centerContent={true}
          contentContainerStyle={styles.imageContainer}
          pagingEnabled={true}
        >
          {imageSources.map((image, index) => {
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
      </View>

      <View>
        <TouchableOpacity
          onPress={handleImagePicker}
          style={styles.buttonContainer}
        >
          <View style={styles.buttonIcon}>
            <SkinnyIcon
              name="image"
              size={24}
              strokeWidth={1.5}
              color="#979C9E"
              style={styles.icon}
            />
          </View>
          <Text style={styles.buttonText}>Add Images...</Text>
          <View style={styles.buttonIcon2}>
            <Icon name="image" size={24} color="#F2F2F2" style={styles.icon} />
          </View>
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
