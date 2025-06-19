import React from 'react';
import { View, Animated } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

const DragBox = () => {
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'skyblue',
          transform: [{ translateX }, { translateY }],
        }}
      />
    </PanGestureHandler>
  );
};

export default DragBox;
