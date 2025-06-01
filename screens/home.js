import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Context from "../store/store";
const Home = () => {
  const { plans } = useContext(Context);
  useEffect(() => {
    console.log(plans);
  }, []);
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="red" />
      <Text>Home</Text>
      {plans.map((item, index) => (
        <Text key={index}>{item.text}</Text>
      ))}
    </SafeAreaView>
  );
};

export default Home;
