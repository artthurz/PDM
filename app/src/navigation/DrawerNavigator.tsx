import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { HomeStackNavigator, ProjectsStackNavigator, MapStackNavigator } from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      {/* <Drawer.Screen name="Home" component={HomeStackNavigator} /> */}
      {/* <Drawer.Screen name="Projetos" component={ProjectsStackNavigator} /> */}
      <Drawer.Screen name="Map" component={MapStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;