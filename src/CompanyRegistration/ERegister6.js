/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet, TouchableWithoutFeedback, StatusBar, Button, Text, View } from 'react-native';
import { Slider } from 'react-native-elements';
import styles from '../Styles/Styles';
import Toast, { DURATION } from 'react-native-easy-toast'
export default class ERegister6 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            kindoffunding: 0
        }

    }
    componentDidMount = () => {

        this.setState({ kindoffunding: this.props.Funding })
    }
    gotoReg4 = () => {
        this.props.Screenno(3)
    }
    gotoReg6 = () => {
        if (this.state.kindoffunding > 0) {
            this.props.senddata(4, { kindoffunding: this.state.kindoffunding })
            this.props.Screenno(5)
        } else {
            this.refs.toast.show('value must be greater than 0', DURATION.LENGTH_LONG);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} barStyle="light-content" backgroundColor="black" />
                <ImageBackground resizeMode="stretch" source={require('../images/breg5.png')} style={styles.imagebackground}>
                    <Image source={require('../images/reg5.png')} style={styles.image} />
                    <View style={styles.mainviewE3}>
                        <Image resizeMode="stretch" source={require('../images/coins.png')} style={styles.coin} />
                        <Text allowFontScaling={false} style={styles.textE3}>What kind of funding are</Text>
                        <Text allowFontScaling={false} style={styles.textstyle}>you seeking ?</Text>

                        <Slider
                            style={{ width: '70%', marginTop: 10 }}
                            trackStyle={styles.track}
                            animateTransitions={true}
                            value={(this.state.kindoffunding )}
                            maximumTrackTintColor="black"
                            minimumTrackTintColor="white"
                            thumbTintColor="white"
                            minimumValue={0}
                            maximumValue={10000000}
                            thumbStyle={styles.thumb}
                            thumbTouchSize={{ width: 50, height: 50 }}
                            onValueChange={value => this.setState({ kindoffunding: Math.ceil(value ) })}
                        />
                        <Text allowFontScaling={false} style={styles.text1ER6}>£{this.state.kindoffunding}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableWithoutFeedback onPress={this.gotoReg4}>
                            <Image source={require('../images/left.png')} style={styles.imgsize} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.gotoReg6}>
                            <Image source={require('../images/right.png')} style={styles.imgsize} />
                        </TouchableWithoutFeedback>
                    </View>
                    <Toast
                        ref="toast"
                        style={{ backgroundColor: 'black' }}
                        position='bottom'
                        //  positionValue={60}
                        // fadeInDuration={7}
                        // fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{ color: 'white' }}
                    />
                </ImageBackground>
            </View>
        );
    }
}


