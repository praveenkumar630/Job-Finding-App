import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { BG_COLOR, TEXT_COLOR } from "../../../utils/Colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileOptionItem from "../../../common/ProfileOptionItem";
import firebase from "firebase/compat/app";
// import Mailer from 'react-native-mail';
// import { useTheme } from './path/to/ThemeContext';

const Profile1 = ({ onJobClick }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const isFocused = useIsFocused();
  const [jobs, setJobs] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    getData();
    loginUser();
  }, [isFocused]);
  const getData = async () => {
    setName(await AsyncStorage.getItem("NAME"));
    setJobs(await AsyncStorage.getItem("JOBS"));
  };

  const loginUser = async () => {
    const id = await AsyncStorage.getItem("EMAIL");
    const companies = [];
    try {
      await firebase
        .firestore()
        .collection("job_posters")
        .where("email", "==", id)
        .get()
        .then(async (res) => {
          res.docs.forEach((item) => {
            companies.push({ ...item.data(), id: item.id });
          });
        });
      if (companies.length > 0) {
        await AsyncStorage.setItem("USER_ID", companies[0].id);
        const img = companies[0].profileImage;
        setImage(img);
      } else {
        // setBadEmail("No User exits with this email");
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  // const handleContactUs = () => {
  //   Mailer.mail({
  //     subject: 'Contact Us',
  //     recipients: ['support@findmyjob.com'], // Replace with your support email
  //     body: '',
  //     isHTML: true,
  //   }, (error, event) => {
  //     if (error) {
  //       Alert.alert('Error', 'Could not send mail. Please try again later.');
  //     }
  //   });
  // };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("USER_ID");
    await AsyncStorage.removeItem("NAME");
    await AsyncStorage.removeItem("EMAIL");
    navigation.navigate("SelectUser");
  };

  return (
    <View>
      <Text style={styles.heading}>FindMyJob</Text>
      <TouchableOpacity>
        {image != undefined ? (
          <Image source={{ uri: image }} style={styles.profileImg} />
        ) : (
          <Image
            source={require("../../../images/account.png")}
            style={styles.profileImg}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <Text
        style={styles.changeProfilePic}
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
      >
        Update Profile
      </Text>
      <Text
        style={styles.changeProfilePic}
        onPress={() => {
          navigation.navigate("ChangeProfilePic");
        }}
      >
        Change Profile Picture
      </Text>
      <View style={styles.optionView}>
        <ProfileOptionItem
          icon={require("../../../images/job.png")}
          title={"My Jobs (" + jobs + ")"}
          onclick={() => onJobClick()}
        />
        <ProfileOptionItem
          icon={require("../../../images/phone.png")}
          title={"Contact Us"}
          onPress={() => {}}
        />
        <ProfileOptionItem
          icon={require("../../../images/theme.png")}
          title={"App Theme"}
          onPress={() => {}}
        />
        <ProfileOptionItem
          icon={require("../../../images/power.png")}
          title={"Logout"}
          onclick={() => {
            handleLogout();
          }}
        />
      </View>
    </View>
  );
};

export default Profile1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  heading: {
    fontSize: 30,
    fontWeight: "600",
    marginLeft: 15,
    marginTop: 10,
    color: TEXT_COLOR,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 25,
  },
  changeProfilePic: {
    textDecorationLine: "underline",
    color: TEXT_COLOR,
    marginTop: 20,
    fontSize: 15,
    alignSelf: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "center",
    marginTop: 20,
  },
  optionView: {
    marginTop: 70,
  },
});
