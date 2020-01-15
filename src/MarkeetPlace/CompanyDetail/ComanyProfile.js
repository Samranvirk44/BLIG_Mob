import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image, TouchableWithoutFeedback, } from 'react-native';
import { Icon, Button, Container, Content, Header, Left, Body, Right, Title, Tabs, Tab, } from 'native-base'
import pic from '../../images/Investor/9500.png'
import AboutCompany from './CompanyDetail';
import Finance from './FinanceInfo';
import { Actions } from 'react-native-router-flux';
import Uri from '../../DeviceIp'

export default class ClassDetail extends React.Component {
    //Profile Screen to show from Open profile button
    constructor(props) {
        super(props);

        this.state = {
            //company_Id:1,
            companyName: 'General Electroclinic',
            logo: pic,
            company: '',
            city: '',
            country: '',
            ageEquity: '23%',
            details: 'Lorem Ipsum',
            obj: {},
            Active:true,
            entre_id:'',
            entrepreneurcompany:'',
            url: Uri//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'

        }
    }
    componentWillMount = () => {
        this.setState({Active:this.props.Active})
        this.getDetails();
    }

    getDetails = async () => {
        console.log('in company:')
        let data = {
            Company_Id: this.props.CompanyId,
        }
        await fetch(this.state.url+'/Company/Mcompany_Detail', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Company detail", resjson.Message, resjson.data)
                if (resjson.Successful) {
                    let temp={
                        expenditures: resjson.data.expenditures,
                        profit:resjson.data.profit,
                        videoName: resjson.data.video_attachment,
                        LYrevenue: resjson.data.last_y_rev,
                        Erevenue: resjson.data.next_y_rev,
                        equity:resjson.data.sales_equity,
                        Investment:resjson.data.investment_req,
                        details:resjson.data.company_desc
                    }
                    this.setState({
                        logo: resjson.data.company_logo,
                        companyName: resjson.data.company_name,
                        city: resjson.data.city_id,
                        country: resjson.data.country_id,
                        entre_id:resjson.data.entre_id,
                        entrepreneurcompany:resjson.data.entreprenuer,
                       obj:temp  
                    })
                    console.log('data into object:',temp)
                }
            })

    }
    render() {
        return (
            <Container style={styles.Containerstyle}>

                <Header hasTabs iosBarStyle="light-content" androidStatusBarColor="#110717" style={styles.header}>

                    <View style={styles.h2}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body style={{ alignItems: "center" }}>

                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <Title allowFontScaling={false} style={[styles.sendername]}>Company Detail</Title>
                        </View>
                    </Body>

                    <View style={styles.h2}>
                    </View>

                </Header>
                <Content>

                    <View style={styles.v2}>
                        <View style={styles.v22}>
                            <Image source={this.state.logo} style={styles.imagestyle} resizeMode='stretch'></Image>
                        </View>
                        <View style={styles.v4}>
                            <Text allowFontScaling={false} style={styles.text1}>{this.state.companyName}</Text>
                            <Text allowFontScaling={false} style={styles.text2}>{this.state.city},<Text>{this.state.country}</Text></Text>

                        </View>

                        <Tabs tabBarUnderlineStyle={{ backgroundColor: '#EC9705' }} >
                            <Tab heading="Company Detail" tabStyle={{ backgroundColor: '#110717' }} activeTabStyle={{ backgroundColor: '#110717' }} textStyle={{ color: '#545454' }} activeTextStyle={{ color: '#CCCCCC' }}>
                                <AboutCompany data={this.state.obj} />
                            </Tab>
                            <Tab heading="Finance Information" tabStyle={{ backgroundColor: '#110717' }} activeTabStyle={{ backgroundColor: '#110717' }} textStyle={{ color: '#545454' }} activeTextStyle={{ color: '#CCCCCC' }}>
                                <Finance data={this.state.obj}  />
                            </Tab>
                        </Tabs>



                    </View>
                </Content>
                {
                    this.state.Active?
                    <View style={{ flexDirection: "row", height: 70, backgroundColor: '#1F1724', justifyContent: 'space-around' }}>
                    <TouchableWithoutFeedback onPress={() => Actions.BuyCompanyEquity({Company_Id:this.props.CompanyId})}>
                        <View style={styles.v8}>
                            <Text onPress={() => Actions.BuyCompanyEquity({Company_Id:this.props.CompanyId})} allowFontScaling={false} style={{ color: '#FFFFFF' }}>Buy Company Equity</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => Actions.CompanyBid({Company_Id:this.props.CompanyId})}>
                        <View style={styles.v9}>
                            <Text onPress={() => Actions.CompanyBid({Company_Id:this.props.CompanyId,entre_id:this.state.entre_id,Type:this.state.entrepreneurcompany})} allowFontScaling={false} style={{ color: '#FFFFFF' }}>Bid a Company</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>:null
                }
                
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    h2: { width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' },
    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },

    Containerstyle: { backgroundColor: '#110717' },

    sendername: { color: '#CCCCCC' },
    imagestyle: { width: 110, height: 120 },

    v22: { width: 120, height: 120, alignItems: "center" },
    v2: { backgroundColor: '#110717', width: '100%', alignItems: "center", marginTop: 10 },
    v3: { width: 10, height: 10, marginTop: 30, marginLeft: -8 },
    v4: { width: '100%', height: 80, backgroundColor: '#110717', flexDirection: "column", alignItems: "center" },
    v5: { width: '90%', height: 40, marginTop: 10 },
    v6: { width: '90%', height: 40, flexDirection: "row", justifyContent: "space-between" },
    v7: { width: '90%', },
    v8: { width: '45%', borderWidth: 1, borderColor: '#EC9705', borderRadius: 20, height: 40, marginTop: 5, alignItems: "center", justifyContent: "center", alignSelf: 'center', backgroundColor: '#EC9705' },
    v9: { width: '45%', borderWidth: 1, borderColor: '#EC9705', borderRadius: 20, height: 40, marginTop: 5, alignItems: "center", justifyContent: "center", alignSelf: 'center' },

    text1: { fontSize: 18, color: '#CCCCCC' },
    text2: { fontSize: 16, color: '#CCCCCC' },
    text3: { fontSize: 18, color: '#D5D5D5' },
    text4: { fontSize: 15, color: '#8D8D8D' },
    text5: { fontSize: 20, color: '#EC9705' },




})