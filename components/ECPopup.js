import React, { useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native-animatable';
import { Modal, SafeAreaView, TouchableOpacity } from 'react-native';

export default function ECPopup(props) {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
    const { isVisible = false, content = '' } = props;

    const requestClose = () => {
        props.onClose(false);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        >
            <SafeAreaView style={{ backgroundColor: 'gray', flex: 1, justifyContent: "center" }}>
                <Text>{content}</Text>
                <TouchableOpacity
                    onPress = {requestClose}
                >
                    <Text>Close</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
    );
}