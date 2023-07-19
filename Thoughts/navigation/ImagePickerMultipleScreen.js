import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImagePickerMultipleScreen = ({ setSelectedImages }) => {
  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        allowsMultipleSelection: true,
        selectionLimit: 5,
      });

      if (!result.canceled && result.selected.length > 0) {
        // Set the selected image URIs
        setSelectedImages(result.selected);
      }
    } catch (error) {
      console.error("Error selecting images:", error);
    }
  };

  return (
    <View>
      {/* Button to open the image picker */}
      <TouchableOpacity onPress={handleImagePicker}>
        <Text>Choose Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerMultipleScreen;
