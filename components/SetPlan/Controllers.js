
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import {
    Calendar,
    Clock,
    Repeat,
    ScrollText
} from 'lucide-react-native';
import store from '../../store/store';
import colors from '../../constants/colors';

const Controllers = () => {

    const { startingDate, setShowCalendar, setTimeModal, startingTime, setTaskModalVisible, repeatation, setReminderModal, reminderTime, reminderType, setReminderType, notificationModal, setNotificationModal } = useContext(store)

    return (
        <View style={{
            padding: wp(4),

        }}>
            {/* date  */}
            <TouchableOpacity onPress={() => setShowCalendar(true)} style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: wp(4)
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <Calendar size={20} color={colors.three} />
                    <Text style={{
                        fontSize: wp(4.5),
                        color: colors.two,
                        marginLeft: wp(2)
                    }}>Due Date</Text>
                </View>
                <TouchableOpacity onPress={() => setShowCalendar(true)} style={{
                    backgroundColor: colors.four,
                    paddingVertical: hp(0.5),
                    paddingHorizontal: 8,
                    borderRadius: 5,
                    shadowColor: "black",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.32,
                    elevation: 9
                }}>
                    <Text style={{
                        fontWeight: "bold",
                        color: colors.one
                    }}>{startingDate}</Text>
                </TouchableOpacity>
            </TouchableOpacity>



            <View style={{
                flexDirection: "column",
            }}>
                {/* time  */}
                <TouchableOpacity onPress={() => setTimeModal(true)} style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: hp(2)
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                        <Clock size={20} color={colors.three} />
                        <Text style={{
                            fontSize: wp(4.5),
                            color: colors.two,
                            marginLeft: wp(2)
                        }}>Time & Duration</Text>
                    </View>
                    <TouchableOpacity onPress={() => setTimeModal(true)} style={{
                        backgroundColor: colors.four,
                        paddingVertical: hp(0.5),
                        paddingHorizontal: 8,
                        borderRadius: 5,
                        shadowColor: "black",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.32,
                        shadowRadius: 5.46,

                        elevation: 9,
                    }}>
                        <Text style={{
                            fontWeight: "bold",
                            color: colors.one
                        }}>{startingTime ? startingTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        }) : "No"}</Text>
                    </TouchableOpacity>
                </TouchableOpacity>

                {/* reminder  */}
                {
                    startingTime && <View style={{
                        width: "93%",
                        alignSelf: "flex-end",
                        flexDirection: "column",
                        gap: hp(2),
                        marginBottom: hp(2)
                    }}>
                        {/* reminder time  */}
                        <TouchableOpacity onPress={() => setReminderModal(true)} style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{
                                fontSize: wp(4.5),
                                color: colors.two,
                                marginLeft: wp(2)
                            }}>Reminder at</Text>
                            <Text style={{
                                backgroundColor: colors.four,
                                paddingVertical: hp(0.5),
                                paddingHorizontal: 8,
                                borderRadius: 5,
                                shadowColor: "black",
                                shadowOffset: {
                                    width: 0,
                                    height: 4,
                                },
                                shadowOpacity: 0.32,
                                shadowRadius: 5.46,
                                fontWeight: "bold",
                                color: colors.one,
                                elevation: 9,
                            }}>{
                                    reminderTime ? reminderTime.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }) : "No"
                                }</Text>
                        </TouchableOpacity>
                        {/* reminder type  */}
                        <TouchableOpacity onPress={() => setNotificationModal(true)} style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{
                                fontSize: wp(4.5),
                                color: colors.two,
                                marginLeft: wp(2)
                            }}>Reminder Type</Text>
                            <Text style={{
                                backgroundColor: colors.four,
                                paddingVertical: hp(0.5),
                                paddingHorizontal: 8,
                                borderRadius: 5,
                                shadowColor: "black",
                                shadowOffset: {
                                    width: 0,
                                    height: 4,
                                },
                                shadowOpacity: 0.32,
                                shadowRadius: 5.46,
                                elevation: 9,
                                fontWeight: "bold",
                                color: colors.one
                            }}>
                                {reminderType}

                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>


            {/* repeat task  */}
            <View>
                <TouchableOpacity onPress={() => setTaskModalVisible(true)} style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: wp(4)
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                        <Repeat size={20} color={colors.three} />
                        <Text style={{
                            fontSize: wp(4.5),
                            color: colors.two,
                            marginLeft: wp(2)
                        }}>Repeat Task</Text>
                    </View>

                    {
                        repeatation[0] === 'No Repeat' &&
                        <TouchableOpacity onPress={() => setTaskModalVisible(true)} style={{
                            backgroundColor: colors.four,
                            paddingVertical: hp(0.5),
                            paddingHorizontal: 8,
                            borderRadius: 5,
                            shadowColor: "black",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.32,
                            shadowRadius: 5.46,

                            elevation: 9,
                        }}>
                            <Text style={{
                                fontWeight: "bold",
                                color: colors.one

                            }}>NO</Text>
                        </TouchableOpacity>
                    }
                </TouchableOpacity>
                {
                    repeatation[0] !== 'No Repeat' &&
                    <View style={{
                        width: "80%",
                        margin: "auto",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        flexWrap: "wrap"

                    }}>
                        {
                            repeatation.map((day, index) => (
                                <Text style={{
                                    backgroundColor: '#007AFF',
                                    color: 'white',
                                    padding: 6,
                                    margin: 10,
                                    fontSize: 16,
                                    borderRadius: 5
                                }} key={index}>
                                    {
                                        day
                                    }
                                </Text>
                            ))
                        }
                    </View>
                }
            </View>
        </View>
    )
}

