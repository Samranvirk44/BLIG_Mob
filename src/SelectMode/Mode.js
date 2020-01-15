/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Text, View, TouchableWithoutFeedback } from 'react-native';
import styles from '../Styles/Styles'
export default class Register1 extends Component {
  constructor(props){
      super(props);
      this.state = {
        selected: '#643F00',
        Icolor: 'black',
        Ecolor: '#643F00'
    }

  }
    componentDidMount=()=>{
      //  this.props.Type=='Investor'?this.setState({Icolor:'#643F00'}):this.setState({Icolor:'black'})
       // this.props.Type=='Entrepreneur'?this.setState({Ecolor:'#643F00'}):this.setState({Ecolor:'black'})
    }  
    selectedbox = (key) => {
       
        
        switch (key) {
            case 1:
                this.setState({ Ecolor: this.state.selected, Icolor: 'black' })
                break;
            case 2:
                this.setState({ Icolor: this.state.selected, Ecolor: 'black' })
                 break;
        }

    }
    gotoReg2=()=> {
        
    //    this.props.Screenno(2)
    }
   
    render() {
        
       // console.disableYellowBox=['Warning: Each', 'Warning: Failed']
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
                <ImageBackground resizeMode="stretch" source={require('../images/regbackground.png')} style={styles.imagebackground}>


                    <View style={styles.mainview}>
                        <Text allowFontScaling={false} style={{ fontSize: 16, color: '#CCCCCC', marginTop: 10 }}>Select Mode?</Text>
                        <View style={styles.v11}>
                            <View style={styles.v2}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(1)}>
                                    <View style={[{ backgroundColor: this.state.Ecolor }, styles.v3]}>
                                        <Image source={require('../images/company.png')} style={styles.imagesize} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={[styles.text,]}>Entrepreneur</Text>
                            </View>
                            <View style={[styles.v2,{marginLeft:10}]}>
                                <TouchableWithoutFeedback onPress={() => this.selectedbox(2)}>
                                    <View style={[{ backgroundColor: this.state.Icolor }, styles.v3]}>
                                        <Image source={require('../images/boss.png')} style={styles.imagesize} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={styles.text}>Investor</Text>
                            </View>

                        </View>

                    </View>
               
                </ImageBackground>
            </View>
        );
    }
}

