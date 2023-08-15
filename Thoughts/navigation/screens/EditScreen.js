import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import proStyles from "../../styles/profileStyles";

import SkinnyIcon from "react-native-snappy";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import ProfileImagePicker from "./ProfileImagePicker";

const EditScreen = ({ route }) => {
  const userImage = route.params.userImage;
  const userName = route.params.userName;
  const userBio = route.params.userBio;
  const navigation = useNavigation();
  const [image, setImage] = useState(userImage);
  const [name, setName] = useState(userName);
  const [bio, setBio] = useState(userBio);

  // Set up the options for the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "", // Set the title of the header
      headerStyle: {
        backgroundColor: "white",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerShadowVisible: false,
      headerTitleStyle: {
        display: "none",
      },

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginHorizontal: "14%" }}
        >
          <SkinnyIcon
            name="arrow-left"
            size={25}
            strokeWidth={1.5}
            color="#090A0A"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const saveProfile = async () => {
    try {
      if (name != userName) await AsyncStorage.setItem("userName", name);
      if (bio != userBio) await AsyncStorage.setItem("userBio", bio);
      if (image != userImage) {
        await AsyncStorage.setItem("userImage", await saveImage());
      }
      navigation.goBack();
    } catch (error) {
      console.log("Error saving profile:", error);
    }
  };

  const imgDir = FileSystem.documentDirectory + "images/";

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
  };

  const saveImage = async () => {
    if (image != "") {
      await ensureDirExists();
      const filename = new Date().getTime() + ".jpeg";
      const dest = imgDir + filename;
      await FileSystem.copyAsync({ from: image, to: dest });
      return dest;
    }
    return "";
  };

  const changeImage = (newImage) => {
    setImage(newImage.uri);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={proStyles.containerEdit}>
        <View style={proStyles.editProfileView2}>
          {image != "" ? (
            <View>
              <Image
                source={{ uri: image }}
                style={proStyles.profilePic}
                resizeMode="cover"
              />
            </View>
          ) : (
            <View>
              <Image
                source={require("../../images/profile.png")}
                style={proStyles.profilePic}
                resizeMode="cover"
              />
            </View>
          )}
          <View style={proStyles.imageOptions}>
            <ProfileImagePicker settings={false} changeImage={changeImage} />
            <TouchableOpacity
              onPress={() => {
                setImage("");
              }}
              style={proStyles.removeButton}
            >
              <Text style={proStyles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>

          <View style={proStyles.profileTextInput}>
            <View style={proStyles.nameInputContainer}>
              <Text style={proStyles.text}>Name</Text>
              <TextInput
                style={proStyles.nameInput}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={proStyles.bioInputContainer}>
              <Text style={proStyles.text}>Bio</Text>
              <TextInput
                style={proStyles.bioInput}
                placeholder="Bio"
                value={bio}
                onChangeText={setBio}
                multiline={true}
              />
            </View>
          </View>
          <TouchableOpacity onPress={saveProfile} style={proStyles.saveButton}>
            <SkinnyIcon name="save" size={25} strokeWidth={1.5} color="white" />
            <Text style={proStyles.saveButtonText}>Save</Text>
            <SkinnyIcon
              name="save"
              size={25}
              strokeWidth={1.5}
              color="transparent"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditScreen;
