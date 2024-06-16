import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { BG_COLOR, TEXT_COLOR } from "../../utils/Colors";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat/app";

const JobDetails = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [isJobSaved, setIsJobSaved] = useState(false);
  const [savedJobId, setSavedJobId] = useState();
  const [appliedJobId, setAppliedJobId] = useState();
  const [isJobApplied, setIsJobApplied] = useState();
  useEffect(() => {
    getData();
    getSaveJobs();
    getAppliedJobs();
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

  const applyJob = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firebase
      .firestore()
      .collection("applied_jobs")
      .add({ ...route.params.data, userId: id })
      .then(() => {
        console.log("Job applied Successfully");
        getAppliedJobs();
      });
  };

  const getAppliedJobs = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firebase
      .firestore()
      .collection("applied_jobs")
      .where("userId", "==", id)
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs);
        if (snapshot.docs.length > 0) {
          snapshot.docs.forEach((item) => {
            if (item.data().id == route.params.data.id) {
              setIsJobApplied(true);
              setAppliedJobId(item.id);
            }
          });
        } else {
          setIsJobApplied(false);
          setAppliedJobId("");
        }
      });
  };
  const cancelAppy = () => {
    firebase
      .firestore()
      .collection("applied_jobs")
      .doc(appliedJobId)
      .delete()
      .then(() => {
        getAppliedJobs();
      });
  };

  const saveJobs = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firebase
      .firestore()
      .collection("saved_jobs")
      .add({ ...route.params.data, userId: id })
      .then(() => {
        console.log("Job Save Successfully");
        getSaveJobs();
      });
  };
  const getSaveJobs = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firebase
      .firestore()
      .collection("saved_jobs")
      .where("userId", "==", id)
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs);
        if (snapshot.docs.length > 0) {
          snapshot.docs.forEach((item) => {
            if (item.data().id == route.params.data.id) {
              setIsJobSaved(true);
              setSavedJobId(item.id);
            }
          });
        } else {
          setIsJobSaved(false);
          setSavedJobId("");
        }
      });
  };

  const removeSavedJob = () => {
    firebase
      .firestore()
      .collection("saved_jobs")
      .doc(savedJobId)
      .delete()
      .then(() => {
        getSaveJobs();
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.data.jobTitle}</Text>
      <View style={styles.detailView}>
        <Text style={styles.desc}>
          {"Posted by:  " + route.params.data.posterName}
        </Text>
      </View>
      <Text style={styles.desc}>{route.params.data.jobdesc}</Text>
      <Text style={styles.subTitle}>
        {"Experience Required:  " + route.params.data.exp + " years"}
      </Text>
      <Text style={styles.subTitle}>
        {"Skill Required:  " + route.params.data.skill}
      </Text>
      <Text style={styles.subTitle}>
        {"Salary:  " + route.params.data.salary + " LPA"}
      </Text>
      <Text style={styles.subTitle}>
        {"Category:  " + route.params.data.category}
      </Text>
      <Text style={styles.subTitle}>
        {"Company:  " + route.params.data.company}
      </Text>

      <View style={styles.bottomView}>
        <TouchableOpacity
          disabled={isLogin ? false : true}
          style={styles.savebtn}
          onPress={() => {
            if (isJobSaved) {
              removeSavedJob();
            } else {
              saveJobs();
            }
          }}
        >
          <Image
            source={
              isJobSaved
                ? require("../../images/star1.png")
                : require("../../images/star.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isLogin ? false : true}
          style={[
            styles.applyBtn,
            { backgroundColor: isLogin ? "black" : "#9e9e9e" },
          ]}
          onPress={() => {
            if (!isJobApplied) {
              applyJob();
            } else {
              cancelAppy();
            }
          }}
        >
          <Text style={styles.text}>{isJobApplied ? "Applied" : "Apply"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  desc: {
    width: "90%",
    marginTop: 15,
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "center",
  },
  subTitle: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "500",
    // alignSelf:'center',
    marginLeft: 20,
  },
  detailView: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
  },
  bottomView: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
  },
  savebtn: {
    width: 100,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
  },
  applyBtn: {
    width: 200,
    height: 40,
    backgroundColor: TEXT_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: BG_COLOR,
    fontSize: 16,
  },
});
