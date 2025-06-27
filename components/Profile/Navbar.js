import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { UserPen } from 'lucide-react-native'
import colors from "../../constants/colors";
import { Button } from 'react-native-paper';


const Navbar = ({ user }) => {
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
      {
        user ? <TouchableOpacity
          onPress={() => navigation.push('Edit')}
          style={{
            paddingRight: wp(1),
          }}
        >
          <UserPen color={colors.two} />
        </TouchableOpacity> : <TouchableOpacity
          onPress={() => navigation.push('Edit')}
          style={{
            paddingRight: wp(1),
          }}
        >
          <Button textColor={colors.four} buttonColor={colors.one} rippleColor='rgba(167, 167, 167, 0.5)' contentStyle={{
            padding: 0,
          }} onPress={() => navigation.push('Login')}>
            Login
          </Button>
        </TouchableOpacity>
      }
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({});
