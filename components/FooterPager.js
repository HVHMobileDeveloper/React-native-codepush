/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Text,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const size = {
    fHeight: 45,
    btnWidth: windowWidth / 2 - 15,
    space: 10,
    btnTitleSize: 18,
    btnRadius: 5,
}
const color = {
    btn1: '#000000',
    btn2: '#00b2f0',
    white: '#ffffff',
    btnTitle: '#ffffff'
}
const text = ['Previous', undefined, 'Next'];
class FooterPager extends Component {

    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this)
    }
    onPress = async (item, count) => {
        if (item === text[0]) {
            //TODO: previous
            this.props.previous();
        } else if (item === text[2]) {
            //TODO: next
            this.props.next();
        }
    }

    render() {
        return (
            <View style={{ height: size.fHeight, flexDirection: 'row', justifyContent: 'center' }}>
                {
                    text.map((item, count) => {
                        if (item) {
                            return (
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    style={{
                                        width: size.btnWidth,
                                        backgroundColor: item === text[0] ? color.btn1 : item === text[2] ? color.btn2 :  color.white,
                                        justifyContent: 'center',
                                        borderRadius: size.btnRadius,
                                    }}
                                    key={item}
                                    onPress={() => this.onPress(item, count)}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            color: color.btnTitle,
                                            fontSize: size.btnTitleSize
                                        }}
                                    >{item}</Text>
                                </TouchableOpacity>
                            )
                        } else {
                            return (
                                <View style={{ width: size.space }} />
                            )
                        }
                    })
                }
            </View>
        );
    }

}

export default FooterPager;
