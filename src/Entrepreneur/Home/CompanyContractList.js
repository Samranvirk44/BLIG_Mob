import React, { Component } from 'react';
import { Drawer, Left, Icon, Container, Header, Button, Badge, Body, Title, Content, } from 'native-base';
import { Text, View,ActivityIndicator,Dimensions, StyleSheet, Image, StatusBar, TouchableWithoutFeedback } from 'react-native';
import styles from '../../Styles/Styles'
import { Actions } from 'react-native-router-flux';
import lion from '../../images/acount.png';
import { test } from '../../Converter';
import Toast, { DURATION } from 'react-native-easy-toast';
import Uri from '../../DeviceIp'
export default class Active extends Component {
    constructor(props) {
        super(props);
        this.state = {
            InvestorList: [],
            ContractedList: [],
            loading:false,
            url: Uri//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
        }
    }
    componentDidMount() {
        //   console.log("i am company id",this.props.Company_Id)
        
        this.CompanyContractsList()
    }

    CompanyContractsList = async () => {
        this.setState({loading:true})
        let data = {
            Company_Id: this.props.Company_Id
        }
        await fetch(this.state.url + '/Company/Company_Contracts_List', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("response ", resjson.Message, resjson)
                if (resjson.Successful) {
                    this.setState({loading:false,
                        InvestorList: resjson.Investors, ContractedList: resjson.contracts_detail,
                    })
                }else{
                    this.setState({loading:false})
                    this.refs.toast.show('There is no contract on this company!', DURATION.LENGTH_LONG);         
                }
            }).catch(err => {
                this.setState({loading:false})
                this.refs.toast.show('Network Reques Failed!', DURATION.LENGTH_LONG);
                console.log('error:', err)
            })
    }
    render() {
        return (
            <Container style={styles.Containerr}>
                <Header hasTabs androidStatusBarColor="#110717" iosBarStyle="light-content" style={{ width: '100%', backgroundColor: '#110717' }}>
                    <StatusBar backgroundColor="#110717" />
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#110717' }}>
                        <View style={{ flexDirection: 'row', width: '90%', height: 50, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Icon onPress={() => Actions.pop()} type="Ionicons" name="md-arrow-back" style={{ color: '#FFFFFF' }} />
                            <Text style={{ color: 'white', marginLeft: 10, fontSize: 18 }}>Investors</Text>
                            <View style={{ marginRight: -10, width: 50 }}>
                            </View>
                        </View>
                    </View>
                </Header>
                <Content padder>
                    {
                        this.state.ContractedList.map((data, index) => (
                            <TouchableWithoutFeedback key={index} onPress={() => Actions.CompanyInvestment({ Cstatus: data.status, Contract_Id: data.id, Cname: this.props.Cname, Curi: this.props.Curi,Company_Id:this.props.Company_Id })}>
                                <View key={index} style={styles.v1e}>
                                    <View style={styles.v5e}>
                                        <View style={{ borderRadius: 40, borderColor: '#cececd', borderWidth: 1, overflow: 'hidden', width: 50, height: 50, justifyContent: "center" }}>
                                            <Image source={{uri:this.props.Curi!=null?this.props.Curi:'/empty'}} style={styles.imagestyle} resizeMode='stretch'></Image>
                                        </View>
                                        <View style={styles.v44}>
                                            <View style={styles.v6e}>
                                                <Text allowFontScaling={false} style={styles.text1e}>{this.state.InvestorList[index]}</Text>
                                                <Text allowFontScaling={false} numberOfLines={1} style={styles.date}></Text>
                                            </View>
                                            <View style={styles.v6e}>
                                                <Text allowFontScaling={false} style={{ fontSize: 14, color: '#8D8D8D' }}>Amount</Text>
                                                <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#EC9705', fontSize: 16 }}>£ {test(data.total_investment)}</Text>
                                            </View>
                                            <Text allowFontScaling={false} numberOfLines={1} style={styles.date}>{data.investor_equity}% Equity</Text>
                                        </View>

                                    </View>
                                    <View style={styles.v3e}>
                                        <View style={styles.v4e}>
                                            <Text allowFontScaling={false} style={styles.texte}>Status</Text>
                                            <Text allowFontScaling={false} style={styles.text2e}>{data.status}</Text>
                                        </View>
                                        <View style={styles.v4e}>
                                            <Text allowFontScaling={false} style={styles.texte}>End Date</Text>
                                            <Text allowFontScaling={false} style={styles.text2e}>{data.investment_end.slice(0, 10)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                        ))
                    }
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
            </Container>

        );
    }
}