import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Context from "./store";
import { getItem, mergeItem, setItem } from "../utils/asyncStore";

const Provider = ({ children }) => {
  const [plans, setPlans] = useState([]);

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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
