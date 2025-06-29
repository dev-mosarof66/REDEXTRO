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

      {
        labels.length === 0 ? (<View style={{
          flex: 1,
          height: hp(36),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: hp(0.6)
        }}>
          <Text style={{ textAlign: 'center', fontSize: hp(2.5), fontWeight: "bold", color: colors.one }}>No data to display.</Text>
          <Text style={{ textAlign: 'center', fontSize: hp(2), fontWeight: "bold", color: colors.three }}>Login for visuals.</Text>
        </View>) :
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
      }
    </View>
  );
};

export default StatusBarChart;
