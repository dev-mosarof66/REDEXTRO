import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Carousel from "react-native-reanimated-carousel";
import Icon1 from "../../assets/images/00.jpg";
import Icon2 from "../../assets/images/01.jpg";

const data = [Icon1, Icon2];

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
            key={index}
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              backgroundColor: "red",
              borderRadius: 25,

            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                justifyContent: "center",
                borderRadius: 25
              }}
            >
              <Image style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }} source={item} />
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
