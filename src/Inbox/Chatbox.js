
import React, { Component } from 'react';
import { StyleSheet, TextInput,Dimensions,ActivityIndicator, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { Icon, Button, Container, Content, Header, Body, Title, Subtitle } from 'native-base'
import { Actions } from 'react-native-router-flux';
import io from 'socket.io-client';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast'
const socket = io("http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com")
import Uri from '../DeviceIp'


export default class Chatbox extends Component {
    //Profile Screen to show from Open profile button
    constructor(props) {
        super(props);
        this.state = {
            senderName: 'Junaid Eyeconic',
            message: 'Perfect. I want to d f askdf asdkf asdk',
            time: ' 07:50 PM',
            subtitle: 'Away | Local Time 07:05 PM',
            Name: 'Junaid eyeconic',
            Receive: [],
            Sender: [],
            Message: '',
            SenderId: 'Ali',
            Chat: [],
            Mac: '',
            ReceiverId: '',
            loading: false,
            url:Uri //'http://192.168.100.4:80',// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'

        }
    }
    Get_All_Messages = async (id) => {
        this.setState({ loading: true })
        let data = {
            Pair_Id: id
        }
        await fetch(this.state.url + '/Chat/Get_All_Messages', {
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
                    this.setState({ loading: false,Chat:resjson.Chat })
                } else {
                    this.setState({ loading: false })
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Reques Failed!', DURATION.LENGTH_LONG);
            })
    }
    UNSAFE_componentWillMount = () => {

        this.Get_All_Messages(this.props.obj.id)
        if (this.props.obj.user1 == this.props.U_id) {
            //            console.log('Receiver Id will be 1',this.props.obj.user2,this.props.U_id)
            this.setState({ ReceiverId: this.props.obj.user2 })
            socket.on(this.props.obj.user1, Message => {
                // console.log("Message=>", Message)
                this.setState({ Chat: Message })
            })
        } else {
            // console.log('Receiver Id will be 2',this.props.obj.user2)
            this.setState({ ReceiverId: this.props.obj.user1 })
            socket.on(this.props.obj.user2, Message => {
                //   console.log("Message=>", Message)
                this.setState({ Chat: Message })
            })
        }
        DeviceInfo.getMacAddress().then(mac => {
            this.setState({ Mac: mac });
        })
    }
    SendMessage = async () => {
        console.log('Message sending...', this.state.Mac)
        // this.setState({ Sender: [...this.state.Sender, this.state.Message] })
        socket.emit("BLIG", {
            Message: this.state.Message,
            SenderId: this.props.U_id,
            PairId: this.props.obj.id,
            ReceiverId: this.state.ReceiverId
        })
        this.setState({ Message: '' })
    }
    render() {
        //   const ReveiverMessages = this.state.Receiver.map((msg, index) => (<Text style={{color:'white'}} key={index}>{msg}</Text>))

        return (
            <Container style={styles.Containerstyle}>
                <Header hasTabs iosBarStyle="light-content" androidStatusBarColor="#110717" style={styles.header}>
                    <View style={styles.h2}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body style={{ alignItems: "center" }}>
                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <Title allowFontScaling={false} style={[styles.sendername]}>{this.state.senderName}</Title>
                            <View style={styles.headerbodyView}></View>
                        </View>
                        <Subtitle allowFontScaling={false} style={styles.subtitle}>{this.state.subtitle}</Subtitle>
                    </Body>

                    <Button transparent>
                        <Image source={require('../images/Investor/phone3.png')} style={styles.imagestyle3}></Image>
                    </Button>
                    <Button transparent>
                        <Image source={require('../images/Investor/Detail.png')} resizeMode="stretch" style={styles.imagestyle4}></Image>
                    </Button>

                </Header>
                <Content>
                    {
                        this.state.Chat.map((ChatMessage, index) => (
                            ChatMessage.state == this.state.ReceiverId ?

                                <View key={index} style={styles.v1}>
                                    <View style={styles.v22}>
                                        <Image source={require('../images/Investor/Ellipse3x.png')} style={styles.imagestyle} resizeMode='stretch'></Image>
                                    </View>
                                    <View style={styles.v5}>
                                        <View style={styles.v3}>
                                            <Text allowFontScaling={false} style={styles.text2}>{this.props.Sname}</Text>
                                            <Text allowFontScaling={false} style={styles.text3}>{ChatMessage.message}</Text>
                                        </View>
                                        <View style={styles.v4}>
                                            <Text allowFontScaling={false} style={styles.text4}>{this.state.time}</Text>
                                        </View>
                                    </View>

                                </View>
                                :
                                <View key={index} style={styles.v1}>
                                    <View style={styles.v5}>
                                        <View style={styles.v3}>
                                            <Text allowFontScaling={false} style={styles.text2}>{this.props.Rname}</Text>
                                            <Text allowFontScaling={false} style={styles.text3}>{ChatMessage.message}</Text>
                                        </View>
                                        <View style={styles.v4}>
                                            <Text allowFontScaling={false} style={styles.text4}>{this.state.time}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.v22}>
                                        <Image source={require('../images/Investor/Ellipse3x.png')} style={styles.imagestyle} resizeMode='stretch'></Image>
                                    </View>

                                </View>

                        ))
                    }


                </Content>
                <View style={styles.footer}>
                    <View style={styles.btnview}>
                        <Button transparent style={styles.buttons}>
                            <Image source={require('../images/Investor/attach.png')} resizeMode="stretch" style={styles.imagestyle3}></Image>
                        </Button>
                    </View>

                    <View style={styles.inputtextview}>
                        <TextInput value={this.state.Message} onChangeText={(Msg) => this.setState({ Message: Msg })} placeholderTextColor="#8D8D8D" placeholder="Type here..." style={styles.inputtext} />

                    </View>

                    <View style={styles.btnview}>
                        <Button onPress={() => this.SendMessage()} transparent style={styles.buttons}>
                            <Image source={require('../images/Investor/send3.png')} style={styles.imagestyle5}></Image>
                        </Button>
                    </View>


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
    header: { backgroundColor: '#110717' },
    Containerstyle: { backgroundColor: '#110717' },
    v1: { flexDirection: 'row', width: '100%', padding: 5, marginBottom: 5 },
    v3: { width: '80%', },
    v22: { width: '20%', height: 65, justifyContent: 'center', alignItems: 'center' },
    imagestyle: { width: 60, height: 60, },
    text2: { fontSize: 14, color: '#FFFFFF' },
    text3: { fontSize: 12, color: '#8D8D8D', overflow: 'visible' },
    text4: { fontSize: 12, color: '#8D8D8D', marginTop: 4, alignSelf: "flex-end" },
    v4: { width: "20%", },
    imagestyle3: { width: 20, height: 20, },
    imagestyle5: { width: 35, height: 35, },
    imagestyle4: { width: 6, height: 22, },
    sendername: { color: '#CCCCCC' },
    subtitle: { color: '#CCCCCC', fontSize: 10, alignSelf: "center" },
    headerbodyView: { backgroundColor: '#14E272', width: 8, height: 8, borderRadius: 10 },
    v5: {
        width: '80%', flexDirection: "row", justifyContent: "space-around",
        borderRadius: 10, backgroundColor: '#1F1724', padding: 5
    },

    inputtext: { backgroundColor: '#110717', borderRadius: 20, borderColor: '#707070', color: '#CCCCCC', height: 40, paddingLeft: 5, fontSize: 14, borderWidth: 1 },
    footer: {
        flexDirection: 'row', width: '100%', height: 60, backgroundColor: '#1F1724',
        alignItems: "center", justifyContent: "space-around"
    },
    btnview: { width: '15%', height: 60, alignItems: 'center' },
    inputtextview: { width: '70%', backgroundColor: '#1F1724', height: 35 }


})