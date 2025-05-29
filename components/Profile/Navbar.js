import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Navbar = () => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: wp(2),
      }}
    >
      <TouchableOpacity>
        <Ionicons name="chevron-back-circle" size={30} color="#0077B6" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: wp(5.5),
          fontWeight: "bold",
          color: "#03045E",
        }}
      >
        Profile
      </Text>
      <TouchableOpacity style={{
        paddingRight:wp(1)
      }}>
        <Ionicons name="settings" size={28} color="#03045e" />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({});
