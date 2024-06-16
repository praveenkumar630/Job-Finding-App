import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { BG_COLOR, TEXT_COLOR } from "../utils/Colors";

const CustomBorderBtn = ({ title, onclick }) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => {
        onclick();
      }}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomBorderBtn;
const styles = StyleSheet.create({
  btn: {
    width: "90%",
    height: 50,
    borderColor: TEXT_COLOR,
    borderWidth: 1,
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: TEXT_COLOR,
    fontWeight: "500",
    fontSize: 16,
  },
});
