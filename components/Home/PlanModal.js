import React, { useContext } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Pressable,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import store from '../../store/store';
import colors from '../../constants/colors';

const PlanModal = () => {
    const { toggleModal, setToggleModal } = useContext(store);

    return (
        <Modal
            transparent
            visible={toggleModal}
            animationType="slide"
            onRequestClose={() => setToggleModal(false)}
        >


            <View style={styles.modalContent}>
                <Text style={styles.title}>Plan Details</Text>
                <Text style={styles.bodyText}>Here you can add or view your plan information.</Text>

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setToggleModal(false)}
                >
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        position: 'absolute',
        bottom: 0,
        width: wp(100),
        height: hp(60),
        alignSelf: 'flex-end',
        backgroundColor: colors.six,
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    title: {
        fontSize: hp(2.5),
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
    },
    bodyText: {
        fontSize: hp(2),
        color: colors.text,
        marginBottom: 20,
    },
    closeButton: {
        alignSelf: 'flex-end',
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: colors.primary,
        borderRadius: 6,
    },
    closeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PlanModal;
