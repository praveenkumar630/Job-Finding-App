import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerScreen from "./Drawer";
import CustomDrawer from "./CustomDrawer";
const Drawer = createDrawerNavigator();
const Main = () => {
  return (
    <Drawer.Navigator drawerContent={props=><CustomDrawer{...props}/>}>
      <Drawer.Screen
        name="Drawer"
        component={DrawerScreen}
        options={{ title: "FindMyJob" }}
      />
    </Drawer.Navigator>
  );
};

export default Main;
