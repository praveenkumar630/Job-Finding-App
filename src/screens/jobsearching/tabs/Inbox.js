import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import NoLoginComponent from '../../../common/NoLoginComponent'
import { BG_COLOR } from '../../../utils/Colors'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Inbox = () => {
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);

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
  return (
    <View style={styles.constainer}>
      {!isLogin &&  <NoLoginComponent
      desc={
        "Manage Your Professional Profile/Portfolio for attracting many jobs"
      }
      heading={"Easy Manage For Profile/Portfolio"}
    />}
   
  </View>
  )
}

export default Inbox

const styles=StyleSheet.create({
  constainer:{
    flex:1,
    backgroundColor:BG_COLOR
  }
})