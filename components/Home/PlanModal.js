import React, { useContext } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import store from '../../store/store';
import colors from '../../constants/colors';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather'

const PlanModal = () => {
    const { toggleModal, setToggleModal, selectedPlan } = useContext(store);
    // console.log(selectedPlan)

    if (!selectedPlan) return null;

    return (
        <Modal
            transparent
            visible={toggleModal}
            animationType="slide"
            onRequestClose={() => setToggleModal(false)}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Plan Description</Text>
                    <View style={{
                        padding: 10
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: "center"
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                gap: 2,
                                width:"70%",
                            }}>
                                <Text style={styles.planTitle}>{selectedPlan.planTitle}</Text>
                                <Text style={{
                                    fontSize: hp(1.6),
                                    color: colors.three,
                                    marginBottom: hp(1),
                                    fontWeight: "bold"
                                }}>( {selectedPlan.category} )</Text>
                            </View>
                            <Text style={{
                                fontSize: hp(1.6),
                                color: colors.four,
                                marginBottom: hp(1),
                            }}>{selectedPlan.status === 'PAST' ? <Feather name='check-circle' size={20} /> : selectedPlan.status}</Text>
                        </View>

                        <Text style={styles.label}>Category:</Text>

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

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setToggleModal(false)}
                        >
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
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
        height: hp(65),
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
        marginTop: hp(3),
        alignSelf: 'center',
        paddingVertical: hp(1),
        paddingHorizontal: wp(10),
        backgroundColor: colors.primary,
        borderRadius: wp(2),
    },
    closeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: hp(2),
    },
});
