import { StyleSheet, Text, View } from "react-native";
import Ongoing from "./Ongoing";
import PreviousPlans from "./PreviousPlans";

const Plans = ({ data }) => {
  return (
    <View>
      <View>
        <Ongoing data={data} />
      </View>
      <View>
        <PreviousPlans data={data} />
      </View>
    </View>
  );
};

export default Plans;

const styles = StyleSheet.create({});
