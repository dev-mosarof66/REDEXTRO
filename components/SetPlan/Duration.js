import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Picker } from '@react-native-picker/picker'
import store from '../../store/store'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import colors from '../../constants/colors'

const Duration = () => {
    const { duration, setDuration } = useContext(store)

    const handleHourChange = (value) => {
        setDuration({ ...duration, hours: value })
    }

    const handleMinuteChange = (value) => {
        setDuration({ ...duration, minutes: value })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Set Duration</Text>
            <View style={styles.pickerContainer}>
                <View style={styles.pickerBox}>
                    <Picker
                        selectedValue={duration.hours}
                        onValueChange={handleHourChange}
                        style={styles.picker}
                    >
                        {[...Array(13).keys()].map(hour => (
                            <Picker.Item key={hour} label={`${hour}`} value={hour} />
                        ))}
                    </Picker>
                    <Text style={styles.unit}>h</Text>

                </View>
                <View style={styles.pickerBox}>
                    <Picker
                        selectedValue={duration.minutes}
                        onValueChange={handleMinuteChange}
                        style={styles.picker}
                    >
                        {[0, 5, 10, 15, 20, 30, 45].map(min => (
                            <Picker.Item key={min} label={`${min}`} value={min} />
                        ))}
                    </Picker>
                    <Text style={styles.unit}>m</Text>

                </View>
            </View>
        </View>
    )
}

export default Duration

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: colors.one
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "row",
        gap: 6
    },
    unit: {
        fontSize: 16,
    },
    picker: {
        width: 100,
        height: 80,
    },
})
