import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BG_COLOR } from "../../utils/Colors";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {firebase} from '../../../config'
import CustomSolidBtn from "../../common/CustomSolidBtn";
import CustomBorderBtn from "../../common/CustomBorderBtn";
import { useNavigation } from "@react-navigation/native";

const ChangeProfilePic = () => {
  const navigate =useNavigation();
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageData(result.assets[0]);
    }
  };

  const uploadPic = async () => {
    const id = await AsyncStorage.getItem("USER_ID");
    console.log(id);

    try {
      if (!imageData || !imageData.uri) {
        throw new Error("imageData.uri is undefined");
      }
      setLoading(true);
      const response = await fetch(imageData.uri);
      const blob = await response.blob();
      const fileName = imageData.fileName || "profile_picture";
  
      const reference = firebase.storage().ref().child(fileName);
      await reference.put(blob);

      const url = await reference.getDownloadURL();

      await firebase.firestore().collection("job_posters").doc(id).update({
        profileImage: url,
      });
      await AsyncStorage.setItem("PROFILE_IMG", url);
      navigate.goBack();
    } catch (err) {
      console.log("Error uploading picture:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={openGallery}>
        {imageData == null ? (
          <Image
            source={require("../../images/account.png")}
            style={styles.profileC}
          />
        ) : (
          <Image source={{ uri: imageData.uri }} style={styles.profileC} />
        )}
      </TouchableOpacity>
      <CustomBorderBtn
        title={"Choose Image From Gallery"}
        onclick={() => {
          openGallery();
        }}
      />
      {imageData && (
        <CustomSolidBtn
          title={"Upload Image"}
          onclick={() => {
            uploadPic();
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default ChangeProfilePic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  profileC: {
    width: 150,
    height: 150,
    justifyContent: "center",
    // alignItems:'center',
    alignSelf: "center",
    marginTop: 25,
  },
  picBtn: {
    fontSize: 15,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    marginTop: 80,
    borderWidth: 1,
    borderRadius: 10,
    width: "60%",
    padding: 10,
  },
});
