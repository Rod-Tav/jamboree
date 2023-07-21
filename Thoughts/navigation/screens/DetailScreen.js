import React from "react";
import { View, Text } from "react-native";

const DetailScreen = ({ route }) => {
  const { thought } = route.params;

  return (
    <View>
      <Text>{thought.title}</Text>
      <Text>{thought.content}</Text>
      {/* Add other details as needed */}
    </View>
  );
};

export default DetailScreen;
