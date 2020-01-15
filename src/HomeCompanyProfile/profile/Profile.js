import React, { Component } from 'react';
import { Text, View, Image, ActivityIndicator, Dimensions, ImageBackground, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Tabs, Tab, Header, Body, Button, Title, Icon, Content, Container } from 'native-base';
import About from './About'
import Finace from './Finance';
import Overview from './Overview';
import lion from '../../images/lion.png';
import Cub from '../../images/pawprint.png';
import Roar from '../../images/lion1.png';
import { Actions } from 'react-native-router-flux';
import { test } from '../../Converter';
import Toast, { DURATION } from 'react-native-easy-toast';
import Uri from '../../DeviceIp'
const cpic = require('../../images/Ellipse.png')
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            budget: '0',
            escrow: '0',
            payments: '0',
            investment_eq: 0,
            investment_req: 0,
            Kind: ['CUB', 'LION', 'ROAR'],
            KindIcon: [Cub, lion, Roar],
            CompanyTypes: [],
            companyDetail: [
                {
                    company_logo: '',
                    company_name: '',
                    company_cat_id: '',
                    video: '',
                    last_y_rev: '',
                    next_y_rev: '',
                    investment_eq: '',
                    company_desc: '',
                    expenditures: '',
                    profit: '',
                    loss: '',
                }
            ],
            CompanyContractedDetail: [],
            Number_of_milestones: [],
            Investor_names: [],
            flag: false,
            Active: false,
            loading: false,
            url:Uri//'http://192.168.100.4:80',// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
        }
    }
    componentWillMount = () => {
        //  console.log('company id=>',this.props.Company_Id)
        if (this.props.Active) {
            this.setState({ Active: this.props.Active, loading: true })
            this.ContractedDetail(this.props.Company_Id); //this.props.Company_Id from terms and condition
        } else {
            this.setState({ loading: true, })
            this.CompanyDetail()

        }
        this.Escrow_Total(this.props.Company_Id,'Escrow')
        this.Escrow_Total(this.props.Company_Id,'Available')
    }
    CompanyDetail = async () => {
        // console.log("id=>",this.props.Company_Id )
        let data = {
            id: this.props.Company_Id
        }
        //        console.log("id=>",this.props.id)
        if (this.props.Company_Id != 'undefined') {
            await fetch(this.state.url + '/DashboardCompany/ECompanies_Detail', {
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
                    console.log("Get Ecompany Detail", resjson.Message, resjson.data)
                    if (resjson.Successful) {
                        this.setState({ loading: false, investment_req: resjson.data[0].investment_req, investment_eq: resjson.data[0].investment_eq, companyDetail: resjson.data })
                    }
                }).catch(err => {
                    this.setState({ loading: false })
                    this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

                })
            //console.log('details:>>>>>.', this.state.companyDetail)
        }
        else {
            this.setState({ loading: false })
            this.refs.toast.show('Id id not defined', DURATION.LENGTH_LONG);
        }
    }
    ContractedDetail = async (v) => {
        let data = {
            Company_Id: v
        }
        await fetch(this.state.url + '/Entrepreneur/Company_Contracts_Detail', {
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
                console.log("Get Contracted Detail", resjson.Message)
                if (resjson.Successful) {
                    this.setState({
                        CompanyContractedDetail: resjson.CompanyContractsDetail,
                        Number_of_milestones: resjson.number_of_milestones_contract,
                        Investor_names: resjson.investor_names,
                        CompanyTypes: resjson.CompanyTypes, investment_req: resjson.Companydata[0].investment_req, investment_eq: resjson.Companydata[0].investment_eq, companyDetail: resjson.Companydata,
                        flag: true,
                        loading: false
                    })

                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })

    }
    Escrow_Total = async (cid, status) => {

        let data = {
            C_Id: cid,
            Status: status
        }
        //        console.log("id=>",this.props.id)
        if (this.props.Company_Id != 'undefined') {
            await fetch(this.state.url + '/DashboardCompany/Company_Escrow_Total', {
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
                    console.log("Escrow_Total", resjson.Message,)
                    if (resjson.Successful) {
                        if(status=='Escrow'){
                            this.setState({escrow:resjson.Amount})
                        }else if(status=='Available'){
                            this.setState({payments:resjson.Amount})
                        }
                    }
                }).catch(err => alert(err))
        }

    }

    render() {
        return (
            <Container style={{ backgroundColor: '#110717' }}>
                <Header hasTabs androidStatusBarColor="#110717" iosBarStyle="light-content" style={{ alignItems: 'center', backgroundColor: '#110717' }}>
                    <View style={styles.h2}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body >
                        <Title allowFontScaling={false} style={[styles.sendername]}>Company</Title>
                    </Body>
                    <Button transparent>
                    </Button>
                </Header>
                <Content>

                    <View style={styles.v1}>
                        <View style={styles.v2}>
                            <View style={styles.v22}>
                                <Image resizeMode="stretch" source={{ uri: this.state.companyDetail[0].company_logo != '' ? this.state.companyDetail[0].company_logo : '/temp' }} style={{ width: 90, height: '60%' }} />
                            </View>
                        </View>
                        <View style={styles.v3}>
                            <Text style={{ color: 'white', fontSize: 16 }}>{this.state.companyDetail[0].company_name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    this.state.CompanyTypes.map((Types, index) => (
                                        <Text key={index} style={{ color: 'white', fontSize: 12 }}>{Types.type_name}</Text>
                                    ))
                                }
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image resizeMode="stretch" source={this.state.KindIcon[this.state.companyDetail[0].company_cat_id - 1]} style={{ width: 20, height: 20 }} />
                                <Text style={styles.text}>{this.state.Kind[this.state.companyDetail[0].company_cat_id - 1]}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.v6e}>
                        <View style={styles.v7}>
                            <Text style={styles.text5}>Budget</Text>
                            <Text style={styles.text4}>£{this.state.investment_req==null?0:test(this.state.investment_req)}</Text>

                        </View>
                        <Text style={styles.text6}>|</Text>

                        <View style={styles.v8}>
                            <Text style={styles.text5}>In Escrow</Text>
                            <Text style={styles.text4}>£{this.state.escrow==null?0:test(this.state.escrow)}</Text>
                        </View>
                        <Text style={styles.text6}>|</Text>
                        <View style={styles.v7}>
                            <Text style={styles.text5}>Total Payments</Text>
                            <Text style={styles.text4}>£{this.state.payments==null?0:test(this.state.payments)}</Text>

                        </View>
                    </View>
                    <Tabs tabBarUnderlineStyle={{ backgroundColor: '#EC9705' }}>

                        {this.state.flag && (
                            <React.Fragment>
                                <Tab tabStyle={styles.tabstyle} textStyle={styles.inatextstyle} activeTextStyle={styles.atextcolor} activeTabStyle={styles.activeTabStyle} heading="Overview">
                                    <Overview CompanyContrat={this.state.CompanyContractedDetail} InvestorNames={this.state.Investor_names} MileStones={this.state.Number_of_milestones} />
                                </Tab>
                            </React.Fragment>

                        )}
                        <Tab tabStyle={styles.tabstyle} textStyle={styles.inatextstyle} activeTextStyle={styles.atextcolor} activeTabStyle={styles.activeTabStyle} heading="About">
                            <About
                                video={this.state.companyDetail[0].video_attacment}
                                last_y_rev={this.state.companyDetail[0].last_y_rev}
                                next_y_rev={this.state.companyDetail[0].next_y_rev}
                                percentage_equity={this.state.companyDetail[0].investment_eq}
                                company_desc={this.state.companyDetail[0].company_desc}
                                document={this.state.companyDetail[0].file1_attachment}
                            />
                        </Tab>
                        <Tab tabStyle={styles.tabstyle} textStyle={styles.inatextstyle} activeTextStyle={styles.atextcolor} activeTabStyle={styles.activeTabStyle} heading="Finance">
                            <Finace
                                expenditures={this.state.companyDetail[0].expenditures}
                                profit={this.state.companyDetail[0].profit}
                                loss={this.state.companyDetail[0].loss}
                            />
                        </Tab>
                    </Tabs>


                </Content>
                {
                    this.state.Active ? <View>

                    </View> :
                        <View style={styles.v5}>
                            <View style={styles.v6}>
                                <TouchableWithoutFeedback onPress={() => Actions.Conference()}>
                                    <Image source={require('../../images/Profile/Dialler.png')} style={styles.img} resizeMode="stretch" />
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.v4}>
                                <TouchableWithoutFeedback onPress={() => Actions.Payment({ Company_Id: this.props.Company_Id, Equity: this.state.investment_eq })}>
                                    <ImageBackground resizeMode="stretch" source={require('../../images/buttoncolor.png')} style={styles.btnimage}>
                                        <Text onPress={() => Actions.Payment({ Company_Id: this.props.Company_Id, Equity: this.state.investment_eq })} style={styles.text3}>Make an Investment</Text>
                                    </ImageBackground>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
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
    tabstyle: { backgroundColor: '#110717' },
    inatextstyle: { color: '#A5A5A5' },
    atextcolor: { color: 'white' },
    activeTabStyle: { backgroundColor: '#19131D' },
    text: { color: '#EC9705', fontSize: 12, marginLeft: 4 },
    v1: { height: 150, width: '100%', flexDirection: 'row' },
    v2: { width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-end' },
    v22: { width: 100, height: 100, justifyContent: 'center', alignItems: 'flex-end', borderWidth: 1, borderColor: '#cececd', borderRadius: 60 },
    v3: { width: '60%', height: '100%', marginLeft: 10, justifyContent: 'center' },
    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },
    v5: { height: 60, width: '100%', backgroundColor: '#1F1724', flexDirection: 'row' },
    v6: { height: 60, width: '20%', alignItems: 'center', justifyContent: 'center' },
    v4: { height: 60, width: '70%', justifyContent: 'center', alignItems: 'center' },
    text3: { color: 'white', fontSize: 14, overflow: 'hidden' },
    btnimage: { height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' },
    img: { width: 40, height: 40 },

    v6e: { width: '95%', height: 80, alignSelf: 'center', alignItems: "center", borderRadius: 20, flexDirection: "row", justifyContent: "space-around" },
    v7: { width: 100, borderRadius: 20, height: 80, flexDirection: "column", alignItems: "center", justifyContent: "center" },
    v8: { width: 120, borderRadius: 20, height: 80, flexDirection: "column", alignItems: "center", justifyContent: "center" },
    text4: { fontSize: 14, color: '#FFFFFF' },
    text5: { color: '#545454', fontSize: 12 },
    text6: { fontSize: 20, color: '#707070' },
    h2: { width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' },
    sendername: { color: '#CCCCCC', alignSelf: 'center' },
});
