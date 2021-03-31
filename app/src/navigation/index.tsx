import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Permissions from "expo-permissions";
import DrawerNavigator from "./DrawerNavigator";
import { useEffect } from "react";

const registerForPushNotifications = async () => {
  try {
    const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (!permission.granted) return;
    const token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
  } catch (error) {
    console.log("Error getting a token", error);
  }
};

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <DrawerNavigator />
    </NavigationContainer>
  );
}
