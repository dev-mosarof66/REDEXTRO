import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Card from "./Card";

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
    <View
      style={{
        marginBottom: wp(2),
      }}
    >
      <View
        style={{
          width: "auto"
        }}
      >
        <Text
          style={{
            fontSize: wp(4),
            fontWeight: "bold",
            paddingBottom: wp(2),
          }}
        >
          Ongoing Plan
        </Text>
      </View>
      <View>
        <Card data={ongoing} />
      </View>
    </View>
  );
};

export default Ongoing;

const styles = StyleSheet.create({});
