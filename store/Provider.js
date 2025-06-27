import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Context from "./store";
import { getItem, mergeItem, setItem } from "../utils/asyncStore";
import Toast from "react-native-toast-message";
import axiosInstance from '../axios/axios'
import { calculateReminderTime, formattedDate } from "../utils/timeConverter";
import compareDate from "../utils/date";
import { useNavigation } from "@react-navigation/native";





const Provider = ({ children }) => {
  const navigataion = useNavigation()
  const [user, setUser] = useState(null)
  const [plans, setPlans] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeModal, setTimeModal] = useState(false)
  const [TaskmodalVisible, setTaskModalVisible] = useState(false);
  const [toggleModal, setToggleModal] = useState(false)
  const [reminderModal, setReminderModal] = useState(false)
  const [notificationModal, setNotificationModal] = useState(false)
  const [selectedPlan,setSelectedPlan] = useState(null)

  // for each plan
  const [category, setCategory] = useState('No Category')
  const [planTitle, setPlanTitle] = useState('')
  const [startingDate, setStartingDate] = useState(formattedDate());
  //2025-6-24
  const [startingTime, setStartingTime] = useState(null);
  //2025-06-23T10:00:00.000Z
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0
  })
  const [repeatation, setRepeatation] = useState(['No Repeat']);
  const [Notes, setNotes] = useState('')
  const [reminderTime, setReminderTime] = useState(null)
  const [reminderType, setReminderType] = useState('Notification')



  //  handle plan
  const handlePlan = async () => {
    if (!planTitle) {
      Toast.show({
        type: 'error',
        text1: 'Plan title is required',
        text1Style: {
          color: "red",
          fontSize: 16
        }
      })
    } else {
      const status = compareDate(startingDate)
      await axiosInstance.post("/plans/", {
        planTitle,
        category,
        startingDate,
        startingTime,
        repeatation,
        duration,
        Notes,
        status,
        reminderType,
        reminderTime
      })
        .then((res) => {
          const updatedPlans = [...plans, res?.data?.plan];
          setPlans(updatedPlans);
          Toast.show({
            type: 'success',
            text1: res?.data?.message,
            text1Style: {
              color: "green",
              fontSize: 16
            }
          });

          setPlanTitle('')
          setCategory('No Category')
          setRepeatation(['No Repeat'])
        })
        .catch((err) => {

          if (err?.response?.status === 403) {
            Toast.show({
              type: 'error',
              text1: 'Login session expired',
              text1Style: {
                color: "red",
                fontSize: 16
              }
            })
            navigataion.navigate('Login')
          }

        });
    }
  }

  const updatePlanStatus = async () => {

    try {

      const updatedPlans = []
      for (let i = 0; i < plans?.length; i++) {
        const plan = plans[i];
        const status = compareDate(plan?.startingDate)
        await axiosInstance.put(`/plans/update/${plan?._id}`, {
          status
        }).then((res) => {
          updatedPlans.push(res?.data)


        }).catch((error) => {
          console.log(error)
        })
      }
      setPlans(updatedPlans)
    } catch (error) {

    }
  }


  useEffect(() => {
    updatePlanStatus()
  }, [])






  return (
    <Context.Provider
      value={{
        plans,
        setPlans,
        showCalendar,
        setShowCalendar,
        startingDate,
        setStartingDate,
        showTimeModal,
        setTimeModal,
        startingTime,
        setStartingTime,
        TaskmodalVisible,
        setTaskModalVisible,
        repeatation,
        setRepeatation,
        category,
        setCategory,
        planTitle,
        setPlanTitle,
        Notes,
        setNotes,
        handlePlan,
        user,
        setUser, duration, setDuration,
        toggleModal, setToggleModal, reminderModal, setReminderModal, reminderTime, setReminderTime, reminderType, setReminderType, notificationModal, setNotificationModal,selectedPlan,setSelectedPlan

      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
