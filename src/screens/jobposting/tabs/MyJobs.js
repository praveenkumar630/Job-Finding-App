import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BG_COLOR, TEXT_COLOR } from "../../../utils/Colors";
import { firebase } from "../../../../config";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShimmerPlaceholder, { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";

const shimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const MyJobs = () => {
  const isFocused = useIsFocused();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useEffect( () => {
    getJobs();
  }, [isFocused]);
  const getJobs = async () => {
    let email1 = await AsyncStorage.getItem("EMAIL");
    console.log(email1);
    if(email1==null) navigation.navigate("SelectUser");

    setLoading(true);
    let email = await AsyncStorage.getItem("EMAIL");
    firebase
      .firestore()
      .collection("jobs")
      .where("postedEmail", "==", email)
      .get()
      .then(async (data) => {
        setLoading(false);
        let temp = [];
        data.docs.forEach((item) => {
          temp.push({ ...item.data(), id: item.id });
        });
        await AsyncStorage.setItem("JOBS", temp.length + "");
        setJobs(temp);
      });
  };

  const deleteJob = (id) => {
    firebase
      .firestore()
      .collection("jobs")
      .doc(id)
      .delete()
      .then(() => {
        getJobs();
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>FindMyJob</Text>
      {loading && (
        <View>
          <FlatList 
          data={[1,2,3]}
          renderItem={({item,index})=>{
            return(
              <View style={styles.loaderView}>
                <ShimmerPlaceholder style={styles.loaderTitle}/>
                <ShimmerPlaceholder style={styles.loaderTitle}/>
                <ShimmerPlaceholder style={styles.loaderTitle}/>
                <ShimmerPlaceholder style={styles.loaderTitle}/>
                <ShimmerPlaceholder style={styles.loaderTitle}/>
                <View style={styles.loaderBottomView}>
                  <ShimmerPlaceholder style={styles.loaderBtn}/>
                  <ShimmerPlaceholder style={styles.loaderBtn}/>
                </View>

              </View>
            )
          }}
          />
        </View>
      )}

      {jobs.length > 0 ? (
        <FlatList
          data={jobs}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.jobItem}>
                <Text style={styles.title}>{item.jobTitle}</Text>
                <Text style={styles.desc}>{item.jobdesc}</Text>
                <Text style={styles.salary}>
                  {"Salary: " + item.salary + " L/year"}
                </Text>
                <Text style={styles.salary}>
                  {"Category: " + item.category + ""}
                </Text>
                <Text style={styles.salary}>{"Skill: " + item.skill}</Text>
                <View style={styles.bottomView}>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => {
                      navigation.navigate("EditJob", { data: item });
                    }}
                  >
                    <Text>Edit Job</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => {
                      deleteJob(item.id);
                    }}
                  >
                    <Text style={{ color: "red" }}>Delete Job</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.emptyView}>
          <Text style={styles.title}>Empty Jobs</Text>
        </View>
      )}
    </View>
  );
};

export default MyJobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  heading: {
    fontSize: 30,
    fontWeight: "600",
    marginLeft: 15,
    marginTop: 10,
    color: TEXT_COLOR,
  },
  jobItem: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  desc: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 5,
  },
  salary: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 5,
  },
  bottomView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 25,
    alignItems: "center",
    marginTop: 15,
  },
  editBtn: {
    width: "40%",
    height: 35,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtn: {
    width: "40%",
    height: 35,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderView:
  {
    width:'90%',
    alignSelf:'center',
    marginTop:20
  },
  loaderTitle:{
    width:'70%',
    height:20,
    borderRadius:10,
    marginTop:10,

  },
  loaderBottomView:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:10
  },loaderBtn:{
    width:'45%',
    height:30,
    borderRadius:10
  }
});
