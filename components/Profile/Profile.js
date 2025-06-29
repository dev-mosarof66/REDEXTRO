import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";

const Profile = ({ user }) => {
  const navigation = useNavigation()
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: colors.two,
        marginVertical: hp(1),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: wp(2),
        paddingHorizontal: wp(3),
        borderRadius: 8,
        elevation: 10,
        shadowColor: "green",
      }}
    >
      {
        user ? <View
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
                fontSize: 20,
              }}
            >
              {user?.username}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 14,
              }}
            >
              {
                user?.email
              }
            </Text>
          </View>
        </View> :
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
                backgroundColor: colors.four,
                alignItems: 'center',
                justifyContent: "center"
              }}
            >
              <FontAwesome6 name="user-large" size={35} color={colors.two} />
            </View>
            <View
              style={{
                paddingHorizontal: wp(2),
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: colors.one,
                  fontSize: 17,
                }}
              >
                Guest
              </Text>
              <TouchableOpacity onPress={() => navigation.push("Login")}>
                <Text
                  style={{
                    color: colors.four,
                    fontSize: 14,
                  }}
                >
                  Login to sync your data
                </Text>
              </TouchableOpacity>
            </View>
          </View>
      }
    </View >
  );
};

export default Profile;

const styles = StyleSheet.create({});
