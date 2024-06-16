import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BG_COLOR, TEXT_COLOR } from "../../../utils/Colors";
import CustomSolidBtn from "../../../common/CustomSolidBtn";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    const type = await AsyncStorage.getItem("USER_TYPE");
    if (id != null && type != null) {
      if (type == "user") {
        setIsLogin(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.searchBox}
        onPress={() => {
          navigation.navigate("SearchJob");
        }}
      >
        <Image
          source={require("../../../images/search.png")}
          style={styles.icon}
        />
        <Text style={styles.searchText}>Search Job here...</Text>
      </TouchableOpacity>
      {!isLogin && <View>
        <Text style={styles.heading}>
          {"You are one step from  getting a good Job"}
        </Text>
        <View style={styles.notes}>
          <Image
            source={require("../../../images/star.png")}
            style={styles.icon}
          />
          <Text style={styles.note}>{"Get Jobs after creating account"}</Text>
        </View>
        <View style={styles.notes}>
          <Image
            source={require("../../../images/star.png")}
            style={styles.icon}
          />
          <Text style={styles.note}>{"Chat with recruiter directly"}</Text>
        </View>
        <View style={styles.btnsView}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              navigation.navigate("LoginForUser");
            }}
          >
            <Text style={[styles.btnText, { color: BG_COLOR }]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpBtn}
            onPress={() => {
              navigation.navigate("SignupForUser");
            }}
          >
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>}
      
      <View style={styles.jobSearchcard}>
        <Image
          source={require("../../../images/search_gif.gif")}
          style={styles.gif}
        />
        <TextInput style={styles.input} placeholder="Enter Job Title" />
        <TextInput
          style={[styles.input, { marginTop: 10 }]}
          placeholder="Enter Job Title"
        />
        <CustomSolidBtn title={"Search Jobs"} onclick={() => {}} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  searchBox: {
    width: "90%",
    height: 40,
    borderWidth: 0.5,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 30,
    borderColor: "#212121",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "gray",
  },
  searchText: {
    marginLeft: 15,
    color: "gray",
  },
  heading: {
    fontSize: 23,
    color: TEXT_COLOR,
    fontWeight: "700",
    alignSelf: "center",
    width: "90%",
    marginTop: 20,
  },
  notes: {
    width: "90%",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 4,
  },
  note: {
    marginLeft: 10,
    fontSize: 15,
    height: 30,
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
  jobSearchcard: {
    width: "90%",
    alignSelf: "center",
    paddingBottom: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginTop: 50,
  },
  gif: {
    alignSelf: "center",
    width: 100,
    height: 100,
  },
  input: {
    width: "90%",
    height: 48,
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 15,
    paddingLeft: 10,
  },
});
