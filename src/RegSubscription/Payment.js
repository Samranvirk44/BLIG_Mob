import React, { Component } from 'react';
import { Text, View, Dimensions, ActivityIndicator, BackHandler, StyleSheet, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { Content, Container, Header, Badge, Body, Icon, Title } from 'native-base';
import { CreditCardInput } from "react-native-credit-card-input";
import Toast, { DURATION } from 'react-native-easy-toast';
import styless from '../Styles/Styles';
import { Actions } from 'react-native-router-flux';
import Uri from '../DeviceIp';
import DeviceInfo from 'react-native-device-info';
export default class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            cardNo: 0,
            cvc: '',
            exmonth: '',
            exyear: '',
            validity: '',
            Type: '',
            description: 'i am description ',
            url:Uri,//'http://192.168.100.4:80',// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com',
            loading: false,
            entre_id: '',
            U_Id: ''
        }
    }
    UNSAFE_componentWillMount = () => {
        //  this.setState({amount:this.props.Amount})
        DeviceInfo.getMacAddress().then(mac => {
        //    this.GET_Amount(mac);
            this.get_id(mac);
        });
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }
    onBackPress() {
        Actions.pop()
    }
    carddata(v) {
        // console.log(v)
        this.setState({
            validity: v.valid, exmonth: v.values.expiry.slice(0, 2),
            Type: v.values.type, cvc: v.values.cvc, exyear: v.values.expiry.slice(3, 5),
            cardNo: v.values.number
        })
    }
    create_token = async () => {
        // console.log("valid=>", this.state.validity)
        this.setState({ loading: true })

        if (this.state.validity == true & this.props.Amount > 0) {
            let data = {
                number: this.state.cardNo,
                exmonth: this.state.exmonth,
                exyear: this.state.exyear,
                cvc: this.state.cvc
            }
            await fetch(this.state.url + '/Stripe/Create_Token', {
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
                    //    console.log("Create Token", resjson.Message);
                    if (resjson.Successful) {
                        this.PayCharges(resjson.Token.id)
                    }
                    else {
                        this.refs.toast.show('Payment Request Failed!', DURATION.LENGTH_LONG);
                        this.setState({ loading: false })
                    }
                })
                .catch(err => {
                    //  console.log(err, resjson.Message);
                    this.setState({ loading: false })
                    this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
                })
        } else {
            this.setState({ loading: false })
            this.refs.toast.show('Fill the Required Fields!', DURATION.LENGTH_LONG);
        }
    }
    PayCharges = async (tok) => {
        // console.log("token=>", tok)
        let data = {
            amount: this.props.Amount,
            token: tok,
            description: this.state.description
        }
        await fetch(this.state.url + '/Stripe/Access_Token', {
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
                //  console.log("Payment Charges", resjson.Message);
                if (resjson.Successful) {
                    this.setState({ loading: false })
                    this.Update_User();
                    this.Update_Subs_Amount()
                    //     Actions.Congratulation()
                }
                else {
                    this.setState({ loading: false })
                    this.refs.toast.show('Payment Not Successful!', DURATION.LENGTH_LONG);
                }
            })
            .catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
            })
    }

    // GET_Amount = async (mac) => {
    //     //  console.log("GET Mount calling")
    //     this.setState({ loading: true })
    //     let data = {
    //         Mac: mac
    //     }
    //     await fetch(this.state.url + '/Subscription/User_Subs_Amount', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             data
    //         }),
    //     })
    //         .then(res => res.json())
    //         .then(resjson => {
    //             console.log("Amount", resjson);
    //             if (resjson.Successful) {
    //                 this.refs.toast.show('Charges not Payed', DURATION.LENGTH_LONG);
    //                 this.setState({ amount: resjson.Amount, loading: false })
    //             }
    //             else {
    //                 this.setState({ loading: false })
    //                 this.refs.toast.show('Contact with admin!', DURATION.LENGTH_LONG);

    //             }
    //         })
    //         .catch(err => {
    //             //  console.log(err, resjson.Message);
    //             this.setState({ loading: false })
    //             this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
    //         })
    // }
    Update_Subs_Amount = async () => {

        let data = {
            entre_id: this.state.entre_id
        }
        await fetch(this.state.url + '/Subscription/Update_Subs_Amount', {
            method: 'PUT',
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
                console.log("Amount", resjson);
                if (resjson.Successful) {
                    this.refs.toast.show('Successfylly Payed!', DURATION.LENGTH_LONG);
                    this.setState({ amount: resjson.Amount, loading: false })
                }
                else {
                    this.setState({ loading: false })
                    this.refs.toast.show('Already Payed!', DURATION.LENGTH_LONG);

                }
            })
            .catch(err => {
                //  console.log(err, resjson.Message);
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
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
                console.log('Id::::=>', resjson)
                if (resjson.Successful) {
                    this.setState({ U_Id: resjson.data.user_id })
                    if (resjson.data.Type == 'Investor') {
                        console.log('Investor::::')
                        this.setState({ entre_id: resjson.data.investor_id });//investor _Id
                    } else if (resjson.data.Type == 'Entrepreneur') {
                        console.log('Entrepreneur::::')
                        this.setState({ entre_id: resjson.data.entrepreneur_id });//entrepreneur _Id
                    }
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!'+err, DURATION.LENGTH_LONG);

            })

    }
    Update_User = async () => {
        console.log('user id=>', this.state.U_Id,this.props.Type)
        let data = {
            U_Id: this.state.U_Id,
            Type:this.props.Type
        }
        if (this.state.U_Id != '' & this.props.Type!=undefined & this.props.Type!=null) {
            await fetch(this.state.url + '/Register/User_Status', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            })
                .then(res => res.json())
                .then(resjson => {
                    if (resjson.Successful) {
                        Actions.Congratulation();
                        this.refs.toast.show('Successful!', DURATION.LENGTH_LONG);
                    }
                }).catch(err => {
                    this.setState({ loading: false })
                    this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

                })
        } else {
            this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
        }

    }
    UserSubscription = async () => { //copied from Reg fragment for subscription
     //console.log(this.props.Amount)
        this.setState({loading:true})
        if (this.state.validity == true & this.props.Amount > 0) {
            let userid = null
        let Ent = false
        if (this.state.Type == 'Investor') {
            userid = this.state.entre_id;
            Ent = false
        }
        else if (this.state.Type == 'Entrepreneur') {
            userid = this.state.entre_id;
            Ent = true
        }

        let data = {
            values: [{
                subscription_id: this.props.Index,
                user_id: userid,
                payed: false,
                entreprenuer: Ent
            }]
        }
        await fetch(this.state.url + '/User/User_Subscription', {
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
                    this.create_token()
                   // Actions.SubPayment();
                }else{
                    this.refs.toast.show(resjson.Message, DURATION.LENGTH_LONG);  
                }
            }).catch(err => {
                alert('Failed Subscription !')
            })
        }else{
            this.setState({ loading: false })
            this.refs.toast.show('Fill the Required Fields!', DURATION.LENGTH_LONG);
       }
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#110717' }}>
                <Header hasTabs androidStatusBarColor="#110717" iosBarStyle="light-content" style={{ alignItems: 'center', backgroundColor: '#110717' }}>
                    <View style={styles.h2}>
                        <Icon onPress={() => Actions.pop()} type="Ionicons" name="md-arrow-back" style={{ color: '#FFFFFF' }} />
                    </View>
                    <Body>
                        <Title style={{ alignSelf: 'center', color: '#CCCCCC' }}>Payment Data</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Text style={styles.text1}>Total Investment</Text>
                    <Text style={styles.text4}>£{this.props.Amount}</Text>
                    <View style={{ width: '100%', }}>
                        <CreditCardInput onChange={(v) => this.carddata(v)}
                            requiresName={true}
                            // requiresPostalCode={true}
                            brand={false}
                            labelStyle={{ color: '#cececd' }}
                            allowScroll={true}
                            //  cardBrandIcons=
                            // brand='master card'
                            //  validColor="white"
                            inputStyle={{ color: 'white' }}
                            // invalidColor="#EC9705"

                            cardImageFront={require('../images/ccard.png')}
                            cardImageBack={require('../images/ccard.png')}
                        />
                    </View>
                </Content>
                <View style={styless.pv5}>
                    <TouchableWithoutFeedback onPress={() => this.UserSubscription()}>
                        <View style={styless.v6}>
                            <ImageBackground resizeMode="stretch" source={require('../images/buttoncolor.png')} style={[styless.btnimage, { width: '100%' }]}>
                                <Text onPress={() => this.UserSubscription()} allowFontScaling={false} style={styless.ptext3}>Proceed to confirm</Text>
                            </ImageBackground>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
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
    v1: { width: '100%', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' },
    v2: { alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#EC9705', height: 40, width: '30%', borderRadius: 20 },
    v3: { flexDirection: 'row', borderBottomColor: '#878787', borderBottomWidth: 2, alignItems: 'center' },
    v4: { width: 20, height: 20, backgroundColor: '#E91D26', borderRadius: 10 },
    v7: { marginLeft: -10, width: 20, height: 20, backgroundColor: '#F59500', borderRadius: 10 },
    v8: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    v9: { width: '45%', overflow: 'hidden' },
    v10: { width: 20, height: 20, borderWidth: 1, borderColor: '#EC9705', borderRadius: 10 },
    text1: { marginTop: 15, color: '#878787', fontSize: 14 },
    text4: { color: '#EC9705', fontSize: 28, marginTop: 5 },
    text2: { color: 'white', },
    item: { marginTop: 10 },
    Label: { fontSize: 14, color: '#878787', marginTop: 30 },
    save: { fontSize: 14, color: '#878787' },
    input: { color: '#878787', fontSize: 14 }


});
