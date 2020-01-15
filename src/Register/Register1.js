/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Text, View, TouchableWithoutFeedback } from 'react-native';
import styles from '../Styles/Styles';
import DeviceInfo from 'react-native-device-info';
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';
import Uri from '../DeviceIp'
export default class Register1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '#643F00',
            Icolor: 'black',
            Ecolor: 'black',
            url: Uri,//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com',
            Mac: ''
        }

    }
    UNSAFE_componentWillMount = () => {
        DeviceInfo.getMacAddress().then(mac => {
            this.setState({ Mac: mac })
            this.CheckType(this.props.Type)
        });
        //        console.log(this.props.Type)
        setTimeout(() => {
            this.props.Type == 'Investor' ? this.setState({ Icolor: '#643F00' }) : this.setState({ Icolor: 'black' })
            this.props.Type == 'Entrepreneur' ? this.setState({ Ecolor: '#643F00' }) : this.setState({ Ecolor: 'black' })
        }, 1500);
    }
    selectedbox = (key) => {


        switch (key) {
            case 1:
                this.setState({ Ecolor: this.state.selected, Icolor: 'black' })
                //     this.props.senddata(1, { type: 'Entrepreneur' });
                this.props.senddata(1, { type: 'Entrepreneur', CheckType: true });
                this.CheckType('Entrepreneur')
                this.props.EntrepreneurRefresh()
                break;
            case 2:
                this.setState({ Icolor: this.state.selected, Ecolor: 'black' })
                this.props.senddata(1, { type: 'Investor', CheckType: true });
                //   this.props.senddata(1, { type: 'Investor' });
                this.props.InvestorRefresh();
                this.CheckType('Investor')
                break;
        }

    }
    gotoReg2 = () => {
        if (this.state.Icolor == 'black' && this.state.Ecolor == 'black') {
            this.refs.toast.show('Select any one!', DURATION.LENGTH_LONG);
        } else {
            this.props.Screenno(2)
        }
    }
    gotoLogIn = async () => {
        if (this.props.Active) {
            Actions.pop()
        } else {
            if (this.state.Mac != null) {
                this.setState({ loading: true })
                let data = {
                    Mac: this.state.Mac
                }
                await fetch(this.state.url + '/Session/Logout_Session', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data }),
                })
                    .then(res => res.json())
                    .then(resjson => {
                        if (resjson.Successful) {
                            this.setState({ loading: false })
                            Actions.pop()
                            Actions.LogIn();
                        }
                    }).catch(err => {
                        this.setState({ loading: false })
                        this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

                    })
            }
        }
    }
    CheckType = async (Type) => {
        let data = {
            Mac: this.state.Mac,
            Mode: Type
        }
        if (this.state.Mac != '') {
            await fetch(this.state.url + '/Session/User_Mode_Registeration', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            })
                .then(res => res.json())
                .then(resjson => {
                    // console.log('Message=>', resjson.Message, resjson)
                    if (resjson.Successful) {
                        this.props.senddata(1, { type: Type, CheckType: resjson.Type });
                    }
                    else {
                    }
                }).catch(err => {
                    console.log('error', err)
                })
        }
    }
    render() {

        console.disableYellowBox = ['Warning: Each', 'Warning: Failed']
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
                <ImageBackground resizeMode="stretch" source={require('../images/regbackground.png')} style={styles.imagebackground}>
                    <Image source={require('../images/register.png')} style={styles.image} />
                    <View style={styles.mainview}>
                        <Text allowFontScaling={false} style={{ fontSize: 16, color: '#CCCCCC', marginTop: 10 }}>Are you a Entrepreneur or Investor ?</Text>
                        <View style={styles.v11}>
                            <View style={styles.v2}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(1)}>
                                    <View style={[{ backgroundColor: this.state.Ecolor }, styles.v3]}>
                                        <Image source={require('../images/company.png')} style={styles.imagesize} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={[styles.text,]}>Entrepreneur</Text>
                            </View>
                            <View style={styles.v2}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(2)}>
                                    <View style={[{ backgroundColor: this.state.Icolor }, styles.v3]}>
                                        <Image source={require('../images/boss.png')} style={styles.imagesize} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={styles.text}>Investor</Text>
                            </View>

                        </View>

                    </View>
                    <View style={styles.vl}>

                        <TouchableWithoutFeedback onPress={() => this.gotoLogIn()}>
                            <Image source={require('../images/left.png')} style={styles.imgsize} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.gotoReg2}>
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

