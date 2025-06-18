import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Modal, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import store from '../../store/store';

const CustomTimePicker = () => {
    const [showPicker, setShowPicker] = useState(false);
    const { time, setTime, showTimeModal,
        setTimeModal, } = useContext(store)

    const presetTimes = [
        '07:00 AM', '09:00 AM', '10:00 AM',
        '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM',
    ];

    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || new Date();
        setShowPicker(Platform.OS === 'ios');
        setTime(currentTime);
    };

    return (
        <View style={styles.container}>

            <Modal visible={showTimeModal} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Set Time</Text>

                        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.clock}>
                            <Text style={styles.timeText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        </TouchableOpacity>

                        {showPicker && (
                            <DateTimePicker
                                value={time}
                                mode="time"
                                is24Hour={false}
                                display="clock"
                                onChange={handleTimeChange}
                            />
                        )}

                        <View style={styles.presetContainer}>
                            <TouchableOpacity style={styles.presetButton}>
                                <Text>No Time</Text>
                            </TouchableOpacity>
                            {presetTimes.map((preset, index) => (
                                <TouchableOpacity key={index} style={styles.presetButton}>
                                    <Text>{preset}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => setTimeModal(false)}>
                                <Text style={{ color: '#999' }}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setTimeModal(false)}>
                                <Text style={{ color: '#007AFF' }}>DONE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CustomTimePicker;

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    },
    openButton: {
        backgroundColor: '#007AFF', padding: 10, borderRadius: 5,
    },
    buttonText: {
        color: 'white', fontSize: 16,
    },
    modalContainer: {
        flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        backgroundColor: 'white', padding: 20, borderTopLeftRadius: 15, borderTopRightRadius: 15,
    },
    title: {
        fontSize: 18, fontWeight: 'bold', marginBottom: 15,
    },
    clock: {
        alignItems: 'center', marginBottom: 10,
    },
    timeText: {
        fontSize: 32, fontWeight: 'bold',
    },
    presetContainer: {
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 10,
    },
    presetButton: {
        padding: 10, backgroundColor: '#eee', borderRadius: 8, marginVertical: 5, width: '30%', alignItems: 'center',
    },
    actions: {
        flexDirection: 'row', justifyContent: 'space-between', marginTop: 10,
    },
});
