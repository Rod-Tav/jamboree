import React, { useState, useEffect } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Appearance, useColorScheme } from "react-native";

// Screens
import HomeScreen from "./screens/HomeScreen";
import CreateScreen from "./screens/CreateScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Tab = createBottomTabNavigator();

const RootStack = () => {
  const { theme } = useContext(ThemeContext);
  let dark = theme.mode == "dark";

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={"Home"}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === "Create") {
              iconName = focused ? "create" : "create-outline";
            } else if (rn === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: dark ? "white" : "#828282",
          tabBarInactiveTintColor: dark ? "white" : "#828282",
          tabBarLabelStyle: {
            paddingBottom: 10,
            fontSize: 10,
          },
          tabBarStyle: [
            {
              display: "flex",
              backgroundColor: dark ? "#2b2b2b" : "white",
              borderTopColor: dark ? "darkgrey" : "lightgrey",
            },
            // null,
          ],
          headerStyle: {
            backgroundColor: dark ? "#2b2b2b" : "white",
          },
          tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <Tab.Screen name={"Home"} component={HomeScreen} />
        <Tab.Screen name={"Create"} component={CreateScreen} />
        <Tab.Screen name={"Profile"} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