export default Controllers

const styles = StyleSheet.create({})








//         {
//             name: "Repeat Task",
//             Icon: <Repeat size={20} color='gray' />,
//             content: selectedDay[0] === 'No Repeat' ? "NO" : 'Change'
//         },
//         // {
//         //     name: "Notes",
//         //     Icon: <ScrollText size={20} color='gray' />,
//         //     content: "ADD"
//         // }
//     ];

//     return (
//         <View style={styles.container}>
//             <View>
//                 {itemList.map((item, index) => (
//                     <ItemCard key={index} item={item} />
//                 ))}
//             </View>
//         </View>
//     );
// };

// const ItemCard = ({ item }) => {
//     const {
//         setShowCalendar,
//         setTimeModal,
//         setTaskModalVisible,
//         selectedDay
//     } = useContext(Context);

//     const handlePress = () => {
//         if (item.name === "Due Date") setShowCalendar(true);
//         else if (item.name === "Time & Reminder") setTimeModal(true);
//         else if (item.name === "Repeat Task") setTaskModalVisible(true);
//         else if (item.name === "Notes") {
//             // You can implement notes logic here
//         }
//     };

//     const showRepeatDays = item.name === "Repeat Task" && selectedDay[0] !== 'No Repeat';

//     return (
//         <View style={styles.cardWrapper}>
//             <TouchableOpacity style={styles.card} onPress={handlePress}>
//                 <View style={styles.left}>
//                     {item.Icon}
//                     <Text style={styles.label}>{item.name}</Text>
//                 </View>
//                 <View
//                     style={[
//                         styles.rightBox,
//                     ]}
//                 >
//                     <Text style={styles.contentText}>{item.content}</Text>
//                 </View>
//             </TouchableOpacity>

//             {showRepeatDays && (
//                 <View style={styles.repeatDays}>
//                     {selectedDay.map((day, index) => (
//                         <Text key={index} style={styles.repeatDayText}>
//                             {day}
//                         </Text>
//                     ))}
//                 </View>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         paddingVertical: 20,
//         paddingHorizontal: 20
//     },
//     cardWrapper: {
//         width: '100%'
//     },
//     card: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         width: '100%',
//         marginVertical: hp(2)
//     },
//     left: {
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     label: {
//         fontSize: 15,
//         marginLeft: 8,
//         color: 'gray'
//     },
//     rightBox: {
//         backgroundColor: "rgba(4, 222, 255, 0.26)",
//         paddingVertical: hp(0.5),
//         paddingHorizontal: 8,
//         borderRadius: 5,
//         shadowColor: "black",
//         shadowOffset: {
//             width: 0,
//             height: 4,
//         },
//         shadowOpacity: 0.32,
//         shadowRadius: 5.46,

//         elevation: 9,
//     },
//     transparentBox: {
//         backgroundColor: 'transparent',
//         elevation: 0
//     },
//     contentText: {
//         color: 'rgb(57, 57, 57)'
//     },
//     repeatDays: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: "space-around",
//         paddingHorizontal: wp(4),
//         gap: 14
//     },
//     repeatDayText: {
//         color: '#555',
//         fontSize: 13,
//         backgroundColor: '#f1f1f1',
//         paddingHorizontal: 10,
//         paddingVertical: 4,
//         borderRadius: 6
//     }
// });

// export default Controllers;
