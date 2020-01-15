/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, Image, ScrollView, TouchableWithoutFeedback, StatusBar, Button, Text, View } from 'react-native';
import Pic8 from '../images/reg8.png'
import styles from '../Styles/Styles'
export default class Register8 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          //  img: Pic6,
            selected: '#643F00',
            colorvalue: ['black', 'black', 'black', 'black', 'black', 'black', 'black'],
            Services: ['Promotion', 'Radio Promotion', 'Television Transmision', 'Digital Promotion'
                , 'Brand Development', 'Acount Manager', 'Business Consultance'],
            ServicesReuired: []
        }
    }
    componentDidMount = () => {
        console.log(this.props.Services.length)
        let temp=['black', 'black', 'black', 'black', 'black', 'black', 'black']
        for(let i=0;i<this.props.Services.length;i++){
           temp[this.state.Services.indexOf( this.props.Services[i])]='#643F00'
        }
            this.setState({ colorvalue:temp,ServicesReuired:this.props.Services })
        
    }
    selectedbox = (key) => {
        //  console.log(this.state.colorvalue)
        let reqservices = this.state.ServicesReuired
        let temp = this.state.colorvalue;
        temp[key] = temp[key] == 'black' ? '\#643F00' : 'black'
        // console.log( reqservices.includes(this.state.Services[key]))
        if (reqservices.includes(this.state.Services[key])) {
            reqservices.splice(reqservices.indexOf(this.state.Services[key]), 1)
        }
        else {
            reqservices.push(this.state.Services[key])
        }
        //  console.log(reqservices)
        this.setState({ colorvalue: temp, ServicesReuired: reqservices })
        this.props.senddata(7, { ServicesReuired: reqservices })
           
    }
    Reverse = () => {
            this.props.Screenno(6)
    }
    Forward = async() => {
        this.props.Register();
       
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} backgroundColor="black" />
                <ImageBackground resizeMode="stretch" source={require('../images/breg8.png')} style={styles.imagebackground}>
                    <Image source={Pic8} style={styles.image} />
                    <View style={styles.mainview}>
                        
                            <Text allowFontScaling={false} style={styles.text11}>Select required services</Text>
                            <Text allowFontScaling={false} style={[styles.text11, { color: '#EC9705', marginTop: -7, marginBottom: 15 }]}>(Optional)</Text>
                            <View style={styles.v1style}>
                                <View style={[styles.v2style, { marginTop: 10 }]}>
                                    <TouchableWithoutFeedback onPress={() => this.selectedbox(0)}>
                                        <View style={[styles.v3style, { backgroundColor: this.state.colorvalue[0] }]}>
                                            <Image source={require('../images/promotion.png')} style={styles.imgsize22} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Text allowFontScaling={false} style={styles.textstyle2}>Promotion</Text>
                                    <Text allowFontScaling={false} style={styles.textstyle2}></Text>
                                </View>
                                <View style={[styles.v2style, { marginTop: 10 }]}>
                                    <TouchableWithoutFeedback onPress={() => this.selectedbox(1)}>
                                        <View style={[styles.v3style, { backgroundColor: this.state.colorvalue[1] }]}>
                                            <Image source={require('../images/radio.png')} style={styles.imgsize22} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Text  allowFontScaling={false} style={styles.textstyle2}>Radio</Text>
                                    <Text allowFontScaling={false} style={styles.textstyle2}>Promotion</Text>
                                </View>
                                <View style={[styles.v2style, { marginTop: 10 }]}>
                                    <TouchableWithoutFeedback onPress={() => this.selectedbox(2)}>
                                        <View style={[styles.v3style, { backgroundColor: this.state.colorvalue[2] }]}>
                                            <Image source={require('../images/television.png')} style={styles.imgsize22} />
                                        </View>
                                    </TouchableWithoutFeedback>

                                    <Text allowFontScaling={false} style={styles.textstyle2}>Television</Text>
                                    <Text allowFontScaling={false} style={styles.textstyle2}>Transmission</Text>


                                </View>

                            </View>


                            <View style={styles.v1style}>
                                <View style={[styles.v2style, { marginTop: 10 }]}>
                                    <TouchableWithoutFeedback onPress={() => this.selectedbox(3)}>
                                        <View style={[styles.v3style, { backgroundColor: this.state.colorvalue[3] }]}>
                                            <Image source={require('../images/digital.png')} style={styles.imgsize22} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Text allowFontScaling={false}style={styles.textstyle2}>Digital</Text>
                                    <Text allowFontScaling={false} style={styles.textstyle2}>Promotion</Text>
                                </View>
                                <View style={[styles.v2style, { marginTop: 10 }]}>
                                    <TouchableWithoutFeedback onPress={() => this.selectedbox(4)}>
                                        <View style={[styles.v3style, { backgroundColor: this.state.colorvalue[4] }]}>
                                            <Image source={require('../images/brand.png')} style={styles.imgsize22} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Text allowFontScaling={false} style={styles.textstyle2}>Brand</Text>
                                    <Text allowFontScaling={false} style={styles.textstyle2}>Development</Text>
                                </View>
                                <View style={[styles.v2style, { marginTop: 10 }]}>
                                    <TouchableWithoutFeedback onPress={() => this.selectedbox(5)}>
                                        <View style={[styles.v3style, { backgroundColor: this.state.colorvalue[5] }]}>
                                            <Image source={require('../images/acount.png')} style={styles.imgsize22} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Text allowFontScaling={false} style={styles.textstyle2}>BL Acount</Text>
                                    <Text allowFontScaling={false} style={styles.textstyle2}>Manager</Text>
                                </View>

                            </View>
                            <View style={styles.v1style}>
                                <View style={[styles.v2style, { marginTop: 10 }]}>
                                    <TouchableWithoutFeedback onPress={() => this.selectedbox(6)}>
                                        <View style={[styles.v3style, { backgroundColor: this.state.colorvalue[6] }]}>
                                            <Image source={require('../images/business.png')} style={styles.imgsize22} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <Text allowFontScaling={false} style={styles.textstyle2}>Business</Text>
                                    <Text allowFontScaling={false} style={styles.textstyle2}>Consultancy</Text>
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

