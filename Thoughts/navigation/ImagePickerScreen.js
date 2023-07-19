import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const ImagePickerScreen = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const navigation = useNavigation();

  const handleImagePress = (uri) => {
    navigation.navigate("FullScreenImage", { imageUri: uri });
  };

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

      if (!result.cancelled && result.assets.length > 0) {
        setSelectedImages(result.assets);
      }
    } catch (error) {
      console.error("Error selecting images:", error);
    }
  };

  return (
    <View>
      <ScrollView horizontal contentContainerStyle={styles.imageContainer}>
        {selectedImages.map((image) => (
          <TouchableOpacity
            key={image.uri}
            onPress={() => handleImagePress(image.uri)}
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
        <TouchableOpacity onPress={handleImagePicker}>
          <Text>Choose Image</Text>
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
