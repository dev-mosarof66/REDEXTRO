import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Profile = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: wp(15),
          height: wp(15),
          borderRadius: "100%",
          overflow: "hidden",
          backgroundColor: "red",
        }}
      >
        <Image
          style={{
            width: wp(15),
            height: wp(15),
            overflow: "hidden",
          }}
          source={require("../../assets/images/profile.jpg")}
        />
      </View>
      <View
        style={{
          paddingHorizontal: wp(2),
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "#03045E",
            fontSize: 16,
          }}
        >
          Mosarof
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 13,
          }}
        >
          mosarof@gmail.com
        </Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
