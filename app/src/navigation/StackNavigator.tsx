import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import CreateItems from "../screens/CreateItems";
import Items from "../screens/Items";
import Map from "../screens/Map";
import { IconButton } from "react-native-paper";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#4169e1",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const ProjectsStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Items" component={Items} options={{
          headerTitle: "Projetos",
          headerRight: () => (
            <IconButton
              onPress={() => navigation.openDrawer()}
              icon="menu"
              size={24}
              color={screenOptionStyle.headerTintColor}
            />
          ),
        }} />
      <Stack.Screen name="Criar Item" component={CreateItems} />
    </Stack.Navigator>
  );
};

const HomeStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: "Home",
          headerRight: () => (
            <IconButton
              onPress={() => navigation.openDrawer()}
              icon="menu"
              size={24}
              color={screenOptionStyle.headerTintColor}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const MapStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          headerTitle: "Map",
          headerRight: () => (
            <IconButton
              onPress={() => navigation.openDrawer()}
              icon="menu"
              size={24}
              color={screenOptionStyle.headerTintColor}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export { ProjectsStackNavigator, HomeStackNavigator, MapStackNavigator };
