/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
    Dimensions,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import { Asterisk } from './Asterisk';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const size = {
    formWidth: '45%',
    formHeight: 45,
    inputWidth: '55%',
    inputHeight: 35,
    fontSize: 18,
}

const color = {
    edgeBordercolor: '#a7a7a7',
    backgroundColor: '#ffffff'
}

class ECPickup extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const {title,mandatory} = this.props;
        const inputTitle = title ? title : 'n/a'
        return (
            <View style={{ height: size.formHeight, flexDirection: 'row', backgroundColor:  color.backgroundColor}}>
                <Text style={{
                    width: size.formWidth,
                    fontSize: size.fontSize,
                    alignSelf:'center'
                }}>{inputTitle}:{mandatory && <Asterisk/>}</Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                        alignSelf:'center',
                        width: size.inputWidth,
                        height: size.inputHeight,
                        borderWidth: 1,
                        borderColor: color.edgeBordercolor,
                    }}>

                </TouchableOpacity>
            </View>

        );
    }

}


export default ECPickup;
