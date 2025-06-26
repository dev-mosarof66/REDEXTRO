import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Button } from 'react-native-paper';

const TimerInput = ({ visible, onClose, onStart }) => {
    const [input, setInput] = useState('');

    const handlePress = (value) => {
        if (value === 'del') {
            setInput(input.slice(0, -1));
        } else {
            if (input.length < 6) {
                setInput(input + value);
            }
        }
    };

    const getTimeParts = () => {
        const padded = input.padStart(6, '0');
        const h = padded.slice(0, 2);
        const m = padded.slice(2, 4);
        return { h, m };
    };

    const renderButton = (label) => (
        <TouchableOpacity style={styles.button} onPress={() => handlePress(label)} key={label}>
            <Text style={styles.buttonText}>{label === 'del' ? '⌫' : label}</Text>
        </TouchableOpacity>
    );

    const numberPad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', 'del'];

    const { h, m, s } = getTimeParts();

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>

                    <Text style={styles.timerText}>{h}h {m}m</Text>

                    <View style={styles.grid}>
                        {numberPad.map(renderButton)}
                    </View>

                    <Button
                        mode="contained"
                        style={styles.startButton}
                        onPress={() => onStart && onStart({ h, m, s })}
                    >
                        Start Timer
                    </Button>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#0d0d0d',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    closeText: {
        color: '#fff',
        fontSize: 22,
    },
    timerText: {
        color: 'white',
        fontSize: 36,
        marginBottom: 20,
        marginTop: 20,
    },
    grid: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    button: {
        width: '28%',
        margin: '2%',
        aspectRatio: 1,
        backgroundColor: '#1e1e1e',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 22,
        color: 'white',
    },
    startButton: {
        marginTop: 30,
        backgroundColor: '#00bcd4',
        width: '100%',
    },
});

export default TimerInput;
