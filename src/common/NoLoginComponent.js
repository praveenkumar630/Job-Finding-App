import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { BG_COLOR } from "../utils/Colors";
import CustomSolidBtn from "../common/CustomSolidBtn";

const NoLoginComponent = ({ heading, desc }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading ? heading : ""}</Text>
      <Text style={styles.desc}>{desc ? desc : ""}</Text>
      <CustomSolidBtn title={"Login"} onclick={() => {}} />
      <View style={styles.signUpView}>
        <Text style={styles.text1}>{"Don't have an account?"}</Text>
        <Text style={styles.text2}>{"Create Account"}</Text>
      </View>
    </View>
  );
};

export default NoLoginComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  heading: {
    width: "90%",
    fontSize: 25,
    alignSelf: "center",
    marginTop: 100 ,
    fontWeight: "600",
    textAlign: "center",
  },
  desc: {
    width: "80%",
    alignSelf: "center",
    fontSize: 17,
    textAlign: "center",
    marginTop: 10,
  },
  signUpView: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 50,
    width: "90%",
    justifyContent:'center'
  },
  text1:{
    fontSize:16,
    fontWeight:'500'

  },text2:
  {
    fontWeight:'700',
    fontSize:16,
    marginLeft:10
  }
});
