import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BG_COLOR, TEXT_COLOR } from "../../utils/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase/compat/app";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchJob = () => {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJob] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const searchJob = (txt) => {
    firebase
      .firestore()
      .collection("jobs")
      .where("jobTitle", "==", txt)
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs);
        let temp = [];
        snapshot.docs.forEach((item) => {
          temp.push({ ...item.data(), id: item.id });
        });
        setJobs(temp);
      });
  };

  useEffect(() => {
    getSaveJobs();
  }, [isFocused]);
  const saveJobs = async (data) => {
    const id = await AsyncStorage.getItem("USER_ID");
    firebase
      .firestore()
      .collection("saved_jobs")
      .add({ ...data, userId: id })
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
          let temp = [];
          snapshot.docs.forEach((item) => {
            temp.push({ ...item.data(), savedId: item.id });
          });
          setSavedJob(temp);
        } else {
          setSavedJob([]);
        }
      });
  };

  const removeSavedJob = async (id) => {
    const docId = await getSavedJobId(id);
    firebase
      .firestore()
      .collection("saved_jobs")
      .doc(id)
      .delete()
      .then(() => {
        getSaveJobs()
      });
  };

  const checkSavedJob = (id) => {
    let temp = savedJobs;
    let isSaved = false;
    temp.map((item) => {
      if (item.id == id) {
        isSaved = true;
      }
    });
    return isSaved;
  };

  const getSavedJobId = async (idd) => {
    const id = await AsyncStorage.getItem("USER_ID");
    let jobId = ""; 
    const snapshot= await
    firebase
      .firestore()
      .collection("saved_jobs")
      .where("userId", "==", id)
      .get();
    snapshot.docs.forEach((item) => {
      if (idd == item.data().id) {
        jobId = item.id;
      }
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Image
          source={require("../../images/search.png")}
          style={styles.icon}
        />
        <TextInput
          placeholderTextColor={"#9e9e9e"}
          placeholder="Search Job here"
          style={styles.input}
          value={search}
          onChangeText={(txt) => {
            setSearch(txt);
            searchJob(txt);
          }}
        />
        {search != "" && (
          <TouchableOpacity
            onPress={() => {
              setSearch("");
              searchJob("");
            }}
          >
            <Image
              source={require("../../images/close.png")}
              style={styles.close}
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={jobs}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.jobItem}
              onPress={() => {
                navigation.navigate("JobDetails", {
                  data: item,
                });
              }}
            >
              <View style={styles.topView}>
                <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                <TouchableOpacity
                  onPress={() => {
                    if (checkSavedJob(item.id)) {
                      removeSavedJob(item.id);
                    }else{
                      saveJobs(item)
                    }
                  }}
                >
                  <Image
                    source={
                      checkSavedJob(item.id)
                        ? require("../../images/star1.png")
                        : require("../../images/star.png")
                    }
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.subTitle}>
                {"Job Category: " + item.category}
              </Text>
              <Text style={styles.subTitle}>
                {"Poster Name: " + item.posterName}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default SearchJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  searchBox: {
    height: 40,
    width: "90%",
    borderWidth: 0.4,
    borderRadius: 30,
    marginTop: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
  input: {
    width: "75%",
    height: "100%",
    marginLeft: 10,
    fontSize: 16,
    color: TEXT_COLOR,
  },
  close: {
    height: 15,
    width: 15,
    marginRight: 10,
  },
  jobItem: {
    width: "90%",
    height: 100,
    backgroundColor: "#f2f2f2",
    alignSelf: "center",
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "600",
    width: "90%",
    // backgroundColor:'red'
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
    color: "#6B696D",
  },
  topView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});
