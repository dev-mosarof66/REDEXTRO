import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: wp(4),
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
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
      <TouchableOpacity
        style={{
          paddingRight: wp(1),
        }}
      >
        <Ionicons name="settings" size={28} color="#03045e" />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({});
