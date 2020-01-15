import React, { Component } from 'react';
import { Icon, Tabs, Tab, Container, Header, Right, Body, Title, Content } from 'native-base'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Active from './Tabs/Active';
import New from './Tabs/New';
import Completed from './Tabs/Completed';
import Cancelled from './Tabs/Cancel';
import styles from '../../Styles/Styles';
import { Actions } from 'react-native-router-flux'
import DeviceInfo from 'react-native-device-info';
import Uri from '../../DeviceIp'
export default class ManageProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MacAddress: '',
            obj: {},
            flag: false,
            url: Uri//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
        }
    }
    componentWillMount = async () => {

        DeviceInfo.getMacAddress().then(mac => {
            this.setState({ MacAddress: mac });
            this.get_id(mac);
        });

    }
    get_id = async (mac) => {
        console.log('in getID function', this.state.MacAddress)
        let data = {
            MacAddress: mac,
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
                console.log("Id's", resjson.Message, resjson)
                if (resjson.Successful) {
                    console.log("Successful  ")
                    let temp = {
                        Type: resjson.data.Type,
                        entrepreneur_id: resjson.data.entrepreneur_id,
                        investor_id: resjson.data.investor_id
                    }
                    this.setState({
                        obj: temp,
                        flag: true
                    })
                }
               // console.log('temp:', temp)
            }).catch(err => {
                console.log('error:', err)
            })
    }
    render() {
        return (

            <View style={{ flex: 1 }}>
                <Header hasTabs iosBarStyle="light-content" androidStatusBarColor="#110717" style={styles.pheader}>

                    <View style={styles.h2}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body style={{ alignItems: "center" }}>
                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <Title allowFontScaling={false} style={{ color: 'white' }} > Manage Projects</Title>
                        </View>
                    </Body>
                    <View style={styles.h2}>
                    </View>
                </Header>
                {this.state.flag ?
                    <Tabs tabBarUnderlineStyle={{ backgroundColor: '#EC9705' }} >
                        <Tab heading="Active" tabStyle={{ backgroundColor: '#110717' }} activeTabStyle={{ backgroundColor: '#110717' }} textStyle={{ color: '#545454' }} activeTextStyle={{ color: '#CCCCCC' }}>
                            <Active data={this.state.obj} />
                        </Tab>
                        <Tab heading="New" tabStyle={{ backgroundColor: '#110717' }} activeTabStyle={{ backgroundColor: '#110717' }} textStyle={{ color: '#545454' }} activeTextStyle={{ color: '#CCCCCC' }}>
                            <New data={this.state.obj} />
                        </Tab>
                        <Tab heading="Completed" tabStyle={{ backgroundColor: '#110717' }} activeTabStyle={{ backgroundColor: '#110717' }} textStyle={{ color: '#545454' }} activeTextStyle={{ color: '#CCCCCC' }}>
                            <Completed data={this.state.obj} />
                        </Tab>
                        <Tab heading="Cancelled" tabStyle={{ backgroundColor: '#110717' }} activeTabStyle={{ backgroundColor: '#110717' }} textStyle={{ color: '#545454' }} activeTextStyle={{ color: '#CCCCCC' }}>
                            <Cancelled data={this.state.obj} />
                        </Tab>
                    </Tabs> : <View><ActivityIndicator size="large" color="#ec9705" /></View>
                }
            </View>

        );
    }
}