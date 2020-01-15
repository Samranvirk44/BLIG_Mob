/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, Image, ScrollView, TouchableWithoutFeedback, StatusBar, Button, Text, View } from 'react-native';
import { Icon,Drawer } from 'native-base';
import Pic10 from '../images/reg10.png'
import Pic6 from '../images/reg7.png'
import styles from '../Styles/Styles'
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast';
import SideBar from './Drawer';
import Uri from '../DeviceIp'
export default class RegSubscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: Pic6,
            text: 'Lorem Ipsum Text here',
            colorvalue: ['#643F00', 'black', 'black', 'black'],
            checked: true,
            Amount: [300, 600, 900, 1200],
            MacAddress: '',
            loading: false,
            U_Id: '',
            entre_id: '',
            Type: '',
            RegSubscription: 1,
            url:Uri//'http://192.168.100.4:80',// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
        }
    }

    selectedbox = (key) => {
        let temp = this.state.colorvalue;
        console.log(key)
        temp = ['black', 'black', 'black', 'black']
        temp[key] = '#643F00'
        this.setState({ colorvalue: temp, RegSubscription: key + 1 })

    }
    UNSAFE_componentWillMount = async () => {
        DeviceInfo.getMacAddress().then(mac => {
            this.setState({ MacAddress: mac, loading: true });
            this.get_id(mac)
            this.GetPlan()
        });

    }
    GetPlan = async () => {
        await fetch(this.state.url + '/Subscription/GetSub_Plan')
            .then(response => response.json())
            .then(res => {
                if (res.Successful) {
                    let data = []
                    for (let index = 0; index < res.data.length; index++) {
                        data.push(res.data[index].subs_amount)
                    }
                    this.setState({ Amount: data })
                }
            })
            .catch(err => alert(err))


    }
    Reverse = () => {
        if (this.props.Active) {
            DeviceInfo.getMacAddress().then(mac => {
                if (this.Update_Mode_Status(mac)) {
                    Actions.pop()
                }
            })
        } else {
            Actions.pop(), Actions.Registration({ Active: true })
        }
    }
    Forward = () => {
        //this.props.Register();
        Actions.SubPayment({ Type: this.state.Type, Amount: this.state.Amount[this.state.RegSubscription - 1], Index: this.state.RegSubscription });
    }
    UserSubscription = async () => { //copied from Reg fragment for subscription
        let userid = null
        let Ent = false
        if (this.state.Type == 'Investor') {
            userid = this.state.Iid;
            Ent = false
        }
        else if (this.state.Type == 'Entrepreneur') {
            userid = this.state.Eid;
            Ent = true
        }

        let data = {
            values: [{
                subscription_id: (this.state.RegSubscription + 1),
                user_id: userid,
                payed: false,
                entreprenuer: Ent
            }]
        }
        await fetch(this.state.url + '/User/User_Subscription', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("user subscription", resjson.Message)
                if (resjson.Successful) {
                    Actions.SubPayment();
                }
            }).catch(err => {
                alert('Failed Subscription !')
            })
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
                    this.setState({ U_Id: resjson.data.user_id, Type: resjson.data.Type });//userid
                    if (resjson.data.Type == 'Investor') {
                        //   console.log('Investor::::')
                        this.setState({ entre_id: resjson.data.investor_id });//investor _Id

                    } else if (resjson.data.Type == 'Entrepreneur') {
                        // console.log('Entrepreneur::::')
                        this.setState({ entre_id: resjson.data.entrepreneur_id });
                    }
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!' + err, DURATION.LENGTH_LONG);

            })

    }
    Update_Mode_Status = async (mac) => {
        let data = {
            Mac: mac
        }
        await fetch(this.state.url + '/Session/Update_Mode_Status', {
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
                    return true;
                } else {
                    return false;
                }
            })
            .catch(err => {
                return false;
                //                alert('Network Request Failed!.')
            })

    }
    closeDrawer = () => {
        this.drawer._root.close()
    }
    openDrawer = () => {
        // console.log("i am") 
        this.drawer._root.open()
    };
    render() {
        console.disableYellowBox = ['Warning: Each', 'Warning: Failed']
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                openDrawerOffset={0.05}
                content={<SideBar close={() => this.closeDrawer()} />}
            >
                <View style={styles.container}>
                    <StatusBar hidden={false} backgroundColor="black" />
                    <ImageBackground resizeMode="stretch" source={require('../images/breg8.png')} style={styles.imagebackground}>
                        <Icon onPress={() => this.openDrawer()} name="menu" style={{ color: 'white', position: 'absolute', top: 20, left: 20 }} type="Entypo" />

                        <View style={styles.mainview}>
                            <Text allowFontScaling={false} style={styles.text3}>Subscription Plan</Text>
                            <View style={styles.v4}>

                                <View style={styles.v9}>
                                    <TouchableWithoutFeedback onPress={() => this.selectedbox(0)}>
                                        <View style={[styles.v5, { backgroundColor: this.state.colorvalue[0] }]}>
                                            <Text allowFontScaling={false} style={styles.text4}>£{this.state.Amount[0]}</Text>
                                            <Text allowFontScaling={false} style={styles.duration}>Per Month</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>

                                <View style={styles.v9}>
                                    <TouchableWithoutFeedback onPress={() => this.selectedbox(1)}>
                                        <View style={[styles.v5, { backgroundColor: this.state.colorvalue[1] }]}>
                                            <Text allowFontScaling={false} style={styles.text4}>£{this.state.Amount[1]}</Text>
                                            <Text allowFontScaling={false} style={styles.duration}>Quarterly</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={styles.v4}>

                                <View style={styles.v9}>
                                    <TouchableWithoutFeedback onPress={() => this.selectedbox(2)}>
                                        <View style={[styles.v5, { backgroundColor: this.state.colorvalue[2] }]}>
                                            <Text allowFontScaling={false} style={styles.text4}>£{this.state.Amount[2]}</Text>
                                            <Text allowFontScaling={false} style={styles.duration}>06 Month</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>

                                <View style={styles.v9}>
                                    <TouchableWithoutFeedback onPress={() => this.selectedbox(3)}>
                                        <View style={[styles.v5, { backgroundColor: this.state.colorvalue[3] }]}>
                                            <Text allowFontScaling={false} style={styles.text4}>£{this.state.Amount[3]}</Text>
                                            <Text allowFontScaling={false} style={styles.duration}>Yearly</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        <View style={styles.vl}>
                            <TouchableWithoutFeedback onPress={() => this.Reverse()}>
                                <Image source={require('../images/left.png')} style={styles.imgsize} />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.Forward()}>
                                <Image source={require('../images/right.png')} style={styles.imgsize} />
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
                    </ImageBackground>
                </View>
            </Drawer>

        );
    }
}

