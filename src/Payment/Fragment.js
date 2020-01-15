import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Dimensions, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import { Header, Title, Button, Body, Icon, Badge } from 'native-base';
import Invest from './Invest'
import ProjectDetail from './ProjectDetail';
import MileStone from './Milestone';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast';
import Uri from '../DeviceIp'
export default class Fragment extends Component {
    constructor(porps) {
        super(porps);
        this.state = {
            screennumber: 1,
            Milestoneno: 2,
            Equity: this.props.Equity,
            Company_Id: this.props.Company_Id,
            Total_Investment: '',
            MileStonesData: [],
            project_title: 'abc',
            project_detail: '',
            start_date: null,
            end_date: null,
            amount: 0,
            loading: false,
            Mflag: false,
            I_Id: '',
            url:Uri//'http://192.168.100.4:80',// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
        }
    }
    componentDidMount = () => {
        console.log("will mount calling", this.props.Company_Id)
        DeviceInfo.getMacAddress().then(mac => {
            this.get_id(mac);
            console.log("mac=>", mac);
        });
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
                    if (resjson.data.Type == 'Investor') {
                        console.log('Investor::::')
                        this.setState({ I_Id: resjson.data.investor_id });//investor _Id
                    }
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })

    }

    SelectScreen = (c) => {
        switch (c) {
            case 1:
                if (this.state.screennumber < 3) {
                    if (this.state.Total_Investment == '' | this.state.Total_Investment <= 0) {
                        this.refs.toast.show('Check the Amount!', DURATION.LENGTH_LONG);
                    } else {
                        this.setState({ screennumber: this.state.screennumber + 1 })
                    }
                }
                else if (this.state.screennumber == 3) {
                    this.CreateMileStone()
                }
                break;
            case 2:
                if (this.state.screennumber == 1) {
                    Actions.pop();
                }
                else if (this.state.screennumber > 1) {
                    this.setState({ screennumber: this.state.screennumber - 1 })
                } break;
        }
    }
    setmilestone = (k) => {
        //console.log("fragment",k)
        this.setState({ Milestoneno: k })
    }
    Screen = () => {

        if (this.state.screennumber == 1) {
            return (<Invest Amount={this.state.Total_Investment} SendData={(index, data) => this.UpdateData(index, data)} Equity={this.state.Equity} />)
        }
        else if (this.state.screennumber == 2) {
            return (<MileStone Mno={this.state.Milestoneno} SendData={(index, data) => this.UpdateData(index, data)} MileStone={(k) => this.setmilestone(k)} />)
        }
        else if (this.state.screennumber == 3) {
            return (<ProjectDetail Amount={this.state.Total_Investment} SendData={(index, data) => this.UpdateData(index, data)} Equity={this.state.Equity} MileStones={this.state.Milestoneno} />)
        }
        // else if (this.state.screennumber == 4) {
        //     return (<Payment />)
        // }
    }
    checkdata() {
       // console.log("data",this.state.MileStonesData[0].milestone_end)
      try {
        if(this.state.MileStonesData.length==0){
            return false;
        }
        
            for (let index = 0; index < this.state.MileStonesData.length; index++) {
                if(this.state.MileStonesData[index].amount<=0){
                    return false;
                }else if(this.state.MileStonesData[index].filename=="Attache your document here"){
                    return false;
                }else if(this.state.MileStonesData[index].milestone_end==null){
                    return false;
                }else if(this.state.MileStonesData[index].milestone_start==null){
                    return false;
                }else if(this.state.MileStonesData[index].project_description==''){
                    return false;
                }else if(this.state.MileStonesData[index].project_tittle==''){
                    return false;
                }
     
             }
       return true;
          
      } catch (error) {
          console.log(error)
          return false;
      } 
    }
    CreateMileStone = async () => {
        //  console.log(this.state.MileStonesData.length, " ", this.state.Milestoneno," =>", this.state.MileStonesData)
        this.setState({ loading: true })
      //  console.log()
        if (this.checkdata()) {
            let investor_id = this.state.I_Id;
            let investor_eq = this.state.Equity;
            let Investment_end = this.state.MileStonesData[this.state.MileStonesData.length - 1].milestone_end;
            let data = {
                CompanyInvestor: [{
                    company_id: this.state.Company_Id,
                    investor_id: investor_id,
                    investor_equity: investor_eq,
                    total_investment: this.state.Total_Investment,
                    status: 'Review',
                    investment_end: Investment_end,
                    contract_number: 'BLIG-' + (Math.floor(Math.random() * 101) * Math.floor(Math.random() * 101) * Math.floor(Math.random() * 101)) + investor_id + this.state.Company_Id
                }],
                MilesStonesData: this.state.MileStonesData
            }
            await fetch(this.state.url + '/MileStones/Create_MileStones', {
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
                    console.log("Create MileStones", resjson.Message);
                    if (resjson.Successful) {
                        this.setState({ loading: false });
                        //console.log('M_Id=>',resjson.M_Id);
                        // console.log('C_Id=>',resjson.C_Id);
                        Actions.pop();
                        setTimeout(() => {
                            Actions.TPayment({ I_Id: this.state.I_Id, Amount: this.state.MileStonesData[0].amount, M_Id: resjson.M_Id, C_Id: resjson.C_Id });
                        }, 300);
                        // Actions.pop();
                    }
                }).catch(err => {
                    this.setState({ loading: false })
                    this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
                })
        } else {
            this.setState({ loading: false })
            this.refs.toast.show('Fill the Requirements!', DURATION.LENGTH_LONG);
        }
    }
    UpdateData = (index, value) => {
        //console.log(index,value)
        switch (index) {
            case 1:
                this.setState({ Total_Investment: value })
                break;
            case 2:
                this.setState({ Milestoneno: value })
                break;
            case 3:
                this.setState({ MileStonesData: value })
                break;
        }
    }
    render() {
        //console.log("Equity",this.props.Equity)
        return (
            <View style={{ flex: 1 }}>
                <Header iosBarStyle="light-content" hasTabs androidStatusBarColor="#110717" style={styles.header}>
                    <Button transparent>
                        <Icon onPress={() => this.SelectScreen(2)} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </Button>
                    <Body>
                        <Title allowFontScaling={false} style={{ alignSelf: 'center', color: '#CCCCCC' }}>Explore Entrepreneurs</Title>
                    </Body>
                    <Button badge vertical transparent>
                        <Badge style={{ height: 15, marginBottom: -15, backgroundColor: 'red', marginLeft: 30 }}><Text style={{ color: 'white', fontSize: 11 }}>0</Text></Badge>
                        <Icon type="MaterialIcons" name="notifications" style={{ color: '#EC9705', fontSize: 28 }} />
                    </Button>
                </Header>

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    {this.Screen()}
                    <View style={styles.v5}>
                        <TouchableWithoutFeedback onPress={() => this.SelectScreen(1)}>
                            <View style={styles.v6}>
                                <ImageBackground resizeMode="stretch" source={require('../images/buttoncolor.png')} style={styles.btnimage}>
                                    <Text allowFontScaling={false} style={styles.text3}>Proceed</Text>
                                </ImageBackground>
                            </View>

                        </TouchableWithoutFeedback>
                    </View>
                </View>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },
    v5: { height: 70, width: '100%', backgroundColor: '#1F1724', alignItems: 'center', justifyContent: 'center' },
    v6: { width: '60%', height: 50 },
    text3: { color: 'white', fontSize: 14, overflow: 'hidden' },
    btnimage: { height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' },
})