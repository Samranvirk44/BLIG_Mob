import React, { Component } from 'react';
import { Icon, Tabs, Tab, Container, Header, Right, Body, Title, Content } from 'native-base'
import { Text, View, Image, Dimensions, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import styles from '../Styles/Styles';
import { Actions } from 'react-native-router-flux';
import { test } from '../Converter';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast';
import Url from '../DeviceIp';
export default class New extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '2 hours ago',
            status: 'Review',
            NewCompany: [],
            InvestorList: [],
            ContractedList: [],
            loading: false,
            entre_id: '',
            BidderName: [],
            BidDetail: [],
            url:Url// 'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
            //text: 'Video needed for personal apparel and website header area',
            // deadline: 'Due in 28 days'
        }
    }
    componentDidMount() {

        DeviceInfo.getMacAddress().then(mac => {
            this.setState({ loading: true });
            this.get_id(mac);
        });

    }
    get_id = async (mac) => {
       // console.log('in getID function', this.state.MacAddress)
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
                console.log("Id's", resjson.Message, resjson.user_id)
                if (resjson.Successful) {
                 //   console.log('in New:', this.props.data)
                    if (resjson.data.Type == 'Investor') {
                        this.setState({ entre_id: resjson.data.investor_id })
                        this.Company_BidShow(resjson.data.investor_id, false)
                    } else if (resjson.data.Type == 'Entrepreneur') {
                        this.Company_BidShow(resjson.data.investor_id, true)
                    }
                }
                else{
                    this.setState({loading:false})
                    this.refs.toast.show("Not Get Id!", DURATION.LENGTH_LONG);
                 }
                // console.log('temp:', temp)
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show("Network Request Failed!", DURATION.LENGTH_LONG);

                console.log('error:', err)
            })
    }
    Company_BidShow = async (Id, v) => {
        let data = {
            entre_id: Id,
            Ent: v
        }

        await fetch(this.state.url + '/MarketPlace/Company_BidShow', {
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
                    this.setState({ loading: false, BidderName: resjson.bidder_name, BidDetail: resjson.bid_detail })
                    console.log(this.state.BidderName)
                }
                else{
                    this.setState({loading:false});
                    this.refs.toast.show("Empty Bid!", DURATION.LENGTH_LONG);             
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show("Network Request Failed!", DURATION.LENGTH_LONG);
            })
    }

    CancelContract = async (id) => {
        this.setState({ loading: true })
        console.log("cancelling ....", id)
        let data = {
            B_Id: id,
            status: 'Cancel'
        }
        await fetch(this.state.url + '/MarketPlace/Bid_Status', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Contract Cancelled", resjson.Message);
                if (resjson.Successful) {
                    this.setState({ loading: false })
                    Actions.refresh()
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show("Network Request Failed!", DURATION.LENGTH_LONG);
                console.log('error:', err)
            })

    }
    render() {
        // console.log("component mount caliind")

        return (

            <Container style={styles.Containerr}>
                <Header hasTabs iosBarStyle="light-content" androidStatusBarColor="#110717" style={styles.pheader}>

                    <View style={styles.h2}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body style={{ alignItems: "center" }}>
                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <Title allowFontScaling={false} style={{ color: 'white' }} > Market Place</Title>
                        </View>
                    </Body>
                    <View style={styles.h2}>
                    </View>
                </Header>
                <Content padder>
                    {
                        this.state.BidDetail.map((data, index) => (
                            this.state.BidDetail[index].bids.map((data2, index2) => (
                                <View key={index} style={styles.v1e}>
                                    <View style={styles.v5e}>
                                        <View style={styles.v22}>
                                            <View style={{ width: 50, height: 50, borderWidth: 1, borderColor: '#cececd', borderRadius: 40, overflow: 'hidden' }}>
                                                <Image source={{ uri: data.company_logo }} style={styles.imagestyle} resizeMode='stretch'></Image>
                                            </View>
                                        </View>

                                        <View style={styles.v44}>
                                            <View style={styles.v6e}>
                                                <Text allowFontScaling={false} style={styles.text1e}>{data.company_name}</Text>
                                                <Text allowFontScaling={false} numberOfLines={1} style={styles.date}>{data2.start_date.slice(0, 10)}</Text>
                                            </View>
                                            <View style={styles.v6e}>
                                                <Text allowFontScaling={false} style={{ fontSize: 14, color: '#CCCCCC' }}>{this.state.BidderName[index][index2]}</Text>
                                                <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#EC9705', fontSize: 14 }}>${test(data2.total_price)}</Text>
                                            </View>
                                            <Text allowFontScaling={false} numberOfLines={1} style={styles.date}>{data.sales_equity}% Equity</Text>
                                        </View>

                                    </View>
                                    <View style={styles.v3u}>
                                        <TouchableWithoutFeedback  >
                                            <View style={styles.v4u}>
                                                <Text allowFontScaling={false} style={styles.textu}>Accept</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this.CancelContract(data2.id)} >
                                            <View style={styles.vbtn}>
                                                <Text onPress={() => this.CancelContract(data2.id)} allowFontScaling={false} style={styles.textu}>Cancel</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            ))


                        ))
                    }

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
