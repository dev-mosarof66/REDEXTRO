import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navbar from '../components/SetPlan/Navbar'
import Dropdown from '../components/SetPlan/Dropdown'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TaskInput from '../components/SetPlan/TaskField'
import Controllers from '../components/SetPlan/Controllers'
import FloatingCalendar from '../components/SetPlan/FloatingCalendar'
import FloatingClock from '../components/SetPlan/FloatingClock'
import TaskRepeater from '../components/SetPlan/TaskRepeater'
import Button from '../components/SetPlan/Button'
import store from '../store/store'
import { formattedDate } from '../utils/timeConverter'

const PlanSetter = ({ navigation }) => {


  const {
    setCategory,
    setPlanTitle,
    setStartingDate,
    setStartingTime,
    setRepeatation,
    handlePlan
  } = useContext(store)


  useEffect(() => {
    setCategory('No Category')
    setPlanTitle('')
    setStartingDate(formattedDate())
    setStartingTime(null)
    setRepeatation(['No Repeat'])
  }, [navigation])


  return (
    <SafeAreaView style={{
      paddingHorizontal: wp(4),
      flex: 1,
      backgroundColor: "#CAF0F8",
      flexDirection: "column",
      justifyContent: 'space-between'

    }}>
      <StatusBar barStyle="dark-content" backgroundColor="rgba(0, 191, 255, 0.32)" />
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

export default PlanSetter

const styles = StyleSheet.create({})