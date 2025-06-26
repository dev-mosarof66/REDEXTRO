import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../../constants/colors'

const Button = ({ title, onPress }) => {
    return (
        <View style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
            position: "absolute",
            bottom: 40,
            width: "100%",
            left: 15
        }}>
            <TouchableOpacity onPress={onPress} style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.two,
                width: "90%",
                padding: 10,
                borderRadius: 5
            }}>
                <Text style={{
                    color: colors.one,
                    fontSize: 17,
                    fontWeight: "bold"
                }}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button
