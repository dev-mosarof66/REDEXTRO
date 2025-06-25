import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import CheckPlan from './CheckPlan';
import store from '../../store/store';
const dummyPlans = [
  { title: "Read 20 pages of a book", status: "ongoing", statusPercentage: 0.5 },
  { title: "Finish React Native tutorial", status: "completed", statusPercentage: 1 },
  { title: "Workout at the gym", status: "upcoming", statusPercentage: 0 },
  { title: "Complete assignment on payment gateways", status: "ongoing", statusPercentage: 0.3 },
  { title: "Grocery shopping", status: "completed", statusPercentage: 1 },
  { title: "Start new coding project", status: "upcoming", statusPercentage: 0 },
  { title: "Attend team meeting", status: "ongoing", statusPercentage: 0.6 },
  { title: "Fix bugs in Todo app", status: "completed", statusPercentage: 1 },
  { title: "Plan weekend trip", status: "upcoming", statusPercentage: 0 },
  { title: "Watch React conf highlights", status: "upcoming", statusPercentage: 0 },
];

const PlanCard = () => {


  return (
    <View style={{
      flexDirection: "column",
      gap: 10,
      paddingVertical: hp(4)
    }}>

      {
        dummyPlans.map((plan, index) => (
          <Card key={index} plan={plan} />
        ))
      }
    </View>
  )
}


const Card = ({ plan }) => {
  const { setToggleModal } = useContext(store)

  return (
    <TouchableOpacity onPress={() => setToggleModal(true)} style={{
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
          }}>{plan?.title.length > 25 ? plan?.title.slice(0, 25) + "..." : plan?.title}</Text>
          <Text style={{
            fontSize: wp(3.5),
            color: colors.three,
            fontWeight: "bold"
          }}>
            8.00 AM - 9.00 AM
          </Text>
        </View>
      </View>
      <View>
        <CheckPlan />
      </View>
    </TouchableOpacity>
  )
}

export default PlanCard

const styles = StyleSheet.create({})