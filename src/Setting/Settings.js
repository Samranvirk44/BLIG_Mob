import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Icon, Button, Container, Content, Header, Body, Title, } from 'native-base'
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast';
import Uri from '../DeviceIp'
export default class Setting extends React.Component {
    //Profile Screen to show from Open profile button
    constructor(props) {
        super(props);
        this.state = {
            Mac: null,
            url: Uri,//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com',
            loading: false
        }
    }
    componentWillMount = () => {
        DeviceInfo.getMacAddress().then(mac => {
            this.setState({ Mac: mac });
        });
    }
    Logout = async () => {

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
                        Actions.LogIn();
                    }
                }).catch(err => {
                    this.setState({ loading: false })
                    this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

                })
        }
    }
    render() {
        return (
            <Container style={styles.Containerstyle}>
                <Header androidStatusBarColor="#110717" style={styles.header}>

                    <View style={styles.h2}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body >
                        <Title allowFontScaling={false} style={[styles.sendername]}>Settings</Title>
                    </Body>
                    <Button transparent>
                    </Button>
                </Header>
                <Content>

                    <View style={styles.vc}>
                        <TouchableWithoutFeedback onPress={() => Actions.CCP()}>
                            <View style={styles.vcc}>
                                <Text onPress={() => Actions.CCP()} allowFontScaling={false} style={styles.text1}>Add new payment</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.vcc}>
                            <Text allowFontScaling={false} style={styles.text1}>Term of service</Text>
                        </View>
                        <View style={styles.vcc}>
                            <Text allowFontScaling={false} style={styles.text1}>Privacy Policy</Text>
                        </View>
                        <TouchableWithoutFeedback onPres={() => this.Logout()}>
                            <View style={styles.vcc}>
                                <Text onPress={() => this.Logout()} allowFontScaling={false} style={styles.text1}>Logout</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Content>
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

                {
                    this.state.loading ?
                        <View style={{ position: 'absolute', backgroundColor: "rgba(0,0,0,0.4)", width: Dimensions.get('window').width, height: Dimensions.get('window').height, }}>
                            <ActivityIndicator size="large" color="#EC9705" style={{ position: 'absolute', top: (Dimensions.get('window').height / 2) - 40, left: (Dimensions.get('window').width / 2) - 20 }} />

                        </View>
                        : null
                }

            </Container>
        );
    }
}
const styles = StyleSheet.create({
    h2: { width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' },
    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },
    Containerstyle: { backgroundColor: '#110717' },
    sendername: { color: '#CCCCCC', alignSelf: 'center' },
    vc: { flexDirection: 'column', width: '100%', marginTop: 10 },
    vcc: { width: '100%', borderBottomWidth: 1, borderBottomColor: '#1F1724' },
    text1: { fontSize: 14, color: '#CCCCCC', alignSelf: 'flex-start', padding: 10 },







})