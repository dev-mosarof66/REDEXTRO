import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import store from '../../store/store';

const TaskRepeater = () => {
    const { TaskmodalVisible,
        setTaskModalVisible, selectedDay, setSelectedDay } = useContext(store)
    // console.log(selectedDay);


    const daysInWeek = [
        'No Repeat',
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ];

    const handleSelect = (day) => {


        // if (day === 'Every Day') {
        //     setSelectedDay(['Sun',
        //         'Mon',
        //         'Tue',
        //         'Wed',
        //         'Thu',
        //         'Fri',
        //         'Sat',])
        // }

        if (day === 'No Repeat')
            setSelectedDay([day]);
        else {
            if (selectedDay[0] === 'No Repeat') {
                selectedDay.pop();
            }

            const isDayExist = selectedDay.find(t => t === day);


            if (!isDayExist) {
                setSelectedDay([...selectedDay, day]);
            } else {
                setSelectedDay(selectedDay.filter(t => t !== day));
            }

        }
    };

    return (
        <View style={styles.centeredContainer}>
            <Modal transparent={true} visible={TaskmodalVisible} animationType="slide">
                <View style={styles.modalBackground}>
                    <TouchableOpacity
                        style={styles.backdrop}
                        onPress={() => setTaskModalVisible(false)}
                    />
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Repeat Task</Text>
                        <View style={styles.daysContainer}>
                            {daysInWeek.map((day) => {
                                const isSelected = selectedDay.includes(day);
                                return (
                                    <TouchableOpacity
                                        key={day}
                                        style={[
                                            styles.dayButton,
                                            isSelected && styles.selectedDayButton,
                                        ]}
                                        onPress={() => handleSelect(day)}
                                    >
                                        <Text
                                            style={[
                                                styles.dayText,
                                                isSelected && styles.selectedDayText,
                                            ]}
                                        >
                                            {day}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    modalBackground: {
        width: wp(100),
        height: hp(100),
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.68)',

    },
    backdrop: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: 'white',
        width: wp(100),
        height: hp(60),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        textAlign: 'center',
    },
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    dayButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#f2f2f2',
        margin: 5,
    },
    selectedDayButton: {
        backgroundColor: '#4a90e2',
    },
    dayText: {
        fontSize: 14,
        color: '#333',
    },
    selectedDayText: {
        color: 'white',
        fontWeight: '600',
    },
});

export default TaskRepeater;
