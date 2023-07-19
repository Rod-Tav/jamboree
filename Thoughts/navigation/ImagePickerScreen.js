import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const ImagePickerScreen = ({ imageSources, changeImageSources }) => {
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

  return (
    <View>
      <ScrollView horizontal contentContainerStyle={styles.imageContainer}>
        {imageSources.map((image, index) => (
          <View key={image.id || index} style={styles.imageWrapper}>
            <Image
              source={{ uri: image.uri }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
      <View>
        <TouchableOpacity onPress={handleImagePicker}>
          <Ionicons name="images" size={30}></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  imageWrapper: {
    width: 200,
    height: 200,
    marginRight: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    flex: 1,
  },
});

export default ImagePickerScreen;
