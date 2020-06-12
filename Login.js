/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local created by Hiep.
 */

import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { View } from 'react-native-animatable';
import { TapGestureHandler, State, TextInput } from 'react-native-gesture-handler';
import Animated, { Value, block, cond, eq, set, Easing, clockRunning, startClock, timing, stopClock, Clock, debug, interpolate, Extrapolate, concat } from 'react-native-reanimated';
import Svg, { Image, ClipPath, Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    }

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position,
    ]);
}

export default class Login extends React.Component {


    constructor() {
        super()

        this.buttonOpacity = new Value(1);
        this.onHandlerStateChange = Animated.event([
            {
                nativeEvent: ({ state }) => block([
                    cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 1, 0)))
                ])
            }
        ]);

        this.onCloseState = Animated.event([
            {
                nativeEvent: ({ state }) => block([
                    cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 0, 1)))
                ])
            }
        ]);

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3 -50, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: this.bgY }] }}>
                    <Svg height={height + 50} width={width}>
                        <ClipPath id="clip">
                            <Circle
                                r={height + 50}
                                cx={width / 2}
                            />
                        </ClipPath>
                        <Image
                            href={require('./components/assets/bg.jpg')}
                            width={width}
                            height={height+50}
                            preserveAspectRatio='xMidYMid slice'
                            clipPath='url(#clip)'
                        />
                    </Svg>

                </Animated.View>

                <View style={{ height: height / 3, justifyContent: 'center' }}>
                    <TapGestureHandler onHandlerStateChange={this.onHandlerStateChange}>
                        <Animated.View style={{ ...styles.button, opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', }}>SIGN IN</Text>
                        </Animated.View>
                    </TapGestureHandler>

                    <Animated.View style={{ ...styles.button, backgroundColor: '#2e71dc', opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>SIGN IN WITH FACEBOOK</Text>
                    </Animated.View>

                    <Animated.View style={{
                        zIndex: this.textInputZindex,
                        opacity: this.textInputOpacity,
                        transform: [{ translateY: this.textInputY }],
                        height: height / 3, ...StyleSheet.absoluteFill,
                        top: null,
                        justifyContent: 'center',
                    }}>
                        <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                            <Animated.View style={styles.closeButton}>
                                <Animated.Text style={{ transform: [{ rotate: concat(this.rotateCross, 'deg') }] }}>
                                    {'✖️'}
                                </Animated.Text>
                            </Animated.View>
                        </TapGestureHandler>
                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                            placeholderTextColor="black"
                        />
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            placeholderTextColor="black"
                        />

                        <Animated.View style={styles.button}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', }}>
                                SIGN IN
                            </Text>
                        </Animated.View>
                    </Animated.View>
                </View>

            </View>
        );
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end'
    },
    button: {
        backgroundColor: 'white',
        height: 50,
        marginHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowColor: 'black',
        shadowOpacity: 0.2,

    },
    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    closeButton: {
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -20,
        left: width / 2 - 20,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowColor: 'black',
        shadowOpacity: 0.2,
    }
});
