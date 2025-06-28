import { StatusBar, StyleSheet, Text, View, Button } from 'react-native'
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
import store from '../store/store'
import colors from '../constants/colors'
import Reminder from '../components/SetPlan/Reminder'
import NotificationModal from '../components/SetPlan/NotificationModal'
import ButtonComp from '../components/public/Button'

const SetPlan = ({ route }) => {
  const { startingDate } = route.params;
  console.log(startingDate);
  const { handlePlan } = useContext(store)





  return (
    <SafeAreaView style={{
      paddingHorizontal: wp(4),
      flex: 1,
      backgroundColor: "#CAF0F8",
      flexDirection: "column",
      justifyContent: 'space-between'

    }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.four} />
      <View style={{ width: "100%", height: hp(96), justifyContent: 'space-between', flexDirection: "column" }}>
        <View>
          <Navbar title='Set Your Plan' />
          <Dropdown />
          <TaskInput />
          <Controllers />
        </View>
        <ButtonComp title="Set Plan" onPress={handlePlan} />
      </View>
      <View>
        <FloatingCalendar />
        <FloatingClock />
        <TaskRepeater />
        <Reminder />
        <NotificationModal />
      </View>
    </SafeAreaView>
  )
}

export default SetPlan

const styles = StyleSheet.create({})