import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navbar from '../../components/SetPlan/Navbar'
import Dropdown from '../../components/SetPlan/Dropdown'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TaskInput from '../../components/SetPlan/TaskField'
import Controllers from '../../components/SetPlan/Controllers'
import FloatingCalendar from '../../components/SetPlan/FloatingCalendar'
import FloatingClock from '../../components/SetPlan/FloatingClock'
import TaskRepeater from '../../components/SetPlan/TaskRepeater'
import Button from '../../components/SetPlan/Button'
import store from '../../store/store'
import colors from '../../constants/colors'

const SetPlan = ({ route }) => {
  const { startingDate } = route.params;
  console.log(startingDate);
  const { handlePlan } = useContext(store)





  return (
    <SafeAreaView style={{
      paddingHorizontal: wp(4),
      flex: 1,
      flexDirection: "column",
      justifyContent: 'space-between',
      backgroundColor: colors.five

    }}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Navbar title='Set Your Plan' />
        <Dropdown />
        <TaskInput />
        <Controllers />
        <FloatingCalendar />
        <FloatingClock />
        <TaskRepeater />
      </View>
      <Button title="Set Plan" onPress={handlePlan} />
    </SafeAreaView>
  )
}

export default SetPlan

const styles = StyleSheet.create({})