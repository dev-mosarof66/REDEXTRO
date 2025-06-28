import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';
import videoFile from '../../assets/videos/video.mp4'; // Renamed to avoid conflict

export default function App() {
    const videoRef = useRef(null); // Renamed ref

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                style={styles.video}
                source={videoFile}
                useNativeControls
                resizeMode="contain"
                isLooping
                shouldPlay
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    video: {
        alignSelf: 'center',
        width: '100%',
        height: 300,
    },
});
