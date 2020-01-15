import React, { Component } from 'react';
import { Dimensions, StyleSheet, YellowBox, StatusBar, Image, TouchableWithoutFeedback, ActivityIndicator, ImageBackground, Text, View } from 'react-native'
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import Welcome from './Welcome/Welcome';
import Welcome2 from './Welcome/LogInSignUp';
import SignUp from './SignUp/SignUp';
import LogIn from './Login/Login';
import Register from './Register/fragment';
import Congratulation from './Congratulation/Congratulation';
import EHome from './Entrepreneur/Home/EHome';
import EDashBoard from './Entrepreneur/EDashBoard';
import ManageProjects from './Entrepreneur/ManageProjects/MProjects';
import Support from './Support/Support';
import Settings from './Setting/Settings';
//import EProposal from './Entrepreneur/Proposal/Eproposal';
import CheckDetail from './Entrepreneur/Proposal/CheckDetial';
import TermsConditions from './Entrepreneur/Proposal/TermsCondition';
import CreateCompany from './MarkeetPlace/AddCompany';
import MarkeetPlace from './MarkeetPlace/MarketDashBoard';
import CompanyProfile from './MarkeetPlace/CompanyDetail/ComanyProfile';
import BuyCompanyEquity from './MarkeetPlace/CompanyDetail/BuyCompanyEquity';
import CompanyBid from './MarkeetPlace/CompanyDetail/CompanyBid';
import MarketDashBoard from './MarkeetPlace/MarketDashBoard';
import ChatBox from './Inbox/Chatbox';
import IDashBoard from './Investor/IDashBoard';
import Category from './Investor/Tabs/Entrepreneurfile/Categories';
import HomeCompanyProfile from './HomeCompanyProfile/profile/Profile';
//import HomeContractedCompanyProfile from './HomeCompanyProfile/Contracted/profile/Profile';
import CompanyInvestment from './MakeInvestment/Dashboard';
import Session from './Session/Session';
import SessionModal from './Session/Modal';
import Payment from './Payment/Fragment';
import Conference from './Conference/Conference';
import Notification from './Notification/Notification';
import Ticket from './Session/Ticket';
import CreditCard from './Session/CreditCard';
import { connect } from 'react-redux';
import SubPayment from './RegSubscription/Payment';
import SubPlan from './RegSubscription/SubscriptionPlan';
import Mode from './SelectMode/Mode';
import CompanyRegistration from './CompanyRegistration/fragment';
import CompanyContractList from './Entrepreneur/Home/CompanyContractList';
import Feedback from './Feedback/feedback';
import Modify from './Modify/Modify';
import MarketPlaceTab from './MarkeetPlace/MarketPlace';
import Complete from './Complete/Complete';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast'
import TPayment from './RegSubscription/TPayment';
import CreditCardP from './RegSubscription/CreditCard'
import PaymentSuccessfull from './Congratulation/Successfull';
import Kinds from './Investor/Tabs/Entrepreneurfile/Kinds';
import { counterdecrement, counterincrement, counterset } from '../src/Redux/Actions/Actions';
import Uri from './DeviceIp'
class Navigation extends Component {
    constructor(props) {
        super(props);
        //  this.toast=null
        this.state = {
            welcome: false,
            welcome2: false,
            SignUp: false,
            Login: false,
            Mode: false,
            Registration: false,
            CompanyRegistration: false,
            SubPayment: false,
            Congratulation: false,
            EDashBoard: false,
            IDashBoard: false,
            loading: false,
            Payment: false,
            HomeCompanyProfile: false,
            TPayment: false,
            SubPlan: false,
            entre_id: '',
            Type: '',
            url:Uri  //'http://192.168.100.6:80' //'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
        }
        DeviceInfo.getMacAddress().then(mac => {
            this.CheckStatus(mac);
        });
        this.setState({ loading: true })

    }
    CheckStatus = async (mac) => {
        //console.log(mac)
        let data = {
            Mac: mac
        }
        // alert(mac)
        await fetch(this.state.url + '/Session/Check_Session', {
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
                    //  console.log(resjson.Email)
                    //   this.setState({ loading: false,welcome2: true})
                    this.setState({ Type: resjson.Ent })
                    this.CheckRegisteration(resjson.Email, mac);
                } else {
                    this.setState({ loading: false, welcome2: true })
                    console.log("Email logout loading false")
                }
            }).catch(err => {
                this.setState({ loading: false })
                //console.log(err)
                alert('Network request Failed!' + err)
                //    this.refs.toast.show('Enter the Email and Password', DURATION.LENGTH_LONG);
            })
    }
    CheckRegisteration = async (email, mac) => {
        let data = {
            Email: email
        }
        await fetch(this.state.url + '/Session/Check_Registeration', {
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
                    // console.log("Email from check registratin=>", resjson.Email, resjson)
                    if (resjson.Investor) {
                        this.CheckSubs_Payment(mac, resjson)
                    }
                    else if (resjson.Entrepreneur) {
                        this.CheckSubs_Payment(mac, resjson)
                    }
                    else {
                        this.setState({ loading: false })
                        Actions.Registration({ Email: resjson.Email })
                    }
                } else {
                    this.setState({ loading: false, welcome2: true })
                    console.log("User not registered")
                }
            })
    }
    Check_Subs = async (m, resj) => {//pending 

        let data = {
            entre_id: 6
        }
        await fetch(this.state.url + '/Subscription/Check_Subs', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("user subscription", resjson.Message)
                if (resjson.Successful) {
                    Actions.SubPlan();
                } else {
                    this.CheckSubs_Payment(m, resj)
                }
            }).catch(err => {
                this.setState({ loading: false })
                alert('Failed Subscription !' + err)
            })


    }
    CheckSubs_Payment = async (mac, response) => {
        //   console.log(response)
        let data = {
            Mac: mac
        }
        await fetch(this.state.url + '/Session/User_Subs_Payment', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("response payment=>", resjson)
                console.log("response payment=>", this.state.Type)

                if (resjson.Successful) {
                    if (this.state.Type == true) {
                        if (resjson.entrepreneur.length == 0) {
                            Actions.Registration({ Type: 'Entrepreneur', No: { no: 2, Ent: 'E' } })
                        } else if (resjson.entrepreneur[0].active) {
                            this.setState({ loading: false, EDashBoard: true })
                        } else if (resjson.investor[0].active == null & resjson.entrepreneur[0].active == null) {
                            this.setState({ loading: false, Registration: true })
                        }
                    } else if (this.state.Type == false) {
                        if (resjson.investor.length == 0) {
                            Actions.Registration({ Type: 'Investor', No: { no: 2, Ent: 'I' } })
                        } else if (resjson.investor[0].active) {
                            this.setState({ loading: false, IDashBoard: true })
                        } else if (resjson.investor[0].active == null & resjson.entrepreneur[0].active == null) {
                            this.setState({ loading: false, Registration: true })
                        }

                    }
                    // if (resjson.Active) {
                    //     if (response.Investor) {
                    //         this.setState({ loading: false, IDashBoard: true })
                    //     }
                    //     else if (response.Entrepreneur) {
                    //         this.setState({ loading: false, EDashBoard: true })
                    //     }
                    //     else {
                    //         this.setState({ loading: false, Registration: true })
                    //     }
                    // } else {
                    //     if (response.Investor == false & response.Entrepreneur == false) {
                    //         this.setState({ loading: false, Registration: true })
                    //     } else {
                    //         this.setState({ SubPlan: true, loading: false })
                    //     }
                    // }
                } else {
                    this.setState({ SubPlan: true, loading: false })
                }
            }).catch(err => {
                this.setState({ loading: false })
                console.log(err)
                alert('Network request Failed d!')
                //  this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
            })

    }
    render() {
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
        YellowBox.ignoreWarnings(['Warning: ']);
        return (
            this.state.loading ?
                <View style={styles.container}>
                    <StatusBar hidden={false} backgroundColor="black" />
                    <ImageBackground resizeMode="stretch" source={require('./images/breg9.png')} style={styles.imagebackground}>
                        <Image source={require('./images/congrats.png')} style={styles.image1} />
                        <Text allowFontScaling={false} style={styles.text}>Congratulations!</Text>
                        <Text allowFontScaling={false} style={styles.text2}>Welcome to our pride, the</Text>
                        <Text allowFontScaling={false} style={styles.text3}>Black Lion Family</Text>
                        <TouchableWithoutFeedback onPress={() => this.Forward()} >
                            <Image source={require('./images/start.png')} style={styles.image} />
                        </TouchableWithoutFeedback>

                    </ImageBackground>
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
                :
                <Router onStateChange={(v) => console.log('v')} >
                    <Stack key="root" headerLayoutPreset='center' >

                        <Scene
                            header={null}
                            key="Welcome"
                            component={Welcome}
                            initial={this.state.welcome}
                        />
                        <Scene
                            header={null}
                            key="Welcome2"
                            component={Welcome2}
                            initial={this.state.welcome2}
                        />
                        <Scene
                            header={null}
                            key="SignUp"
                            component={SignUp}
                            initial={this.state.SignUp}
                        />
                        <Scene
                            header={null}
                            key="LogIn"
                            component={LogIn}
                            onEnter={() => console.log('Login entering')}
                            onExit={() => { console.log('login exit') }}
                            initial={this.state.Login}
                        />
                        <Scene
                            header={null}
                            key="Mode"
                            component={Mode}
                            initial={this.state.Mode}
                        />
                        <Scene
                            header={null}
                            key="CCP"
                            component={CreditCardP}
                           // initial={this.state.Mode}
                        />
                        <Scene
                            header={null}
                            key="Registration"
                            component={Register}
                            initial={this.state.Registration}
                        />
                        <Scene
                            header={null}
                            key="CompanyRegistration"
                            component={CompanyRegistration}
                            initial={this.state.CompanyRegistration}
                        />
                        <Scene
                            header={null}
                            key="SubPayment"
                            component={SubPayment}
                            initial={this.state.SubPayment}
                        />
                         <Scene
                        header={null}
                        key="Kinds"
                        component={Kinds}
                        initial={false}
                    />
                        <Scene
                            header={null}
                            key="SubPlan"
                            component={SubPlan}
                            initial={this.state.SubPlan}
                        />
                        <Scene
                            header={null}
                            key="Congratulation"
                            component={Congratulation}
                            initial={this.state.Congratulation}
                        />

                        <Scene
                            header={null}
                            key="EDashBoard"
                            component={EDashBoard}
                            initial={this.state.EDashBoard}
                        />
                        <Scene
                            header={null}
                            key="EHome"
                            component={EHome}
                        // initial
                        />

                        <Scene
                            header={null}
                            key="ManageProjects"
                            component={ManageProjects}
                        // initial
                        />

                        <Scene
                            header={null}
                            key="CheckDetail"
                            component={CheckDetail}
                        // initial
                        />
                        <Scene
                            header={null}
                            key="Terms"
                            component={TermsConditions}
                        // initial
                        />
                        <Scene
                            header={null}
                            key="Support"
                            component={Support}
                        // initial
                        />
                        <Scene
                            header={null}
                            key="Settings"
                            component={Settings}
                        // initial
                        />
                        <Scene
                            header={null}
                            key="CreateCompany"
                            component={CreateCompany}
                        // initial
                        />
                        <Scene
                            header={null}
                            key="MarkeetPlace"
                            component={MarkeetPlace}
                        // initial
                        />
                        <Scene
                            header={null}
                            key="CompanyProfile"
                            component={CompanyProfile}
                        // initial
                        />
                        <Scene
                            header={null}
                            key="BuyCompanyEquity"
                            component={BuyCompanyEquity}
                        // initial
                        />
                        <Scene
                            header={null}
                            key="CompanyBid"
                            component={CompanyBid}
                        // initial
                        />
                        <Scene
                            header={null}
                            key="MarketDashBoard"
                            component={MarketDashBoard}
                        // initial
                        />
                        <Scene
                            header={null}
                            key="ChatBox"
                            component={ChatBox}
                        // initial
                        />

                        <Scene
                            header={null}
                            key="IDashBoard"
                            component={IDashBoard}
                            initial={this.state.IDashBoard}
                        />
                        <Scene
                            header={null}
                            key="Categories"
                            component={Category}
                        //initial
                        />
                        <Scene
                            header={null}
                            key="HCompanyProfile"
                            component={HomeCompanyProfile}
                            initial={this.state.HomeCompanyProfile}
                        />

                        <Scene
                            header={null}
                            key="CompanyInvestment"
                            component={CompanyInvestment}
                        //initial
                        />
                        <Scene
                            header={null}
                            key="Session"
                            component={Session}
                        //initial
                        />
                        <Scene
                            header={null}
                            key="SessionModal"
                            component={SessionModal}
                        //initial
                        />
                        <Scene
                            header={null}
                            key="Payment"
                            component={Payment}
                            initial={this.state.Payment}
                        />

                        <Scene
                            header={null}
                            key="PSuccessful"
                            component={PaymentSuccessfull}
                        //initial
                        />
                        <Scene
                            header={null}
                            key="Conference"
                            component={Conference}
                        //initial
                        />
                        <Scene
                            header={null}
                            key="Notification"
                            component={Notification}
                        //initial
                        />
                        <Scene
                            header={null}
                            key="Ticket"
                            component={Ticket}
                        //initial
                        />
                        <Scene
                            header={null}
                            key="CreditCard"
                            component={CreditCard}
                        //initial
                        />
                        <Scene
                            header={null}
                            key="CCList"
                            component={CompanyContractList}
                        //  initial
                        />
                        <Scene
                            header={null}
                            key="Feedback"
                            component={Feedback}
                        // initial
                        />
                        <Scene
                            header={null}
                            key="Modify"
                            component={Modify}
                        //  initial
                        />
                        <Scene
                            header={null}
                            key="MarketPlaceTab"
                            component={MarketPlaceTab}
                        //  initial
                        />
                        <Scene
                            header={null}
                            key="Complete"
                            component={Complete}
                        //  initial
                        />
                        <Scene
                            header={null}
                            key="TPayment"
                            component={TPayment}
                            initial={this.state.TPayment}
                        />

                    </Stack>

                </Router>


        );
    }
}
const styles = StyleSheet.create({
    container: { flex: 1 },
    imagebackground: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
    image: { width: 254, height: 56, alignSelf: 'center', borderRadius: 20 },
    text: { fontSize: 19, color: '#CCCCCC', marginTop: 10, marginBottom: 10 },
    text2: { fontSize: 19, color: '#EC9705', marginTop: 10 },
    text3: { fontSize: 19, color: '#EC9705', marginBottom: 10 },
    image1: { width: '60%', height: '35%', alignSelf: 'center', },
});
function mapStateToProps(state) {
    return {
        counter: state.counter
    }
}
//   function mapDispatchToProps(dispatch){
//       return{
//           increasecounter:()=>dispatch({ type:'INCREASE_COUNTER'}),
//           decreasecounter:()=>dispatch({type:'DECREASE_COUNTER'})
//       }
//   }
export default connect(mapStateToProps, { counterincrement, counterdecrement, counterset })(Navigation);
