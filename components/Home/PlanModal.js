import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Button,
    ToastAndroid,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import store from '../../store/store';
import colors from '../../constants/colors';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axiosInstance from '../../axios/axios'
import { useNavigation } from '@react-navigation/native';
import { toast } from '@backpackapp-io/react-native-toast';

const PlanModal = () => {
    const navigation = useNavigation()
    const { toggleModal, setToggleModal, selectedPlan, plans, setPlans } = useContext(store);

    if (!selectedPlan) return null;


    const handlePlanDelete = async () => {
        console.log(selectedPlan)
        await axiosInstance.delete(`/plans/delete/${selectedPlan?._id}`).then((res) => {
            console.log(res.data)
            setPlans(plans.filter((plan) => plan._id !== selectedPlan._id))
            toast.success(
                'Plan deleted successfully',
                {
                    position: 'top',
                    duration: 3000,
                }
            )
            setToggleModal(false)
        }).catch((error) => {
            console.log(error?.response)
            if (error?.response?.status === 500) {
                navigation.push("Error")
            }
            if (error?.response?.status === 401) {
                toast.error(
                    'You are not authorized to delete this plan',
                    {
                        position: 'top',
                        duration: 3000,
                    }
                )
            }
            if (error?.response?.status === 402) {
                toast.error(
                    'This plan is not available',
                    {

                        duration: 3000,
                        position: "top"
                    }
                )
            }
        })
    }


    return (
        <Modal
            transparent
            visible={toggleModal}
            animationType="slide"
            onRequestClose={() => setToggleModal(false)}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <View style={
                        {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }
                    }>
                        <Text style={styles.title}>Plan Description</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setToggleModal(false)}
                        >
                            <FontAwesome name='times' size={19} color={colors.four} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        padding: 10
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <Text style={styles.planTitle}>{selectedPlan.planTitle}</Text>
                            <View style={{
                                flexDirection: 'column',
                                gap: hp(1),
                                alignItems: "center"
                            }}>
                                <Text style={{
                                    fontSize: hp(1.8),
                                    color: colors.three,
                                    fontWeight: "bold",
                                    alignSelf: "flex-end"
                                }}> {selectedPlan.category} </Text>
                                <Text style={{
                                    fontSize: hp(1.6),
                                    color: colors.four,
                                    marginBottom: hp(1),
                                    marginRight: wp(4)
                                }}>{selectedPlan.status === 'PAST' ? <Feather name='check-circle' size={20} /> : selectedPlan.status}</Text>
                            </View>
                        </View>


                        <Text style={styles.label}>{selectedPlan.status === 'PAST' || selectedPlan.status === 'PAST' ? "Started On" : "Start Time"}:</Text>
                        <Text style={styles.value}>
                            {moment(selectedPlan.startingTime).format('MMMM Do YYYY, h:mm A')}
                        </Text>

                        <Text style={styles.label}>Duration:</Text>
                        <Text style={styles.value}>
                            {selectedPlan?.duration.hours}h {selectedPlan.duration.minutes}m
                        </Text>



                        <Text style={styles.label}>Reminder Type:</Text>
                        <Text style={styles.value}>{selectedPlan.reminderType}</Text>

                        <Text style={styles.label}>Reminder Time:</Text>
                        <Text style={styles.value}>
                            {moment(selectedPlan.reminderTime).format('MMMM Do YYYY, h:mm A')}
                        </Text>

                        {selectedPlan.Notes ? (
                            <>
                                <Text style={styles.label}>Notes:</Text>
                                <Text style={styles.value}>{selectedPlan.Notes}</Text>
                            </>
                        ) : null}

                        <View style={{
                            marginTop: hp(2)
                        }}>
                            <Button onPress={handlePlanDelete} title='DELETE' color={colors.three} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default PlanModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        width: wp(100),
        height: hp(55),
        backgroundColor: colors.six,
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        padding: wp(5),
    },
    title: {
        fontSize: hp(3),
        fontWeight: 'bold',
        color: colors.one,
        marginBottom: hp(1),
    },
    planTitle: {
        fontSize: hp(2.8),
        fontWeight: 'bold',
        color: colors.one,
        marginBottom: hp(1),
        width: "70%",

    },
    label: {
        fontSize: hp(2.4),
        fontWeight: 'bold',
        color: colors.one,
        marginTop: hp(1),
    },
    value: {
        fontSize: hp(1.9),
        color: colors.four,
        marginBottom: hp(1),
    },
    closeButton: {
        alignSelf: 'center',
        backgroundColor: colors.primary,
        borderRadius: wp(2),
    },
    closeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: hp(2),
    },
});
