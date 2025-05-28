import { StyleSheet, Text, View, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const screen3 = require("../assets/images/02.json");
const screen4 = require("../assets/images/03.json");

const OnboardingScreen = () => {
  const titleStyle = {
    color: "#000000",
    fontWeight: "bold",
    fontSize: wp(6),
    paddingHorizontal: wp(4),
  };

  const subtitleStyle = {
    fontWeight: "bold",
    fontSize: wp(4),
  };

  const handleDone = () => {
    alert("done");
  };

  return (
    <Onboarding
      onDone={handleDone}
      pages={[
        {
          backgroundColor: "#eeefff",
          image: (
            <Image
              style={{ width: wp(100), height: hp(60) }}
              source={require("../assets/images/00.jpg")}
            />
          ),
          title: "SET YOUR ROUTINE AND ENJOY",
          titleStyles: titleStyle,
          subtitle: "Enjoy your day by being active",
          subTitleStyles: subtitleStyle,
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={{ width: wp(100), height: hp(60) }}
              source={require("../assets/images/01.jpg")}
            />
          ),
          title: "SET YOUR ROUTINE AND ENJOY",
          titleStyles: titleStyle,
          subtitle: "Enjoy your day by being active",
          subTitleStyles: subtitleStyle,
        },
        {
          backgroundColor: "#fff",
          image: (
            <LottieView
              source={screen3}
              autoPlay
              loop
              style={{ width: wp(80), height: hp(60) }}
            />
          ),
          title: "SET YOUR ROUTINE AND ENJOY",
          titleStyles: titleStyle,
          subtitle: "Enjoy your day by being active",
          subTitleStyles: subtitleStyle,
        },
        {
          backgroundColor: "#fff",
          image: (
            <LottieView
              source={screen4}
              autoPlay
              loop
              style={{ width: wp(80), height: hp(60) }}
            />
          ),
          title: "SET YOUR ROUTINE AND ENJOY",
          titleStyles: titleStyle,
          subtitle: "Enjoy your day by being active",
          subTitleStyles: subtitleStyle,
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
