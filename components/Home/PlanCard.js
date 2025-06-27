import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import CheckPlan from './CheckPlan';
import store from '../../store/store';
import timeConverter, { calculateEndingTime } from '../../utils/timeConverter';


const PlanCard = ({ renderedPlans }) => {



  return (
    <View style={{
      flexDirection: "column",
      gap: 10,
      paddingVertical: hp(4)
    }}>

      {
        renderedPlans?.length > 0 ? renderedPlans.map((plan, index) => (
          <Card key={index} plan={plan} />
        )) : <Text>No Plans</Text>
      }
    </View>
  )
}


const Card = ({ plan }) => {
  const { setSelectedPlan, setToggleModal } = useContext(store)
  const [endingTime, setEndingTime] = useState('')
  const [startingTime, setStartingTime] = useState('')
  // console.log(plan)

  useEffect(() => {
    const endTime = calculateEndingTime(plan?.startingTime, plan?.duration).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    const startTime = timeConverter(plan?.startingTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    setEndingTime(endTime)
    setStartingTime(startTime)
  }, [plan])

  return (
    <TouchableOpacity onPress={() => { setToggleModal(true); setSelectedPlan(plan) }} style={{
      backgroundColor: colors.five,
      padding: 10,
      paddingVertical: hp(2),
      borderRadius: 10,
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { x: 0, y: 2 },
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        gap: wp(2)
      }}>
        <FontAwesome5 name='clipboard-list' size={24} color={colors.two} />
        <View>
          <Text style={{
            fontSize: wp(5),
            color: colors.primary,
            fontWeight: "bold"
          }}>{plan?.planTitle.length > 25 ? plan?.planTitle.slice(0, 25) + "..." : plan?.planTitle}</Text>
          <View >
            {
              plan && <View>
                <Text style={{
                  fontSize: wp(3.5),
                  color: colors.three,
                  fontWeight: "bold"
                }}>{startingTime} - {endingTime}</Text>
              </View>
            }
          </View>
        </View>
      </View>
      <View>
        <CheckPlan checked={plan?.checked} />
      </View>
    </TouchableOpacity>
  )
}

export default PlanCard

const styles = StyleSheet.create({})