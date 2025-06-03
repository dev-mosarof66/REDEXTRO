import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Entypo from 'react-native-vector-icons/Entypo'
import { months } from './month'
import { ScrollView } from 'react-native'


const CALENDAR = () => {
    const [month, setMonth] = useState({
        name: months[0].name,
        days: months[0].days
    })

    const findIndex = (month) => {
        for (let i = 0; i < months.length; i++) {
            if (month === months[i].name) {
                return i;
            }
        }
    }

    const handleNextMonth = () => {
        let index = findIndex(month.name)
        index++;
        console.log(index);

        setMonth({
            name: months[index].name,
            days: months[index].days
        })

    }
    const handlePreviousMonth = () => {
        let index = findIndex(month.name)
        index--;
        console.log(index);

        setMonth({
            name: months[index].name,
            days: months[index].days
        })

    }
    return (
        <ScrollView>
            <View style={{
                width: '100%',
                height: hp(40),
                borderWidth: 1,
                borderColor: "green",
            }}>

                <Header handleNextMonth={handleNextMonth} handlePreviousMonth={handlePreviousMonth} month={month} />
                <View style={{
                    width: "100%",
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(246, 19, 19, 0.34)'
                }} />
                <View>
                    <Calendar days={month.days} />
                </View>


            </View>

        </ScrollView >
    )
}

const Header = ({ month, handleNextMonth, handlePreviousMonth }) => {
    return (
        <View style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: wp(3),
            paddingVertical: wp(2)

        }}>
            <TouchableOpacity onPress={handlePreviousMonth}>
                <Entypo name='chevron-left' size={23} />
            </TouchableOpacity>
            <View>
                <Text style={{
                    fontSize: wp(4.2),
                    fontWeight: "bold",
                    color: "green"
                }}>{month.name} 2025</Text>
            </View>
            <TouchableOpacity onPress={handleNextMonth}>
                <Entypo name='chevron-right' size={23} />
            </TouchableOpacity>
        </View>)
}

const Calendar = ({ days }) => {
    const [daysInMonth, setDaysInMonth] = useState([]);

    useEffect(() => {
        for (let i = 0; i < days; i++) {
            let arr = [...daysInMonth].push(i + 1);
            setDaysInMonth(arr)
        }
    }, [])
    return (
        <View>
            {
                daysInMonth.length > 0 && daysInMonth.map((day, index) => (
                    <Text key={index}>{day}</Text>
                ))
            }
        </View>
    )
}

export default CALENDAR

const styles = StyleSheet.create({})