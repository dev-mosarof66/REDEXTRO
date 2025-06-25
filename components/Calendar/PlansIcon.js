import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const PlansIcon = ({ handlePlusIcon }) => {

    return (
        <TouchableOpacity
            style={styles.fabContainer}
            onPress={handlePlusIcon}
            accessibilityLabel="Add Plan"
            accessible={true}
        >
            <View style={styles.iconWrapper}>
                <Entypo name='plus' size={30} color='white' />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    fabContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
        zIndex: 999
    },
    iconWrapper: {
        padding: wp(3),
        backgroundColor: "#0077B6",
        borderRadius: wp(10)
    }
});

export default PlansIcon
