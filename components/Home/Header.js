import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Greetings from "../../utils/greet";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";

const Header = ({ setLoading, user }) => {
  const navigation = useNavigation()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    setLoading(true)
    const greet = Greetings()
    setGreeting(greet)
    setLoading(false)
  }, [])

  // console.log(loading);


  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: hp(3)
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
            fontSize: wp(7),
            color: colors.one
          }}
        >
          {greeting},
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: wp(5.5),
            paddingLeft: wp(20),
            color: colors.two,
          }}
        >
          {
            user?.username
          }
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Notification')
        }
        style={{
          padding: 3,
          backgroundColor: colors.three,
          borderRadius: "50%",
        }}
      >
        <Ionicons name="notifications" size={26} color={colors.one} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
