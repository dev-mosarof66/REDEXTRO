import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const TimeZone = ["select time", 5, 10, 15, 30, 45, 60, 90, 120];

const Dropdown = ({ selectedValue, onSelect }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <View
      style={{
        paddingVertical: wp(2),
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: wp(4),
          paddingTop: wp(1),
          paddingBottom: wp(2),
        }}
      >
        Your Plan will be executed for -
      </Text>
      <View
        style={{
          borderColor: "rgb(165, 160, 160)",
          borderWidth: 1,
          paddingHorizontal: wp(4),
          paddingVertical: wp(1.5),
          marginLeft: wp(1),
          borderRadius: wp(2),
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text
            style={{
              marginRight: wp(1),
              color: selectedValue === "select time" ? "" : "green",
              fontWeight:
                selectedValue === "select time " ? "semibold" : "bold",
              fontSize: selectedValue === "select time" ? wp(3.8) : wp(4),
            }}
          >
            {selectedValue}
            {selectedValue === "select time" ? "" : " min"}
          </Text>
          {selectedValue === "select time" && (
            <Icon
              name={dropdownVisible ? "chevron-up" : "chevron-down"}
              size={20}
              color={dropdownVisible ? "red" : "black"}
            />
          )}
        </TouchableOpacity>

        {dropdownVisible &&
          TimeZone.slice(1).map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelect(item);
                setDropdownVisible(false);
              }}
              style={{ paddingVertical: wp(1) }}
            >
              <Text>{item} min</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default Dropdown;
