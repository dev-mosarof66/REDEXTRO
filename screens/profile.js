import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../components/Profile/Button";
import Profiler from "../components/Profile/Profile";
import Navbar from "../components/Profile/Navbar";
import List from "../components/Profile/List";
import Report from "../components/Profile/Report";

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

      <Navbar />
      <View
        style={{
          width: "100%",
          backgroundColor: "#0077B6",
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
        <Profiler />
        {/* edit profile button  */}
        <Button />
      </View>
      {/* <List /> */}
      <Report />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
