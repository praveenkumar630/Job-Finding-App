import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { BG_COLOR, TEXT_COLOR } from '../utils/Colors'

const CustomSolidBtn = ({title, onclick}) => {
  return (
    <TouchableOpacity style = {styles.btn} onPress={() =>{
      onclick()
    }}>
        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
    
  )
}

export default CustomSolidBtn
const styles = StyleSheet.create({
    btn: {
        width: '90%',
        height: 50,
        backgroundColor: TEXT_COLOR,
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: BG_COLOR,
        fontWeight: '500',
        fontSize: 16,
    },
});