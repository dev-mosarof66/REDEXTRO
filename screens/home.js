import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Context from "../store/store";
import { getItem } from "../utils/asyncStore";
import DummyPlans from "../dummy/plans";
import Header from "../components/HOme/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Banner from "../components/HOme/Banner";
import Plans from "../components/HOme/Plans";
const Home = () => {
  const { plans, setPlans } = useContext(Context || []);
  useEffect(() => {
    const parsedPlans = getItem("plans");

    if (parsedPlans) {
      // setPlans(parsedPlans);
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingTop: wp(6),
        paddingHorizontal: wp(5),
        flex: 1,
        backgroundColor: "#CAF0F8"
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar barStyle="dark-content" backgroundColor="rgba(0, 191, 255, 0.32)" />
        <Header />
        <Banner />
        <Plans data={DummyPlans} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
