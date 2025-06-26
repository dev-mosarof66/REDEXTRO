import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

const ProfileScreen = () => {

  const { user } = useContext(store)



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

      <Navbar user={user} />
      <Profile user={user} />
      <Report />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
