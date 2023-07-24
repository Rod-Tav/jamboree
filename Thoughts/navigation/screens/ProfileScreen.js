import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import styles from "../../styles/styles";

const ProfileScreen = () => {
  const [thoughts, setThoughts] = useState({});
  const navigation = useNavigation();
  const loadThoughts = async () => {
    try {
      const storedThoughts = await AsyncStorage.getItem("THOUGHTS");
      setThoughts(storedThoughts ? JSON.parse(storedThoughts) : []);
    } catch (error) {
      console.error("Error loading thoughts:", error);
    }
  };

  // Reload thoughts whenever the screen is focused
  useFocusEffect(() => {
    loadThoughts();
  });

  const handleWrite = () => {
    navigation.navigate("Create");
  };

  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");

  // Load user data from AsyncStorage on component mount
  useEffect(() => {
    loadUserData();
  }, []);
  const loadUserData = async () => {
    try {
      const imageUri = await AsyncStorage.getItem("userImage");
      const name = await AsyncStorage.getItem("userName");
      const bio = await AsyncStorage.getItem("userBio");

      setUserImage(imageUri);
      setUserName(name || "");
      setUserBio(bio || "");
    } catch (error) {
      console.log("Error loading user data:", error);
    }
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

      if (!result.canceled && result.assets.length > 0) {
        changeImageSources(result.assets); // Update the selected images in the parent component
      }
    } catch (error) {
      console.error("Error selecting images:", error);
    }
  };

  // const selectImage = () => {
  //   ImagePicker.showImagePicker(
  //     {
  //       title: "Select Profile Image",
  //       cancelButtonTitle: "Cancel",
  //       takePhotoButtonTitle: "Take Photo",
  //       chooseFromLibraryButtonTitle: "Choose from Library",
  //     },
  //     (response) => {
  //       if (!response.didCancel && !response.error) {
  //         // Save the selected image URI to AsyncStorage
  //         AsyncStorage.setItem("userImage", response.uri);
  //         setUserImage(response.uri);
  //       }
  //     }
  //   );
  // };

  const saveProfile = async () => {
    try {
      // Save user name and bio to AsyncStorage
      await AsyncStorage.setItem("userName", userName);
      await AsyncStorage.setItem("userBio", userBio);
    } catch (error) {
      console.log("Error saving profile:", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={handleImagePicker}>
        {userImage ? (
          <Image source={{ uri: userImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.addImageText}>Add Profile Image</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={userBio}
        onChangeText={setUserBio}
        multiline={true}
      />
      <TouchableOpacity onPress={saveProfile} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileScreen;
