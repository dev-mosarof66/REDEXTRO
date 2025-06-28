import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../constants/colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width;

const StatusBarChart = ({ plans }) => {
  // Count status frequencies
  const statusCounts = plans.reduce((acc, plan) => {
    acc[plan.status] = (acc[plan.status] || 0) + 1;
    return acc;
  }, {});

  // Convert to chart format
  const labels = Object.keys(statusCounts);
  const data = Object.values(statusCounts);

  // Empty state fallback
  if (labels.length === 0) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>No data to display</Text>;
  }

  return (
    <View style={{
      marginVertical: hp(2.5)
    }}>
      <Text style={{
        fontSize: hp(2.5),
        color: colors.one,
        marginBottom: hp(1.5),
        fontWeight: "bold"
      }}>Plan Statistics</Text>
      <ScrollView style={{
        marginTop: hp(4),
      }} horizontal={true} showsHorizontalScrollIndicator={false}>
        <BarChart
          data={{
            labels: labels,
            datasets: [{ data }]
          }}
          width={Math.max(screenWidth, labels.length * 60)} // dynamic width
          height={200}
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: colors.five,
            backgroundGradientTo: colors.five,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            barPercentage: 0.7,
          }}
          verticalLabelRotation={0}
          showValuesOnTopOfBars
          fromZero
        />
      </ScrollView>
    </View>
  );
};

export default StatusBarChart;
