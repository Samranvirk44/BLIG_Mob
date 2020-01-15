

import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet, TouchableWithoutFeedback, StatusBar, Button, Text, View } from 'react-native';
import styles from '../Styles/Styles'
import { Slider } from 'react-native-elements';
export default class IRegister3 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Bligequity: 1,
            Investorequity: 0,
            Loanfinancing: 0,
            maxvalue:99
        }
    }
    componentDidMount = () => {
        this.setState({ Bligequity: this.props.obj[0], Investorequity: this.props.obj[1], Loanfinancing: this.props.obj[2] })
    }
    gotoReg2 = () => {
        this.props.Screenno(2)
    }
    gotoReg4 = () => {
        this.props.senddata(3, this.state)
        this.props.Screenno(4)
    }
    updateInvestorequity = (value) => {
            this.setState({ 
                maxvalue:100-this.state.Bligequity,
                Investorequity: Math.ceil(value) 
            })
    }
    updateLoanFinancing = (value) => {
             this.setState({ 
                Loanfinancing: Math.ceil(value) 
             })
     }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} backgroundColor="black" />
                <ImageBackground resizeMode="stretch" source={require('../images/breg3.png')} style={styles.imagebackground}>
                    <Image source={require('../images/reg3.png')} style={styles.image} />
                    <View style={styles.mainview}>
                        <Text allowFontScaling={false} style={styles.text2}>Give Black Lion investment</Text>
                        <Text allowFontScaling={false} style={styles.textstyle}>group equity stake</Text>
                        <Slider
                            style={{ width: '70%' }}
                            trackStyle={styles.track}
                            animateTransitions={true}
                            value={(this.state.Bligequity)}
                            maximumTrackTintColor="black"
                            minimumTrackTintColor="white"
                            thumbTintColor="white"
                            minimumValue={1}
                            maximumValue={50}
                            thumbStyle={styles.thumb}
                            thumbTouchSize={{ width: 50, height: 50 }}
                            onValueChange={(value) => this.setState({ 
                                Bligequity:Math.ceil(value) ,
                            })}
                        />
                        <Text allowFontScaling={false} style={styles.text1} >{this.state.Bligequity}%</Text>
                        <Text allowFontScaling={false} style={styles.text}>Place equity stake on Black Lion</Text>
                        <Text allowFontScaling={false} style={styles.textstyle}>for investor raise</Text>
                        <Slider
                            style={{ width: '70%' }}
                            trackStyle={styles.track}
                            animateTransitions={true}
                            value={(this.state.Investorequity)}
                            maximumTrackTintColor="black"
                            minimumTrackTintColor="white"
                           minimumValue={1}
                           maximumValue={this.state.maxvalue}
                            thumbTintColor="white"
                            thumbStyle={styles.thumb}
                            thumbTouchSize={{ width: 50, height: 50 }}
                          //  onValueChange={(value) => this.updatebligequity2(value)}
                            onValueChange={value => this.updateInvestorequity(value)}
                        />
                        <Text allowFontScaling={false} style={styles.text1}>{this.state.Investorequity}%</Text>
                        <Text allowFontScaling={false} style={styles.text}>Venture Loan Financing</Text>

                        <Slider
                            style={{ width: '70%' }}
                            trackStyle={styles.track}
                            animateTransitions={true}
                            value={this.state.Loanfinancing}
                            maximumTrackTintColor="black"
                            minimumTrackTintColor="white"
                            thumbTintColor="white"
                            minimumValue={1000}
                            maximumValue={100000}
                            thumbStyle={styles.thumb}
                            thumbTouchSize={{ width: 50, height: 50 }}
                            onValueChange={(value) => this.updateLoanFinancing(value )}
                        />
                        <Text allowFontScaling={false} style={styles.text1}>£ {this.state.Loanfinancing}</Text>

                    </View>

                    <View style={styles.v4ER8}>
                        <TouchableWithoutFeedback onPress={this.gotoReg2}>
                            <Image source={require('../images/left.png')} style={styles.imgsize} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.gotoReg4}>
                            <Image source={require('../images/right.png')} style={styles.imgsize} />
                        </TouchableWithoutFeedback>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
