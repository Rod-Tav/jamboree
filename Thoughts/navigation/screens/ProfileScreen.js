import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePickerScreen from "../ImagePickerScreen";
import * as FileSystem from "expo-file-system";
import styles from "../../styles/styles";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [imageSources, setImageSources] = useState([]);
  const [showImagePicker, setShowImagePicker] = useState(true);

  // Load user data from AsyncStorage on component mount
  useEffect(() => {
    loadUserData();
  }, [isFocused]);

  const loadUserData = async () => {
    try {
      const imageUri = await AsyncStorage.getItem("userImage");
      const name = await AsyncStorage.getItem("userName");
      const bio = await AsyncStorage.getItem("userBio");

      setUserImage(imageUri || "");
      setUserName(name || "");
      setUserBio(bio || "");
    } catch (error) {
      console.log("Error loading user data:", error);
    }
  };

  const imgDir = FileSystem.documentDirectory + "images/";

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
  };

  // Save image to file system
  const saveImage = async () => {
    if (userImage != "") {
      await ensureDirExists();
      const filename = new Date().getTime() + ".jpeg";
      const dest = imgDir + filename;
      await FileSystem.copyAsync({ from: userImage, to: dest });
      return dest;
    }
    return "";
  };

  const saveProfile = async () => {
    try {
      // Save user name and bio to AsyncStorage
      await AsyncStorage.setItem("userName", userName);
      await AsyncStorage.setItem("userBio", userBio);
      await AsyncStorage.setItem("userImage", await saveImage());
    } catch (error) {
      console.log("Error saving profile:", error);
    }
  };

  const changeImageSources = (newImageSources) => {
    setImageSources(newImageSources);
    setShowImagePicker(false);
    setUserImage(newImageSources[0]);
  };

  const handleChangeImage = () => {
    alert("no");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView
          style={{ backgroundColor: "white", height: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          {console.log(userImage)}
          {userImage != "" && (
            <View>
              <Image
                source={{ uri: userImage }}
                style={styles.homeBackground}
                resizeMode="cover"
              />
              <TouchableOpacity onPress={handleChangeImage}>
                <Text>Change Image</Text>
              </TouchableOpacity>
            </View>
          )}

          <View>
            <ImagePickerScreen
              imageSources={imageSources}
              changeImageSources={changeImageSources}
              multiple={false}
              showPicker={showImagePicker}
            />
          </View>
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default ProfileScreen;
