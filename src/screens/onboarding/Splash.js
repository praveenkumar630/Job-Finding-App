import { View,StyleSheet,Image,Text } from 'react-native'
import React, { useEffect } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../utils/Colors'
import { useNavigation } from '@react-navigation/native'
import {moderateScale, moderateVerticalScale, scale, verticalScale} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splash = () => {
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      getData()
    }, 3000);
  }, []);

  const getData = async() => {
    let type =await AsyncStorage.getItem('USER_TYPE')
    if(type != null) {
      if(type=='company') {
        navigation.navigate('DashboardForCompany')
      }else {
        navigation.navigate('JobSearchingNavigator')
      }
  }else{
    navigation.navigate('SelectUser')
  }
  }
  return (
    <View style={styles.container}>
      <Image source={require('../../images/logo.png')} style = {styles.logo}/>
      <Text style={styles.name}>FindMyJob</Text>
      <Text style={styles.slogan}>Post & Find Jobs in One Place</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: BG_COLOR
  },
  logo:{
    width :100,
    height:100
  },
  name: {
    fontSize: 35,
    fontWeight: '600',
    marginTop: '10',
    color: TEXT_COLOR
  },
  slogan: {
    fontSize: 16,
    fontStyle: 'italic',
    position: 'absolute',
    bottom: 80,
    fontWeight: '600'
  }
})

