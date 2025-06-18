import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Context from "./store";
import { getItem, mergeItem, setItem } from "../utils/asyncStore";

const Provider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeModal, setTimeModal] = useState(false)
  const [TaskmodalVisible, setTaskModalVisible] = useState(false);

  // for each plan

  const [category, setCategory] = useState('No Category')
  const [Title, setTitle] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString().replace(/\//g, '-'));
  const [time, setTime] = useState(null);
  const [selectedDay, setSelectedDay] = useState(['No Repeat']);
  const [Notes, setNotes] = useState('')


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
        selectedDate,
        setSelectedDate,
        showTimeModal,
        setTimeModal,
        time,
        setTime,
        TaskmodalVisible,
        setTaskModalVisible,
        selectedDay,
        setSelectedDay,
        category,
        setCategory,
        Title,
        setTitle,
        Notes,
        setNotes

      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
