import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Context from "./store";
import { getItem, mergeItem, setItem } from "../utils/asyncStore";
import Toast from "react-native-toast-message";
import axiosInstance from '../axios/axios'
import { formattedDate } from "../utils/timeConverter";
import compareDate from "../utils/date";





const Provider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeModal, setTimeModal] = useState(false)
  const [TaskmodalVisible, setTaskModalVisible] = useState(false);
  const [toggleModal, setToggleModal] = useState(false)
  const [reminderModal, setReminderModal] = useState(false)
  const [notificationModal, setNotificationModal] = useState(false)

  // for each plan

  const [category, setCategory] = useState('No Category')
  const [planTitle, setPlanTitle] = useState('')
  const [startingDate, setStartingDate] = useState(formattedDate());
  //2025-6-24
  const [startingTime, setStartingTime] = useState(null); //2025-06-23T10:00:00.000Z
  const [repeatation, setRepeatation] = useState(['No Repeat']);
  const [Notes, setNotes] = useState('')
  const [reminderTime, setReminderTime] = useState(null)
  const [reminderType, setReminderType] = useState('Notification')

  const [user, setUser] = useState(null)

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
        Notes,
        status
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
          console.error('Error saving plan:', err?.response?.message);
          Toast.show({
            type: 'error',
            text1: 'Failed to save plan',
            text1Style: {
              color: "red",
              fontSize: 16
            }
          });
        });
    }
  }


  useEffect(() => {
    const parsedPlans = getItem("plans");
    if (parsedPlans) {
      setItem("plans", plans);
    } else {
      setItem("plans", plans);
    }
  }, [plans]);

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
        setUser,
        toggleModal, setToggleModal, reminderModal, setReminderModal, reminderTime, setReminderTime, reminderType, setReminderType, notificationModal, setNotificationModal

      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
