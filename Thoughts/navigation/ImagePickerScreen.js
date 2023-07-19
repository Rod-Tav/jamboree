import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImagePickerMultipleScreen from "./ImagePickerMultipleScreen";

const ImagePickerScreen = ({ imageSources, setImageSources }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageReady, setImageReady] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Calculate scaled dimensions based on original aspect ratio and maximum size (200)
    if (selectedImages.length > 0) {
      const selectedImagesWithDimensions = [];

      selectedImages.forEach((uri) => {
        Image.getSize(uri, (width, height) => {
          let scaledWidth = width;
          let scaledHeight = height;

          if (scaledWidth > 200 || scaledHeight > 200) {
            const aspectRatio = scaledWidth / scaledHeight;
            if (scaledWidth > scaledHeight) {
              scaledWidth = 200;
              scaledHeight = 200 / aspectRatio;
            } else {
              scaledHeight = 200;
              scaledWidth = 200 * aspectRatio;
            }
          }

          // Store the image URI and its dimensions in the state
          selectedImagesWithDimensions.push({
            uri,
            width: scaledWidth,
            height: scaledHeight,
          });

          // Check if all images have been processed
          if (selectedImagesWithDimensions.length === selectedImages.length) {
            setImageSources(selectedImagesWithDimensions);
            setImageReady(true);
          }
        });
      });
    }
  }, [selectedImages]);

  const handleImagePress = (uri) => {
    // Handle opening the image in full screen or any other action if needed
    // For example, you can navigate to a new screen to display the image in full size
    navigation.navigate("FullScreenImage", { imageUri: uri });
  };

  return (
    <View>
      {/* Display the selected images if imageSources is available and ready */}
      {imageReady &&
        imageSources.map((image) => (
          <TouchableOpacity
            key={image.uri}
            onPress={() => handleImagePress(image.uri)}
          >
            <Image
              source={{ uri: image.uri }}
              style={{
                width: image.width,
                height: image.height,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        ))}
      {/* Render the ImagePickerMultipleScreen in a separate screen */}
      <ImagePickerMultipleScreen setSelectedImages={setSelectedImages} />
    </View>
  );
};

export default ImagePickerScreen;
