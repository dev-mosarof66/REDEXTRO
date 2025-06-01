import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: hp(2),
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: wp(5.2),
          }}
        >
          Good Morning,
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: wp(4.5),
            paddingLeft: wp(18),
            color: "rgb(0, 166, 255)",
          }}
        >
          John Doe
        </Text>
      </View>
      <TouchableOpacity
        style={{
          padding: 3,
          backgroundColor: "rgb(130, 209, 3)",
          borderRadius: "50%",
        }}
      >
        <Ionicons name="notifications" size={26} color="rgb(223, 36, 7)" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
