import { StyleSheet, Text, View } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Navbar from '../components/SetPlan/Navbar'
import { SafeAreaView } from 'react-native-safe-area-context'
import TaskField from '../components/SetPlan/TaskField'
import Controllers from '../components/SetPlan/Controllers'
import FloatingCalendar from '../components/SetPlan/FloatingCalendar';
const PlanSetter = () => {
  return (
    <SafeAreaView style={{
      width: wp(100),
      height: hp(100),
      alignItems: 'center',
      backgroundColor: "#CAF0F8",
    }}>
      <View style={{
        width: wp(95),
      }}>
        <Navbar />
        <TaskField />
        <Controllers />
        <FloatingCalendar/>
      </View>
    </SafeAreaView>
  )
}

export default PlanSetter

const styles = StyleSheet.create({})