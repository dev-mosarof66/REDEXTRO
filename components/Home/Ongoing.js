import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Progress from './ProgressBar';
import colors from '../../constants/colors';
import { planStatus, progressStatus } from '../../utils/timeConverter';
import store from '../../store/store';
import NoDataFound from './NoDataFound';
import CardPlaceholder, { OngoingPlanPlaceholder } from './placeholder';
import Loader from '../Loader';

const Ongoing = ({ todaysPlans, setTodaysPlan }) => {
    const [ongoingPlans, setOngoingPlans] = useState([]);
    const { plans, setPlans, user } = useContext(store);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (todaysPlans.length > 0) {
            setLoading(true);
            const interval = setInterval(() => {
                const ongoing = [];

                for (let itr = 0; itr < todaysPlans.length; itr++) {
                    const plan = todaysPlans[itr];
                    const response = planStatus(plan?.startingTime, plan?.duration);

                    if (response === 'Ongoing') {
                        ongoing.push(plan);
                    } else if (response === 'Completed') {
                        const checkedPlan = { ...plan, status: 'PAST' };

                        setTodaysPlan((prev) => prev.filter(t => t._id !== plan._id).concat(checkedPlan));
                        setPlans((prev) => prev.filter(t => t._id !== plan._id).concat(checkedPlan));
                    }
                }

                setOngoingPlans(ongoing);
                setLoading(false);
            }, 3000);

            return () => clearInterval(interval);
        } else {
            setOngoingPlans([]);
        }
    }, [todaysPlans, plans]);

    return (
        <View style={styles.wrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={[styles.container, {
                    justifyContent: ongoingPlans.length > 0 || loading ? 'flex-start' : 'center',
                    alignItems: 'center',
                }]}>
                    {
                        loading ? (
                            <View style={styles.container}>
                                <CardPlaceholder />
                                <CardPlaceholder />
                            </View>
                        ) : ongoingPlans.length > 0 ? (
                            ongoingPlans.map((plan, index) => (
                                <Card plan={plan} key={plan._id || index} />
                            ))
                        ) : (
                            <View style={{
                                width:wp(90),
                                height:hp(40),
                            }}>
                                <NoDataFound title='NO ONGOING PLANS FOUND' />
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    );
};

const Card = ({ plan }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const res = progressStatus(plan?.startingTime, plan?.duration);
            setProgress(res);
        }, 1000);

        return () => clearInterval(interval);
    }, [plan]);

    return (
        <View style={styles.card}>
            <View style={styles.statusLabel}>
                <Text style={styles.statusText}>ONGOING</Text>
            </View>
            <View>
                <Text style={styles.titleText}>
                    {plan?.planTitle?.length > 10 ? plan.planTitle.slice(0, 10) + '...' : plan?.planTitle || 'Untitled'}
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
    wrapper: {
        flexDirection: 'row',
        width: wp(90),
        height: hp(28),
    },
    container: {
        flexDirection: 'row',
        gap: wp(4),
        width: '100%',
        paddingVertical: hp(2),
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
});
