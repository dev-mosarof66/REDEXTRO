import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const PlanSetter = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="red" />
      <Text>Set Plans</Text>
    </SafeAreaView>
  );
};

export default PlanSetter;

const styles = StyleSheet.create({});
