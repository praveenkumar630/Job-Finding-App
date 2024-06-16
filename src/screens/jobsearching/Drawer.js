import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { BG_COLOR } from "../../utils/Colors";
import Home from "./tabs/Home";
import Applies from "./tabs/Applies";
import Inbox from "./tabs/Inbox";
import Profile from "./tabs/Profile";

const DrawerScreen = () => {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <View style={styles.container}>
      {currentTab == 0 ? (
        <Home />
      ) : currentTab == 1 ? (
        <Applies />
      ) : currentTab == 2 ? (
        <Inbox />
      ) : (
        <Profile />
      )}
      <View style={styles.bottomNavView}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setCurrentTab(0);
          }}
        >
          <Image
            source={
              currentTab == 0
                ? require("../../images/home1.png")
                : require("../../images/home.png")
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setCurrentTab(1);
          }}
        >
          <Image
            source={
              currentTab == 1
                ? require("../../images/send.png")
                : require("../../images/send1.png")
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setCurrentTab(2);
          }}
        >
          <Image
            source={
              currentTab == 2
                ? require("../../images/chat1.png")
                : require("../../images/chat.png")
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setCurrentTab(3);
          }}
        >
          <Image
            source={
              currentTab == 3
                ? require("../../images/user1.png")
                : require("../../images/user.png")
            }
            style={styles.tabIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  bottomNavView: {
    width: "100%",
    height: 70,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    shadowColor: "#000",
  },
  tab: {
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
});
