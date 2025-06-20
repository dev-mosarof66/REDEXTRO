import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Modal, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import store from '../../store/store';
import { StringtimeConverter } from '../../utils/timeConverter';

const CustomTimePicker = () => {
    const currTime = new Date();
    const [showPicker, setShowPicker] = useState(false);
    const {
        time,
        setTime,
        showTimeModal,
        setTimeModal
    } = useContext(store);

    const [selectedCustomTime, setSelectedCustomTime] = useState('No Time');

    const presetTimes = [
        '07:00 AM', '09:00 AM', '10:00 AM',
        '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM',
    ];


    const handleTimeChange = (event, selectedTime) => {
        if (event.type === 'dismissed') return;
        const currentTime = selectedTime || currTime;
        setShowPicker(Platform.OS === 'ios');
        setTime(currentTime);
        setSelectedCustomTime(''); // Deselect any custom preset
    };

    const handleCustomTime = (value) => {
        setSelectedCustomTime(value);
        if (value !== 'No Time') {
            const converted = StringtimeConverter(value);
            setTime(converted);
        } else {
            setTime(new Date());
        }
        setShowPicker(false);
    };

    return (
        <View style={styles.container}>
            <Modal
                visible={showTimeModal}
                transparent
                animationType="slide"
                onRequestClose={() => setTimeModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Set Time</Text>

                        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.clock}>
                            <Text style={styles.timeText}>
                                {time
                                    ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    : currTime.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                            </Text>
                        </TouchableOpacity>

                        {showPicker && (
                            <DateTimePicker
                                value={time || currTime}
                                mode="time"
                                is24Hour={false}
                                display="default"
                                onChange={handleTimeChange}
                            />
                        )}

                        <View style={styles.presetContainer}>
                            <TouchableOpacity
                                onPress={() => handleCustomTime('No Time')}
                                style={[
                                    styles.presetButton,
                                    {
                                        borderColor: selectedCustomTime === 'No Time' ? '#007AFF' : 'transparent',
                                        borderWidth: 2,
                                    },
                                ]}
                            >
                                <Text style={styles.presetText}>No Time</Text>
                            </TouchableOpacity>
                            {presetTimes.map((preset, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleCustomTime(preset)}
                                    style={[
                                        styles.presetButton,
                                        {
                                            borderColor: selectedCustomTime === preset ? '#007AFF' : 'transparent',
                                            borderWidth: 2,
                                        },
                                    ]}
                                >
                                    <Text style={styles.presetText}>{preset}</Text>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    clock: {
        alignItems: 'center',
        marginBottom: 10,
    },
    timeText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    presetContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    presetButton: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 8,
        marginVertical: 5,
        width: '30%',
        alignItems: 'center',
    },
    presetText: {
        fontSize: 14,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});
