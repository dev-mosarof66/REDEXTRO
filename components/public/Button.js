import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import colors from '../../constants/colors'

const ButtonComp = ({onpress,title}) => {
    console.log(title)
    return (

        <View style={{
        }}>
            <Button  color={colors.one} onPress={onpress} title={title} />
        </View>
    )
}

export default ButtonComp

const styles = StyleSheet.create({})