import React, { Component } from 'react';
import { Icon, Tabs, Tab, Container, Header, Right, Body, Title, Content } from 'native-base'
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Tab1 from './Tabs/Stages';
import Tab2 from './Tabs/Review';
import Tab3 from './Tabs/Pending';
import Tab4 from './Tabs/Available';
import DeviceInfo from 'react-native-device-info';
import {test} from '../Converter';
import Uri from '../DeviceIp'
export default class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: null,
            url:Uri,//'http://192.168.100.4:80',// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com',
            amount:'0'
        }
    }
    componentWillMount = () => {
      //  console.log("will mount calling")
        DeviceInfo.getMacAddress().then(mac => {
        //    console.log("mac=>", mac);
            this.get_id(mac)
        });
    }
    get_id = async (mac) => {
        let MacAddress = mac;
        let data = {
            MacAddress: MacAddress
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
                console.log('Message=>',resjson.Message,resjson)
                if (resjson.Successful) {
                    if (resjson.data.Type == 'Investor') {
                        let temp = {
                            Type: resjson.data.Type,
                            Id: resjson.data.investor_id
                        }
                        this.setState({
                            obj: temp
                        })
                    }
                    else if (resjson.data.Type == 'Entrepreneur') {
                        let temp = {
                            Type: resjson.data.Type,
                            Id: resjson.data.entrepreneur_id
                        }
                        this.setState({
                            obj: temp
                        })
                    }
                }
                else {
                }
            }).catch(err => {
                console.log('error')
            })
    }
    render() {
        return (
            <Container>

                <Header iosBarStyle="light-content" androidStatusBarColor="#110717" style={styles.header}>
                    <View style={styles.h2}>
                        <Icon onPress={() => this.props.Screen(3)} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body style={{ alignItems: "center" }}>

                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <Title allowFontScaling={false} style={{ color: 'white' }}>Wallet</Title>
                        </View>
                    </Body>

                    <View style={styles.h2}>
                    </View>

                </Header>

                <View style={styles.v1}>
                    <ImageBackground source={require('../images/Entrepreneur/wallet.png')} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={{ color: '#E69705', fontSize: 31 }}>${test(this.state.amount)}</Text>
                        <Text allowFontScaling={false} style={{ color: 'white', fontSize: 12 }}>Total Balance</Text>
                    </ImageBackground>
                </View>
                <Tabs initialPage={0} tabBarUnderlineStyle={{ backgroundColor: '#EC9705' }}>
                    <Tab heading="Stages" tabStyle={{ backgroundColor: '#110717' }} activeTabStyle={{ backgroundColor: '#110717' }} textStyle={{ color: '#545454' }} activeTextStyle={{ color: '#CCCCCC' }}>
                        <Tab1 DataObj={this.state.obj} />
                    </Tab>
                    <Tab heading="In Review" tabStyle={{ backgroundColor: '#110717' }} activeTabStyle={{ backgroundColor: '#110717' }} textStyle={{ color: '#545454' }} activeTextStyle={{ color: '#CCCCCC' }}>
                        <Tab2 DataObj={this.state.obj} />
                    </Tab>
                    <Tab heading="Pending" tabStyle={{ backgroundColor: '#110717' }} activeTabStyle={{ backgroundColor: '#110717' }} textStyle={{ color: '#545454' }} activeTextStyle={{ color: '#CCCCCC' }}>
                        <Tab3 DataObj={this.state.obj} />
                    </Tab>
                    <Tab heading="Available" tabStyle={{ backgroundColor: '#110717' }} activeTabStyle={{ backgroundColor: '#110717' }} textStyle={{ color: '#545454' }} activeTextStyle={{ color: '#CCCCCC' }}>
                        <Tab4 DataObj={this.state.obj} />
                    </Tab>
                </Tabs>

            </Container>
        );
    }
}
const styles = StyleSheet.create({
    h2: { width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' },
    //   header: { backgroundColor: '#110717' },

    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },
    v1: { width: '100%', height: 150, backgroundColor: '#1F1724' },
})