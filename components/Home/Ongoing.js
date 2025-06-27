import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Progress from './ProgressBar';
import colors from '../../constants/colors';
import { planStatus, progressStatus } from '../../utils/timeConverter';
import store from '../../store/store';

const Ongoing = ({ todaysPlans, setTodaysPlan }) => {
    const [ongoingPlans, setOngoingPlans] = useState([]);
    const { plans } = useContext(store)

    useEffect(() => {
        const interval = setInterval(() => {
            const ongoing = [];
            for (let itr = 0; itr < todaysPlans?.length; itr++) {
                const plan = todaysPlans[itr];
                const response = planStatus(plan?.startingTime, plan?.duration);
                if (response === 'Ongoing') {
                    ongoing.push(plan);
                }
                else if (response === 'Completed') {
                    setTodaysPlan((prevPlans) => {
                        const updated = prevPlans.filter(t => t._id !== plan._id);
                        const checkedPlan = {
                            ...plan,
                            checked: true,
                            status: 'COMPLETED', // optional, if you want to update status
                        };
                        return [...updated, checkedPlan];
                    });
                }
            }
            setOngoingPlans(ongoing);
        }, 1000);

        return () => clearInterval(interval);
    }, [todaysPlans, plans]);

    // console.log(todaysPlans)

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                {ongoingPlans?.length > 0 ? (
                    ongoingPlans.map((plan, index) => (
                        <Card plan={plan} key={plan._id || index} />
                    ))
                ) : (
                    <View style={styles.noPlanContainer}>
                        <Text style={styles.noPlanText}>No Ongoing Plans Right Now</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const Card = ({ plan }) => {

    const [progress, setProgress] = useState(0)

    useEffect(() => {

        const interval = setInterval(() => {
            const res = progressStatus(plan?.startingTime, plan?.duration)
            setProgress(res)
        }, 1000);

        return () => clearInterval(interval);
    }, [plan])

    return (
        <View style={styles.card}>
            <View style={styles.statusLabel}>
                <Text style={styles.statusText}>ONGOING</Text>
            </View>
            <View>
                <Text style={styles.titleText}>
                    {plan?.planTitle.length > 30 ? plan?.planTitle.slice(0, 30) + '...' : plan?.planTitle}
                </Text>
            </View>
            <View style={styles.progressContainer}>
                <Progress parcentage={progress} />
            </View>
        </View>
    );
};

export default Ongoing;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: wp(4),
        paddingVertical: wp(3),
        minHeight: hp(30),
    },
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
    statusLabel: {
        alignSelf: 'flex-end',
    },
    statusText: {
        fontSize: wp(4),
        color: colors.four,
    },
    titleText: {
        fontSize: wp(6),
        color: '#CAF0F8',
        fontWeight: 'bold',
    },
    progressContainer: {
        flexDirection: 'row',
        marginBottom: wp(2),
    },
    noPlanContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(80),
    },
    noPlanText: {
        color: colors.two,
        fontSize: wp(4),
    },
});
