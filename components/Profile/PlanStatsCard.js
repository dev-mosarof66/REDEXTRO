import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../constants/colors';

const PlanStatsCard = ({ plans }) => {
    const totalPlans = plans.length;
    const completedTasks = plans.filter(plan => plan.status === 'PAST').length;

    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: hp(2.5),
                color: colors.one,
                marginBottom: hp(1.5),
                fontWeight: "bold"
            }}>Plans Overview</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems:"center"
            }}>
                <View style={styles.card}>
                    <Text style={styles.title}>Total Plans</Text>
                    <Text style={styles.value}>{totalPlans}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.title}>Completed Tasks</Text>
                    <Text style={styles.value}>{completedTasks}</Text>
                </View>
            </View>
        </View>
    );
};

export default PlanStatsCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: hp(2),
    },
    card: {
        backgroundColor: colors.five,
        padding: wp(4),
        borderRadius: 12,
        width: wp(42),
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    title: {
        fontSize: wp(4),
        color: colors.two,
        fontWeight: '600',
        marginBottom: hp(0.5),
    },
    value: {
        fontSize: wp(6),
        color: colors.three,
        fontWeight: 'bold',
    },
});
