/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ImageBackground,Image,BackHandler, TouchableWithoutFeedback,Dimensions, StyleSheet,StatusBar,Button, Text, View} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container,Content} from 'native-base'
import styles from '../Styles/Styles'
export default class Welcome2 extends Component {
  gotoLogin(){
  Actions.LogIn();
  }
  gotoSignUp(){
    Actions.SignUp();
    }
    UNSAFE_componentWillMount(){
     // console.log("did mount calling")
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }
    onBackPress = () => {
  //console.log('indexelse=>',Actions.state.index)
      return true
    }
  
  render() {
    return (
     
        <View style={styles.containerlogin}>
          <StatusBar hidden={false} barStyle="light-content" backgroundColor="#000000"/>
          <ImageBackground resizeMode="stretch" source={require('../images/background.png')} style={[styles.imgbackground,{justifyContent:'center'}]}>
              <Image source={require('../images/logo.png')} style={styles.logostyl} />
             <TouchableWithoutFeedback onPress={this.gotoLogin}>
             <View  style={styles.v1}>
             <Text allowFontScaling={false} style={styles.ltext2}>LOG IN</Text>
             </View>
             </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={this.gotoSignUp}>
              <ImageBackground  source={require('../images/buttoncolor.png')} style={styles.imagbackground}>
              <Text allowFontScaling={false} onPress={this.gotoSignUp} style={styles.ltext2}>SIGN UP</Text>
              </ImageBackground>
          </TouchableWithoutFeedback>
          </ImageBackground>
      </View>
     
    );
  }
}

