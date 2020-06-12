/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import AutocompleteExample from './components/AutocompleteExample';
import StepView from './components/StepView/Steps';
import ECViewPager from './components/ECViewPager';
import FooterPager from './components/FooterPager';
import { View } from 'react-native-animatable';
import ECPopup, { SHOW_POPUP } from './components/ECPopup';
import AnimatedBottomSheet from './components/AnimatedBottomSheet';
import Animated, { Value, useCode, cond, eq, set, not, interpolate, Easing } from 'react-native-reanimated';
import { TapGestureHandler, State, PanGestureHandler } from 'react-native-gesture-handler';
import { withTransition } from 'react-native-redash';


export default function App() {

  // -------------BottomSheet --------------//
  const state = new Value(State.UNDETERMINED);
  const isOpenBottomSheet = new Value(0);
  const transitionBottomSheet = withTransition(isOpenBottomSheet);

  translateYBottomSheet = interpolate(transitionBottomSheet, {
    inputRange: [0, 1],
    outputRange: [300, 0],
  })

  const zIndexBottomSheet = interpolate(translateYBottomSheet, {
    inputRange: [0, 299, 300],
    outputRange: [1, 1, -1],
  })

  useCode(() =>
    cond(eq(state, State.END),
      set(isOpenBottomSheet, not(isOpenBottomSheet))),
    [
      state,
      isOpenBottomSheet,
    ]);
  // -------------BottomSheet --------------//


  return (
    <>
      <SafeAreaView
        style={{ justifyContent: "center", flex: 1, backgroundColor: 'white' , alignItems: 'center'}}
      >
        <TapGestureHandler
          onHandlerStateChange={
            Animated.event([{
              nativeEvent: { state }
            }])
          }
        >
          <Animated.View>
            <Text>Open</Text>
          </Animated.View>
        </TapGestureHandler>

      </SafeAreaView>

      <AnimatedBottomSheet
        zIndex={zIndexBottomSheet}
        gestureHandler={{
          onHandlerStateChange: Animated.event([{
            nativeEvent: { state }
          }])
        }}
        translateY={translateYBottomSheet}
      />

    </>
  );

}



const styles = StyleSheet.create({
  box: {
   width: 50,
   height: 50,
   borderRadius: 25,
   backgroundColor: 'red',
  },
  
});
