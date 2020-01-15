
import React, { Component } from 'react';
import { StyleSheet,ActivityIndicator,Dimensions, Text, View, Image, TouchableWithoutFeedback, } from 'react-native';
import { Icon, Button, Container, Content, Header, Body, Title, } from 'native-base'
import lion from '../../images/lion.png';
import pic from '../../images/Investor/Ellipse3x.png';
import { Actions } from 'react-native-router-flux';
import { test } from '../../Converter';
import Toast, { DURATION } from 'react-native-easy-toast';
import Uri from '../../DeviceIp'
export default class CheckDetails extends Component {
    //Profile Screen to show from Open profile button 
    constructor(props) {
        super(props);

        this.state = {
            status: ['CUB', 'LION', 'ROAR'],
            detail: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
                ' Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,' +
                ' when an unknown printer took a galley of type and scrambled it to make a type' +
                ' specimen book. It has survived not only five centuries, but also the leap into' +
                ' electronic typesetting, remaining essentially unchanged.',
            equity: '23%',
            duration: '02 Months',
            milestones: 0,
            total: '230000',
            ProposalDetail: [],
            CompanyTypes: [],
            Contract_data: [],
            Active: false,
            loading:false,
            url:Uri// 'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
        }
    }
    componentDidMount=async()=> {
        this.setState({ Active: this.props.Active,loading:true })
        this.GetProposalDetail(this.props.Contract_Id, this.props.Company_Id)
    }
    UpdateProposal = async () => {
        let data = {
            C_Id: this.props.Contract_Id,
            Status: 'Cancelled'
        }
        await fetch(this.state.url + '/Contract/Contract_Status', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Company List", resjson.Message);
                if (resjson.Successful) {
                    Actions.pop()
                }
            })
    }
    GetProposalDetail = async (v1, v2) => {
        let data = {
            Contract_Id: v1,
            Company_Id: v2
        }
        await fetch(this.state.url + '/Entrepreneur/Proposal_Detail', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Company List", resjson.Message);
                if (resjson.Successful) {
                    this.setState({
                        loading:false,
                        ProposalDetail: resjson.Companydata, milestones: resjson.Number_of_mile_stone,
                        CompanyTypes: resjson.CompanyTypes, Contract_data: resjson.contracted_data,
                        total: resjson.contracted_data[0].total_investment
                    })
                }
            }).catch(err=>{
                this.setState({loading:false});
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
            })
    }
    render() {
        return (
            <Container style={styles.Containerstyle}>
                <Header hasTabs androidStatusBarColor="#110717" iosBarStyle="light-content" style={styles.header}>

                    <View style={styles.h2}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body >
                        <Title allowFontScaling={false} style={[styles.sendername]}>Company</Title>
                    </Body>
                    <Button transparent>
                    </Button>
                </Header>
                {
                    this.state.ProposalDetail.length > 0 ?
                        <Content padder>
                            <View style={styles.v2}>
                                <View style={styles.v22}>
                                    <Image source={{ uri: this.state.ProposalDetail[0].company_logo }} style={styles.imagestyle} resizeMode='stretch'></Image>
                                    <View style={styles.v3}></View>
                                </View>
                                <View style={styles.v4}>
                                    <Text allowFontScaling={false} style={styles.text1}>{this.state.ProposalDetail[0].company_name}</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                        {
                                            this.state.CompanyTypes.map((data, index) => (
                                                <Text key={index} allowFontScaling={false} style={styles.text2}>{data.type_name}, </Text>
                                            ))
                                        }
                                    </View>
                                    <View style={styles.v5}>
                                        <Image source={lion} style={styles.imagestyle3}></Image>
                                        <Text allowFontScaling={false} style={styles.text3}>{this.state.status[this.state.ProposalDetail[0].company_cat_id]}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.vc}>
                                <Text allowFontScaling={false} style={styles.text4}>{this.state.ProposalDetail[0].company_desc}</Text>
                                <View style={styles.vc2}>
                                    <Text allowFontScaling={false} style={styles.text4}>%age Equity</Text>
                                    <Text allowFontScaling={false} style={styles.text5}>{this.state.Contract_data[0].investor_equity}%</Text>
                                </View>
                                <View style={styles.vc2}>
                                    <Text allowFontScaling={false} style={styles.text4}>Expected Duration</Text>
                                    <Text allowFontScaling={false} style={styles.text5}>{this.state.duration}</Text>
                                </View>
                                <View style={styles.vc2}>
                                    <Text allowFontScaling={false} style={styles.text4}>Number of Milestones</Text>
                                    <Text allowFontScaling={false} style={styles.text5}>{this.state.milestones}</Text>
                                </View>
                                <View style={styles.vc2}>
                                    <Text allowFontScaling={false} style={styles.text4}>Total</Text>
                                    <Text allowFontScaling={false} style={styles.text5}>£{test(this.state.Contract_data[0].total_investment)}</Text>
                                </View>
                            </View>


                        </Content> :
                        <Content>

                        </Content>

                }
                {
                    this.state.Active ?
                        <View style={styles.footer}>
                            <TouchableWithoutFeedback onPress={() => Actions.Terms({ Id: this.props.Contract_Id, Comp_Id: this.props.Company_Id })}>
                                <View style={styles.v6}>
                                    <Text allowFontScaling={false} style={{ color: '#FFFFFF' }}>Accept £<Text>{test(this.state.total)}</Text></Text>
                                </View>

                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.UpdateProposal()}>
                                <View style={styles.v7}>
                                    <Text allowFontScaling={false} style={{ color: '#FFFFFF' }}>Cancel</Text>
                                </View>

                            </TouchableWithoutFeedback>
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
const styles = StyleSheet.create({
    h2: { width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' },
    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },
    Containerstyle: { backgroundColor: '#110717' },
    imagestyle3: { width: 20, height: 20, },

    sendername: { color: '#CCCCCC', alignSelf: 'center' },
    imagestyle: { width: 90, height: 90, },

    v22: { width: 90, height: 90, flexDirection: "row", overflow: 'hidden', justifyContent: "center", borderRadius: 50, borderWidth: 1, borderColor: '#cececd' },
    v2: { marginTop: 10, width: '100%', height: 200, alignItems: "center", marginTop: 10 },
    v3: { width: 10, height: 10, marginTop: 30, marginLeft: -8 },
    v4: { width: '100%', height: 80, flexDirection: "column", alignItems: "center" },
    v5: { flexDirection: "row", justifyContent: "space-between", width: 55 },
    v6: { width: '45%', borderWidth: 1, borderColor: '#EC9705', borderRadius: 20, height: 40, marginTop: 5, alignItems: "center", justifyContent: "center", alignSelf: 'center', backgroundColor: '#EC9705' },
    v7: { width: '45%', borderWidth: 1, borderColor: '#EC9705', borderRadius: 20, height: 40, marginTop: 5, alignItems: "center", justifyContent: "center", alignSelf: 'center' },

    vc: { flexDirection: 'column', width: '95%', alignSelf: 'center' },
    vc2: { flexDirection: 'row', height: 20, justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    footer: { flexDirection: 'row', width: '100%', justifyContent: 'space-around', height: 70, alignSelf: 'center', backgroundColor: '#1F1724' },


    text1: { fontSize: 18, color: '#CCCCCC' },
    text2: { fontSize: 12, color: '#CCCCCC' },
    text3: { color: '#D28102' },
    text4: { color: '#8D8D8D', fontSize: 14 },
    text5: { color: '#EC9705', fontSize: 16 }
})