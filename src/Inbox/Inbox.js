
import React, { Component } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { Icon, Button, Container, Content, Header, Body, Title, } from 'native-base'
import read from '../images/Investor/Path.png';
import path from '../images/Investor/Group03.png';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast';
import Uri from '../DeviceIp'
export default class Inbox extends Component {
    //Profile Screen to show from Open profile button
    constructor(props) {
        super(props);
        this.state = {
            PairList: [],
            Userdata: [],
            Duration: [],
            U_Id: '',
            loading: false,
            url:Uri//'http://192.168.100.4:80',// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
        }
    }
    componentDidMount = () => {
        DeviceInfo.getMacAddress().then(mac => {
            console.log(mac)
            this.setState({ loading: true })
            this.GetInfo(mac);
        })
        //this.Show_PairList(5)
    }
    GetInfo = async (mac) => {
        let data = {
            MacAddress: mac
        }
        await fetch(this.state.url + '/Session/Get_User_Id', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                // console.log("Message=>",resjson.Message,resjson.User_Id)
                if (resjson.Successful) {
                    this.setState({ U_Id: resjson.User_Id })
                    this.Show_PairList(resjson.User_Id)
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Reques Failed!', DURATION.LENGTH_LONG);
            })
    }
    Show_PairList = async (id) => {
        let data = {
            U_Id: id
        }
        await fetch(this.state.url + '/Chat/Show_PairList', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log(resjson)
                if (resjson.Successful) {
                    this.setState({ loading: false, Userdata: resjson.Userdata, PairList: resjson.PairList, Duration: resjson.Duration })
                }
                else{
                    this.setState({ loading: false })
                    this.refs.toast.show('There is no Chat Pair', DURATION.LENGTH_LONG);    
                }
            }).catch(err => {
                console.log(err)
                this.setState({ loading: false })
                this.refs.toast.show('Network Reques Failed!', DURATION.LENGTH_LONG);

            })
    }
    render() {
        return (
            <Container style={styles.Containerstyle}>
                <Header hasTabs iosBarStyle="light-content" androidStatusBarColor="#110717" style={styles.header}>
                    <View style={styles.h2}>
                        <Icon onPress={() => this.props.Screen(3)} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body >
                        <Title allowFontScaling={false} style={{ alignSelf: 'center', color: 'white' }}>Inbox</Title>
                    </Body>
                    <Button transparent>
                        <Image source={path} style={styles.imagestyle3}></Image>

                    </Button>
                </Header>
                <Content>
                    {
                        this.state.PairList.map((data, index) => (
                            <TouchableWithoutFeedback key={index} onPress={() => Actions.ChatBox({ obj: this.state.Duration[index], U_id: this.state.U_Id, Rname: this.state.PairList[0].first_name, Sname: this.state.Userdata[index].first_name })}>
                                <View style={styles.v1}>
                                    <View style={styles.v2}>
                                        <Image source={{ uri: data.profile_pic!=null?data.profile_pic:'/dfg/f/g' }} style={styles.imagestyle} resizeMode='stretch'></Image>
                                    </View>

                                    <View style={styles.v3}>
                                        <Text allowFontScaling={false} style={styles.text2}>{data.first_name} </Text>
                                        <Text allowFontScaling={false} numberOfLines={2} style={styles.text3}>Click to start Chat</Text>
                                    </View>
                                    <View style={styles.v4}>
                                        <Text allowFontScaling={false} style={styles.text4}>{this.state.Duration[index].date_time.slice(0,10)}</Text>
                                        <Image source={read} style={styles.imagestyle2} resizeMode='stretch'></Image>
                                    </View>
                                </View>

                            </TouchableWithoutFeedback>

                        ))
                    }


                </Content>
                {
                    this.state.loading ?
                        <View style={{ position: 'absolute', backgroundColor: "rgba(0,0,0,0.4)", width: Dimensions.get('window').width, height: Dimensions.get('window').height, }}>
                            <ActivityIndicator size="large" color="#EC9705" style={{ position: 'absolute', top: (Dimensions.get('window').height / 2) - 40, left: (Dimensions.get('window').width / 2) - 20 }} />

                        </View>
                        : null
                }

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
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    h2: { width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' },
    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },
    Containerstyle: { backgroundColor: '#110717' },
    v1: { flexDirection: 'row', height: 80, width: '100%', backgroundColor: '#1F1724' },
    v2: { width: '20%', alignItems: 'center', justifyContent: 'center' },
    v3: { width: '57%', justifyContent: 'center', backgroundColor: '#1F1724' },
    imagestyle: { width: 55, height: 55, },
    text2: { fontSize: 14, color: '#FFFFFF', alignSelf: "flex-start" },
    text3: { fontSize: 12, color: '#8D8D8D', alignSelf: "flex-start" },
    text4: { fontSize: 12, color: '#8D8D8D' },
    v4: { backgroundColor: '#1F1724', width: "23%", alignItems: "flex-end", justifyContent: 'center', padding: 5 },
    imagestyle2: { width: 20, height: 22, marginTop: 10 },
    imagestyle3: { width: 20, height: 20, }
})