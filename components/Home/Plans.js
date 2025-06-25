import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PlanCard from './PlanCard.js'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState } from 'react';
import colors from '../../constants/colors'





const Items = [
    {
        id: 1, title: "Today"
    },
    {
        id: 2, title: "Upcoming"
    },
    {
        id: 3, title: "Completed"
    },
]

const Plans = () => {


    const [selected, setSelected] = useState(1)


    return (
        <View style={{
            flex: 1,
            marginVertical: wp(3)
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: wp(4)
            }}>
                {
                    Items.map((item, index) => (
                        <TouchableOpacity onPress={() => setSelected(item?.id)} key={index} style={{
                            width: wp(20),
                            backgroundColor: selected === item?.id ? colors.one : colors.four,
                            paddingVertical: hp(1),
                            borderRadius: wp(1)
                        }}>
                            <Text style={{
                                alignSelf: "center",
                                color: selected === item?.id ? colors.three : colors.one,
                                fontSize: wp(4),
                                fontWeight: "bold"
                            }}>{item?.title}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <PlanCard />
        </View>
    )
}

export default Plans

const styles = StyleSheet.create({})