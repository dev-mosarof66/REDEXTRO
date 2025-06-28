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
import ButtonComp from '../../components/public/Button'

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
          <ButtonComp title='Login'  onpress={() => navigation.push('Login')} />

        </TouchableOpacity>
      }
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({});
