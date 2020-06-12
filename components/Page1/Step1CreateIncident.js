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
    StyleSheet,
} from 'react-native';
import ECPickup from './ECPickup';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const size = {
    container: '100%',
    edgeBorderWidth: .5,
    edgeRadius: 5,
    edge: 10,
    edgePadding: 15,
}

const color = {
    edgeBordercolor: '#a7a7a7',
    background: '#ffffff',
}

class Step1CreateIncident extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={[{
                marginLeft: size.edge,
                marginRight: size.edge,
                marginBottom: size.edge,
                padding: size.edgePadding,
                height: windowHeight,
                backgroundColor: color.background,
                borderColor: color.edgeBordercolor,
                borderWidth: size.edgeBorderWidth,
                borderRadius: size.edgeRadius,
            }, styles.shadow]}>
                <ECPickup
                    title={'Incident Date'}
                    mandatory = {true}
                />
            </View>
        );
    }

}
const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#a7a7a7',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,
        elevation: 2,
    }
})

export default Step1CreateIncident;
