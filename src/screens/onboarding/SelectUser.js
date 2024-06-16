import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { BG_COLOR, TEXT_COLOR } from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";

const SelectUser = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require("../../images/logo.png")} style={styles.logo} />
      <Text style={styles.title}>What you are looking for?</Text>

      <TouchableOpacity
        style={styles.wantToHire}
        onPress={() => {
          navigation.navigate("JobPostingNavigator");
        }}
      >
        <Text style={styles.btnTxt1}>Want to Hire Condidate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.wantToJob}
        onPress={() => {
          navigation.navigate("JobSearchingNavigator");
        }}
      >
        <Text style={styles.btnTxt2}>Want to Get Job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectUser;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  wantToHire: {
    width: "90%",
    height: 50,
    backgroundColor: TEXT_COLOR,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  wantToJob: {
    width: "90%",
    height: 50,
    borderColor: TEXT_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btnTxt1: {
    color: BG_COLOR,
    fontSize: 16,
    fontWeight: "500",
  },
  btnTxt2: {
    color: TEXT_COLOR,
    fontSize: 16,
    fontWeight: "500",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 50,
  },
});
