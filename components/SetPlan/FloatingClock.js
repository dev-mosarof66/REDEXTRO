import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Modal, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import store from '../../store/store';
import { StringtimeConverter } from '../../utils/timeConverter';
import colors from '../../constants/colors';

const FloatingClock = () => {
    const currTime = new Date();
    const [showPicker, setShowPicker] = useState(false);
    const {
        startingTime, setStartingTime,
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
        setStartingTime(currentTime);
        setSelectedCustomTime('');
    };

    const handleCustomTime = (value) => {
        setSelectedCustomTime(value);
        if (value !== 'No Time') {
            const converted = StringtimeConverter(value);
            setStartingTime(converted);
        } else {
            setStartingTime(new Date());
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

                        <TouchableOpacity onPress={() => setShowPicker(!showPicker)} style={styles.clock}>
                            <Text style={styles.timeText}>
                                {startingTime
                                    ? startingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    : currTime.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                            </Text>
                        </TouchableOpacity>

                        {showPicker && (
                            <DateTimePicker
                                value={startingTime || currTime}
                                mode="time"
                                is24Hour={false}
                                display="default"
                                onChange={handleTimeChange}
                            />
                        )}

                        <View style={styles.presetContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    handleCustomTime('No Time');
                                    setStartingTime(null)
                                }}
                                style={[
                                    styles.presetButton,
                                    {
                                        backgroundColor: selectedCustomTime === 'No Time' ? colors.two : 'transparent',
                                    },
                                ]}
                            >
                                <Text style={{
                                    color: selectedCustomTime === 'No Time' ? colors.four : colors.one,
                                    fontWeight: selectedCustomTime === 'No Time' ? 'bold' : 'semibold'
                                }}>No Time</Text>
                            </TouchableOpacity>
                            {presetTimes.map((preset, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleCustomTime(preset)}
                                    style={[
                                        styles.presetButton,
                                        {
                                            backgroundColor: selectedCustomTime === preset ? colors.two : 'transparent',
                                        },
                                    ]}
                                >
                                    <Text style={{
                                        color: selectedCustomTime === preset ? colors.four : colors.one,
                                        fontWeight: selectedCustomTime === preset ? 'bold' : 'semibold'
                                    }}>{preset}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => setTimeModal(false)}>
                                <Text style={{ color: colors.four }}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setTimeModal(false)}>
                                <Text style={{ color: colors.three }}>DONE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default FloatingClock;

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
        color: colors.two
    },
    clock: {
        alignItems: 'center',
        marginBottom: 10,
    },
    timeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.one
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
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});
