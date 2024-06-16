import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BG_COLOR, TEXT_COLOR } from "../../utils/Colors";
import SearchCondidates from "./tabs/SearchCondidates";
import Chats from "./tabs/Chats";
import Profile1 from "./tabs/Profile1";
import MyJobs from "./tabs/MyJobs";
import { useNavigation } from "@react-navigation/native";

const DashboardForCompany = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      {selectedTab == 0 ? (
        <MyJobs/>
      ):selectedTab==1?(
        <SearchCondidates />
      ) : selectedTab == 3 ? (
        <Chats />
      ) :(
        <Profile1 onJobClick={() =>
          setSelectedTab(0)
        } />
      )}

      <View style={styles.bottomView}>
        {/* Home Section */}
        <TouchableOpacity
          style={[
            styles.bottomTab,
            { borderTopWidth: selectedTab == 0 ? 3 : 0, borderTopColor: "black" },
          ]}
          onPress={() => {
            setSelectedTab(0);
          }}
        >
          <Image
            source={require("../../images/home1.png")}
            style={[
              styles.tabIcon,
              { tintColor: selectedTab == 0 ? "gray" : "gray" },
            ]}
          />
        </TouchableOpacity>
        {/* Search-User section */}
        <TouchableOpacity
          style={[
            styles.bottomTab,
            { borderTopWidth: selectedTab == 1 ? 3 : 0, borderTopColor: "black" },
          ]}
          onPress={() => {
            setSelectedTab(1);
          }}
        >
          <Image
            source={require("../../images/search-user.png")}
            style={[
              styles.tabIcon,
              { tintColor: selectedTab == 1 ? "gray" : "gray" },
            ]}
          />
        </TouchableOpacity>
        {/* Addtion Section */}
        <TouchableOpacity style={styles.bottomTab}
        onPress={() => {
          navigation.navigate('AddJob');
        }}>
          <Image
            source={require("../../images/add.png")}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        {/* Chat section */}
        <TouchableOpacity
          style={[
            styles.bottomTab,
            { borderTopWidth: selectedTab == 3 ? 3 : 0, borderTopColor: "black" },
          ]}
          onPress={() => {
            setSelectedTab(3);
          }}
        >
          <Image
            source={require("../../images/chat1.png")}
            style={[
              styles.tabIcon,
              { tintColor: selectedTab == 3 ? "gray" : "gray" },
            ]}
          />
        </TouchableOpacity>
        {/* User section */}
        <TouchableOpacity
          style={[
            styles.bottomTab,
            { borderTopWidth: selectedTab == 4 ? 3 : 0, borderTopColor: "black" },
          ]}
          onPress={() => {
            setSelectedTab(4);
          }}
        >
          <Image
            source={require("../../images/user1.png")}
            style={[
              styles.tabIcon,
              { tintColor: selectedTab == 4 ? "gray" : "gray" },
            ]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DashboardForCompany;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  bottomView: {
    width: "100%",
    height: 60,
    backgroundColor: BG_COLOR,
    // shadowColor:'rgba(0,0,0,.6)',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 1 },
    position: "absolute",
    bottom: 0,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    shadowColor: "#000",
  },
  bottomTab: {
    width: "7.5%",
    height: "100%",
    justifyContent: "center",
  },
  tabIcon: {
    width: 30,
    height: 30,
  },
});
