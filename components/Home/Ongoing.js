import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Progress from './ProgressBar';
import colors from '../../constants/colors';

const dummyPlans = [
    { title: "Read 20 pages of a book", status: "ongoing", statusPercentage: 0.5 },
    { title: "Finish React Native tutorial", status: "completed", statusPercentage: 1 },
    { title: "Workout at the gym", status: "upcoming", statusPercentage: 0 },
    { title: "Complete assignment on payment gateways", status: "ongoing", statusPercentage: 0.3 },
    { title: "Grocery shopping", status: "completed", statusPercentage: 1 },
    { title: "Start new coding project", status: "upcoming", statusPercentage: 0 },
    { title: "Attend team meeting", status: "ongoing", statusPercentage: 0.6 },
    { title: "Fix bugs in Todo app", status: "completed", statusPercentage: 1 },
    { title: "Plan weekend trip", status: "upcoming", statusPercentage: 0 },
    { title: "Watch React conf highlights", status: "upcoming", statusPercentage: 0 },
];



const Ongoing = () => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                gap: wp(4),
                paddingVertical: wp(3)
            }}>
                {
                    dummyPlans.map((plan, index) => (
                        plan?.status === 'ongoing' && <Card plan={plan} key={index} />
                    ))
                }
            </View>
        </ScrollView>
    )
}



const Card = ({ plan }) => {
    return (
        <View style={{
            backgroundColor: colors.one,
            width: wp(50),
            padding: wp(3),
            borderRadius: 8,
            flexDirection: "column",
            justifyContent: "space-between",
            gap: wp(5),
            paddingVertical: wp(6)
        }}>
            <View style={{
                alignSelf: 'flex-end'
            }}>
                <Text style={{
                    fontSize: wp(4),
                    color: colors.four,
                }}>{plan?.status?.toUpperCase()}</Text>
            </View>
            <View>
                <Text style={{
                    fontSize: wp(6),
                    color: "#CAF0F8",
                    fontWeight: "bold"
                }}>{plan?.title.length > 30 ? plan?.title.slice(0, 30) : plan?.title}</Text>
            </View>
            <View style={{
                flexDirection: "row",
                marginBottom: wp(2)
            }}>
                <Progress parcentage={plan?.statusPercentage} />
            </View>
        </View>
    )
}

export default Ongoing

const styles = StyleSheet.create({})