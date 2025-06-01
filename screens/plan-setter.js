import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/SetPlan/Navbar";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Dropdown from "../components/SetPlan/Dropdown";

const PlanSetter = () => {
  const [plan, setPlan] = useState("");
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [duration, setDuration] = useState("select time");
  const [plans, setPlans] = useState([]);

  const handleAddPlan = () => {
    if (plan.trim()) {
      setPlans([{ text: plan, time, duration }, ...plans]);
      setPlan("");
      setTime(new Date());
      setDuration("select time");
    }
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShowPicker(Platform.OS === "ios");
    setTime(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.innerContainer}
        >
          <Navbar />

          <View style={{ marginVertical: hp(2) }}>
            <TextInput
              placeholder="Enter your plan..."
              value={plan}
              onChangeText={setPlan}
              style={styles.input}
            />

            <View
              style={{
                width: wp(80),
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  paddingLeft: wp(1),
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: wp(4.2),
                    fontWeight: "bold",
                    paddingRight: wp(1),
                  }}
                >
                  Your Plan Will be started at -
                </Text>
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: wp(4.3),
                      color: "red",
                    }}
                    onPress={() => setShowPicker(true)}
                  >
                    {time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              </View>
              {showPicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={onChangeTime}
                />
              )}
            </View>

            <Dropdown selectedValue={duration} onSelect={setDuration} />

            <FlatList
              data={plans}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.planItem}>
                  <Text style={styles.planText}>• {item.text}</Text>
                  <Text style={styles.timeText}>
                    🕒{" "}
                    {new Date(item.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    | ⏳{" "}
                    {item.duration === "select time"
                      ? "-"
                      : item.duration + " min"}
                  </Text>
                </View>
              )}
              contentContainerStyle={{ paddingTop: 10 }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleAddPlan}>
          <Text style={styles.buttonText}>Add Plan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PlanSetter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  innerContainer: {
    padding: 20,
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  button: {
    width: wp(80),
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  planItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  planText: {
    fontSize: 16,
    marginBottom: 5,
  },
  timeText: {
    fontSize: 14,
    color: "#555",
  },
  footer: {
    width: wp(100),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: wp(3),
  },
});
