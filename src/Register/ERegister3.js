/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet, TouchableWithoutFeedback, StatusBar, Button, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Slider } from 'react-native-elements';
import styles from '../Styles/Styles';
import Toast, { DURATION } from 'react-native-easy-toast'
export default class Register3 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Bligequity: 1,
            Investorequity: 0.4,
            Loanfinancing: 0,
            Term: 0,
            maxvalue: 99
        }
    }
    componentDidMount = () => {
        this.setState({ Bligequity: this.props.obj[0], Investorequity: this.props.obj[1], Loanfinancing: this.props.obj[2], Term: this.props.obj[3] })
    }
    gotoReg2 = () => {
        this.props.Screenno(2)
    }
    gotoReg4 = () => {
        if (this.state.Loanfinancing > 0|this.state.Term>0) {
            if (this.state.Term > 0 & this.state.Loanfinancing>0) {
                this.props.senddata(3, this.state)
                this.props.Screenno(4)
            } else {
                if(this.state.Term==0){
                    this.refs.toast.show('Recheck the Term', DURATION.LENGTH_LONG);
                }else{
                    this.refs.toast.show('Recheck the Loan', DURATION.LENGTH_LONG);
                }
            }
        } else {
            this.props.senddata(3, this.state)
            this.props.Screenno(4)
        }
    }
    updatebligequity = (value) => {
        // alert(value)

        this.setState({
            Bligequity: Math.ceil(value)
        })

    }
    updateInvestorequity = (value) => {
        this.setState({
            maxvalue: 100 - this.state.Bligequity,
            Investorequity: Math.ceil(value)
        })
    }
    updateLoanFinancing = (value) => {
        this.setState({
            Loanfinancing: Math.ceil(value)
        })
    }
    updateMonth = (value) => {
        this.setState({
            Term: Math.ceil(value)
        })
    }
    render() {
        console.disableYellowBox = ['Warning: Each', 'Warning: Failed']
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} backgroundColor="black" />
                <ImageBackground resizeMode="stretch" source={require('../images/breg3.png')} style={styles.imagebackground}>
                    <Image source={require('../images/reg3.png')} style={styles.image} />
                    <View style={styles.mainviewE3}>
                        <Text allowFontScaling={false} style={styles.textE3}>Give Black Lion investment</Text>
                        <Text allowFontScaling={false} style={styles.textstyle}>group equity stake</Text>

                        <Slider
                            style={{ width: '70%' }}
                            trackStyle={styles.track}
                            animateTransitions={true}
                            value={this.state.Bligequity}
                            maximumTrackTintColor="black"
                            minimumTrackTintColor="white"
                            thumbTintColor="white"
                            thumbStyle={styles.thumb}
                            minimumValue={1}
                            maximumValue={50}
                            thumbTouchSize={{ width: 50, height: 50 }}
                            onValueChange={(value) => this.setState({ Bligequity: Math.ceil(value) })}
                        />
                        <Text allowFontScaling={false} style={styles.text1}>{this.state.Bligequity}%</Text>
                        <Text allowFontScaling={false} style={styles.textE3}>Place equity stake on Black Lion</Text>
                        <Text allowFontScaling={false} style={styles.textstyle}>for investor raise</Text>
                        <Slider
                            style={{ width: '70%' }}
                            trackStyle={styles.track}
                            animateTransitions={true}
                            value={this.state.Investorequity}
                            maximumTrackTintColor="black"
                            minimumTrackTintColor="white"
                            thumbTintColor="white"
                            minimumValue={1}
                            maximumValue={this.state.maxvalue}
                            thumbStyle={styles.thumb}
                            thumbTouchSize={{ width: 50, height: 50 }}
                            onValueChange={(value) => this.updateInvestorequity(value)}
                        />
                        <Text allowFontScaling={false} style={styles.text1}>{this.state.Investorequity}%</Text>
                        <Text allowFontScaling={false} style={styles.textE3}>Venture Loan Financing</Text>

                        <Slider
                            style={{ width: '70%' }}
                            trackStyle={styles.track}
                            animateTransitions={true}
                            value={this.state.Loanfinancing}
                            maximumTrackTintColor="black"
                            minimumTrackTintColor="white"
                            minimumValue={0}
                            maximumValue={1000000}
                            thumbTintColor="white"
                            thumbStyle={styles.thumb}
                            thumbTouchSize={{ width: 50, height: 50 }}
                            onValueChange={(value) => this.updateLoanFinancing(value)}
                        />
                        <Text allowFontScaling={false} style={styles.text1}>£{this.state.Loanfinancing}</Text>
                        <Text allowFontScaling={false} style={styles.textE3}>Term</Text>

                        <Slider
                            style={{ width: '70%' }}
                            trackStyle={styles.track}
                            animateTransitions={true}
                            value={this.state.Term}
                            maximumTrackTintColor="black"
                            minimumTrackTintColor="white"
                            thumbTintColor="white"
                            minimumValue={0}
                            maximumValue={60}
                            thumbStyle={styles.thumb}
                            thumbTouchSize={{ width: 50, height: 50 }}
                            onValueChange={value => this.updateMonth(value)}
                        />
                        <Text allowFontScaling={false} style={styles.text1}>{this.state.Term} Months</Text>
                    </View>

                    <View style={styles.v4ER8}>
                        <TouchableWithoutFeedback onPress={this.gotoReg2}>
                            <Image source={require('../images/left.png')} style={styles.imgsize} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.gotoReg4}>
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

