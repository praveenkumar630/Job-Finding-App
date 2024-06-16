import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import NoLoginComponent from '../../../common/NoLoginComponent'
import { BG_COLOR, TEXT_COLOR } from '../../../utils/Colors'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native-gesture-handler'
import firebase from "firebase/compat/app";

const Applies = () => {
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [jobs, setJobs] = useState([]);
  const navigation = useNavigation();
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
    }}

    
    useEffect(() => {
      getJobs();
    }, []);
    const getJobs = async () => {
      const id = await AsyncStorage.getItem("USER_ID");
      firebase
        .firestore()
        .collection("applied_jobs")
        .where("userId", "==", id)
        .get()
        .then((snapshot) => {
          console.log(snapshot.docs);
          let temp = [];
          snapshot.docs.forEach((item) => {
            temp.push({ ...item.data(), appliedId : item.id });
          });
          setJobs(temp);
        });
    };
  
    const removeSavedJob = (id) => {
      firebase
        .firestore()
        .collection("applied_jobs")
        .doc(id)
        .delete()
        .then(() => {
          getJobs();
        });
    };
  return (
    <View style={styles.constainer}>
      {!isLogin &&  <NoLoginComponent
      desc={
        "Manage Your Professional Profile/Portfolio for attracting many jobs"
      }
      heading={"Easy Manage For Profile/Portfolio"}
    />}
    {isLogin && jobs.length>0 ? <FlatList
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
                    
                      removeSavedJob(item.appliedId);
      
                  }}
                >
                  <Image
                    source={require("../../../images/star1.png")
                        
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
      />:null}
      {isLogin && jobs.length<1?(
        <View style={styles.empView}>
          <Text style={styles.empText}>No Applied Job</Text>
        </View>
      ):null}
   
  </View>
  )
}

export default Applies

const styles=StyleSheet.create({
  constainer:{
    flex:1,
    backgroundColor:BG_COLOR
  }, icon: {
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
})