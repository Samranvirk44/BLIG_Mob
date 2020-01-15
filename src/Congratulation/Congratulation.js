/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, AsyncStorage,YellowBox, Image, StyleSheet, TouchableWithoutFeedback, StatusBar, Button, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Uri from '../DeviceIp'
export default class Congratulations extends Component {
    constructor(props) {
        super(props);
        this.state={
            Type:'',
            url: Uri//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
        }
    }
    UNSAFE_componentWillMount = () => {
        DeviceInfo.getMacAddress().then(mac => {
            this.GetInfo(mac);
        });
    }
    GetInfo = async (mac) => {
        console.log(" i am calling..")
        let data = {
            MacAddress: mac
        }
        await fetch(this.state.url+'/Session/Get_Current_Id', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
              //  console.log('resjson.Message', resjson)
                if (resjson.Successful) {
                    this.setState({Type:resjson.data.Type})
                   // this.Forward(resjson.data.Typ)
                }
            }).catch(err=>{
                alert(err)
            })

    }
    Forward = async () => {
       // let v = await AsyncStorage.setItem('Type', this.props.Type);
      //Actions.IDashBoard();
      DeviceInfo.getMacAddress().then(mac => {
        this.GetInfo(mac);
    });
      console.log('calling..')
        if (this.state.Type == 'Investor') {
            Actions.IDashBoard();
        } else if(this.state.Type=='Entrepreneur'){
            Actions.EDashBoard()
        }
    }
    render() {
        YellowBox.ignoreWarnings(['Warning: ']);
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} backgroundColor="black" />
                <ImageBackground resizeMode="stretch" source={require('../images/breg9.png')} style={styles.imagebackground}>
                    <Image source={require('../images/congrats.png')} style={styles.image1} />
                    <Text allowFontScaling={false} style={styles.text}>Congratulations!</Text>
                    <Text allowFontScaling={false} style={styles.text2}>Welcome to our pride, the</Text>
                    <Text allowFontScaling={false} style={styles.text3}>Black Lion Family</Text>
                    <TouchableWithoutFeedback onPress={() => this.Forward()} >
                        <Image source={require('../images/start.png')} style={styles.image} />
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: { flex: 1 },
    imagebackground: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
    image: { width: 254, height: 56, alignSelf: 'center', borderRadius: 20 },
    text: { fontSize: 19, color: '#CCCCCC', marginTop: 10, marginBottom: 10 },
    text2: { fontSize: 19, color: '#EC9705', marginTop: 10 },
    text3: { fontSize: 19, color: '#EC9705', marginBottom: 10 },
    image1: { width: '60%', height: '35%', alignSelf: 'center', },
});
