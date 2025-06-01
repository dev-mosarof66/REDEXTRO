import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Banner = () => {
  return (
    <View
      style={{
        width: "100%",
        height: hp(20),
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: hp(2),
      }}
    >
      <Text
        style={{
          fontSize: wp(5),
          fontWeight: "bold",
        }}
      >
        Banner
      </Text>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({});
