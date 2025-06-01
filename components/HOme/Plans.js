import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ongoing from "./Ongoing";

const Plans = ({ data }) => {
  return (
    <View>
      <View>
        <Ongoing data={data} />
      </View>
    </View>
  );
};

export default Plans;

const styles = StyleSheet.create({});
