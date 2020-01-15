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
            ETypes: [],
            EServices: [],
            picuri: '/temp',
            Services: ['Promotion', 'Radio Promotion', 'Television Transmission', 'Digital Promotion'
                , 'Brand Development', 'Acount Manager', 'Business Consultance'],

            url: Uri,//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com',
            selected: '#FFFFFF',
            Pic: [Cub, lion, Roar],
            colorvalue: ['#FFFFFF', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D'],
            Icons: [require('../images/DBoardA.png'), require('../images/rank.png'), require('../images/rank.png'), require('../images/file.png'), require('../images/file.png'), require('../images/file.png'), require('../images/file.png'), require('../images/setting.png'), require('../images/support.png'), require('../images/online.png'), require('../images/view.png')]
        }
        DeviceInfo.getMacAddress().then(mac => {
            this.GetInfo(mac);
            this.UserInfo(mac);
            this.get_id(mac);
            this.GetInvesOREntre(mac);
        });
    }
    selectedbox = (key) => {
        let Resetcolor = ['#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D',];
        let ResetIcons = [require('../images/DBoard.png'), require('../images/rank.png'), require('../images/rank.png'), require('../images/file.png'), require('../images/file.png'), require('../images/file.png'), require('../images/setting.png'), require('../images/support.png'), require('../images/online.png'), require('../images/view.png')]
        switch (key) {
            case 0:
                Resetcolor[0] = '#CCCCCC';
                ResetIcons[0] = require('../images/DBoardA.png');
                this.setState({ colorvalue: Resetcolor, Icons: ResetIcons });
                break;
            case 1:
                Resetcolor[1] = '#CCCCCC';
                ResetIcons[1] = require('../images/rankA.png');
                this.setState({ colorvalue: Resetcolor, Icons: ResetIcons });
                break;
            case 2:
                Resetcolor[2] = '#CCCCCC';
                ResetIcons[2] = require('../images/fileA.png');
                this.setState({ colorvalue: Resetcolor, Icons: ResetIcons });
                break;
            case 3:
                Resetcolor[3] = '#CCCCCC';
                ResetIcons[3] = require('../images/fileA.png');
                this.setState({ colorvalue: Resetcolor, Icons: ResetIcons });
                break;
            case 4:
                Resetcolor[4] = '#CCCCCC';
                ResetIcons[4] = require('../images/fileA.png');
                this.setState({ colorvalue: Resetcolor, Icons: ResetIcons });
                break;
            case 5:
                Resetcolor[5] = '#CCCCCC';
                ResetIcons[5] = require('../images/settingA.png');
                this.setState({ colorvalue: Resetcolor, Icons: ResetIcons });
                break;
            case 6:
                Resetcolor[6] = '#CCCCCC';
                ResetIcons[6] = require('../images/supportA.png');
                this.setState({ colorvalue: Resetcolor, Icons: ResetIcons });
                break;
            case 7:
                Resetcolor[7] = '#CCCCCC';
                ResetIcons[7] = require('../images/onlineA.png');
                this.setState({ colorvalue: Resetcolor, Icons: ResetIcons });
                break;
            case 8:
                Resetcolor[8] = '#CCCCCC';
                ResetIcons[8] = require('../images/viewA.png');
                this.setState({ colorvalue: Resetcolor, Icons: ResetIcons });
                break;
        }


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
                //console.log("user data=>",)
                if (resjson.Successful) {
                    if (resjson.Ent) {
                        this.setState({ picuri: resjson.User_data[0].profile_pic, first_name: resjson.User_data[0].first_name, Kind: this.state.Kinds[resjson.data[0].business_kind - 1], SPic: this.state.Pic[resjson.data[0].business_kind - 1] })
                    } else {
                        this.setState({ picuri: resjson.User_data[0].profile_pic, first_name: resjson.User_data[0].first_name, Kind: this.state.Kinds[resjson.data[0].business_kind - 1], SPic: this.state.Pic[resjson.data[0].business_kind - 1] })
                    }
                }
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

                    if (resjson.data.Type == 'Entrepreneur') {
                        //  console.log('Entrepreneur::::')
                        this.Entrepreneur_TypeServices(resjson.data.entrepreneur_id);
                    }
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

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
    Entrepreneur_TypeServices = async (v) => {
        //  console.log('entrepreneur calling')
        let data = {
            E_Id: v,
        }
        await fetch(this.state.url + '/Entrepreneur/Entrepreneur_Company_Types', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                //   console.log("calling response=>", resjson)
                if (resjson.Successful) {
                    this.setState({ ETypes: resjson.business_kind, EServices: resjson.business_types })

                }

            }).catch(err => alert(err))
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
                    } else {
                        alert('You are not registered as ' + this.state.name)
                        if (this.Update_Mode_Status(mac)) {
                            Actions.Registration({ Type: this.state.name, No: { no: 2, Ent: 'D' } })
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
    render() {
        return (
            <Container style={{ backgroundColor: '#110717' }}>
                <Content>
                    <View style={{ width: '100%', height: 120, flexDirection: 'row', borderWidth: 1, borderBottomColor: '#545454' }}>
                        <View style={styles.v22}>
                            <View style={styles.v222}>
                                <Image source={{ uri: this.state.picuri }} style={styles.imagestyle} resizeMode='stretch'></Image>
                            </View>
                        </View>

                        <View style={styles.v4}>
                            <Text allowFontScaling={false} style={styles.text1}>{this.state.first_name}</Text>
                            <View style={{ flexDirection: 'row', width: '80%' }}>

                                {
                                    this.state.EServices.map((data, index) => (
                                        index <= 1 ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text key={index} allowFontScaling={false} style={styles.text22}>{this.state.Services[data.business_type]}, </Text>
                                            </View>
                                            :
                                            <View>
                                            </View>
                                    ))
                                }

                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', width: '80%' }}>

                                {
                                    this.state.EServices.map((data, index) => (
                                        index > 1 & index <= 3 ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text key={index} allowFontScaling={false} style={styles.text22}>{this.state.Services[data.business_type]}, </Text>
                                            </View>
                                            :
                                            <View>
                                            </View>
                                    ))
                                }

                            </View>
                            <View style={{ flexDirection: 'row', width: '80%' }}>

                                {
                                    this.state.EServices.map((data, index) => (
                                        index > 3 ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text key={index} allowFontScaling={false} style={styles.text22}>{this.state.Services[data.business_type]}, </Text>
                                            </View>
                                            :

                                            <View>
                                            </View>
                                    ))
                                }

                            </View>
                            <View style={styles.v5}>
                                {
                                    this.state.ETypes.length == 0 ?
                                        <View style={{ flexDirection: 'row' }}>
                                        </View>
                                        :
                                        this.state.ETypes.map((data, index) => (
                                            <Text key={index} allowFontScaling={false} style={styles.text2}>{this.state.Kinds[data.business_kind]}, </Text>
                                        ))
                                }
                            </View>
                            <View style={styles.v5}>
                                <Image source={this.state.SPic} style={styles.imagestyle3}></Image>
                                <Text allowFontScaling={false} style={styles.text3}>{this.state.Kind}</Text>
                            </View>
                        </View>
                    </View>


                    <ListItem onPress={() => { this.selectedbox(0), this.props.close() }} style={styles.listitems}>
                        <Left>
                            <Image source={this.state.Icons[0]} style={[styles.imagestyle5]}></Image>
                            <Text allowFontScaling={false} style={{ color: this.state.colorvalue[0], marginLeft: 16 }}>Black Lion Dashboard</Text>
                        </Left>
                    </ListItem>
                    <ListItem onPress={() => { this.selectedbox(1), Actions.ManageProjects() }} style={styles.listitems}>
                        <Left>
                            <Image source={this.state.Icons[1]} style={[styles.imagestyle5]}></Image>
                            <Text allowFontScaling={false} style={{ color: this.state.colorvalue[1], marginLeft: 16 }}>Manage Projects</Text>
                        </Left>
                    </ListItem>
                    {
                        this.state.InvesStatus ?
                            <ListItem onPress={() => { this.selectedbox(2), Actions.Complete() }} style={styles.listitems}>
                                <Left>
                                    <Image source={this.state.Icons[2]} style={[styles.imagestyle5]}></Image>
                                    <Text allowFontScaling={false} style={{ color: this.state.colorvalue[2], marginLeft: 16 }}>Complete MileStones</Text>
                                </Left>
                            </ListItem>
                            :
                            <View></View>

                    }

                    <ListItem onPress={() => { this.selectedbox(3), Actions.MarketPlaceTab() }} style={styles.listitems}>
                        <Left>
                            <Image source={this.state.Icons[3]} style={[styles.imagestyle5]}></Image>
                            <Text allowFontScaling={false} style={{ color: this.state.colorvalue[3], marginLeft: 16 }}>Market Place</Text>
                        </Left>
                    </ListItem>

                    <ListItem onPress={() => { this.selectedbox(4), Actions.Session({ page: 0 }) }} style={styles.listitems}>
                        <Left>
                            <Image source={this.state.Icons[4]} style={[styles.imagestyle5]}></Image>
                            <Text allowFontScaling={false} style={{ color: this.state.colorvalue[4], marginLeft: 16 }}>Webinar</Text>
                        </Left>
                    </ListItem>
                    <ListItem onPress={() => { this.selectedbox(5), Actions.Session({ page: 1 }) }} style={styles.listitems}>
                        <Left>
                            <Image source={this.state.Icons[5]} style={[styles.imagestyle5]}></Image>
                            <Text allowFontScaling={false} style={{ color: this.state.colorvalue[5], marginLeft: 16 }}>Seminar</Text>
                        </Left>
                    </ListItem>
                    <ListItem onPress={() => { this.selectedbox(6), Actions.Settings() }} style={styles.listitems}>
                        <Left>
                            <Image source={this.state.Icons[6]} style={[styles.imagestyle5]}></Image>
                            <Text allowFontScaling={false} style={{ color: this.state.colorvalue[6], marginLeft: 16 }}>Settings</Text>
                        </Left>
                    </ListItem>
                    <ListItem onPress={() => { this.selectedbox(7), Actions.Support() }} style={styles.listitems}>
                        <Left>
                            <Image source={this.state.Icons[7]} style={[styles.imagestyle5]}></Image>
                            <Text allowFontScaling={false} style={{ color: this.state.colorvalue[7], marginLeft: 16 }}>Support</Text>
                        </Left>
                    </ListItem>
                    <ListItem onPress={() => this.selectedbox(8)} style={styles.listitems}>
                        <Left>
                            <Image source={this.state.Icons[8]} style={[styles.imagestyle5]}></Image>
                            <Text allowFontScaling={false} style={{ color: this.state.colorvalue[8], marginLeft: 16 }}>Online Status</Text>
                        </Left>
                        <Right>
                            <View >
                                <Switch

                                    value={this.state.switchValue}
                                    onValueChange={(switchValue) => this.setState({ switchValue })}
                                    trackColor={{
                                        true: '#EC9005',
                                        false: '#1F1724',
                                    }}
                                    thumbColor='#EC9707'
                                    style={{ width: 70 }} />
                            </View>
                        </Right>
                    </ListItem>
                    <ListItem onPress={() => { this.selectedbox(8), this.changeAppScenario() }} style={styles.listitems}>
                        <Left>
                            <Image source={this.state.Icons[8]} style={[styles.imagestyle5]}></Image>
                            <Text allowFontScaling={false} style={{ color: this.state.colorvalue[8], marginLeft: 16 }}>View as an {this.state.name}</Text>
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
    imagestyle4: { width: 22, height: 22, },
    imagestyle5: { width: 18, height: 18, },
    imagestyle6: { width: 30, height: 30, },
    v22: { justifyContent: 'center', alignItems: 'center', width: '30%',height:'100%', justifyContent: "center" },
    v222: { width: 60, height: 60, borderRadius: 30, borderWidth: 1, borderColor: '#cececd' },
    v4: { width: '70%', flexDirection: "column", justifyContent: 'center' },
    v5: { flexDirection: "row", justifyContent: 'space-between', width: 43 },
    text1: { fontSize: 18, color: '#CCCCCC' },
    text2: { fontSize: 12, color: '#CCCCCC' },
    text3: { color: '#D28102', fontSize: 14 },
    text4: { color: '#FFFFFF' },
    text22: { fontSize: 12, color: '#EC9705' },
    listitems: { height: 60, borderBottomColor: '#545454' }
})