/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, Image, TouchableWithoutFeedback, StatusBar, Button, ToastAndroid, Text, View, Platform } from 'react-native';
import styles from '../Styles/Styles'
import Pic5 from '../images/reg4.png'
import Toast, { DURATION } from 'react-native-easy-toast'
export default class IRegister5 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: Pic5,
            selected: '#643F00',
            colorvalue: ['black', 'black', 'black', 'black', 'black'],
            Companytype: ['Music', 'Film', 'Fashion', 'Gaming', 'Technology'],
            CompanyTypes: [],
        }
    }
    componentDidMount = () => {
        console.log("fragment", this.props.CompanyType.length)
        let temp = ['black', 'black', 'black', 'black', 'black',]
        for (let i = 0; i < this.props.CompanyType.length; i++) {
            temp[this.state.Companytype.indexOf(this.props.CompanyType[i])] = '#643F00'
        }
        this.setState({ colorvalue: temp, CompanyTypes: this.props.CompanyType })
    }
    selectedbox = (key) => {
        // let index = this.state.colorvalue.indexOf('#643F00')
        // let temp = this.state.colorvalue
        // temp[index] = 'black'
        // temp[key] = this.state.selected
        //

        let selecttype = this.state.CompanyTypes
        let temp = this.state.colorvalue;
        temp[key] = temp[key] == 'black' ? '\#643F00' : 'black'
        // console.log( reqservices.includes(this.state.Services[key]))
        if (selecttype.includes(this.state.Companytype[key])) {
            selecttype.splice(selecttype.indexOf(this.state.Companytype[key]), 1)
        }
        else {
            selecttype.push(this.state.Companytype[key])
        }
        //
        this.setState({ colorvalue: temp, CompanyTypes: selecttype })
        this.props.senddata(3, { Companytype: selecttype })

    }
    gotoReg4 = () => {
            this.props.Screenno(2)
       
    }
    gotoReg6 = () => {
        console.log('coo', this.state.CompanyTypes.length)
        if (this.state.CompanyTypes.length == 0) {
            this.refs.toast.show('Select atleast one type', DURATION.LENGTH_LONG);
        }
        else {
            if (this.props.Type == 'Investor') {
               // this.props.Screenno(6)
            } else {
              //  console.log("Loan",this.props.LoanFinancing)
                if (this.props.LoanFinancing > 0) {
                    console.log("Loan if",this.props.LoanFinancing)
                    this.props.Screenno(5)
                } else {
                    console.log("Loan",this.props.LoanFinancing)
                    this.props.Screenno(4)
                }
            }
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} backgroundColor="black" />
                <ImageBackground resizeMode="stretch" source={require('../images/breg5.png')} style={styles.imagebackground}>
                    <Image source={this.props.Type == 'Investor' ? require('../images/reg4.png') : this.state.img} style={styles.image} />
                    <View style={styles.mainview}>
                        <Text allowFontScaling={false} style={styles.text11}>Select type of company</Text>
                        <View style={styles.v1style}>
                            <View style={styles.v2style}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(0)}>
                                    <View style={[styles.v3style, { backgroundColor: this.state.colorvalue[0] }]}>
                                        <Image resizeMode="stretch" source={require('../images/music.png')} style={styles.imgsize2} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={styles.textstyle2}>Music</Text>
                            </View>
                            <View style={styles.v2style}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(1)}>
                                    <View style={[styles.v3style, { backgroundColor: this.state.colorvalue[1] }]}>
                                        <Image resizeMode="stretch" source={require('../images/film.png')} style={styles.imgsize2} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={styles.textstyle2}>Film</Text>
                            </View>
                            <View style={styles.v2style}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(2)}>
                                    <View style={[styles.v3style, { backgroundColor: this.state.colorvalue[2] }]}>
                                        <Image resizeMode="stretch" source={require('../images/fashion.png')} style={styles.imgsize2} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={styles.textstyle2}>Fashion</Text>
                            </View>
                        </View>
                        <View style={styles.v1style}>
                            <View style={styles.v2style}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(3)}>
                                    <View style={[styles.v3style, { backgroundColor: this.state.colorvalue[3] }]}>
                                        <Image resizeMode="stretch" source={require('../images/gaming.png')} style={styles.imgsize2} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={styles.textstyle2}>Gaming</Text>
                            </View>
                            <View style={styles.v2style}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(4)}>
                                    <View style={[styles.v3style, { backgroundColor: this.state.colorvalue[4] }]}>
                                        <Image resizeMode="stretch" source={require('../images/technology.png')} style={styles.imgsize2} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={styles.textstyle2}>Technology</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.vl}>
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

