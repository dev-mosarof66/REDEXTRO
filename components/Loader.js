import * as React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import colors from '../constants/colors';

const Loader = () => {
    return (
        <View style={{
            flex: 1,
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