import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useContext } from 'react'
import Category from './Dropdown'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import store from '../../store/store'

const TaskField = ({ title = "Add Your Plan Title Here", category = "No Category" }) => {
    return (
        <View>
            <Category />
            <TaskInput title={title} />
        </View>
    )
}




const TaskInput = ({ title }) => {
    const { setTitle } = useContext(store)
    return (
        <View style={{
            paddingHorizontal: hp(1),
            width: "100%",
        }}>
            <TextInput
                onChangeText={setTitle}
                style={{
                    fontSize: wp(4.5),
                    fontWeight: 'bold',
                    color: "rgb(6, 0, 77)"
                }} placeholder="Add Your Plan Title Here"
                placeholderTextColor='gray' />
        </View>
    )
}




export default TaskField

const styles = StyleSheet.create({})