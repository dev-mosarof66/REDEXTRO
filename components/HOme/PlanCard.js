import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Trash2 } from 'lucide-react-native';
import store from '../../store/store';

// Dummy data for testing; replace with `plans` from context
const dummy = [
    {
        Notes: '',
        category: 'Personal',
        repeat: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        startedDate: '2025-06-19',
        time: '2025-06-19T10:00:00.000Z',
        title: 'Reading Books',
    },
];

const PlanCard = () => {
    const { plans } = useContext(store); // Replace dummy if using real data
    const activePlans = dummy; // change to `plans` later

    return (
        <View style={{ paddingVertical: 20 }}>
            {activePlans.length > 0 ? (
                activePlans.map((plan, index) => <Item key={index} plan={plan} />)
            ) : (
                <Text style={styles.noPlan}>No Plans</Text>
            )}
        </View>
    );
};

export default PlanCard;

// Item Card with Swipe-to-Delete
const Item = ({ plan }) => {
    const formattedTime = new Date(plan.time).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    const handleDelete = () => {
        Alert.alert('Delete Plan', `Are you sure you want to delete "${plan.title}"?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => console.log('Deleted:', plan.title) },
        ]);
    };

    const renderRightActions = () => (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Trash2 color="white" size={20} />
        </TouchableOpacity>
    );

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableOpacity onLongPress={() => console.log('Long pressed:', plan.title)} style={styles.card}>
                <Text style={styles.title}>{plan.title}</Text>
                <Text style={styles.time}>⏰ {formattedTime}</Text>
                {/* <Text style={styles.category}>📂 {plan.category}</Text> */}
                {/* <Text style={styles.repeat}>🔁 Repeats on: {plan.repeat.join(', ')}</Text> */}
            </TouchableOpacity>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 12,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    time: {
        fontSize: 14,
        color: '#444',
    },
    category: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    repeat: {
        fontSize: 13,
        color: '#777',
        marginTop: 4,
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        marginVertical: 5,
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
    },
    noPlan: {
        textAlign: 'center',
        color: '#999',
        fontSize: 16,
        marginTop: 20,
    },
});
