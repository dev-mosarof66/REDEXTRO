import { StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Navbar from '../components/SetPlan/Navbar'
import { SafeAreaView } from 'react-native-safe-area-context'
import TaskField from '../components/SetPlan/TaskField'
import Controllers from '../components/SetPlan/Controllers'
import FloatingCalendar from '../components/SetPlan/FloatingCalendar';
import FloatingClock from '../components/SetPlan/FloatingClock';
import TaskRepeater from '../components/SetPlan/TaskRepeater';
import { useContext } from 'react';
import store from '../store/store';
import Toast from 'react-native-toast-message';
const PlanSetter = () => {

  const { Title, category, selectedDate, time, selectedDay, Notes, plans, setPlans } = useContext(store)
  // console.log(Title, category,selectedDate,time,selectedDay);


  const handleAddPlan = () => {

    const newPlan = {
      title: Title,
      category: category,
      startedDate: selectedDate,
      time: time,
      repeat: selectedDay, // plan should repeat in those days
      Notes: Notes,
    }

    console.log(newPlan);
    setPlans([...plans, newPlan]);
    Toast.show({
      type: "success",
      text1: "Plan added successfully",
      text1Style: {
        color: "green",
        backgroundColor: "white",
        fontSize: 14
      }
    })

  }
  return (
    <SafeAreaView style={{
      width: wp(100),
      height: hp(100),
      flexDirection: "column",
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: "#CAF0F8",
    }}>
      <View style={{
        width: wp(95),
      }}>
        <Navbar />
        <TaskField title={Title} category={category} />
        <Controllers />
        <FloatingCalendar />
        <FloatingClock />
        <TaskRepeater />
      </View>

      <AddPlanButton handleAddPlan={handleAddPlan} />

    </SafeAreaView>
  )
}


const AddPlanButton = ({ handleAddPlan }) => {
  return (
    <View style={{
      marginBottom: wp(24),
      width: wp(100),
      alignItems: "center",
      justifyContent: "center"
    }}>
      <TouchableOpacity onPress={handleAddPlan} style={{
        width: wp(80),
        alignItems: "center",
        backgroundColor: 'rgb(0, 191, 255)',
        paddingVertical: wp(2.5),
        borderRadius: wp(2.5),
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: "bold"
        }}>Add Plan</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PlanSetter
