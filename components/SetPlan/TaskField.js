import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import Category from './Dropdown'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const TaskField = ({ title = "Add Your Plan Title Here", category = "No Category" }) => {
    return (
        <View>
            <Category />
            <TaskInput title={title} />
        </View>
    )
}




const TaskInput = ({ title }) => {
    return (
        <View style={{
            paddingHorizontal: hp(1),
            width: "100%",
        }}>
            <TextInput style={{
                fontSize: wp(4.5),
                fontWeight: 'bold',
                color: "rgb(6, 0, 77)"
            }} placeholder={title}
                placeholderTextColor='gray' />
        </View>
    )
}




export default TaskField

const styles = StyleSheet.create({})