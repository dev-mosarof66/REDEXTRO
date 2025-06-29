import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PlanCard from './PlanCard.js'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useEffect, useState } from 'react';
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

const Plans = ({ upcomingPlans, completedPlan, todaysPlan }) => {


    const [selected, setSelected] = useState(1)
    const [renderedPlans, setRenderedPlans] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (selected === 1) {
            setRenderedPlans(todaysPlan)
        }
        else if (selected === 2) {
            setRenderedPlans(upcomingPlans)
        }
        else if (selected === 3) {
            setRenderedPlans(completedPlan)
        }

    }, [upcomingPlans, todaysPlan, completedPlan, selected])


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, [4000])
    }, [selected])


    return (
        <View style={{
            flex: 1,
            marginVertical: wp(3),
            marginHorizontal: wp(1)
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
            <PlanCard renderedPlans={renderedPlans} loading={loading}/>
        </View>
    )
}

export default Plans
