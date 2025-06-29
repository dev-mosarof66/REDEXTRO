import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Context from "./store";
import axiosInstance from '../axios/axios'
import { calculateReminderTime, formattedDate } from "../utils/timeConverter";
import compareDate from "../utils/date";
import { useNavigation } from "@react-navigation/native";
import { toast } from "@backpackapp-io/react-native-toast";





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
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [notifications, setNotifications] = useState([])


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
  const [notification, setNotification] = useState(null)
  const [notificationToken, setNotificationToken] = useState(null)
  const [lastNotificationId, setNotificationId] = useState(null)



  //  handle plan
  const handlePlan = async () => {
    if (!planTitle) {
      toast.error(
        "Please enter a plan title",
        {

          duration: 1000
        }
      )
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
          toast.success(
            "Plan created successfully",
            {
              duration: 1000
            }
          )

          setPlanTitle('')
          setCategory('No Category')
          setRepeatation(['No Repeat'])
        })
        .catch((err) => {

          console.log('inside the plan setter function and error ,',err?.data)

          if (err?.response?.status === 401) {
            toast.error(
              "Login session expired. Please Login again",
              {
                duration: 2000
              }
            )
            navigataion.navigate('Login')
          }

          if (err?.response?.status === 402) {
            toast.error(
              "Plan title,starting date and starting time is required.",
              {
                duration: 2000
              }
            )
          }

          if (err?.response?.status === 5000) {
            navigataion.navigate('Error')
          }

        });
    }
  }

  const updatePlanStatus = async () => {

    try {
      // console.log("inside the update plan status")
      const updatedPlans = []
      // console.log(plans)
      for (let i = 0; i < plans?.length; i++) {
        const plan = plans[i];
        const status = compareDate(plan?.startingDate)
        // console.log(status)
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


  useEffect(() => {
    const pushNotification = async () => {
      if (!notification?.request?.identifier || notification?.request?.identifier === lastNotificationId) return;
      setNotificationId(notification.request.identifier);

      await axiosInstance.post('/user/push/notification', {
        title: notification?.request?.content?.title,
        body: notification?.request?.content?.body

      }).then((res) => {
        console.log("inside push notification frontend")


        console.log(res.data)
      }).catch((error) => {
        console.log('error in pushing notification ', error?.response)
      })
    }


    pushNotification()
  }, [notification])






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
        handlePlan, notifications, setNotifications,
        user,
        setUser, duration, setDuration,
        toggleModal, setToggleModal, reminderModal, setReminderModal, reminderTime, setReminderTime, reminderType, setReminderType, notificationModal, setNotificationModal, selectedPlan, setSelectedPlan, notificationToken, setNotificationToken, notification, setNotification

      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
