/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, Image, ScrollView, TouchableWithoutFeedback, StatusBar, Button, Text, View } from 'react-native';
import Pic10 from '../images/reg10.png'
import Pic6 from '../images/reg7.png'
import styles from '../Styles/Styles'
import { Actions } from 'react-native-router-flux';
import Uri from '../DeviceIp'
export default class RegSubscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: Pic6,
            text: 'Lorem Ipsum Text here',
            colorvalue: ['#643F00', 'black', 'black', 'black'],
            checked: true,
            Amount: [300, 600, 900, 1200],
            url:Uri//'http://192.168.100.4:80'// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
        }
    }

    selectedbox = (key) => {
        let temp = this.state.colorvalue;
        console.log(this.props.index)
        temp = ['black', 'black', 'black', 'black']
        temp[key] = '#643F00'
        // console.log( reqservices.includes(this.state.Services[key]))
        this.props.senddata(10, { amount: this.state.Amount[key], index: key });
        //  console.log(reqservices)
        this.setState({ colorvalue: temp })

    }

    UNSAFE_componentWillMount = async () => {
        await fetch(this.state.url + '/Subscription/GetSub_Plan')
            .then(response => response.json())
            .then(res => {
                if (res.Successful) {
                    let data = []
                    for (let index = 0; index < res.data.length; index++) {
                        data.push(res.data[index].subs_amount)
                    }
                    this.setState({ Amount: data })
                }
            })
            .catch(err => alert(err))

        if (this.props.Type == 'Investor') {
            //  console.log("component=>"+this.props.index)  
            let temp = ['black', 'black', 'black', 'black']
            temp[this.props.index] = '#643F00'
            this.setState({ img: Pic6, colorvalue: temp })
        }
        else if (this.props.Type == 'Entrepreneur') {
            let temp = ['black', 'black', 'black', 'black']
            temp[this.props.index] = '#643F00'
            this.setState({ img: Pic10, colorvalue: temp })
        }
    }
    Reverse = () => {
        this.props.Screenno(9) // 8 is 6 in Investor case
    }
    Forward = () => {
        this.props.Register();
        //    Actions.SubPayment();
    }
    render() {
        console.disableYellowBox = ['Warning: Each', 'Warning: Failed']
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} backgroundColor="black" />
                <ImageBackground resizeMode="stretch" source={require('../images/breg8.png')} style={styles.imagebackground}>
                    <Image source={this.state.img} style={styles.image} />
                    <View style={styles.mainview}>
                        <Text allowFontScaling={false} style={styles.text3}>Subscription Plan</Text>
                        <View style={styles.v4}>

                            <View style={styles.v9}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(0)}>
                                    <View style={[styles.v5, { backgroundColor: this.state.colorvalue[0] }]}>
                                        <Text allowFontScaling={false} style={styles.text4}>${this.state.Amount[0]}</Text>
                                        <Text allowFontScaling={false} style={styles.duration}>Per Month</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <View style={styles.v9}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(1)}>
                                    <View style={[styles.v5, { backgroundColor: this.state.colorvalue[1] }]}>
                                        <Text allowFontScaling={false} style={styles.text4}>${this.state.Amount[1]}</Text>
                                        <Text allowFontScaling={false} style={styles.duration}>Quarterly</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={styles.v4}>

                            <View style={styles.v9}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(2)}>
                                    <View style={[styles.v5, { backgroundColor: this.state.colorvalue[2] }]}>
                                        <Text allowFontScaling={false} style={styles.text4}>${this.state.Amount[2]}</Text>
                                        <Text allowFontScaling={false} style={styles.duration}>06 Month</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <View style={styles.v9}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(3)}>
                                    <View style={[styles.v5, { backgroundColor: this.state.colorvalue[3] }]}>
                                        <Text allowFontScaling={false} style={styles.text4}>${this.state.Amount[3]}</Text>
                                        <Text allowFontScaling={false} style={styles.duration}>Yearly</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                    <View style={styles.vl}>
                        <TouchableWithoutFeedback onPress={this.Reverse}>
                            <Image source={require('../images/left.png')} style={styles.imgsize} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.Forward}>
                            <Image source={require('../images/right.png')} style={styles.imgsize} />
                        </TouchableWithoutFeedback>

                    </View>
                </ImageBackground>
            </View>
        );
    }
}

