import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { InProgress } from "../../utils/filterPlans";
import Entypo from "react-native-vector-icons/Entypo";
import timeConverter from "../../utils/timeConverter";

const Card = ({ data }) => {
  return (
    <View
      style={{
        width: "100%",
        height: hp(16),
        backgroundColor: "rgb(134, 13, 199)",
        borderRadius: wp(1),
        elevation: data.status === "in-progress" ? 10 : 0,
        shadowColor: "red",
        padding: wp(3),
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: wp(2),
      }}
    >
      <View
        style={{
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: wp(4),
            fontWeight: "bold",
            color: "rgb(218, 197, 15)",
          }}
        >
          {data.title}
        </Text>
        <View>
          <Text
            style={{
              fontSize: wp(3.5),
              fontWeight: "bold",
              color: "rgb(224, 243, 14)",
            }}
          >
            Started on : <Text>{timeConverter(data.startingTime)}</Text>
          </Text>
          <Text
            style={{
              fontSize: wp(3.5),
              fontWeight: "bold",
              color: "rgb(224, 243, 14)",
            }}
          >
            Duration : <Text>{data.duration}</Text>
          </Text>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Entypo name="triangle-right" size={26} color="rgb(24, 254, 97)" />
          <Text
            style={{
              color: "rgb(0, 247, 255)",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {data.status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
