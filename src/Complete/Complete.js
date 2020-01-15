import React, { Component } from 'react';
import { Container, Content, Header, Body, Icon, Title, Button } from 'native-base';
import { Text, View, Dimensions, ActivityIndicator, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import styles from '../Styles/Styles';
import { Actions } from 'react-native-router-flux';
import { test } from '../Converter';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast'
import Uri from '../DeviceIp'
export default class Complete_Milestone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '2 hours ago',
            status: 'Review',
            CompleteMilestone: [],
            loading: false,
            url:Uri// 'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
        }
    }
    componentDidMount = () => {
        DeviceInfo.getMacAddress().then(mac => {
            this.setState({ loading: true })
            this.get_id(mac);
        });


    }
    get_id = async (mac) => {
        let MacAddress = mac;
        let data = {
            MacAddress: MacAddress
        }
        await fetch(this.state.url + '/Session/Get_Current_Id', {
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
                    if (resjson.data.Type == 'Investor') {
                        console.log('Investor::::')
                        this.CompleteMilestone(resjson.data.investor_id);//investor _Id
                    }
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })

    }
    CompleteMilestone = async (id) => {
        let data = {
            I_Id: id
        }
        await fetch(this.state.url + '/Investor/Complete_Milestone', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
             //   console.log("Complete Milestone ", resjson.Message, resjson.data[0].milestones)
                if (resjson.Successful) {
                    this.setState({ loading: false, CompleteMilestone: resjson.data[0].milestones })
                }
                else{
                    this.setState({loading:false});
                    this.refs.toast.show('Yet not any Milestone complete', DURATION.LENGTH_LONG);
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })

    }
    render() {
        // console.log("component mount caliind")

        return (

            <Container style={styles.Containerr}>
                <Header hasTabs iosBarStyle="light-content" androidStatusBarColor="#110717" style={{ width: '100%', justifyContent: 'center', backgroundColor: '#110717' }}>

                    <View style={{ width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>


                    <Body style={{ alignItems: "center" }}>

                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <Title allowFontScaling={false} style={{ color: 'white' }}>Complete Milestone</Title>
                        </View>
                    </Body>

                    <View style={{ width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    </View>

                </Header>
                <Content padder>

                    <View style={{ backgroundColor: '#1F1724', width: Dimensions.get('window').width-20 ,borderRadius:10}}>
                        {
                            this.state.CompleteMilestone.map((data, index) => (
                                
                                <View key={index} style={{ padding: 15 }}>
                                    <Text style={{ fontSize: 18, color: '#FFFFFF' }}>{data.project_tittle}</Text>
                                    <Text style={{ fontSize: 14, color: '#8D8D8D', }}>{data.project_description}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 14, color: '#8D8D8D' }}>Start Date</Text>
                                        <Text style={{ fontSize: 14, color: '#8D8D8D'}}>End Date</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: 'white' }}>{data.milestone_start.slice(0, 10)}</Text>
                                        <Text style={{ color: 'white' }}>{data.milestone_end.slice(0, 10)}</Text>
                                    </View>
                                    <View style={ {marginTop:10, flexDirection:'row', width: '100%', alignItems: 'center', justifyContent:'space-between' }}>
                                        <TouchableWithoutFeedback onPress={()=>Actions.Feedback({M_Id:data.id,C_Id:data.c_investor_id})}>
                                            <View style={{ width: 100,backgroundColor:'#EC9705',borderRadius:20,justifyContent:'center',alignItems:'center', height: 40, padding: 10 }}>
                                                <Text onPress={()=>Actions.Feedback({M_Id:data.id,C_Id:data.c_investor_id})} style={{color:'white',fontSize:14}}>Accept</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={()=>Actions.Modify({M_Id:data.id})}>
                                            <View style={{ width: 100,borderWidth:1,borderColor:'#cececd',borderRadius:20 ,height: 40, padding: 10 ,justifyContent:'center',alignItems:'center',}}>
                                                <Text onPress={()=>Actions.Modify()} style={{color:'white',fontSize:14}}>Modify</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>

                                </View>
                            ))
                        }

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
