import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NODATAFOUND from '../../assets/images/NODATAFOUND.png'
import colors from '../../constants/colors'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'


const NoDataFound = ({ title = 'NO DATA FOUND' }) => {
    return (
        <View style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: wp(6)
        }}>
            <Image style={{
                width: 250,
                height: 250,
                resizeMode: 'contain',
            }} source={NODATAFOUND} />
            <Text style={{
                fontSize: 17,
                color: colors.one,
                fontWeight: 'bold',
            }}>{title}</Text>
        </View>
    )
}

export default NoDataFound

const styles = StyleSheet.create({})