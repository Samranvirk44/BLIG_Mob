/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ImageBackground,Image,YellowBox, StyleSheet,StatusBar, Text, View} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../Styles/Styles';
export default class Welcome extends Component {
  UNSAFE_componentWillMount(){
    
    setTimeout(() => {
      //Actions.Welcome2()
    }, 1000);
  }
  render() {
    //console.ignoredYellowBox = ['Warning: '];
    YellowBox.ignoreWarnings(['Warning: ']);
    return (
      <View style={styles.container}>
          <StatusBar hidden/>
          <ImageBackground source={require('../images/background.png')} style={[styles.imgbackground,{justifyContent:'center'}]}>
              <Image source={require('../images/logo.png')} style={[styles.img,{marginTop:'-20%'}]} />
              <Text allowFontScaling={false} style={styles.text3}>Welcome to Black Lion!</Text>
              <Text allowFontScaling={false} style={styles.tex2}>-- Incubating Innovation --</Text>
          </ImageBackground>
      </View>
    );
  }
}