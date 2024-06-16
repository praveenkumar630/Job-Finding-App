import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import React, { useState } from "react";
import { BG_COLOR } from "../../utils/Colors";
import CustomTextInput from "../../common/CustomTextInput";
import CustomSolidBtn from "../../common/CustomSolidBtn";
import CustomBorderBtn from "../../common/CustomBorderBtn";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../../config";
import Loader from "../../common/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForUser  = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [bademail, setBadEmail] = useState("");
  const [password, setPassword] = useState("");
  const [badpassword, setBadPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let validEmail = true;
    let validPassword = true;

    // Email Validation...............
    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == "") {
      validEmail = false;
      setBadEmail("Please Enter Email");
    } else if (email != "" && !email.toString().match(emailRegex)) {
      validEmail = false;
      setBadEmail("Please Enter Valid Email");
    } else if (email != "" && email.toString().match(emailRegex)) {
      validEmail = true;
      setBadEmail("");
    }

    // Password Validation...........
    if (password == "") {
      validPassword = false;
      setBadPassword("Please Enter Password");
    } else if (password != "" && password.length < 6) {
      validPassword = false;
      setBadPassword("Please Enter Min 6 Characters");
    } else if (password != "" && password.length >= 6) {
      validPassword = true;
      setBadPassword("");
    }

    return validEmail && validPassword;
  };

  // User Login Section
  const loginUser = async () => {
    const companies = [];
    try {
      await firebase
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .get()
        .then(async (res) => {
          res.docs.forEach((item) => {
            companies.push({ ...item.data(), id: item.id });
          });
        });
      setLoading(true);
      if (companies.length > 0) {
        if (companies[0].password === password) {
          setBadEmail("");
          setBadPassword("");
          goToNextScreen(
            companies[0].name,
            companies[0].email,
            companies[0].id,
            companies
          );
          console.log(companies[0].id);
        } else {
          setBadPassword("Wrong Password");
        }
      } else {
        setBadEmail("No User exits with this email");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching companies:", error);
    }
  };

  goToNextScreen = async (name, email, id, temp) => {

    await AsyncStorage.setItem("NAME", name);
    await AsyncStorage.setItem("EMAIL", email);
    await AsyncStorage.setItem("USER_ID", id);
    await AsyncStorage.setItem("USER_TYPE", "user");
    navigation.navigate("Main");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <CustomTextInput
        value={email}
        onChangeText={(txt) => {
          setEmail(txt);
        }}
        title={"Email"}
        placeholder={"ex. xyz@gmail.com"}
        bad={bademail != "" ? true : false}
      />
      {bademail != "" && <Text style={styles.errorMsg}>{bademail}</Text>}
      <CustomTextInput
        value={password}
        onChangeText={(txt) => {
          setPassword(txt);
        }}
        title={"Password"}
        placeholder={"********"}
        bad={badpassword != "" ? true : false}
      />
      {badpassword != "" && <Text style={styles.errorMsg}>{badpassword}</Text>}
      <Text style={styles.forgotPassword}>Forgot Password?</Text>
      <CustomSolidBtn
        title={"Login"}
        onclick={() => {
          if (validate()) {
            loginUser();
          }
        }}
      />
      <CustomBorderBtn
        onclick={() => {
          navigation.navigate("SignupForUser");
        }}
        title={"Create Account"}
      />
      <Loader visible={loading} />
    </SafeAreaView>
  );
};

export default LoginForUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  logo: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginTop: 80,
  },
  title: {
    fontSize: 25,
    alignSelf: "center",
    fontWeight: "600",
    marginTop: 30,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 10,
    fontWeight: "500",
    fontSize: 16,
  },
  errorMsg: {
    marginLeft: 25,
    color: "red",
  },
});
