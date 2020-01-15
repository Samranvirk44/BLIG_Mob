
import React, { Component } from 'react';
import { StyleSheet, Text, View,ActivityIndicator,Dimensions, TouchableWithoutFeedback, } from 'react-native';
import { Icon, Button, Container, Content, Header, Body, Title, } from 'native-base'
import { CheckBox } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast'
import Uri from '../../DeviceIp'
export default class TermsConditions extends Component {
    //Profile Screen to show from Open profile button
    constructor(props) {
        super(props);

        this.state = {
            loading:false,

            detail: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
                ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,' +
                ' when an unknown printer took a galley of type and scrambled it to make a type' +
                ' specimen book. It has survived not only five centuries, but also the leap into' +
                ' electronic typesetting, remaining essentially unchanged.',
            terms: 'Terms & Conditions',
            checked: false,
            url: Uri//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'

        }
    }
    UpdateProposal = async () => {
        this.setState({loading:true})
        let data = {
            C_Id: this.props.Id,
            Status: 'Going'
        }
        if (this.state.checked) {
            await fetch(this.state.url+'/Contract/Contract_Status', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            })
                .then(res => res.json())
                .then(resjson => {
                    console.log("Company List", resjson.Message);
                    if (resjson.Successful) {
                        this.CreateChatPair();
                    }
                    else{
                        this.setState({loading:false})
                    }
                }).catch(err=>{
                    this.setState({loading:false})
                    this.refs.toast.show('Network request failed', DURATION.LENGTH_LONG);                      
                })
        } else {
            this.setState({loading:false})
            this.refs.toast.show('Accept the terms and condition', DURATION.LENGTH_LONG);
        }


    }
    CreateChatPair = async () => {
        let data = {
            Contract_id: this.props.Id,
        }
        await fetch(this.state.url+'/Chat/Create_Chat_Pair', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Chat pair created", resjson.Message);
                if (resjson.Successful) {
                    Actions.pop()

                    Actions.HCompanyProfile({ Company_Id: this.props.Comp_Id, Active: true })
                }else{
                    this.setState({loading:false})
                }
            }).catch(err=>{
                this.setState({loading:false})
                this.refs.toast.show('Network request failed', DURATION.LENGTH_LONG);                      
            })
    }
    render() {
        return (
            <Container style={styles.Containerstyle}>
                <Header androidStatusBarColor="#110717" style={styles.header}>

                    <View style={styles.h2}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body >
                        <Title allowFontScaling={false} style={[styles.sendername]}>{this.state.terms}</Title>
                    </Body>
                    <Button transparent>
                    </Button>
                </Header>
                <Content padder>

                    <View style={styles.vc}>
                        <Text allowFontScaling={false} style={styles.text1}>{this.state.terms}</Text>
                        <Text allowFontScaling={false} style={styles.text4}>{this.state.detail}</Text>
                        <Text allowFontScaling={false} style={styles.text4}>{this.state.detail}</Text>
                        <Text allowFontScaling={false} style={styles.text4}>{this.state.detail}</Text>
                        <CheckBox
                            center
                            title='I agree to Black Lion terms and conditions'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checkedColor='#EC9705'
                            uncheckedColor='grey'
                            checked={this.state.checked}
                            onPress={() => this.setState({
                                checked: !this.state.checked
                            })}
                            containerStyle={{ width: '100%', alignItems: 'flex-start', padding: 0, backgroundColor: '#110717', borderWidth: 0 }}
                            textStyle={{ color: 'white' }}
                        />
                    </View>
                </Content>
                <View style={styles.footer}>
                    <TouchableWithoutFeedback onPress={() => this.UpdateProposal()}>
                        <View style={styles.v7}>
                            <Text allowFontScaling={false} style={{ color: '#FFFFFF' }}>Proceed</Text>
                        </View>
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
    v7: { width: '75%', borderWidth: 1, borderColor: '#EC9705', borderRadius: 23, height: 43, marginTop: 5, alignItems: "center", justifyContent: "center", alignSelf: 'center', backgroundColor: '#EC9705' },
    vc: { flexDirection: 'column', width: '95%', alignSelf: 'center', alignItems: 'center' },
    footer: { flexDirection: 'row', width: '100%', justifyContent: 'space-around', height: 70, alignSelf: 'center', backgroundColor: '#1F1724' },
    text1: { fontSize: 18, color: '#CCCCCC', alignSelf: 'flex-start' },
    text4: { color: '#8D8D8D', fontSize: 14, marginTop: 10 },







})