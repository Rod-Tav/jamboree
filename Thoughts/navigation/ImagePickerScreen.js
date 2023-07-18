import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import ImagePicker from "react-native-image-picker";
import styles from "../styles"; // Styles for the screens

const ImagePickerScreen = () => {
  const [imageSource, setImageSource] = useState(null);

  const handleImagePicker = () => {
    const options = {
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 400,
      quality: 0.7,
      includeBase64: false,
      cropping: true,
      cropperCircleOverlay: false,
      freeStyleCropEnabled: true,
      compressImageQuality: 0.7,
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setImageSource(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {imageSource ? (
        <Image
          source={{ uri: imageSource }}
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <TouchableOpacity onPress={handleImagePicker} style={styles.button}>
          <Text>Choose Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImagePickerScreen;
