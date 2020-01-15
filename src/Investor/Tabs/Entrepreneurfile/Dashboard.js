/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Dimensions, StyleSheet, ActivityIndicator, TextInput, StatusBar, Text, View, Image, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import mapstyle from '../../mapstyle.json'
import { Icon, Badge, Header, Container, Content, Drawer } from 'native-base'
import Modal from "react-native-modal";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Actions } from 'react-native-router-flux';
import SwitchToggle from '@dooboo-ui/native-switch-toggle';
import DeviceInfo from 'react-native-device-info';
import lion from '../../../images/lion.png';
import Cub from '../../../images/pawprint.png';
import Roar from '../../../images/lion1.png';
import Toast, { DURATION } from 'react-native-easy-toast';
import { test } from '../../../Converter';
import Uri from '../../../DeviceIp'
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchOn4: false,
            notification: 0,
            latlng: {
                latitude: 51.5074,
                longitude: 0.1278
            },
            flagplaces: true,
            //flag: true,
            isModalVisible: false,
            TypeIcon: [Cub, lion, Roar],
            Cindex: [],
            search:'',
            SearchData: [],
            marker: [
                //     {
                //     id: 1,
                //     latitude: 51.5060,
                //     longitude: 0.1260,
                //     company_name: 'Title',
                //     investment_req: 0,
                //     companylogo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
                // }
            ],
            CategoryTypes: [ //show on maps
            ],
            Companylist: [
            ],
            email: '',
            Kind: ['CUB', 'LION', 'ROAR'],
            loading: true,
            url: Uri//'http://192.168.100.4:80',// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
        };

    }
    getcompanylatlng = async () => {
        let data = {
            Email: this.state.email,

        }
        await fetch(this.state.url + '/DashboardCompany/ECompanieslatlng', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data
            }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("get company latlongitude", resjson.Message, resjson.data);
                if (resjson.Successful) {
                    this.setState({ marker: resjson.data })
                } else {
                    this.setState({ loading: false })
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })

    }
    getcompanylatlngbytype = async (value) => {
        let data = {
            Types: value,
            Email: this.state.email
        }
        await fetch(this.state.url + '/DashboardCompany/ECompanieslatlngbyType', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data
            }),
        })
            .then(res => res.json())
            .then(resjson => { console.log("get company latlng bytype", resjson.Message), this.setState({ marker: resjson.data }) })
            .catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })
    }
    getcompanylatlngbyKinds = async (value) => {
        console.log('values=>', value)
        let data = {
            Kinds: value,
            Email: this.state.email
        }
        await fetch(this.state.url + '/DashboardCompany/ECompanieslatlng_by_kind', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data
            }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("get company latlng bykind", resjson.Message, resjson.Successful)
                if (resjson.Successful) {
                    this.setState({ marker: resjson.data })
                }
            })
            .catch(err => {
                this.setState({ loading: false })
                console.log(err)
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })
    }
    getcompanylist = async () => {
        let data = {
            Email: this.state.email
        }
        await fetch(this.state.url + '/DashboardCompany/ECompanies_List', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data
            }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("getcompanylist", resjson.Message)
                this.setState({ Companylist: resjson.data, loading: false })
            })
            .catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })
    }
    getcompanylistbytype = async (value) => {
        console.log("value=>", value)
        let data = {
            Types: value,
            Email: this.state.email
        }
        await fetch(this.state.url + '/DashboardCompany/ECompanies_byType', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data
            }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("getcompanylist bytype", resjson.Message);
                this.setState({ Companylist: resjson.data, loading: false })
            })
            .catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })
    }

    componentWillMount = () => {
        DeviceInfo.getMacAddress().then(mac => {
            this.setState({ MacAddress: mac });
            this.getEmail(mac);
        });


    }
    getEmail = async (mac) => {
        //console.log('in email function')
        let data = {
            MacAddress: mac,
        }
        await fetch(this.state.url + '/Session/Get_Email', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data
            }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("get Email", resjson.Message)
                if (resjson.Message == 'Success') {
                    this.setState({ email: resjson.data[0].email })
                    this.Get_ComapnyData()
                }
                else {
                    console.log('empty')
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })

    }
    Get_ComapnyData = async () => {
        // console.log("flag props=>", this.props.Categories)
        try {
            // console.log("flag p=>", this.props.Kinds)
            if (this.props.Kinds) {
                // console.log("enter flag p=>", this.props.Kinds.Kflag)
                if (this.props.Kinds.Kflag) {
                    //   console.log("enter flag p if=>", this.props.Kindex.length)
                    if (this.props.Kinds.Kindex.length <= 0) {
                        this.getcompanylatlng();
                        this.getcompanylist();
                        //    console.log('calling if ..')
                    } else {
                        //  console.log("else")
                          //console.log('calling else ..==============>',this.props.Kinds.Kindex)
                        this.getcompanylatlngbyKinds(this.props.Kinds.Kindex);
                        this.getCompanylistbyKinds(this.props.Kinds.Kindex)
                    }
                }
            } else if (this.props.Categories) {
                if (this.props.Categories.flag) {
                    console.log("index array=>", this.props.Categories.Cindex)
                    this.setState({ Cindex: this.props.Categories.Cindex })
                    if (this.props.Categories.Cindex.length <= 0) {
                        this.getcompanylatlng();
                        this.getcompanylist();
                    } else {
                        this.getcompanylatlngbytype(this.props.Categories.Cindex);
                        this.getcompanylistbytype(this.props.Categories.Cindex);
                    }
                }
            } else {
                console.log("else")
                this.getcompanylatlng();
                this.getcompanylist();
            }


            //  console.log(this.props.Categories)
            let temp = []
            if (this.props.Categories) {
                for (let i = 0; i < this.props.Categories.Ct.length; i++) {
                    temp.push({ Type: this.props.Categories.Ct[i] })
                }
            }
            if (this.props.Categories != undefined) {
                this.setState({ CategoryTypes: temp })
            }
        } catch (err) {
            console.log(err)
        }
    }
    getCompanylistbyKinds = async (value) => {
        console.log("valueeee=>", value)
        let data = {
            Kinds: value,
            Email: this.state.email
        }
        await fetch(this.state.url + '/DashboardCompany/ECompanies_List_by_kind', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data
            }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("getcompanylist by kind", resjson.Message, resjson)
                if (resjson.Successful) {
                    this.setState({ Companylist: resjson.data, loading: false })
                }
            })
            .catch(err => {
                this.setState({ loading: false })
                console.log(err)
                //this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })
    }
    selectplace = (latlng) => {
        this.setState({ flagplaces: false })
        console.log(latlng[0])
        let temp = this.state.latlng
        //console.log(temp[0].latlng.latitude)
        temp.latitude = latlng[0].lat;
        temp.longitude = latlng[0].lng;
        this.setState({ latlng: temp })
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    gotoCategories = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        Actions.Categories()
    }
    gotokinds = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        Actions.Kinds();
    }
    getRightText() {
        return this.state.switchOn4 ? '' : 'Map';
    }

    getLeftText() {
        return this.state.switchOn4 ? 'List' : '';
    }
    onPress4 = () => {
        this.setState({ switchOn4: !this.state.switchOn4 });
    };

    openDrawer = () => {
        this.props.openDrawer();
    }
    updateIndustry = (i) => {
        for (let index = 0; index < this.state.CategoryTypes.length; index++) {
            // console.log(this.state.CategoryTypes[index])
        }
        this.state.CategoryTypes.splice(i, 1)
        Actions.refresh()
        this.state.Cindex.splice(i, 1)
        if (this.state.Cindex.length == 0) {
            let temp = [1, 2, 3, 4, 5]
            //   console.log('if calling....')
            this.getcompanylist()
        } else {
            this.getcompanylistbytype(this.state.Cindex)
        } //console.log(i, this.state.Cindex)
    }

    Searchfilter = (v) => {
       
        let text = v;
        const newData = this.state.Companylist.filter(no => {
            const noname = no.company_name.toUpperCase();
            const textname = text.toUpperCase();
            return noname.indexOf(textname) > -1;
        })
        
        this.setState({ SearchData: newData,search:v })
        console.log("v=>>>>",v.length)
    }
    render() {

        return (

            <Container>
                <Header hasTabs androidStatusBarColor="#110717" iosBarStyle="light-content" style={{ backgroundColor: '#110717' }}>
                    <StatusBar backgroundColor="#110717" />
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#110717' }}>
                        <View style={{ flexDirection: 'row', width: '90%', height: 50, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Icon onPress={() => this.openDrawer()} type="Entypo" name="menu" style={{ color: '#FFFFFF' }} />
                            <Text allowFontScaling={false} onPress={() => this.setState({ flag: true })} style={{ color: 'white', marginLeft: 10, fontSize: 16 }}>Home</Text>
                            <View style={{ marginRight: -10 }}>

                                <Badge danger style={{ height: 15, marginBottom: -15, backgroundColor: 'red', marginLeft: 15 }}>
                                    <Text allowFontScaling={false} style={{ fontSize: 9, color: 'white' }}>{this.state.notification}</Text>
                                </Badge>
                                <Icon onPress={() => Actions.Notification()} type="MaterialIcons" name="notifications" style={{ color: '#EC9705' }} />

                            </View>
                        </View>
                    </View>
                </Header>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#110717' }}>

                    <View style={{ flexDirection: 'row', width: '95%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', height: 40, width: '85%', borderWidth: 1, backgroundColor: '#110717', marginBottom: 5, borderColor: '#818181', borderRadius: 20, padding: 5 }}>
                            <Icon type="MaterialIcons" name="search" style={{ color: '#CCCCCC', marginLeft: 8 }} />
                            <TextInput onChangeText={(v) => this.Searchfilter(v)} value={this.state.search} style={{ padding: 0, color: 'white', width: '80%', height: 30 }} />

                            <TouchableWithoutFeedback onPress={this.toggleModal}>
                                <Image source={require('../../../images/Detail.png')} style={{ width: 20, height: 20, marginRight: 5, marginTop: 5 }} />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{ height: 40, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <SwitchToggle
                                // buttonText={this.getButtonText()}
                                backTextRight={this.getRightText()}
                                backTextLeft={this.getLeftText()}

                                type={1}
                                buttonStyle={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'absolute'
                                }}

                                rightContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                                leftContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}

                                textRightStyle={{ fontSize: 10 }}
                                textLeftStyle={{ fontSize: 10 }}

                                containerStyle={{
                                    // marginTop: 5,
                                    width: 45,
                                    height: 20,
                                    borderRadius: 20,
                                    padding: 1,
                                }}
                                backgroundColorOn='white'
                                backgroundColorOff='white'
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                    backgroundColor: 'blue', // rgb(102,134,205)
                                }}
                                switchOn={this.state.switchOn4}
                                onPress={this.onPress4}
                                circleColorOff='#EC9705'
                                circleColorOn='#EC9705'
                                duration={50}
                            />
                        </View>
                    </View>
                </View >
                <Content style={{ backgroundColor: '#110717' }} >
                    {
                        <View style={{ flexDirection: 'row' }}>
                            {
                                this.state.CategoryTypes.map((data, key) => (
                                    key <= 2 ?
                                        <View key={key} style={{ borderWidth: 1, flexDirection: 'row', width: 100, justifyContent: 'space-around', alignItems: 'center', borderRadius: 10, borderColor: '#EC9705' }}>
                                            <Text allowFontScaling={false} style={{ fontSize: 14, color: 'white' }} >{data.Type}</Text>
                                            <Icon onPress={() => this.updateIndustry(key)} type="Entypo" name="cross" style={{ color: '#CCCCCC', fontSize: 18 }} />

                                        </View> :
                                        <Text></Text>
                                ))
                            }
                        </View>


                    }
                    {
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            {
                                this.state.CategoryTypes.map((data, key) => (
                                    key > 2 ?
                                        <View key={key} style={{ borderWidth: 1, flexDirection: 'row', width: 100, justifyContent: 'space-around', alignItems: 'center', borderRadius: 10, borderColor: '#EC9705' }}>
                                            <Text allowFontScaling={false} style={{ fontSize: 14, color: 'white' }} >{data.Type}</Text>
                                            <Icon onPress={() => this.updateIndustry(key)} type="Entypo" name="cross" style={{ color: '#CCCCCC', fontSize: 18 }} />

                                        </View> :
                                        <Text></Text>
                                ))
                            }
                        </View>


                    }

                    {
                        this.state.switchOn4 ?


                            <MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={styles.map}
                                region={{
                                    latitude: this.state.latlng.latitude,
                                    longitude: this.state.latlng.longitude,
                                    latitudeDelta: 0.0159,
                                    longitudeDelta: 0.7921,
                                }}
                                customMapStyle={mapstyle}
                                loadingEnabled={true}
                            >
                                {
                                    this.state.marker.map((marker, key) => (
                                        <Marker
                                            // draggable
                                            key={marker.id}
                                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                        //   onPress={()=>alert(key)}
                                        //  title={marker.title}
                                        //description={marker.description}
                                        //style={{width:80,height:20, justifyContent:'flex-end',alignItems:'flex-end'}}
                                        //   image={require('../../../images/game.png') }
                                        >
                                            <View style={{ alignItems: 'center' }} >

                                                <Image
                                                    source={require('../../../images/game.png')}
                                                    style={{ height: 80, width: 80 }}
                                                    resizeMode="contain"
                                                />
                                                <Text allowFontScaling={false} style={{ color: '#CCCCCC', alignSelf: 'center', marginTop: -20 }}>Company</Text>
                                            </View>
                                            <Callout
                                                // style={{ flex: -1, position: 'relative', width:400}}
                                                tooltip={true}
                                                onPress={() => Actions.HCompanyProfile({ Company_Id: marker.id, Active: false })} >
                                                <View style={{ marginLeft: 70, marginTop: 30 }}>
                                                    <View style={{ backgroundColor: '#1F1724', height: 80, width: 180, flexDirection: 'row', borderWidth: 1, borderColor: '#EC9705', borderRadius: 5 }}>
                                                        <View style={{ width: '70%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', padding: 5 }}>
                                                            <Text allowFontScaling={false} style={styles.text1}>{marker.company_name}</Text>
                                                            <Text allowFontScaling={false} style={styles.text2}>Investment required</Text>
                                                            <Text allowFontScaling={false} style={styles.text3}>£{test(marker.investment_req)}</Text>
                                                        </View>
                                                        <View style={{ width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                            <View style={{ width: 50, height: 50, borderWidth: 1, borderRadius: 40, borderColor: '#EC9705', overflow: 'hidden' }}>
                                                                <Text allowFontScaling={false} style={{ height: '100%', width: '100%' }}>
                                                                    <Image source={{ uri: marker.companylogo != null ? marker.companylogo : '/temp' }} resizeMode="stretch" style={styles.imagestyle}></Image>
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={{ transform: [{ rotateZ: '0.785398rad' }], backgroundColor: '#1F1724', marginBottom: 5, borderLeftColor: '#1F1724', borderTopColor: '#1F1724', marginLeft: 30, marginTop: -11, width: 20, height: 20, borderWidth: 1, borderRightColor: '#EC9705', borderBottomColor: '#EC9705' }}>
                                                    </View>
                                                </View>
                                            </Callout>
                                        </Marker>
                                    ))
                                }
                            </MapView>

                            :
                            <View style={{ height: '100%', width: '100%', padding: 10 }}>
                                {
                                    
                                    this.state.SearchData.length >= 0 && this.state.search.length!=0 ?
                                        this.state.SearchData.map((Company) => (
                                            <TouchableWithoutFeedback key={Company.id} onPress={() => { Actions.HCompanyProfile({ Company_Id: Company.id, Active: false }), console.log('id', Company.id) }}>
                                                <View style={{ height: 100, overflow: 'hidden', paddingRight: 5, marginTop: 5, borderRadius: 10, backgroundColor: '#1F1724', flexDirection: 'row' }}>
                                                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center', }}>
                                                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderColor: '#cececd', borderWidth: 1, borderRadius: 40 }}>
                                                            <Image source={{ uri: Company.companylogo }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '45%', justifyContent: 'center' }}>
                                                        <Text allowFontScaling={false} style={{ fontSize: 16, height: 20, color: '#CCCCCC', fontWeight: 'bold' }}>{Company.company_name}</Text>
                                                        <Text allowFontScaling={false} style={{ fontSize: 12, height: 15, color: '#CCCCCC' }}>{Company.company_desc}</Text>
                                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                            <Image source={this.state.TypeIcon[Company.company_cat_id - 1]} style={{ width: 20, height: 20, }} />
                                                            <Text allowFontScaling={false} style={{ fontSize: 12, color: '#EC9705' }}>{this.state.Kind[Company.company_cat_id - 1]}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ alignItems: 'flex-end', width: '35%' }}>
                                                        <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: 'bold', color: '#EC9705', marginTop: 25 }}>£{test(Company.investment_req)}</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        ))
                                        :
                                        this.state.Companylist.map((Company) => (
                                            <TouchableWithoutFeedback key={Company.id} onPress={() => { Actions.HCompanyProfile({ Company_Id: Company.id, Active: false }), console.log('id', Company.id) }}>
                                                <View style={{ height: 100, overflow: 'hidden', paddingRight: 5, marginTop: 5, borderRadius: 10, backgroundColor: '#1F1724', flexDirection: 'row' }}>
                                                    <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center', }}>
                                                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderColor: '#cececd', borderWidth: 1, borderRadius: 40 }}>
                                                            <Image source={{ uri: Company.companylogo }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '45%', justifyContent: 'center' }}>
                                                        <Text allowFontScaling={false} style={{ fontSize: 16, height: 20, color: '#CCCCCC', fontWeight: 'bold' }}>{Company.company_name}</Text>
                                                        <Text allowFontScaling={false} style={{ fontSize: 12, height: 15, color: '#CCCCCC' }}>{Company.company_desc}</Text>
                                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                            <Image source={this.state.TypeIcon[Company.company_cat_id - 1]} style={{ width: 20, height: 20, }} />
                                                            <Text allowFontScaling={false} style={{ fontSize: 12, color: '#EC9705' }}>{this.state.Kind[Company.company_cat_id - 1]}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ alignItems: 'flex-end', width: '35%' }}>
                                                        <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: 'bold', color: '#EC9705', marginTop: 25 }}>£{test(Company.investment_req)}</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        ))
                                }
                            </View>
                    }
                    <Modal isVisible={this.state.isModalVisible} backdropOpacity={0.8}>
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                            <View style={{ height: 400, width: '100%', justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
                                    <Image source={require('../../../images/modal/detail.png')} style={{ width: 35, height: 35, marginRight: 8 }} />
                                </View>
                                <TouchableWithoutFeedback onPress={this.gotoCategories}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%', alignItems: 'center' }}>
                                        <Text onPress={this.gotoCategories} style={{ color: 'white', fontSize: 14 }}>Industry</Text>

                                        <Image source={require('../../../images/modal/industry.png')} style={{ width: 50, height: 50 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 14 }}>Near By</Text>
                                    <Image source={require('../../../images/modal/nearby.png')} style={{ width: 50, height: 50 }} />
                                </View>
                                <TouchableWithoutFeedback onPress={this.gotokinds}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%', alignItems: 'center' }}>
                                        <Text onPress={this.gotokinds} style={{ color: 'white', fontSize: 14 }}>Kind of Business</Text>
                                        <Image source={require('../../../images/modal/business.png')} style={{ width: 50, height: 50 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 14 }}>High Rated</Text>
                                    <Image source={require('../../../images/modal/highrate.png')} style={{ width: 50, height: 50 }} />
                                </View>
                            </View>

                            <View style={{ height: 80, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableWithoutFeedback onPress={this.toggleModal}>
                                    <View style={{ width: 40, height: 40, backgroundColor: 'white', borderWidth: 1, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderColor: '#EC9705' }}>
                                        <Icon name='cross' type="Entypo" style={{ color: 'black', fontSize: 30 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{ marginTop: 5, fontSize: 14, color: '#FFFFFF' }}>Reset Filter</Text>
                            </View>
                        </View>
                    </Modal>

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
            </Container >
        );
    }
}
const styles = StyleSheet.create({

    map: {
        // ...StyleSheet.absoluteFillObject,
        height: Dimensions.get('screen').height,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    calloutt: {

    },

    text1: {
        color: '#CCCCCC',
        // paddingLeft: 10,
        // paddingTop: 25
    },
    text2: {
        color: '#CCCCCC',
        // paddingLeft: 10,
        fontSize: 9
    }, text3: {
        color: '#CCCCCC',
        //  paddingLeft: 10,
    },
    imagestyle: {
        height: 40,
        width: 40, backgroundColor: '#110717'
    }
});