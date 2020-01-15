import React, { Component } from 'react';
import { StyleSheet, StatusBar, Dimensions, ActivityIndicator, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { Icon, Input, Badge, Item, Fab, Container, Header, Content, Drawer } from 'native-base';
import { YellowBox } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DeviceInfo from 'react-native-device-info';
import lion from '../../images/lion1.png';
import { test } from '../../Converter'
import Uri from '../../DeviceIp';

//YellowBox.ignoreWarnings(['Remote debugger']);
export default class EHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 'In Progress',
            date: '06/30/2019',
            Name: 'Franvi Yanco Eyeconic',
            industry: 'Film Industry',
            balance: '$24000000',
            status: 'LION',
            OnGoingContracts: 0,
            PaidContracts: 0,
            InReview: 0,
            Company: [],
            ECompanyDetail: [],
            Company_Types: [],
            Notification: 0,
            //  E_Id: 1,
            Kind: ['CUB', 'LION', 'ROAR'],
            MacAddress: '',
            url: Uri//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com', loading: false
        }
    }
    componentDidMount = () => {
        DeviceInfo.getMacAddress().then(mac => {
            this.setState({ MacAddress: mac, loading: true });
            this.getEntreID(mac);
        });
    }
    Entrepreneur_CompanyList = async (id) => {
        console.log('in entrepreneur companylist:and id: ', id)
        let data = {
            E_Id: id,
        }
        await fetch(this.state.url + '/Entrepreneur/Entrepreneur_CompanyList', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Company List", resjson.Message, resjson.ECompanyDetail)
                if (resjson.Successful) {
                    this.setState({
                        ECompanyDetail: resjson.ECompanyDetail,
                        Company_Types: resjson.Company_Types,
                        loading: false
                    })
                } else {
                    this.setState({ loading: false })
                }

            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })

    }
    Entrepreneur_Contracts = async (v, id) => {
        console.log(v, '& id:', id)
        let data = {
            E_Id: id,
            Status: v
        }
        await fetch(this.state.url + '/Entrepreneur/Entrepreneur_Contracts', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Reply from server", resjson.Message)
                if (resjson.Successful) {
                    if (v == 'Going') {
                        console.log(resjson.data)
                        this.setState({ OnGoingContracts: resjson.data })
                    } else if (v == 'Completed') {
                        this.setState({ PaidContracts: resjson.data })

                    } else if (v == 'Review') {
                        this.setState({ InReview: resjson.data })

                    }
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })
    }

    getEntreID = async (mac) => {
        console.log('in EntreID function', this.state.MacAddress)
        let data = {
            MacAddress: mac,
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
                console.log("Company Listt", resjson.Message,resjson.data.entrepreneur_id)
                if (resjson.Successful) {
                    this.Entrepreneur_Contracts('Completed', resjson.data.entrepreneur_id);
                    this.Entrepreneur_Contracts('Going', resjson.data.entrepreneur_id);
                    this.Entrepreneur_Contracts('Review', resjson.data.entrepreneur_id);
                    this.Entrepreneur_CompanyList(resjson.data.entrepreneur_id);
                }
            })
            .catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })

    }

    render() {
        return (
            <Container style={styles.Containerstyle}>
                <Header hasTabs androidStatusBarColor="#110717" iosBarStyle="light-content" style={styles.header}>
                    <StatusBar backgroundColor="#110717" />
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#110717' }}>
                        <View style={{ flexDirection: 'row', width: '90%', height: 50, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Icon onPress={() => this.props.openDrawer()} type="Entypo" name="menu" style={{ color: '#FFFFFF' }} />
                            <Text style={{ color: 'white', marginLeft: 10, fontSize: 16 }}>Home</Text>
                            <View style={{ marginRight: -10 }}>
                                <Badge danger style={{ height: 15, marginBottom: -15, backgroundColor: 'red', marginLeft: 15 }}>
                                    <Text style={{ fontSize: 9, color: 'white' }}>{this.state.Notification}</Text>
                                </Badge>
                                <Icon onPress={() => Actions.Notification()} type="MaterialIcons" name="notifications" style={{ color: '#EC9705' }} />
                            </View>
                        </View>
                    </View>
                </Header>
                <Content padder>
                    <View style={{ width: '100%', alignItems: "center" }}>
                        <View style={styles.v6}>
                            <View style={styles.vcircle}>
                                <View style={styles.circle}>
                                    <AnimatedCircularProgress
                                        size={50}
                                        width={2}
                                        fill={this.state.OnGoingContracts}
                                        tintColor="#EC9705"
                                        backgroundColor="#cececd"
                                        rotation={0}

                                    >
                                        {
                                            (fill) => (
                                                <Text style={{ color: 'white', fontSize: 14, }}>
                                                    {this.state.OnGoingContracts}
                                                </Text>
                                            )
                                        }
                                    </AnimatedCircularProgress>

                                </View>
                                <Text style={styles.text5}>On Going Contracts</Text>
                            </View>
                            <Text style={styles.text6}>|</Text>
                            <View style={styles.vcircle}>
                                <View style={styles.circle}>
                                    <AnimatedCircularProgress
                                        size={50}
                                        width={2}
                                        fill={this.state.InReview}
                                        tintColor="#E91D26"
                                        backgroundColor="#cececd"
                                        rotation={0}
                                    >
                                        {
                                            (fill) => (
                                                <Text style={{ color: 'white', fontSize: 14, }}>
                                                    {this.state.InReview}
                                                </Text>
                                            )
                                        }
                                    </AnimatedCircularProgress>

                                </View>

                                <Text style={styles.text5}>In Review</Text>
                            </View>


                            <Text style={styles.text6}>|</Text>
                            <View style={styles.vcircle}>
                                <View style={styles.circle}>
                                    <AnimatedCircularProgress
                                        size={50}
                                        width={2}
                                        fill={this.state.PaidContracts}
                                        tintColor="#00AC4F"
                                        backgroundColor="#cececd"
                                        rotation={0}
                                    >
                                        {
                                            (fill) => (
                                                <Text style={{ color: 'white', fontSize: 14, }}>
                                                    {this.state.PaidContracts}
                                                </Text>
                                            )
                                        }
                                    </AnimatedCircularProgress>

                                </View>

                                <Text style={styles.text5}>Completed Contracts</Text>
                            </View>

                        </View>
                    </View>


                    {
                        this.state.ECompanyDetail.map((data, key) => {
                            return (
                                <TouchableWithoutFeedback key={key} onPress={() => Actions.CCList({ Company_Id: data.id, Cname: data.company_name, Curi: data.company_logo })}>
                                    <View key={key} style={styles.v1}>
                                        <View style={styles.v11}>
                                            <View style={styles.v22}>
                                                <Image source={{ uri: data.company_logo != null ? data.company_logo : '/dfd/df' }} style={styles.imagestyle} resizeMode='stretch'></Image>
                                            </View>
                                            <View style={styles.v55}>
                                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                    <Text style={styles.text22}>{data.company_name} </Text>

                                                    <Text style={styles.text44}>£{test(data.investment_req)}</Text>
                                                </View>
                                                <View>
                                                    <View style={{ flexDirection: 'row', height: 18 }}>
                                                        {
                                                            this.state.Company_Types[key].map((Types, i) => (
                                                                <Text key={i} style={styles.text33}>{Types}, </Text>

                                                            ))
                                                        }
                                                    </View>

                                                    <View style={{ flexDirection: "row" }}>
                                                        <Image source={lion} style={styles.imagestyle3}></Image>
                                                        <Text style={styles.text31}>{this.state.Kind[data.company_cat_id]}</Text>
                                                    </View>

                                                </View>

                                            </View>

                                        </View>

                                        <View style={styles.v2}>
                                            <Text style={styles.text2}>{data.company_desc} </Text>
                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'white' }}>Percentage Equity</Text>
                                            <Text style={{ color: '#E69705' }}>{data.investment_eq}% Equity</Text>
                                        </View>
                                        <View style={styles.v3}>
                                            <View style={styles.v45}>
                                                <Text style={styles.text}>Work</Text>
                                                <Text style={styles.text2}>{data.status}</Text>
                                            </View>
                                            <View style={styles.v4}>
                                                <Text style={styles.text}>Created at</Text>
                                                <Text style={styles.text2}>{data.created_at.slice(0, 10)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>

                            )
                        })

                    }

                </Content>
                <Fab
                    // active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#EC9705', width: 50, height: 50 }}
                    position="bottomRight"
                    onPress={() => Actions.CompanyRegistration()}
                >
                    <Icon onPress={() => Actions.CompanyRegistration()} name="plus" style={{ color: 'white' }} type="FontAwesome5" />


                </Fab>
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
                    position='center'
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
//console.log('red')
const styles = StyleSheet.create({
    search: { height: 45, marginTop: 15, borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#818181', borderRadius: 25 },
    vcircle: { flexDirection: "column", alignItems: 'center', width: 110, height: 65 },
    circle: { height: 50, alignItems: "center", justifyContent: "center" },
    Containerstyle: { backgroundColor: '#110717' },
    header: { width: '100%', backgroundColor: '#110717' },
    text: { fontSize: 12, color: '#545454' },
    text2: { fontSize: 14, color: '#FFFFFF' },
    v1: { width: '100%', overflow: 'hidden', backgroundColor: '#1F1724', alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 10 },
    v2: { width: '100%' },
    v3: { flexDirection: "row", marginTop: 10, justifyContent: "space-between" },
    v4: { width: '50%', height: 40, flexDirection: "column", alignItems: "flex-end" },
    v45: { width: '50%', height: 40, flexDirection: "column", alignItems: "flex-start" },
    v11: { flexDirection: 'row', width: '100%', padding: 5, marginBottom: 5 },
    v22: { width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 50, overflow: 'hidden', borderWidth: 1, borderColor: '#EC9705' },
    v55: { width: '85%', flexDirection: "column", justifyContent: "space-between", borderRadius: 10, padding: 5 },
    vv: { width: '100%', height: 100, backgroundColor: '#1F1724' },
    v6: { width: '100%', height: 65, alignItems: "center", flexDirection: "row", justifyContent: "space-around" },
    v7: { width: 90, backgroundColor: 'grey', height: 20, alignItems: "center", justifyContent: "center" },
    v8: { width: 100, height: 80, flexDirection: "column", alignItems: "center", justifyContent: "center" },
    v9: { width: 100, height: 80, flexDirection: "column", alignItems: "center", justifyContent: "center" },

    text22: { fontSize: 16, color: '#CCCCCC' },
    text31: { color: '#D28102', paddingLeft: 2, fontSize: 12 },
    text33: { fontSize: 12, color: '#CCCCCC' },
    text44: { fontSize: 16, color: '#EC9705', marginTop: 4, alignSelf: "flex-end" },
    text4: { fontSize: 16, color: '#FFFFFF' },
    text5: { color: '#FFFFFF', fontSize: 10, marginTop: 5 },
    text6: { fontSize: 20, color: '#707070' },

    imagestyle: { width: 50, height: 50 },
    imagestyle3: { width: 15, height: 15, },




})