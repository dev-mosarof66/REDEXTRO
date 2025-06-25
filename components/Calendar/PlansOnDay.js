import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import store from '../../store/store';
import colors from '../../constants/colors';



const PlansOnDay = ({ selectedDate }) => {

    const { plans } = useContext(store)
    const [plansInDay, setPlansInDay] = useState([])



    useEffect(() => {
        const plan = plans.filter(plan => plan.startingDate === selectedDate)
        console.log(plan)
        setPlansInDay(plan)
    }, [plans, selectedDate])






    if (!selectedDate) {
        return;
    }



    return (
        <View style={{
            marginHorizontal: wp(2)
        }}>
            <View>
                {
                    plansInDay?.length > 0 ? plansInDay.map((plan, index) => (

                        <View key={index} style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: hp(1),
                            marginVertical: hp(0.2),
                            backgroundColor: plansInDay ? colors.four : "transparent",
                            width: "100%",
                            borderRadius: 8,
                            padding: wp(4)

                        }}>
                            <Text style={{
                                fontSize: wp(4.5),
                                color: plan?.status === 'PAST' ? colors.two : colors.one,
                                fontWeight: "bold",
                                marginRight: wp(1)
                            }}>{index + 1}. </Text>

                            <Text style={{
                                fontSize: wp(4.2),
                                color: plan?.status === 'PAST' ? colors.two : colors.one,
                                fontWeight: "bold"
                            }}>
                                {
                                    plan?.planTitle
                                }
                            </Text>
                        </View>
                    )) : <View>
                        <Text style={{
                            textAlign: "center",
                            fontSize: wp(4.5),
                            color: colors.two
                        }}>
                            No Plans for the day.
                        </Text>
                        <Text style={{
                            textAlign: "center",
                            fontSize: wp(4.5),
                            color: colors.two
                        }}>
                            Click "+" to create your plans.
                        </Text>
                    </View>
                }
            </View>
        </View>
    )
}

export default PlansOnDay

const styles = StyleSheet.create({})