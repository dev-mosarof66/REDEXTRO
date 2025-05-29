import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
const Profile = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#CAF0F8",
        position: "relative",
        paddingHorizontal: wp(4),
      }}
    >
      {/* navbar  */}
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
            fontSize: wp(5),
            fontWeight: "bold",
            color: "#03045E",
          }}
        >
          Profile
        </Text>
        <TouchableOpacity>
          <Ionicons name="settings" size={28} color="#03045e" />
        </TouchableOpacity>
      </View>
      {/* profile  */}
      <TouchableOpacity
        style={{
          height: hp(14),
          width: "100%",
          backgroundColor: "yellow",
          marginVertical: hp(1),
        }}
      >
        <View>
          <View
            style={{
              width: wp(25),
              height: wp(25),
              borderRadius: "100%",
              overflow: "hidden",
              backgroundColor: "red",
            }}
          >
            <Image
              style={{
                width: wp(25),
                height: wp(25),
                // borderRadius: "100%",
                overflow: "hidden",
              }}
              source={require("../assets/images/profile.jpg")}
            />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
