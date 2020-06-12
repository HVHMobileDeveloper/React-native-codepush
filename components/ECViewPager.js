import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import Step1CreateIncident from './Page1/Step1CreateIncident';

const size = {
    edge: 10,
    topEdge: 15,
}
class ECViewPager extends React.Component<*, State> {
    viewPager: React.Ref<typeof ViewPager>;

    constructor(props: any) {
        super(props);
        this.viewPager = React.createRef();
    }
    go = (page) => {
        this.viewPager.current.setPage(page);
    };
    UNSAFE_componentWillReceiveProps(props) {
        this.go(props.currentPage - 1);
    }
    render() {
        return (
            <ViewPager
                style={{flex: 1, marginTop: size.topEdge}}
                initialPage={0}
                scrollEnabled={false}
                ref={this.viewPager}
            >
                <ScrollView 
                    key={1}>
                    <Step1CreateIncident {...this.state} />
                </ScrollView>

                <ScrollView key={2}>
                    <Text>Seconds Page</Text>
                </ScrollView>
                <ScrollView key={3}>
                    <Text>Thirds Page</Text>
                </ScrollView>
            </ViewPager>
        );
    }
}

export default ECViewPager;
