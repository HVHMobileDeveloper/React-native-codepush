import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const color = {
    bgStepNormal: '#ffffff',
    bgStepDidTap: '#00b2f0',
    borderStep: '#adadad',
    titleColor: '#333333',
}
const size = {
    btnBorderWidth: .5,
    btnRadius: 5,
    btnTitle: 25,
    btnHeight: 45,
    btnWidth: windowWidth / 5,
    lineWidth: windowWidth / 10,
    underLine: 1,
}
class Steps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSelected: 1,
        };
        this.onPressed = this.onPressed.bind(this);
    }

    UNSAFE_componentWillReceiveProps(props){
        const {currentPage} = props;
        this.setState({
            currentSelected: currentPage,
        })
    }
    
    onPressed = async (item, count) => {
        const {currentSelected} = this.state;
        if(currentSelected === item ){
            //todo some thing!
        }else{
           this.setCurrentItem(item);
        }
    }

    setCurrentItem = async (item) => {
        await this.setState({
            currentSelected: item,
        });
        this.props.currentSelected(item);
    }

    render() {
        const {backgroundColor, isAdmin} = this.props;
        
        const steps = isAdmin ? [1, 1.5, 2, 2.5, 3] : [1, 1.5, 2];
        const bgStepDidTap = backgroundColor ? backgroundColor : color.bgStepDidTap;
        
        return (
            <View style={styles.container}>
            {
                steps.map( (item, count) =>{
                    if(item % 1 === 0){
                        const isSelected = this.state.currentSelected === item;
                        return (
                            <TouchableOpacity
                                key={item}
                                activeOpacity={.7}
                                onPress={()=> this.onPressed(item, count)}
                                style={{
                                    backgroundColor: isSelected ? bgStepDidTap : color.bgStepNormal,
                                    borderWidth: size.btnBorderWidth,
                                    borderColor: isSelected ? bgStepDidTap : color.borderStep,
                                    width: size.btnWidth,
                                    height: size.btnHeight,
                                    justifyContent: 'center',
                                    borderRadius: size.btnRadius,
                                }}
                            >
                                <Text style={{
                                    color: isSelected ? color.bgStepNormal : color.borderStep,
                                    fontSize: size.btnTitle,
                                    textAlign: 'center',
                                }}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }else{
                        return (
                            <View
                                key={item}
                                style={{
                                    backgroundColor: color.borderStep,
                                    height: size.underLine, 
                                    width: size.lineWidth,
                                    alignSelf:'center',
                            }}/>
                        )
                    }
                })
            }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent:'center',
    },

});

export default Steps;
