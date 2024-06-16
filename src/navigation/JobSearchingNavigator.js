import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../screens/jobsearching/Main";
import SearchJob from "../screens/jobsearching/SearchJob";
import JobDetails from "../screens/jobsearching/JobDetails";
import LoginForUser from "../screens/jobsearching/LoginForUser";
import SignupForUser from "../screens/jobsearching/SignupForUser";
import SavedJobs from "../screens/jobsearching/SavedJobs";
// import SearchJob from "../screens/jobsearching/SearchJob";
const Stack = createStackNavigator();
const JobSearchingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SavedJobs"
        component={SavedJobs}
        options={{ headerShown: true, title:'Saved Jobs' }}
      />
      <Stack.Screen
        name="SearchJob"
        component={SearchJob}
        options={{ headerShown: true, title:'Search Jobs' }}
      />
      <Stack.Screen
        name="JobDetails"
        component={JobDetails}
        options={{ headerShown: true, title:'Job Details' }}
      />
      <Stack.Screen
        name="LoginForUser"
        component={LoginForUser}
        options={{ headerShown: true, title:'' }}
      />
      <Stack.Screen
        name="SignupForUser"
        component={SignupForUser}
        options={{ headerShown: true, title:'' }}
      />
    </Stack.Navigator>
  );
};

export default JobSearchingNavigator;
