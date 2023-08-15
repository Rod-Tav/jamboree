import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "../../styles/styles";
import CustomActionSheet from "../CustomActionSheet";

const ProfileImagePicker = ({ settings, changeImage }) => {
  const handleAddImagesPress = () => {
    setShowCustomActionSheet(true);
  };

  const [showCustomActionSheet, setShowCustomActionSheet] = useState(false);

  const handleCancelCustomActionSheet = () => {
    setShowCustomActionSheet(false);
  };

  const handleSelectOption = async (option) => {
    if (option === "Take a Photo") {
      const cameraPermissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermissionResult.granted === false) {
        alert("Permission to access the camera is required!");
        setShowCustomActionSheet(false);
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        // The user took a photo, handle the result here if needed
        setShowCustomActionSheet(false);
        changeImage(result.assets[0]);
      } else {
        setShowCustomActionSheet(false);
      }
    } else if (option === "Choose from Library") {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access the camera roll is required!");
        setShowCustomActionSheet(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        // The user selected images, handle the result here if needed
        setShowCustomActionSheet(false);
        changeImage(result.assets[0]);
      } else {
        setShowCustomActionSheet(false);
      }
    }
  };

  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={handleAddImagesPress}
          style={styles.buttonContainer2}
        >
          <Text style={styles.buttonText2}>Change Image</Text>
        </TouchableOpacity>
      </View>
      <CustomActionSheet
        isVisible={showCustomActionSheet}
        onCancel={handleCancelCustomActionSheet}
        onSelectOption={handleSelectOption}
      />
    </View>
  );
};

export default ProfileImagePicker;
