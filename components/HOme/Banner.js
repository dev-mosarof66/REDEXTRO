import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Carousel from "react-native-reanimated-carousel";
import Icon from "../../assets/icon.png";

const data = ["Set Your Plan , Get Your Day", "Boost Up Your Day by RED EXTRO"];

const Banner = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginBottom: wp(3),
      }}
    >
      <Carousel
        width={wp(100)}
        height={wp(50)}
        data={data}
        autoPlay={true}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              backgroundColor: "red",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderWidth: 1,
                justifyContent: "center",
              }}
            >
              <Text>{item}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

//  <View
//       style={{
//         width: "100%",
//         height: hp(20),
//         backgroundColor: "red",
//         alignItems: "center",
//         justifyContent: "center",
//         marginBottom: hp(2),
//       }}
//     >
//       <Text
//         style={{
//           fontSize: wp(5),
//           fontWeight: "bold",
//         }}
//       >
//         Banner
//       </Text>
//     </View>

export default Banner;

const styles = StyleSheet.create({});
