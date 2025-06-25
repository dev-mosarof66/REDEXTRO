import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';
import colors from '../../constants/colors';

const Progress = ({ parcentage }) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const num = parseFloat(parcentage);
        if (!isNaN(num)) {
            setProgress(num);
        }
    }, [parcentage]);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text variant="titleMedium" style={styles.label}>Progress</Text>
                <Text style={styles.percent}>{Math.round(progress * 100)}%</Text>
            </View>
            <ProgressBar progress={progress} color={colors.two} style={styles.progressBar} />
        </View>
    );
};

export default Progress;

const styles = StyleSheet.create({
    container: {},
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        color: "#CAF0F8",
        fontSize: 13
    },
    progressBar: {
        height: 5,
        width: 150,
        borderRadius: 5,
        backgroundColor: '#d3d3d3',
    },
    percent: {
        fontSize: 12,
        color: colors.five,
    },
});
