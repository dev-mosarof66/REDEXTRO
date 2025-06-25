import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Report = () => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "yellow",
        height: hp(32),
      }}
    >
      <Text>Report</Text>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({});
