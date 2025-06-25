import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native'

const Loader = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#CAF0F8",
        }}>
            <ActivityIndicator animating={true} color={MD2Colors.red800} />

        </View>
    )
}

export default Loader


const styles = StyleSheet.create({})