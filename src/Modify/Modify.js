/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, TouchableWithoutFeedback, } from 'react-native';
import { Icon, Textarea, Button, Container, Content, Header, Left, Body, Right, Title, } from 'native-base'
import { Actions } from 'react-native-router-flux';
import Uri from '../DeviceIp'
export default class InvestorDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:Uri,//'http://192.168.100.4:80',// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com',
            description: '',
            videouri:'video uri',
            fileuri:'file uri',
        }
    }
componentDidMount(){
    console.log("modify id",this.props.M_Id)
     
}
    Entrepreneur_Modification = async () => {
        let data = {
            M_Id: this.props.M_Id,
            values:[{
                modefication_detail: this.state.description,
                modefication_attached: this.state.fileuri,
                modefication_video:this.state.videouri,
                status:'Modify'
              }]
        }
        await fetch(this.state.url + '/Entrepreneur/Entrepreneur_Modification', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Modification Description", resjson.Message,);
                if (resjson.Successful) {
                    console.log("successfully modified")
                    Actions.pop()
                }
            }).catch(err => {
                console.log("Error=>", err)
            })
    }
    render() {
        return (

            <Container style={styles.Containerstyle}>
                <Header hasTabs iosBarStyle="light-content" androidStatusBarColor="#110717" style={styles.header}>

                    <View style={styles.h2}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>


                    <Body style={{ alignItems: "center" }}>

                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <Title allowFontScaling={false} style={{ color: 'white' }}>Update</Title>
                        </View>
                    </Body>

                    <View style={styles.h2}>
                    </View>

                </Header>

                <Content padder>

                    <View style={{ backgroundColor: '#1F1724', padding: 10, borderRadius: 10 }}>
                        <Text style={styles.text}>Deliver Modified Work</Text>

                        <Textarea allowFontScaling={false} value={this.state.description} onChangeText={(v) => this.setState({ description: v })} rowSpan={5} placeholderTextColor="#878787" bordered placeholder="Modification Detail" style={styles.textarea} />

                        <View style={styles.v33}>
                            <Text  allowFontScaling={false} style={styles.text22}>Upload File</Text>
                            <Image source={require('../images/Investor/pdf3.png')} style={styles.imagestyle4} resizeMode="stretch" />
                        </View>
                        <View style={styles.v33}>
                            <Text  allowFontScaling={false} style={styles.text22}>Upload Video</Text>
                            <Image source={require('../images/Investor/pdf3.png')} style={styles.imagestyle4} resizeMode="stretch" />
                        </View>

                    </View>

                </Content>
                <View style={styles.v5}>
                    <TouchableWithoutFeedback onPress={() => this.Entrepreneur_Modification()}>
                        <View style={styles.v6}>
                            <ImageBackground resizeMode="stretch" source={require('../images/buttoncolor.png')} style={styles.btnimage}>
                                <Text allowFontScaling={false} style={styles.text3}>Submit</Text>
                            </ImageBackground>
                        </View>

                    </TouchableWithoutFeedback>
                </View>
            </Container>







        );
    }
}
const styles = StyleSheet.create({
    h2: { width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' },
    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },

    headerstyle: {
        backgroundColor: '#110717'
    },
    Containerstyle: { backgroundColor: '#110717' },
    text: { color: 'white', marginLeft: 20, fontSize: 16, marginTop: 10 },

    v33: { marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    text22: { color: '#878787', },
    imagestyle4: { width: 30, height: 30, },
    textarea: { color: 'white', marginTop: 10, borderRadius: 5 },
    v5: { height: 70, width: '100%', backgroundColor: '#1F1724', alignItems: 'center', justifyContent: 'center' },
    v6: { width: '60%', height: 50 },
    text3: { color: 'white', fontSize: 14, overflow: 'hidden' },
    btnimage: { height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' },



});