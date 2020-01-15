/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet, TouchableWithoutFeedback, StatusBar, Text, View } from 'react-native';
import styles from '../Styles/Styles'
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Uri from '../DeviceIp'
import Toast, { DURATION } from 'react-native-easy-toast'
export default class IRegister2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: '#643F00',
            Ccolor: 'black',
            Lcolor: 'black',
            Rcolor: 'black',
            flag: false,
            url:Uri//'http://192.168.100.4:80',// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
        }
    }
    componentDidMount = () => {
        this.props.Kind == 'Cub' ? this.setState({ Ccolor: '#643F00' }) : this.setState({ ccolor: 'black' })
        this.props.Kind == 'Lion' ? this.setState({ Lcolor: '#643F00' }) : this.setState({ Lcolor: 'black' })
        this.props.Kind == 'Roar' ? this.setState({ Rcolor: '#643F00' }) : this.setState({ Rcolor: 'black' })
    }
    selectedbox = (key) => {
        switch (key) {
            case 1:
                this.setState({ Ccolor: this.state.selected, Lcolor: 'black', Rcolor: 'black' });
                this.props.senddata(0, { kind: 'Cub', kindno: 1 });
                break;
            case 2:
                this.setState({ Lcolor: this.state.selected, Ccolor: 'black', Rcolor: 'black' });
                this.props.senddata(0, { kind: 'Lion', kindno: 2 });
                break;
            case 3:
                this.setState({ Rcolor: this.state.selected, Ccolor: 'black', Lcolor: 'black' });
                this.props.senddata(0, { kind: 'Roar', kindno: 3 });
                break;
        }

    }

    gotoReg3 = () => {
        if (this.state.Ccolor == 'black' & this.state.Rcolor == 'black' & this.state.Lcolor == 'black') {
            this.refs.toast.show('Select any one', DURATION.LENGTH_LONG);
        } else {
            this.props.Screenno(1)
        }
    }
    Update_Mode_Status = async (mac) => {
        //  console.log(mac)
        let data = {
            Mac: mac
        }
        await fetch(this.state.url + '/Session/Update_Mode_Status', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                //      console.log('resjon=>',resjson)
                if (resjson.Successful) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch(err => {
                return false;
                //                alert('Network Request Failed!.')
            })

    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} backgroundColor="black" />
                <ImageBackground resizeMode="stretch" source={require('../images/regbackground.png')} style={styles.imagebackground}>
                    <Image source={require('../images/register.png')} style={styles.image} />
                    <View style={styles.mainview}>
                        <Text allowFontScaling={false} style={styles.businesskind}>What kind of business are you interested in?</Text>
                        <View style={styles.v11}>
                            <View style={styles.v2}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(1)}>
                                    <View style={[styles.v3, { backgroundColor: this.state.Ccolor }]}>
                                        <Image source={require('../images/pawprint.png')} style={styles.imagesize} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={styles.text}>Cub</Text>
                            </View>
                            <View style={styles.v2}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(2)}>
                                    <View style={[styles.v3, { backgroundColor: this.state.Lcolor }]}>
                                        <Image source={require('../images/lion.png')} style={styles.imagesize} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={styles.text}>Lion</Text>
                            </View>
                            <View style={styles.v2}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(3)}>
                                    <View style={[styles.v3, { backgroundColor: this.state.Rcolor }]}>
                                        <Image source={require('../images/lion1.png')} style={styles.imagesize} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={styles.text}>Roar</Text>
                            </View>

                        </View>
                        <Text style={{color:'white'}}> Cub Range (1 - 3400000) £</Text>
                        <Text style={{color:'white'}}> Lion Range (34 - 6700000) £</Text>
                        <Text style={{color:'white'}}> Roar Range (67 - 10000000) £</Text>
                   
                    </View>
                    <View style={styles.v4ER8}>
                        <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                            <Image source={require('../images/left.png')} style={styles.imgsize} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.gotoReg3}>
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
