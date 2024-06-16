import { View, Text } from "react-native";
import React from "react";
import Splash from "../screens/onboarding/Splash";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import JobPostingNavigator from "./JobPostingNavigator";
import JobSearchingNavigator from "./JobSearchingNavigator";
import SelectUser from "../screens/onboarding/SelectUser";
import DashboardForCompany from "../screens/jobposting/DashboardForCompany";
import AddJob from '../screens/jobposting/tabs/AddJob'
import EditJob from "../screens/jobposting/tabs/EditJob";
import EditProfile from "../screens/jobposting/tabs/EditProfile";
import ChangeProfilePic from "../screens/jobposting/ChangeProfilePic";
const STACK = createStackNavigator();
export default function MainNavigator() {
  return (
    <NavigationContainer>
      <STACK.Navigator>
        <STACK.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <STACK.Screen
        name="AddJob"
        component={AddJob}
        options={{headerShown: true, title:'Post Job'}}
        />
        <STACK.Screen
        name="EditJob"
        component={EditJob}
        options={{headerShown: true, title:'Edit Job'}}
        />
        <STACK.Screen
        name="ChangeProfilePic"
        component={ChangeProfilePic}
        options={{headerShown: true, title:'Change Profile Pic'}}
        />
        <STACK.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: true, title:'Edit Profile'}}
        />

        <STACK.Screen
          name="DashboardForCompany"
          component={DashboardForCompany}
          options={{ headerShown: false }}
        />

        <STACK.Screen
          name="SelectUser"
          component={SelectUser}
          options={{ headerShown: false }}
        />

        <STACK.Screen
          name="JobPostingNavigator"
          component={JobPostingNavigator}
          options={{ headerShown: false }}
        />

        <STACK.Screen
          name="JobSearchingNavigator"
          component={JobSearchingNavigator}
          options={{ headerShown: false }}
        />
      </STACK.Navigator>
    </NavigationContainer>
  );
}
