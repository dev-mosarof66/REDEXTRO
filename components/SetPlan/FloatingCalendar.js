import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Context from '../../store/store'

const FloatingCalendar = () => {
    const { showCalendar, setShowCalendar, startingDate, setStartingDate } = useContext(Context);
    // console.log(startingDate)

    return (
        <View style={styles.container}>
            <Modal transparent visible={showCalendar} animationType="fade">
                <View style={styles.modalBackground}>
                    <View style={styles.calendarWrapper}>
                        <Calendar
                            onDayPress={(day) => {
                                setStartingDate(day.dateString);
                            }}
                            markedDates={{
                                [startingDate]: {
                                    selected: true,
                                    selectedColor: '#4CAF50',
                                    selectedTextColor: '#fff',
                                },
                            }}
                            theme={{
                                selectedDayBackgroundColor: '#4CAF50',
                                arrowColor: '#4CAF50',
                                todayTextColor: '#FF5722',
                            }}
                        />
                        <TouchableOpacity style={styles.closeBtn} onPress={() => setShowCalendar(false)}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        alignItems: 'center',
        flex: 1,
    },
    openBtn: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    openText: {
        color: '#fff',
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarWrapper: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        elevation: 10,
        width: '90%',
    },
    closeBtn: {
        marginTop: 10,
        alignSelf: 'center',
        backgroundColor: '#ddd',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    closeText: {
        fontSize: 14,
    },
    selectedText: {
        marginTop: 20,
        fontSize: 18,
        color: '#4CAF50',
    },
});

export default FloatingCalendar;
