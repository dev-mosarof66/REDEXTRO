import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Context from "./store";
import { getItem, mergeItem, setItem } from "../utils/asyncStore";

const Provider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
   const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString().replace(/\//g, '-'));

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
        selectedDate, setSelectedDate
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
