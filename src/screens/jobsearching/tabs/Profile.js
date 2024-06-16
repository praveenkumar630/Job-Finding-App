import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import NoLoginComponent from "../../../common/NoLoginComponent";
import { BG_COLOR } from "../../../utils/Colors";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat/app";
import Modal from "react-native-modal";

const Profile = () => {
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [openSkillModal, setSkillModal] = useState(false);
  const [openExpModal, setExpModal] = useState(false);
  const [skill, setSkill] = useState("");
  const [skillList, setSkillList] = useState([]);
  const [expList, setExpList] = useState([]);
  const [company,setCompany]=useState()
  const [startYear,setStartYear]=useState()
  const [endYear,setEndYear]=useState()
  const [profile,setProfile]=useState()
  useEffect(() => {
    getData();
    getProfileData();
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
  const getProfileData = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .get()
      .then((data) => {
        // console.log(data.data());
        setUserData(data.data());
      });
  };

  const addSkill = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firebase
      .firestore()
      .collection("skills")
      .add({
        skill: skill,
        userId: id,
      })
      .then(() => {
        Alert.alert("Skill Added");
        setSkill("");
        getSkills();
      });
  };
  const addExperience = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firebase
      .firestore()
      .collection("experience")
      .add({
        company: company,
        startYear:startYear,
        EndYear:endYear,
        profile:profile,
        userId: id,
      })
      .then(() => {
        Alert.alert("Experience Added");
        setCompany("");
        setStartYear();
        setEndYear()
        setProfile()
        getExperience()
      });
  };
  useEffect(() => {
    getSkills();
  }, []);
  const getSkills = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firebase
      .firestore()
      .collection("skills")
      .where("userId", "==", id)
      .get()
      .then((snapshot) => {
        let temp = [];
        snapshot.docs.forEach((item) => {
          temp.push({ ...item.data(), skillId: item.id });
        });
        setSkillList(temp);
        console.log(snapshot.docs);
      });
  };
  const getExperience = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firebase
      .firestore()
      .collection("experience")
      .where("userId", "==", id)
      .get()
      .then((snapshot) => {
        let temp = [];
        snapshot.docs.forEach((item) => {
          temp.push({ ...item.data(), expId: item.id });
        });
        setExpList(temp);
        console.log(snapshot.docs);
      });
  };

  const deleteSkill = (id) => {
    firebase.firestore().collection("skills").doc(id).delete();
    getSkills();
  };
  const deleteExp = (id) => {
    firebase.firestore().collection("experience").doc(id).delete();
    getExperience();
  };
  return (
    <View style={styles.constainer}>
      {!isLogin && (
        <NoLoginComponent
          desc={
            "Manage Your Professional Profile/Portfolio for attracting many jobs"
          }
          heading={"Easy Manage For Profile/Portfolio"}
        />
      )}
      {isLogin && (
        <View style={styles.mainView}>
          <TouchableOpacity style={{ marginLeft: 15, marginTop: 20 }}>
            <Image
              source={require("../../../images/account.png")}
              style={styles.profile}
            />
          </TouchableOpacity>
          <Text style={styles.name}>{userData ? userData.name : "NA"}</Text>
          <Text style={styles.email}>{userData ? userData.email : "NA"}</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text>Edit Profile</Text>
          </TouchableOpacity>
          <View style={styles.headingView}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              {"Skills"}
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "600",

                marginLeft: 20,
              }}
              onPress={() => {
                setSkillModal(true);
              }}
            >
              {"+"}
            </Text>
          </View>
          <View>
          <FlatList
            data={skillList}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.skillItem}>
                  <Text style={styles.skillName}>{item.skill}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      deleteSkill(item.skillId);
                    }}
                  >
                    <Image
                      source={require("../../../images/close.png")}
                      style={styles.skillIcon}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          </View>
         
            <View style={styles.headingView}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              {"Experience"}
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "600",

                marginLeft: 20,
              }}
              onPress={() => {
                setExpModal(true);
              }}
            >
              {"+"}
            </Text>
          </View>
          <View>
          <FlatList
            data={expList}
            renderItem={({ item, index }) => {
              return (
                <View style={[styles.skillItem,{marginTop:20}]}>
                  <View>
                  <Text style={styles.skillName}>{item.company}</Text>
                  <Text style={styles.skillName}>{item.startYear}</Text>
                  <Text style={styles.skillName}>{item.endYear}</Text>
                  <Text style={styles.skillName}>{item.profile}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      deleteExp(item.expId);
                    }}
                  >
                    <Image
                      source={require("../../../images/close.png")}
                      style={styles.skillIcon}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          </View>
        </View>
      )}
      <Modal
        isVisible={openSkillModal}
        backdropOpacity={0.5}
        style={{ margin: 0 }}
      >
        <View style={styles.skillModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>Add Skill</Text>
            <TouchableOpacity
              onPress={() => {
                setSkillModal(false);
              }}
            >
              <Image
                source={require("../../../images/close.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholderTextColor={"#9e9e9e"}
            placeholder="Enter Skill Name"
            style={styles.input}
            value={skill}
            onChangeText={(txt) => setSkill(txt)}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (skill != "") {
                setSkillModal(false);
                addSkill();
              }
            }}
          >
            <Text style={styles.btnText}>Submit Skill</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={openExpModal} backdropOpacity={0.5} style={{ margin: 0 }}>
        <View style={styles.skillModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>Add Experience</Text>
            <TouchableOpacity
              onPress={() => {
                setExpModal(false);
              }}
            >
              <Image
                source={require("../../../images/close.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholderTextColor={"#9e9e9e"}
            placeholder="Enter Company Name"
            style={styles.input}
            value={company}
            onChangeText={(txt) => setCompany(txt)}
          />
          <TextInput
            placeholderTextColor={"#9e9e9e"}
            placeholder="Enter Start Year"
            style={styles.input}
            maxLength={4}
            keyboardType="numeric"
            value={startYear}
            onChangeText={(txt) => setStartYear(txt)}
          />
          <TextInput
            placeholderTextColor={"#9e9e9e"}
            placeholder="Enter End Year"
            style={styles.input}
            maxLength={4}
            keyboardType="numeric"
            value={endYear}
            onChangeText={(txt) => setEndYear(txt)}
          />
          <TextInput
            placeholderTextColor={"#9e9e9e"}
            placeholder="Enter Profile "
            style={styles.input}
            value={profile}
            onChangeText={(txt) => setProfile(txt)}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setExpModal(false);
              if (company!= "" && startYear!='' && endYear!='') {
                addExperience()
                
      
              }
            }}
          >
            <Text style={styles.btnText}>Submit Experience</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  mainView: {
    flex: 1,
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
    marginLeft: 15,
    marginTop: 10,
  },
  email: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 15,
    marginTop: 5,
  },
  editBtn: {
    width: "40%",
    height: 45,
    borderRadius: 10,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    marginTop: 20,
  },
  headingView: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  skillModal: {
    width: "100%",
    paddingBottom: 20,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  modalHeader: {
    width: "90%",
    marginTop: 20,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  input: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 15,
    alignSelf: "center",
  },
  btn: {
    width: "90%",
    height: 45,
    backgroundColor: "#007bff",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
  },
  skillItem: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    height: 50,
    paddingLeft: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  skillName: {
    fontSize: 18,
    fontWeight: "500",
  },
  skillIcon: {
    width: 12,
    height: 12,
    marginRight: 3,
  },
});
