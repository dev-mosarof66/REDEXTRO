import { View, Text, StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from "../../constants/colors";



export const OngoingPlanPlaceholder = () => {
    return (
        <View style={styles.card}>
        </View>

    )
}


const styles = StyleSheet.create({

    card: {
        backgroundColor: colors.one,
        width: wp(50),
        padding: wp(3),
        borderRadius: 8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: wp(5),
        paddingVertical: wp(6),
    },

});
