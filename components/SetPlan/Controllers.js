import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React, {
    useContext,
    useEffect,
    useState
} from 'react';
import {
    Calendar,
    Clock,
    Repeat,
    ScrollText
} from 'lucide-react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import Context from '../../store/store';

const Controllers = () => {
    const { selectedDate, time, selectedDay } = useContext(Context);
    const [Time, setTimeFormatted] = useState('');

    useEffect(() => {
        if (time) {
            const formatted = time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
            setTimeFormatted(formatted);
        }
    }, [time]);

    const itemList = [
        {
            name: "Due Date",
            Icon: <Calendar size={20} color='gray' />,
            content: selectedDate || "Not Set"
        },
        {
            name: "Time & Reminder",
            Icon: <Clock size={20} color='gray' />,
            content: Time || "NO"
        },
        {
            name: "Repeat Task",
            Icon: <Repeat size={20} color='gray' />,
            content: selectedDay[0] === 'No Repeat' ? "NO" : 'Change'
        },
        // {
        //     name: "Notes",
        //     Icon: <ScrollText size={20} color='gray' />,
        //     content: "ADD"
        // }
    ];

    return (
        <View style={styles.container}>
            <View>
                {itemList.map((item, index) => (
                    <ItemCard key={index} item={item} />
                ))}
            </View>
        </View>
    );
};

const ItemCard = ({ item }) => {
    const {
        setShowCalendar,
        setTimeModal,
        setTaskModalVisible,
        selectedDay
    } = useContext(Context);

    const handlePress = () => {
        if (item.name === "Due Date") setShowCalendar(true);
        else if (item.name === "Time & Reminder") setTimeModal(true);
        else if (item.name === "Repeat Task") setTaskModalVisible(true);
        else if (item.name === "Notes") {
            // You can implement notes logic here
        }
    };

    const showRepeatDays = item.name === "Repeat Task" && selectedDay[0] !== 'No Repeat';

    return (
        <View style={styles.cardWrapper}>
            <TouchableOpacity style={styles.card} onPress={handlePress}>
                <View style={styles.left}>
                    {item.Icon}
                    <Text style={styles.label}>{item.name}</Text>
                </View>
                <View
                    style={[
                        styles.rightBox,
                    ]}
                >
                    <Text style={styles.contentText}>{item.content}</Text>
                </View>
            </TouchableOpacity>

            {showRepeatDays && (
                <View style={styles.repeatDays}>
                    {selectedDay.map((day, index) => (
                        <Text key={index} style={styles.repeatDayText}>
                            {day}
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    cardWrapper: {
        width: '100%'
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: hp(2)
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        fontSize: 15,
        marginLeft: 8,
        color: 'gray'
    },
    rightBox: {
        backgroundColor: "rgba(4, 222, 255, 0.26)",
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
    },
    transparentBox: {
        backgroundColor: 'transparent',
        elevation: 0
    },
    contentText: {
        color: 'rgb(57, 57, 57)'
    },
    repeatDays: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-around",
        paddingHorizontal: wp(4),
        gap: 14
    },
    repeatDayText: {
        color: '#555',
        fontSize: 13,
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6
    }
});

export default Controllers;
