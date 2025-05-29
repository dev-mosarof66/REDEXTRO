import { StyleSheet, Text, View, ViewBase } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Features = [{}];

const List = () => {
  return (
    <View
      style={{
        marginVertical: hp(2),
      }}
    >
      <View>
        <Text
          style={{
            fontSize: wp(4.2),
            fontWeight: "500",
          }}
        >
          Features
        </Text>
      </View>
      <View>
        <View></View>
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({});
