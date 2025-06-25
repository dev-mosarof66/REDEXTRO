import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context'
import Navbar from '../components/SetPlan/Navbar';
import TaskInput from '../components/SetPlan/TaskField'
import Controllers from '../components/SetPlan/Controllers'
import FloatingCalendar from '../components/SetPlan/FloatingCalendar'
import FloatingClock from '../components/SetPlan/FloatingClock'
import TaskRepeater from '../components/SetPlan/TaskRepeater'
import Button from '../components/SetPlan/Button'
import Dropdown from '../components/SetPlan/Dropdown'
import store from '../store/store';
import timeConverter from '../utils/timeConverter';
import axiosInstance from '../axios/axios';
import Toast from 'react-native-toast-message';

const EditPlan = ({ route }) => {

  const { plan } = route?.params;
  const [loading, setLoading] = useState(false)
  const {
    setCategory,
    setPlanTitle,
    setStartingDate,
    setStartingTime,
    setRepeatation,
    category,
    planTitle,
    startingDate,
    startingTime,
    repeatation,
    Notes,
    plans, setPlans
  } = useContext(store)

  // console.log('plan in edit plan',plan);



  //load all the data to store

  useEffect(() => {
    setCategory(plan?.category)
    setPlanTitle(plan?.planTitle)
    setStartingDate(plan?.startingDate)
    const time = timeConverter(plan?.startingTime)
    setStartingTime(time)
    setRepeatation(plan?.repeatation)
  }, [plan])








  //update plan function

  const handleUpdatePlan = async () => {
    console.log('update plan function called')
    setLoading(true)
    axiosInstance.put(`/update/${plan?._id}`, {
      planTitle,
      category,
      startingDate,
      startingTime,
      repeatation,
      status: "new",
      Notes

    })
      .then((res) => {
        console.log(res.data)

        const newPlan = {
          planTitle,
          category,
          startingDate,
          startingTime,
          repeatation,

        }

        // console.log("plans in edit plan" , plans)

        const updatedPlans = plans.map((p) =>
          p._id === plan._id
            ? {
              ...p, planTitle, category, startingDate,
              startingTime, repeatation, Notes
            }
            : p
        );
        setPlans(updatedPlans);
        Toast.show({
          type: 'success',
          text1: 'Plan updated successfully',
          duration: 3000,
          text1Style: {
            color: "green",
            fontSize: 14
          }
        })

      }).catch((error) => {
        console.log(`error in update plan function ${error}`);

      }).finally(() => {
        setLoading(false)
      })

  }





  return (
    <SafeAreaView style={{
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: '#f0f0f0',
      paddingHorizontal: wp(4)
    }}>
      <View>
        <Navbar title='Edit Your Plan' />
        <Dropdown />
        <TaskInput />
        <Controllers />
        <FloatingCalendar />
        <FloatingClock />
        <TaskRepeater />
      </View>
      <View>
        <Button title='Edit Plan' onPress={handleUpdatePlan} />
      </View>
    </SafeAreaView>
  )
}

export default EditPlan

const styles = StyleSheet.create({})