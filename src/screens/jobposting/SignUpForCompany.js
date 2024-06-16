import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { BG_COLOR } from "../../utils/Colors";
import CustomTextInput from "../../common/CustomTextInput";
import CustomSolidBtn from "../../common/CustomSolidBtn";
import CustomBorderBtn from "../../common/CustomBorderBtn";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../../../config";
import Loader from "../../common/Loader";
// import firebase from "firebase/compat/app";

const SignUPForCompany = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [badname, setBadName] = useState("");
  const [email, setEmail] = useState("");
  const [bademail, setBadEmail] = useState("");
  const [contact, setContact] = useState("");
  const [badcontact, setBadContact] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [badcompanyName, setBadCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [badaddress, setBadAddress] = useState("");
  const [password, setPassword] = useState("");
  const [badpassword, setBadPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const validate = () => {
    let validName = true;
    let validEmail = true;
    let validContact = true;
    let validCompany = true;
    let validAddress = true;
    let validPassword = true;

    // Name Validation...........
    let nameRegex = /^[A-Za-z]+$/;
    if (name == "") {
      validName = false;
      setBadName("Please Enter Name");
    } else if (name != "" && name.length < 3) {
      validName = false;
      setBadName("Please Enter Valid Name");
    } else if (
      name != "" &&
      name.length >= 3 &&
      name.toString().match(nameRegex)
    ) {
      validName = false;
      setBadName("Please Enter Valid Name");
    } else if (
      name != "" &&
      name.length >= 3 &&
      name.toString().match(nameRegex)
    ) {
      validName = true;
      setBadName("");
    }

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

    // Contact Validation..........
    let contactRegex = /^\d+$/;
    if (contact == "") {
      validContact = false;
      setBadContact("Please Enter contact");
    } else if (contact != "" && contact.length < 10) {
      validContact = false;
      setBadContact("Please Enter Valid contact");
    } else if (
      contact != "" &&
      contact.length >= 10 &&
      !contact.match(contactRegex)
    ) {
      validContact = false;
      setBadContact("Please Enter Valid contact");
    } else if (
      contact != "" &&
      contact.length >= 10 &&
      contact.match(contactRegex)
    ) {
      validContact = true;
      setBadContact("");
    }

    // Company Validation...........
    if (companyName == "") {
      validCompany = false;
      setBadCompanyName("Please Enter Company Name");
    } else if (companyName != "") {
      validCompany = true;
      setBadCompanyName("");
    }

    // Address Validation.........
    if (address == "") {
      validAddress = false;
      setBadAddress("Please Enter Address");
    } else if (address != "") {
      validAddress = true;
      setBadAddress("");
    }

    // Password Validation...........
    if (password == "") {
      setBadPassword("Please Enter Password");
      validPassword = false;
    } else if (password != "" && password.length < 6) {
      validPassword = false;
      setBadPassword("Please Enter Min 6 Characters");
    } else if (password != "" && password.length >= 6) {
      validPassword = true;
      setBadPassword("");
    }

    return (
      validName &&
      validEmail &&
      validContact &&
      validCompany &&
      validAddress &&
      validPassword
    );
  };

  const registerUser = () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("job_posters")
      .add({
        name: name,
        email: email,
        contact: contact,
        address: address,
        companyName: companyName,
        password: password,
      })
      .then(() => {
        setName("");
        setEmail("");
        setContact("");
        setAddress("");
        setCompanyName("");
        setPassword("");
        setAccountCreated(true);
        setLoading(false);
        setTimeout(() => {
          navigation.goBack();
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      {!accountCreated ? (
        <ScrollView>
          <Image
            source={require("../../images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Create Account</Text>

          <CustomTextInput
            value={name}
            onChangeText={(txt) => {
              setName(txt);
            }}
            title={"Name"}
            placeholder={"xyz"}
            bad={badname != "" ? true : false}
          />
          {badname != "" && <Text style={styles.errorMsg}>{badname}</Text>}

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
            value={contact}
            onChangeText={(txt) => {
              setContact(txt);
            }}
            title={"Contact"}
            placeholder={"ex. 8009048055"}
            bad={badcontact != "" ? true : false}
          />
          {badcontact != "" && (
            <Text style={styles.errorMsg}>{badcontact}</Text>
          )}

          <CustomTextInput
            value={companyName}
            onChangeText={(txt) => {
              setCompanyName(txt);
            }}
            title={"Company Name"}
            placeholder={"ex. google"}
            bad={badcompanyName != "" ? true : false}
          />
          {badcompanyName != "" && (
            <Text style={styles.errorMsg}>{badcompanyName}</Text>
          )}

          <CustomTextInput
            value={address}
            onChangeText={(txt) => {
              setAddress(txt);
            }}
            title={"Address"}
            placeholder={"ex. Gurugram"}
            bad={badaddress != "" ? true : false}
          />
          {badaddress != "" && (
            <Text style={styles.errorMsg}>{badaddress}</Text>
          )}

          <CustomTextInput
            value={password}
            onChangeText={(txt) => {
              setPassword(txt);
            }}
            title={"Password"}
            placeholder={"********"}
            bad={badpassword != "" ? true : false}
          />
          {badpassword != "" && (
            <Text style={styles.errorMsg}>{badpassword}</Text>
          )}

          <CustomSolidBtn
            title={"Sign Up"}
            onclick={() => {
              if (validate()) {
                registerUser();
              }
            }}
          />

          <CustomBorderBtn
            title={"Login"}
            onclick={() => {
              navigation.goBack();
            }}
          />
          <Loader visible={loading} />
        </ScrollView>
      ) : (
        <View style={styles.doneView}>
          <Image
            source={require("../../images/check.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>{'Account Created'}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SignUPForCompany;

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
  doneView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
