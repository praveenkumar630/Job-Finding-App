import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BG_COLOR } from "../../../utils/Colors";
// import { FlatList } from "react-native-gesture-handler";
import CustomTextInput from "../../../common/CustomTextInput";
import CustomDropDown from "../../../common/CustomDropDown";
import CustomSolidBtn from "../../../common/CustomSolidBtn";
import { useNavigation, useRoute } from "@react-navigation/native";
import { profiles } from "../../../utils/Profiles";
import { firebase } from "../../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditJob = () => {
  const route = useRoute();
  const [jobTitle, setJobTitle] = useState(route.params.data.jobTitle);
  const [badJobTitle, setBadJobTitle] = useState("");
  const [jobdesc, setJobDesc] = useState(route.params.data.jobdesc);
  const [badJobDesc, setBadJobDesc] = useState("");
  const [exp, setExp] = useState(route.params.data.exp);
  const [badExp, setBadExp] = useState("");
  const [salary, setSalary] = useState(route.params.data.salary);
  const [badSalary, setBadSalary] = useState("");
  const [company, setCompany] = useState(route.params.data.company);
  const [badCompany, setBadCompany] = useState("");
  const navigation = useNavigation();
  const [openCategoryModal, setCategoryModal] = useState(false);
  const [openSkillModal, setSkillModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [badJobCategory, setBadJobCategory] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("Select Skill");
  const [badJobSkill, setBadJobSkill] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    profiles.map((item, index) => {
      if (item.category == route.params.data.category) {
        setSelectedCategory(index);
        profiles[index].keywords.map((x, y) => {
          if (x[0] == route.params.data.skill) {
            setSelectedSkill(x[0]);
          }
        });
      }
    });
  });

  const postJob = async () => {
    let id = await AsyncStorage.getItem("EMAIL");
    let name = await AsyncStorage.getItem("NAME");
    setLoading(true);
    firebase
      .firestore()
      .collection("jobs")
      .doc(route.params.data.id)
      .update({
        postedEmail: id,
        posterName: name,
        jobTitle: jobTitle,
        jobdesc,
        exp,
        salary,
        company,
        skill: selectedSkill,
        category: profiles[selectedCategory].category,
      })
      .then(() => {
        setLoading(false);
        navigation.goBack();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const validate = () => {
    let validJobTitle = true;
    let validCategory = true;
    let validJobDesc = true;
    let validExp = true;
    let validSalary = true;
    let validCompany = true;
    let validSkill = true;

    // JobTitle Section.........
    if (jobTitle == "") {
      validJobTitle = false;
      setBadJobTitle("Job Title is required");
    } else if (jobTitle != "") {
      validJobTitle = true;
      setBadJobTitle("");
    }
    // Job Description Section......
    if (jobdesc == "") {
      validJobDesc = false;
      setBadJobDesc("Job Description  is required");
    } else if (jobdesc != "" && jobdesc.length < 50) {
      validJobDesc = false;
      setBadJobDesc("Please Enter Description min 50 Characters");
    } else if (jobdesc != "" && jobdesc.length > 50) {
      validJobDesc = true;
      setBadJobDesc("");
    }

    // Selected Category Section............
    if (selectedCategory == " Select Category") {
      validCategory = false;
      setBadJobCategory("Please Select Job Category");
    } else if (selectedCategory != "Select Category") {
      validCategory = true;
      setBadJobCategory("");
    }

    // Selected Skill Section........
    if (selectedSkill == " Select Skill") {
      validSkill = false;
      setBadJobSkill("Please Select Job Skill");
    } else if (selectedSkill != "Select Skill") {
      validSkill = true;
      setBadJobSkill("");
    }

    // Experience Section...........
    let expRegex = /^\d+$/;
    if (exp == "") {
      validExp = false;
      setBadExp("Experience is required");
    } else if (exp != "" && exp.length > 2) {
      validExp = false;
      setBadExp("Please Enter Valid Experience");
    } else if (exp != "" && exp.length < 3 && !exp.match(expRegex)) {
      validExp = false;
      setBadExp("Please Enter Valid Experience");
    } else if (exp != "" && exp.length < 3 && exp.match(expRegex)) {
      validExp = true;
      setBadExp("");
    }

    // Salary Section.......
    if (salary == "") {
      validSalary = false;
      setBadSalary("Salary is required");
    } else if (salary != "" && salary.length < 3 && !salary.match(expRegex)) {
      validExp = false;
      setBadExp("Please Enter Valid Salary");
    } else if (salary != "" && salary.length < 3 && salary.match(expRegex)) {
      validSalary = true;
      setBadSalary("");
    }

    // Company Section........
    if (company == "") {
      validCompany = false;
      setBadCompany("Company is required");
    } else if (company != "") {
      validCompany = true;
      setBadCompany("");
    }

    return (
      validJobTitle &&
      validCategory &&
      validExp &&
      validJobDesc &&
      validCompany &&
      validSalary &&
      validSkill
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomTextInput
        value={jobTitle}
        onChangeText={(txt) => {
          setJobTitle(txt);
        }}
        title={"Job Title"}
        placeholder={"ex. web development"}
      />
      {badJobTitle != "" && <Text style={styles.errMsg}>{badJobTitle}</Text>}
      <CustomTextInput
        value={jobdesc}
        onChangeText={(txt) => {
          setJobDesc(txt);
        }}
        title={"Job Description"}
        placeholder={"ex. this is web development job"}
      />
      {badJobDesc != "" && <Text style={styles.errMsg}>{badJobDesc}</Text>}
      <CustomDropDown
        value={selectedCategory}
        onChangeText={(txt) => {
          setSelectedCategory(txt);
        }}
        title={"Category"}
        placeholder={
          selectedCategory == "Select Category"
            ? "Select Category"
            : profiles[selectedCategory].category
        }
        onclick={() => {
          setCategoryModal(true);
        }}
      />
      {badJobCategory != "" && (
        <Text style={styles.errMsg}>{badJobCategory}</Text>
      )}
      <CustomDropDown
        value={selectedSkill}
        onChangeText={(txt) => {
          setSelectedSkill(txt);
        }}
        title={"Skill"}
        placeholder={selectedSkill}
        onclick={() => {
          setSkillModal(true);
        }}
      />
      {badJobSkill != "" && <Text style={styles.errMsg}>{badJobSkill}</Text>}
      <CustomTextInput
        value={exp}
        onChangeText={(txt) => {
          setExp(txt);
        }}
        keyboardType={"number-pad"}
        title={"Experience"}
        placeholder={"ex. required experience 5 years"}
      />
      {badExp != "" && <Text style={styles.errMsg}>{badExp}</Text>}
      <CustomTextInput
        value={salary}
        onChangeText={(txt) => {
          setSalary(txt);
        }}
        keyboardType={"number-pad"}
        title={"Package"}
        placeholder={"ex. 10L"}
      />
      {badSalary != "" && <Text style={styles.errMsg}>{badSalary}</Text>}
      <CustomTextInput
        value={company}
        onChangeText={(txt) => {
          setCompany(txt);
        }}
        title={"Company"}
        placeholder={"ex. google "}
      />
      {badCompany != "" && <Text style={styles.errMsg}>{badCompany}</Text>}
      <CustomSolidBtn
        title={"Post Job"}
        onclick={() => {
          if (validate()) {
            postJob();
          }
        }}
      />
      <Modal visible={openCategoryModal} transparent style={{ flex: 1 }}>
        <View style={styles.ModalMainView}>
          <View style={styles.ListingView}>
            <Text style={[styles.title, { marginTop: 20 }]}>
              Select Category
            </Text>
            <FlatList
              data={profiles}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={styles.profileItem}
                    onPress={() => {
                      setSelectedCategory(index);
                      setCategoryModal(false);
                    }}
                  >
                    <Text>{item.category}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={openSkillModal} transparent style={{ flex: 1 }}>
        <View style={styles.ModalMainView}>
          <View style={styles.ListingView}>
            <Text style={[styles.title, { marginTop: 20 }]}>Select Skill</Text>
            <FlatList
              data={
                selectedCategory == "Select Category"
                  ? profiles[0].keywords
                  : profiles[selectedCategory].keywords
              }
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={styles.profileItem}
                    onPress={() => {
                      setSelectedSkill(item[0]);
                      setSkillModal(false);
                    }}
                  >
                    <Text>{item[0]}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </SafeAreaView>
  );
};

export default EditJob;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  back: {
    width: 16,
    height: 16,
  },
  title: {
    fontSize: 23,
    marginLeft: 20,
    fontWeight: "600",
  },
  ModalMainView: {
    backgroundColor: "rgba(0,0,0,.3)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ListingView: {
    width: "90%",
    height: "80%",
    borderRadius: 10,
    backgroundColor: BG_COLOR,
  },
  profileItem: {
    width: "90%",
    height: 50,
    justifyContent: "center",
    paddingLeft: 20,
    alignSelf: "center",
    borderBottomWidth: 0.4,
  },
  errMsg:{
    color: "red",
    marginLeft:25
  }
});
