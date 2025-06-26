import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import store from '../../store/store'
import colors from '../../constants/colors'

const NotificationModal = () => {

    const NotificationType = [
        { id: 1, name: 'Notification' },
        { id: 2, name: 'Alarm' },
        { id: 3, name: 'Notification & Alarm' },
        { id: 4, name: 'Mail' },

    ]


    const { notificationModal, setNotificationModal, setReminderType } = useContext(store)
    const [selectedType, setSelectedType] = useState(NotificationType[0].name)


    const handleClose = () => {
        console.log('in handleclse')
        setReminderType(selectedType)
        setNotificationModal(false)
    }

    return (
        <Modal
            visible={notificationModal}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setNotificationModal(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Set Notification</Text>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: "center",
                        flexWrap: 'wrap',
                        padding: 15,
                        gap: 10
                    }}>
                        {
                            NotificationType.map((item, index) => (
                                <TouchableOpacity onPress={() => setSelectedType(item?.name)} style={{
                                    backgroundColor: selectedType === item.name ? colors.one : colors.five,
                                    padding: 10,
                                    borderRadius: 10,
                                }} key={index}>
                                    <Text style={{
                                        color: selectedType === item.name ? colors.five : colors.one,
                                        fontSize: 15,
                                        fontWeight: selectedType === item.name ? "bold" : 'semibold'

                                    }}>{item?.name}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>








                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.two }]}
                        onPress={handleClose}
                    >
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default NotificationModal

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: colors.four,
        borderRadius: 10,
        padding: 25,
        width: '80%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: "left"
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: colors.one,
        fontWeight: '600',
        fontSize: 15
    },
})
