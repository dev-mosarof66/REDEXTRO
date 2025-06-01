import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { InProgress } from "../../utils/filterPlans";
import Entypo from "react-native-vector-icons/Entypo";
import timeConverter from "../../utils/timeConverter";

const Ongoing = ({ data }) => {
  const [ongoing, setOngoing] = useState("");
  useEffect(() => {
    data.map((item) => {
      if (item.status === "in-progress") {
        // console.log(item);
        setOngoing(item);
      }
    });
  }, [ongoing]);

  return (
    <View>
      <Text
        style={{
          fontSize: wp(4),
          fontWeight: "bold",
          paddingBottom: wp(2),
        }}
      >
        Ongoing Plan
      </Text>
      <View
        style={{
          width: "100%",
          height: hp(16),
          backgroundColor: "rgb(134, 13, 199)",
          borderRadius: wp(1),
          elevation: 10,
          shadowColor: "red",
          padding: wp(3),
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: wp(4),
              fontWeight: "bold",
              color: "rgb(218, 197, 15)",
            }}
          >
            {ongoing.title}
          </Text>
          <View>
            <Text>
              Started on : <Text>{timeConverter(ongoing.startingTime)}</Text>
            </Text>
            <Text>
              Duration : <Text>{ongoing.duration}</Text>
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
              {ongoing.status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Ongoing;

const styles = StyleSheet.create({});
