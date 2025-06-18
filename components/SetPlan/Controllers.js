import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Calendar, Clock, Repeat, ScrollText } from 'lucide-react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CalendarComp from '../Calendar/Calendar'
import Context from '../../store/store'



const Controllers = () => {
    const { selectedDate, time } = useContext(Context)
    console.log(time);
    

    const itemList = [
        {
            name: "Due Date",
            Icon: <Calendar size={20} color='gray' />,
            content: selectedDate,
        },
        {
            name: "Time & Reminder",
            Icon: <Clock size={20} color='gray' />,
            content: "NO",

        },
        {
            name: "Repeat Task",
            Icon: <Repeat size={20} color='gray' />,
            content: "NO",
            onpress: () => <CalendarComp />


        },
        {
            name: "Notes",
            Icon: <ScrollText size={20} color='gray' />,
            content: "ADD",
            onpress: () => <CalendarComp />

        }
    ]
    return (
        <View style={{
            paddingVertical: 20,
            paddingHorizontal: 20
        }}>
            <View style={{
                width: "100%",
            }}>
                <View>
                    {
                        itemList?.map((item, index) => (
                            <ItemName key={index} item={item} />
                        ))
                    }
                </View>
            </View>
        </View>
    )
}

const ItemName = ({ item }) => {
    const { setShowCalendar, setTimeModal } = useContext(Context)


    const handleOnpress = () => {
        if (item?.name === "Time & Reminder") {
            setTimeModal(true)
        }
        else if (item?.name === "Repeat Task") {
            console.log("Repeat Task")
        }
        else if (item?.name === 'Due Date') {
            setShowCalendar(true)
        }
    }
    return (
        <TouchableOpacity onPress={handleOnpress} style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: hp(2)

            }}>
                {item?.Icon}
                <Text style={{
                    fontSize: 15,
                    marginLeft: 8,
                    color: "gray"
                }
                } >{item?.name}</Text >
            </View >
            <View style={{
                backgroundColor: "rgba(4, 222, 255, 0.26)",
                padding: hp(0.5),
                paddingHorizontal: 6,
                borderRadius: 5,
                elevation: 10,
                shadowColor: "black"
            }}>
                <Text style={{
                    color: "rgb(57, 57, 57)"
                }}>{item?.content}</Text>
            </View>
        </TouchableOpacity>
    )
}


export default Controllers

const styles = StyleSheet.create({})