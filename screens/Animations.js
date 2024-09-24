import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet, Easing, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const BouncingAndFadingBalls = () => {
  const ballAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startAnimation = () => {
      // Reset the animations
      ballAnimation.setValue(0);
      fadeAnimation.setValue(1);

      // Define the ball movement animation
      const ballMovement = Animated.timing(ballAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.bounce,
        useNativeDriver: false, // Set to false for height change
      });

      // Define the fade animation
      const fadeEffect = Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true, // Fade using native driver
      });

      // Run animations in sequence
      Animated.sequence([ballMovement, fadeEffect]).start(() => {
        // Reset fade after completing the animation
        fadeAnimation.setValue(1);
        startAnimation(); // Restart the animation
      });
    };

    startAnimation();
  }, [ballAnimation, fadeAnimation]);

  // Interpolating values for the horizontal movement
  const translateX = ballAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 100], // Move the ball across the screen
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.ball,
          {transform: [{translateX}], opacity: fadeAnimation},
        ]}
      />
      <Animated.View
        style={[
          styles.ball,
          {
            transform: [{translateX}],
            opacity: fadeAnimation,
            backgroundColor: '#e74c3c',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3498db',
    position: 'absolute', // Position balls absolutely to overlap
  },
});

export default BouncingAndFadingBalls;
