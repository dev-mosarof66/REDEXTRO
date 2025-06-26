import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    Platform,
    Button,
} from 'react-native'
import React, { useContext, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import store from '../../store/store'
import colors from '../../constants/colors'
import { calculateReminderTime } from '../../utils/timeConverter'

const Reminder = () => {

    const remiderTime = [
        { id: 1, time: 5 },
        { id: 2, time: 15 },
        { id: 3, time: 30 },
        { id: 4, time: 60 }, //in minutes
    ]


    const { reminderModal, setReminderModal, setReminderTime, reminderType, setReminderType, startingTime } = useContext(store)
    const [time, setTime] = useState(remiderTime[0].time)




    const handleClose = () => {
        console.log('in handleclse')
        const reminder = calculateReminderTime(startingTime, time)
        console.log(reminder)
        setReminderTime(reminder)
        setReminderModal(false)
    }


    return (
        <Modal
            visible={reminderModal}
            transparent={true}
            animationType='slide'
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Set a Reminder</Text>


                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 20
                    }}>
                        <Text style={{
                            fontSize: 20,
                            color: colors.one,
                        }}>{time} minutes before</Text>
                    </View>


                    <View style={{
                        flexDirection: "row",
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        alignItems: "center"
                    }}>
                        {
                            remiderTime.map((item, index) => (
                                <TouchableOpacity onPress={() => setTime(item?.time)} key={index} style={{
                                    backgroundColor: time === item?.time ? colors.one : colors.three,
                                    width: 60,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 10,
                                    borderRadius: 10
                                }}>
                                    <Text style={{
                                        color: time === item?.time ? colors.four : colors.one,
                                        fontSize: 14
                                    }}>{item?.time}</Text>
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

export default Reminder

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalContent: {
        backgroundColor: colors.five,
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.one,
    },
    timeText: {
        fontSize: 16,
        marginBottom: 10,
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
    },
})
