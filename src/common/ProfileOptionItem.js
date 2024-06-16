import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const ProfileOptionItem = ({ title, icon, onclick }) => {
  return (
    <TouchableOpacity
      style={{
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
      }} onPress={() =>{
        onclick()
      }}
    >
      <View style={{flexDirection:'row', alignItems:'center'}}>
      <Image source={icon} style={{ width: 20, height: 20 }} />
      <Text style={{marginLeft:15, fontSize:18}}>{title}</Text>
      </View>
      <Image source={require('../images/right.png')} style={{width:20,height:20}}/>
    </TouchableOpacity>
  );
};

export default ProfileOptionItem;
