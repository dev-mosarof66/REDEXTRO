import React, { useContext, useCallback, useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { toast } from "@backpackapp-io/react-native-toast";

import Navbar from "../components/Profile/Navbar";
import Report from "../components/Profile/Report";
import Profile from "../components/Profile/Profile";
import ButtonComp from "../components/public/Button";
import PlanStatsCard from "../components/Profile/PlanStatsCard";
import store from "../store/store";
import axiosInstance from "../axios/axios";
import colors from "../constants/colors";
import Loader from "../components/Loader";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, setUser, plans, setPlans } = useContext(store);
  const [loading, setLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/user/logout");
      console.log(res.data);
      setUser(null);
      setPlans([]);
      toast.success("Logged out successfully", {
        position: "top",
        duration: 2000,
      });
    } catch (error) {
      console.log("error in logout controller", error);
      const status = error?.response?.status;
      if (status === 500) {
        navigation.push("Error");
      } else if (status === 401) {
        toast.error("Login session expired", {
          position: "top",
          duration: 2000,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [navigation, setUser, setPlans]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.four} />
      {
        user && loading ?
          <Loader />
          :
          <View>
            <Navbar user={user} handleLogout={handleLogout} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Profile user={user} />
              <PlanStatsCard plans={plans} />
              <Report plans={plans} />

            </ScrollView>
          </View>

      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CAF0F8",
    paddingHorizontal: wp(4),
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});

export default React.memo(ProfileScreen);
