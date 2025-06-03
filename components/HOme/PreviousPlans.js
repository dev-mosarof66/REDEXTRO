import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Card from "../HOme/Card";

const plans = ["Completed", "Pending"];

const PreviousPlans = ({ data }) => {
  const [selected, setSelected] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);

  const filterCompletedPlans = () => {
    const array = data.filter((plan) => plan.status === "completed");
    console.log(array);
  };

  useEffect(() => {
    const array = data.filter((plan) => plan.status === "completed");
    if (array.length > 0) {
      setCompleted(array);
    }
    const arr = data.filter((plan) => plan.status === "pending");
    if (arr.length > 0) {
      setPending(arr);
    }
  }, []);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: wp(2),
        }}
      >
        {plans.map((item, index) => (
          <Text
            onPress={() => setSelected(index)}
            style={{
              marginRight: wp(2),
              paddingVertical: 4,
              paddingHorizontal: 5,
              fontSize: wp(4),
              fontWeight: "bold",
              color: selected === index ? "red" : "black",
              backgroundColor: selected === index ? "#00B4D8" : "transparent"
            }}
            key={index}
          >
            {item}
          </Text>
        ))}
      </View>
      <View>
        {selected === 0
          ? completed.map((item, index) => <Card data={item} key={index} />)
          : pending.map((item, index) => <Card data={item} key={index} />)}
      </View>
    </View>
  );
};

export default PreviousPlans;

const styles = StyleSheet.create({});
