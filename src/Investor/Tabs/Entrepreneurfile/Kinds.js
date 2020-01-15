/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, Image, TouchableWithoutFeedback, StatusBar, ToastAndroid, Text, View, Platform } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Icon } from 'native-base';
import styles from '../../../Styles/Styles'
import Pic5 from '../../../images/reg6.png'
import Toast, { DURATION } from 'react-native-easy-toast'

import { Actions } from 'react-native-router-flux';
export default class IRegister5 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: Pic5,
            selected: '#643F00',
            colorvalue: ['black', 'black', 'black', 'black', 'black'],
            Companytype: ['CUB', 'LION', 'ROAR'],
            Kindex: [],
            CompanyTypes: [],
        }
    }

    selectedbox = (key) => {
        let selecttype = this.state.CompanyTypes
        let temp = this.state.colorvalue;
        let Cindex = this.state.Kindex;
        temp[key] = temp[key] == 'black' ? '\#643F00' : 'black'
        if (selecttype.includes(this.state.Companytype[key])) {
            Cindex.splice(Cindex.indexOf(key + 1), 1)
            selecttype.splice(selecttype.indexOf(this.state.Companytype[key]), 1)
        }
        else {
            Cindex.push(key + 1);
            selecttype.push(this.state.Companytype[key])
        }
        this.setState({ colorvalue: temp, CompanyTypes: selecttype, Kindex: Cindex })
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} backgroundColor="black" />
                <ImageBackground resizeMode="stretch" source={require('../../../images/breg5.png')} style={styles.imagebackground}>
                    <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' ,position:'absolute', top: 20,left:20}} type="AntDesign" />
                    <View style={styles.mainview}>
                        <Text allowFontScaling={false} style={styles.text11}>Select type of company</Text>
                        <View style={styles.v1style}>
                            <View style={styles.v2style}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(0)}>
                                    <View style={[styles.v3style, { backgroundColor: this.state.colorvalue[0] }]}>
                                        <Image resizeMode="stretch" source={require('../../../images/pawprint.png')} style={styles.imgsize2} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={styles.textstyle2}>CUB</Text>
                            </View>
                            <View style={styles.v2style}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(1)}>
                                    <View style={[styles.v3style, { backgroundColor: this.state.colorvalue[1] }]}>
                                        <Image resizeMode="stretch" source={require('../../../images/lion.png')} style={styles.imgsize2} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={styles.textstyle2}>LION</Text>
                            </View>
                            <View style={styles.v2style}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(2)}>
                                    <View style={[styles.v3style, { backgroundColor: this.state.colorvalue[2] }]}>
                                        <Image resizeMode="stretch" source={require('../../../images/lion1.png')} style={styles.imgsize2} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={styles.textstyle2}>ROAR</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.vl}>
                        <TouchableWithoutFeedback onPress={() => Actions.IDashBoard({ KTypes: { KT: this.state.CompanyTypes, Kflag: 1, Kindex: this.state.Kindex } })} >
                            <View style={{ justifyContent: "center", alignItems: "center", height: 40, width: '60%', borderWidth: 1, borderColor: "#EC9705", backgroundColor: '#EC9705', borderRadius: 50 }}>
                                <Text allowFontScaling={false} onPress={() => Actions.IDashBoard({ KTypes: { KT: this.state.CompanyTypes, Kflag: 1, Kindex: this.state.Kindex } })} style={{ fontSize: 16, color: "#CCCCCC" }}>Select Kinds</Text>
                            </View>
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

