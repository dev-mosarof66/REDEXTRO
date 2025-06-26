import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    Modal,
    StyleSheet,
    ScrollView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import store from '../../store/store';
import { StringtimeConverter } from '../../utils/timeConverter';
import colors from '../../constants/colors';
import Duration from './Duration';

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

                        <View>
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
                                        setStartingTime(null);
                                    }}
                                    style={[
                                        styles.presetButton,
                                        {
                                            backgroundColor: selectedCustomTime === 'No Time' ? colors.two : 'transparent',
                                        },
                                    ]}
                                >
                                    <Text style={[
                                        styles.presetText,
                                        {
                                            color: selectedCustomTime === 'No Time' ? colors.four : colors.one,
                                            fontWeight: selectedCustomTime === 'No Time' ? 'bold' : '600',
                                        }
                                    ]}>No Time</Text>
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
                                        <Text style={[
                                            styles.presetText,
                                            {
                                                color: selectedCustomTime === preset ? colors.four : colors.one,
                                                fontWeight: selectedCustomTime === preset ? 'bold' : '600',
                                            }
                                        ]}>
                                            {preset}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View>
                            <Duration />
                        </View>

                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => setTimeModal(false)}>
                                <Text style={styles.cancel}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setTimeModal(false)}>
                                <Text style={styles.done}>DONE</Text>
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
        height: hp(100),
    },
    modalContainer: {
        height: hp(100),
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        height: hp('60%'),
        backgroundColor: colors.five,
        padding: wp('5%'),
        borderTopLeftRadius: wp('5%'),
        borderTopRightRadius: wp('5%'),
        flexDirection: "column",
        justifyContent: 'space-between'
    },
    scrollContent: {
        paddingBottom: hp('5%'),
    },
    title: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        marginBottom: hp('1.5%'),
        color: colors.two,
    },
    clock: {
        alignItems: 'center',
        marginBottom: hp('1.5%'),
    },
    timeText: {
        fontSize: wp('8%'),
        fontWeight: 'bold',
        color: colors.one,
    },
    presetContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: hp('1%'),
    },
    presetButton: {
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('3%'),
        backgroundColor: '#eee',
        borderRadius: wp('2%'),
        marginVertical: hp('0.5%'),
        width: '30%',
        alignItems: 'center',
    },
    presetText: {
        fontSize: wp('3.5%'),
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp('2%'),
    },
    cancel: {
        color: colors.four,
        fontSize: wp('4%'),
    },
    done: {
        color: colors.three,
        fontSize: wp('4%'),
    },
});
