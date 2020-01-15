import React from "react";
import { AppRegistry, Image, StatusBar, AsyncStorage, View, StyleSheet, Switch } from "react-native";
import { Container, Content, Text, List, ListItem, Header, Body, Title, Icon, Left, Right } from "native-base";
import lion from '../images/lion.png';
import Cub from '../images/pawprint.png';
import Roar from '../images/lion1.png';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Uri from '../DeviceIp'
export default class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            EntreStatus: null,
            InvesStatus: null,
            first_name: '',
            name: '',
            status: 'LION',
            switchValue: true,
            Kind: '',
            Kinds: ['Cub', 'Lion', 'Roar'],
            SPic: Cub,
            Mac:'',
            url: Uri,//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com',
            selected: '#FFFFFF',
            Pic: [Cub, lion, Roar],
            colorvalue: ['#FFFFFF', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D'],
            Icons: [require('../images/DBoardA.png'), require('../images/rank.png'), require('../images/rank.png'), require('../images/file.png'), require('../images/file.png'), require('../images/file.png'), require('../images/file.png'), require('../images/setting.png'), require('../images/support.png'), require('../images/online.png'), require('../images/view.png')]
        }
        DeviceInfo.getMacAddress().then(mac => {
            this.setState({Mac:mac})
            this.GetInfo(mac);
            this.UserInfo(mac);
            this.GetInvesOREntre(mac);
        });
    }
   

    UserInfo = async (mac) => {
        console.log(" in get info..")
        let data = {
            MacAddress: mac
        }
        await fetch(this.state.url + '/Session/Get_Drawer_Data', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log(resjson.Message, "Type=>", resjson.data, resjson.data[0].business_kind)
                if (resjson.Successful) {
                    if (resjson.Ent) {
                        this.setState({ first_name: resjson.User_data[0].first_name, Kind: this.state.Kinds[resjson.data[0].business_kind - 1], SPic: this.state.Pic[resjson.data[0].business_kind - 1] })
                    } else {
                        this.setState({ first_name: resjson.User_data[0].first_name, Kind: this.state.Kinds[resjson.data[0].business_kind - 1], SPic: this.state.Pic[resjson.data[0].business_kind - 1] })
                    }
                }
            })

    }
    GetInfo = async (mac) => {
        console.log(" in get info..")
        let data = {
            MacAddress: mac
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
                //   console.log(resjson.Message,"Type=>", resjson.data.Type)
                if (resjson.Successful) {
                    if (resjson.data.Type == 'Investor') {
                        this.setState({ name: 'Entrepreneur' })

                    } else if (resjson.data.Type == 'Entrepreneur') {
                        this.setState({ name: 'Investor' })
                    }
                }
            })

    }

    GetInvesOREntre = async (mac) => {
        console.log(" in GetInvesOREntre :mac:", mac)
        let data = {
            Mac: mac
        }
        await fetch(this.state.url + '/Session/Check_Status_Type', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log('data :', resjson.Message, "Successfully", resjson.Successful, resjson.data, resjson.Investor)
                if (resjson.Successful) {
                    if (resjson.Entrepreneur) {
                        this.setState({ EntreStatus: true, })
                    } else if (resjson.Investor) {
                        console.log("i am true investor")
                        this.setState({ InvesStatus: true })
                    }
                }
            }).catch(err => {
                console.log('error:', err)
            })

    }

    ChangeScenario = async (mac, mode) => {

        let data = {
            Mac: mac,
            Mode: mode
        }
        await fetch(this.state.url + '/Session/Check_Mode', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Check Mode=>", resjson)
                if (resjson.Successful) {
                    if (resjson.invester_entreprenuer) {
                        if (resjson.active) {
                            if (this.Update_Mode_Status(mac)) {
                                if (this.state.name == 'Investor') {
                                    Actions.IDashBoard();
                                } else if (this.state.name == 'Entrepreneur') {
                                    Actions.EDashBoard();
                                }
                            }
                        } else {
                            alert('You did not subscribe any plan yet!')
                            if (this.Update_Mode_Status(mac)) {
                                Actions.SubPlan({ Active: true });
                            }
                        }
                    }
                } else {
                    alert('You are not registered as ' + this.state.name)
                    // Actions.Registration({Type:this.state.name,No:2})
                }
            })
            .catch(err => {
                alert(er)
            })

    }
    // how much you want to invest?  10 M max
    changeAppScenario = async () => {
        if (this.state.name == 'Investor' && this.state.InvesStatus == true) {
            DeviceInfo.getMacAddress().then(mac => {
                this.ChangeScenario(mac, this.state.name)
            })
            //  await AsyncStorage.setItem('Type', 'Investor');
            //   Actions.IDashBoard();
        }
        else if (this.state.name == 'Entrepreneur' && this.state.EntreStatus == true) {
            // await AsyncStorage.setItem('Type', 'Entrepreneur');
            DeviceInfo.getMacAddress().then(mac => {
                this.ChangeScenario(mac, this.state.name)
            })
            //  Actions.EDashBoard();
        }
        else {
            if (this.state.name == 'Investor' | this.state.name == 'Entrepreneur') {
                DeviceInfo.getMacAddress().then(mac => {
                    this.ChangeScenario(mac, this.state.name)
                })
                //  Actions.Registration({Type:this.state.name,No:2})
            }
        }
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
    Logout = async () => {
        if (this.state.Mac != '') {
            this.setState({loading:true})
            let data = {
                Mac: this.state.Mac
            }
            await fetch(this.state.url+'/Session/Logout_Session', {
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
                        this.setState({loading:false})
                        Actions.LogIn();
                    }
                }).catch(err=>{
                    this.setState({ loading: false })
                    this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
                   
                  })
        }
        else{
            alert('Failed!')
        }
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#110717' }}>
                <Content>
                    <ListItem onPress={() => { this.changeAppScenario() }} style={styles.listitems}>
                        <Left>
                            <Icon name="retweet" style={{ color: '#cececd' }} type="AntDesign" />
                            <Text allowFontScaling={false} style={{ color:'#cececd', marginLeft: 16 }}>Switch Mode</Text>
                        </Left>
                    </ListItem>
                    <ListItem onPress={() => {this.Logout() }} style={styles.listitems}>
                        <Left>
                            <Icon onPress={() => {this.Logout() }} name="logout" style={{ color: '#cececd' }} type="AntDesign" />
                            <Text onPress={() => {this.Logout() }} allowFontScaling={false} style={{ color: '#cececd', marginLeft: 16 }}>Logout</Text>
                        </Left>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    imagestyle: { width: 50, height: 50, alignSelf: 'center' },
    imagestyle3: { width: 15, height: 15, },
   
    v22: { width: '30%', justifyContent: "center" },
    v4: { width: '70%', flexDirection: "column", justifyContent: 'center' },
    v5: { flexDirection: "row", justifyContent: 'space-between', width: 43 },
    text1: { fontSize: 18, color: '#CCCCCC' },
    text3: { color: '#D28102', fontSize: 11 },
    listitems: { height: 60, borderBottomColor: '#545454' }
})