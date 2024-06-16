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
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavedJobs = () => {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    getJobs();
  }, []);
  const getJobs = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    firebase
      .firestore()
      .collection("saved_jobs")
      .where("userId", "==", id)
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs);
        let temp = [];
        snapshot.docs.forEach((item) => {
          temp.push({ ...item.data(), savedId: item.id });
        });
        setJobs(temp);
      });
  };

  const removeSavedJob = (id) => {
    firebase
      .firestore()
      .collection("saved_jobs")
      .doc(id)
      .delete()
      .then(() => {
        getJobs();
      });
  };
  return (
    <View style={styles.container}>
      {jobs.length > 0 ? (
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
                      removeSavedJob(item.savedId);
                    }}
                  >
                    <Image
                      source={require("../../images/star1.png")}
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
      ) : (
        <View style={styles.empView}>
          <Text style={styles.empText}>No Saved Job</Text>
        </View>
      )}
    </View>
  );
};

export default SavedJobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
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
  empView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empText: {
    fontSize: 25,
    fontWeight: "450",
  },
});
