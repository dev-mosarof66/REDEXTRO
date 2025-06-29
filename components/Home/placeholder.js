import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'expo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../constants/colors';

const CardPlaceholder = () => {
    return (
        <View style={styles.card}>
            <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                style={styles.status}
            />
            <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                style={styles.title}
            />
            <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                style={styles.progress}
            />
        </View>
    );
};


export const PlanCardPlaceholder = () => {
    return (
        <View style={{
            width: wp('90%'),
            height: wp('18%'),
            paddingVertical: hp(2),
            paddingHorizontal: hp(2),
            backgroundColor: colors.five,
            borderRadius: 10,
            elevation: 3,
            shadowColor: "#000",
            flexDirection: "row",
            alignItems:"center",
            gap: wp(2)
        }}>
            <View>
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={{
                        height: 25,
                        width: 25,
                        borderRadius: 6,
                    }}
                />
            </View>
            <View style={{
                flexDirection: "column",
                gap: hp(1.5)
            }}>
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={{
                        height: wp(4.5),
                        width: '70%',
                        borderRadius: 6,
                    }}
                />
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={{
                        height: wp(3),
                        width: '60%',
                        borderRadius: 6,
                        marginTop: wp(2),
                    }}
                />
            </View>
        </View>
    )
}

export default CardPlaceholder;

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.one,
        width: wp(50),
        borderRadius: 8,
        padding: wp(3),
        gap: wp(5),
        paddingVertical: wp(6),
    },
    status: {
        alignSelf: 'flex-end',
        height: wp(4),
        width: wp(20),
        borderRadius: 4,
    },
    title: {
        height: wp(6),
        width: wp(30),
        borderRadius: 6,
    },
    progress: {
        height: wp(3),
        width: '100%',
        borderRadius: 6,
        marginTop: wp(2),
    },
});
