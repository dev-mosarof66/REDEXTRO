import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Context from "./store";

const Provider = ({ children }) => {
  const [plans, setPlans] = useState([]);
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
