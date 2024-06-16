import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BG_COLOR, TEXT_COLOR } from "../../utils/Colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = ({navigation}) => {
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  // const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    const type = await AsyncStorage.getItem("USER_TYPE");
    const mName = await AsyncStorage.getItem("NAME");
    const mEmail = await AsyncStorage.getItem("EMAIL");
    if (id != null && type != null) {
      if (type == "user") {
        setIsLogin(true);
        setName(mName);
        setEmail(mEmail);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Image
          source={require("../../images/account.png")}
          style={styles.profile}
        />
        <View>
          <Text style={[styles.heading, { width: isLogin ? "100%" : "60%" }]}>
            {isLogin ? name : "Bulid Your Profile"}
          </Text>
          <Text
            style={[styles.sub_heading, { width: isLogin ? "100%" : "60%" }]}
          >
            {isLogin ? email : "Job Opportunities waiting for you at FindMyJob"}
          </Text>
        </View>
      </View>
      {!isLogin && (
        <View style={styles.btnsView}>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={[styles.btnText, { color: BG_COLOR }]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpBtn}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.seperator}></View>
      <FlatList
        contentContainerStyle={{ marginTop: 60 }}
        data={[
          { title: "Saved Job", icon: require("../../images/star.png") },
          { title: "Rate Us", icon: require("../../images/phone.png") },
          { title: "Theme", icon: require("../../images/theme.png") },
        ]}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                if(index==0)
                  {
                    navigation.closeDrawer()
                    navigation.navigate('SavedJobs')
                  }
              }}
            >
              <View style={styles.listItemLeftView}>
                <Image source={item.icon} style={styles.listItemIcon} />
                <Text style={styles.rate}>{item.title}</Text>
              </View>
              <Image
                source={require("../../images/right.png")}
                style={styles.listItemIcon}
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  profile: {
    width: 55,
    height: 55,
    marginTop: 45,
    marginLeft: 5,
  },
  topView: {
    flexDirection: "row",
    marginTop: 10,
  },
  heading: {
    marginTop: 40,
    fontSize: 20,
    width: "60%",
    fontWeight: "600",
    marginLeft: 10,
  },
  sub_heading: {
    width: "60%",
    fontSize: 12,
    marginLeft: 10,
    marginTop: 4,
  },
  btnsView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  loginBtn: {
    width: "40%",
    height: 40,
    backgroundColor: TEXT_COLOR,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpBtn: {
    width: "40%",
    height: 40,
    borderColor: TEXT_COLOR,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 15,
    fontWeight: "600",
  },
  seperator: {
    width: "90%",
    height: 1,
    backgroundColor: "#9e9e9e",
    opacity: 0.5,
    alignSelf: "center",
    marginTop: 20,
  },
  listItem: {
    width: "90%",
    height: 50,
    alignSelf: "center",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemLeftView: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItemIcon: {
    width: 25,
    height: 25,
  },
  rate: {
    marginLeft: 15,
    fontSize: 17,
    fontWeight: "600",
  },
});
