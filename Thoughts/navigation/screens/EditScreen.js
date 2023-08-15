import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import styles from "../../styles/styles";
import SkinnyIcon from "react-native-snappy";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        console.log("saving image");
        await AsyncStorage.setItem("userImage", await saveImage());
      }
      navigation.goBack();
    } catch (error) {
      console.log("Error saving profile:", error);
    }
  };

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {userImage != "" && (
          <View>
            <Image
              source={{ uri: userImage }}
              style={styles.homeBackground}
              resizeMode="cover"
            />
          </View>
        )}
        <View style={styles.profileTextInput}>
          <TextInput
            style={styles.nameInput}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.bioInput}
            placeholder="Bio"
            value={bio}
            onChangeText={setBio}
            multiline={true}
          />
        </View>
        <TouchableOpacity onPress={saveProfile} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditScreen;
