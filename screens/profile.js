import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Navbar from "../components/Profile/Navbar";
import Report from "../components/Profile/Report";
import { useContext } from "react";
import store from "../store/store";
import Profile from "../components/Profile/Profile";
import axiosInstance from "../axios/axios";
import ButtonComp from "../components/public/Button";
import PlanStatsCard from "../components/Profile/PlanStatsCard";

const ProfileScreen = () => {

  const { user, setUser, setPlans, plans } = useContext(store)

  const handleLogout = async () => {
    await axiosInstance.post("/user/logout").then((res) => {
      console.log(res.data)
      setUser(null)
      setPlans([])
    }).catch((error) => {
      console.log('error in logout controller', error)
    })
  }



  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#CAF0F8",
        position: "relative",
        paddingHorizontal: wp(4),
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      {/* navbar  */}

      <Navbar user={user} />
      <ScrollView>
        <View style={{
          padding:10
        }}>
          <Profile user={user} />
          <PlanStatsCard plans={plans} />
          <Report plans={plans} />

        </View>
        {
          user && <ButtonComp onpress={() => handleLogout()} title="Logout" />
        }
      </ScrollView>

    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
