import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Button = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#CAF0F8",
        padding: 6,
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          color: "#03045E",
          fontWeight: "bold",
        }}
      >
        Edit Profile
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
