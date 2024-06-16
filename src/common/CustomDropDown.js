import { View, Text, StyleSheet, TextInput, Image , TouchableOpacity} from "react-native";
import React from "react";
import { BG_COLOR } from "../utils/Colors";
// import { TouchableOpacity } from "react-native-gesture-handler";

const CustomDropDown = ({ title, placeholder, bad,onclick}) => {
  return (
    <TouchableOpacity
      style={[styles.input, { borderColor: bad ? "red" : "#9e9e9e" }]}
      onPress={() => {
        onclick();
      }}
    >
      <Text style={[styles.title, { color: bad ? "red" : "black" }]}>
        {title}
      </Text>
      <Text style={{ color:placeholder.includes('Select')? "#9e9e9e":'black' }}>{placeholder}</Text>
      <Image source={require("../images/dropdown.png")} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default CustomDropDown;
const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 45,
    borderWidth: 0.4,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: 20,
    top: -9,
    position: "absolute",
    backgroundColor: BG_COLOR,
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    width: 15,
    height: 15,
  },
});
