import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useContext } from 'react'
import Category from './Dropdown'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import store from '../../store/store'
import colors from '../../constants/colors'




const TaskInput = () => {
    const { setPlanTitle, planTitle } = useContext(store)
    return (
        <View style={{
            paddingHorizontal: hp(1),
            width: "100%",
        }}>
            <TextInput
                onChangeText={setPlanTitle}
                value={planTitle}
                style={{
                    fontSize: wp(5),
                    fontWeight: 'bold',
                    color: colors.one
                }} placeholder="Add Your Plan Title Here"
                placeholderTextColor={colors.four} />
        </View>
    )
}




export default TaskInput

const styles = StyleSheet.create({})