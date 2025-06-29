import * as React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import colors from '../constants/colors';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const Loader = () => {
    return (
        <View style={{
            flex: 1,
            width:widthPercentageToDP(100),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#CAF0F8",
        }}>
            <ActivityIndicator size="large" color={colors.one || "#007BFF"} style={styles.loader} />

        </View>
    )
}

export default Loader


const styles = StyleSheet.create({
    loader: {
        marginTop: 20,
    },
})