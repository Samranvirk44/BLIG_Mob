import React, { Component } from 'react';
import { Text, View,StatusBar, Dimensions, ActivityIndicator, BackHandler, Switch, StyleSheet, Image, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { Content, Container, Header, Badge, Item, Label, Body, Icon, Title, Input, DatePicker } from 'native-base';
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
    Validation(v, i) {
        const name = /^[a-zA-Z ]+$/
        const Num = /^[0-9]+$/
        if (i == 1) {
            if (name.test(v)) {
                // console.log(name.test(v))
                this.setState({
                    Name: v,
                    Namef: true
                })
            }
            else if (v.length == 0) {
                this.setState({
                    Name: '',
                    Namef: false
                })
            }
        } else if (i == 2) {
            if (Num.test(v)) {
                console.log(v.length)
                if (v.length <= 16) {
                    this.setState({
                        cardNo: v,
                    })
                }
                if (v.length == 16) {
                    this.setState({
                        cardNof: true,
                    })
                } else {
                    this.setState({
                        cardNof: false,
                    })
                }
            }
            else if (v.length == 0) {
                this.setState({
                    cardNo: '',
                    cardNo: false
                })
            }

        } else if (i == 3) {
            if (Num.test(v)) {
                //console.log(name.test(v))
                if (v.length <= 3) {
                    this.setState({
                        cvc: v,
                    })
                }
                if (v.length == 3) {
                    this.setState({
                        cvcf: true,
                    })
                } else {
                    this.setState({
                        cvcf: false,
                    })
                }
            }
            else if (v.length == 0) {
                this.setState({
                    cvc: '',
                    cvcf: false
                })
            }
        }
    }
    updatedate = (val) => {

        if (val.toString().substr(4, 3) == 'Jan') {
            this.setState({exmonth:1, datef:true, exyear: val.toString().substr(13, 2) })
        }else  if (val.toString().substr(4, 3) == 'Feb') {
            this.setState({exmonth:2,datef:true, exyear: val.toString().substr(13, 2) })
        }else  if (val.toString().substr(4, 3) == 'Mar') {
            this.setState({datef:true,exmonth:3, exyear: val.toString().substr(13, 2) })
        }else  if (val.toString().substr(4, 3) == 'Apr') {
            this.setState({exmonth:4,datef:true, exyear: val.toString().substr(13, 2) })
        }else  if (val.toString().substr(4, 3) == 'May') {
            this.setState({exmonth:5,datef:true, exyear: val.toString().substr(13, 2) })
        }else  if (val.toString().substr(4, 3) == 'Jun') {
            this.setState({exmonth:6,datef:true, exyear: val.toString().substr(13, 2) })
        }else  if (val.toString().substr(4, 3) == 'Jul') {
            this.setState({exmonth:7,datef:true, exyear: val.toString().substr(13, 2) })
        }else  if (val.toString().substr(4, 3) == 'Aug') {
            this.setState({exmonth:8,datef:true, exyear: val.toString().substr(13, 2) })
        }else  if (val.toString().substr(4, 3) == 'Sep') {
            this.setState({exmonth:9,datef:true, exyear: val.toString().substr(13, 2) })
        }else  if (val.toString().substr(4, 3) == 'Oct') {
            this.setState({exmonth:10,datef:true, exyear: val.toString().substr(13, 2) })
        }else  if (val.toString().substr(4, 3) == 'Nov') {
            this.setState({exmonth:11,datef:true, exyear: val.toString().substr(13, 2) })
        }else  if (val.toString().substr(4, 3) == 'Dec') {
            this.setState({exmonth:12,datef:true, exyear: val.toString().substr(13, 2) })
        }
    }
    Create_UserCardData = async () => {
        console.log(this.state.U_Id,this.state.Namef,this.state.cardNof,this.state.datef,this.state.cvcf)
        if (this.state.Namef == false | this.state.cardNof == false | this.state.datef == false | this.state.cvcf == false | this.state.U_Id == '') {
            this.refs.toast.show('Fill the Fields!', DURATION.LENGTH_LONG);
        } else {
            let data = {
                values: [{
                    c_name: this.state.Name,
                    c_num: parseInt(this.state.cardNo),
                    c_expiry_month:parseInt( this.state.exmonth),
                    c_expiry_year:parseInt( this.state.exyear),
                    cvv_num: parseInt( this.state.cvc),
                    user_id:parseInt( this.state.U_Id)
                }]
            }
            await fetch(this.state.url + '/MileStones/Card_Insert', {
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
                        Actions.refresh()
                        alert('Successfully Inserted!', DURATION.LENGTH_LONG);
                    }
                }).catch(err => {
                    this.setState({ loading: false })
                    this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

                })

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
                    <Text style={styles.text11}>Total Investment</Text>
                    <Text style={styles.text4}>£{this.props.Amount}</Text>
                   
                    <Item style={{ marginTop: 10 }} floatingLabel>
                        <Label allowFontScaling={false} style={styles.username}>Name</Label>
                        <Input keyboardType="email-address" allowFontScaling={false} onChangeText={(value, ) => this.Validation(value, 1)} value={this.state.Name} style={styles.input} />
                    </Item>
                    <Item style={{ marginTop: 10 }} floatingLabel>
                        <Label allowFontScaling={false} style={styles.username}>Card No</Label>
                        <Input keyboardType="email-address" allowFontScaling={false} onChangeText={(value, ) => this.Validation(value, 2)} value={this.state.cardNo} style={styles.input} />
                    </Item>
                    <View style={styles.v22}>
                        <DatePicker
                            placeHolderTextStyle={{ color: "#878787",fontSize:14 }}
                            // defaultDate={new Date(2018, 4, 4)}
                            minimumDate={new Date()}
                            //maximumDate={new Date(2018, 12, 31)}
                            locale={"en"}
                            hideText={true}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText={'VALID THRU'}
                            onDateChange={(val) => this.updatedate(val)}
                            textStyle={{ color: "#878787" }}
                            // onDateChange={date => this.setDate(date)}
                            disabled={false}
                        />
                        <Icon name="calendar" style={{ color: '#EC9705' }} type="AntDesign" />

                    </View>
                    <Item style={{ marginTop: 10 }} floatingLabel>
                        <Label allowFontScaling={false} style={styles.username}>CCV/CVV</Label>
                        <Input keyboardType="email-address" allowFontScaling={false} onChangeText={(value, ) => this.Validation(value, 3)} value={this.state.cvc} style={styles.input} />
                    </Item>
                    <View style={styles.v}>
                        <Text allowFontScaling={false} style={styles.text1}>Save data for future payments</Text>
                        <Switch

                            value={this.state.switchValue}
                            onValueChange={(switchValue) => this.setState({ switchValue: switchValue })}
                            trackColor={{
                                true: '#EC9005',
                                false: '#1F1724',
                            }}
                            thumbColor='#EC9707'
                            style={{ width: 70 }} />

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
    text11: { marginTop: 15, color: '#878787', fontSize: 14 },
    text4: { color: '#EC9705', fontSize: 28, marginTop: 5 },
    input: { width: '100%', color: 'white' },
    v: { width: '100%', marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' },
    text1: { marginTop: 15, color: '#878787', fontSize: 14 },
    v22: {marginTop:15, alignItems: 'center', borderBottomColor: '#878787', borderBottomWidth: 2, flexDirection: 'row', justifyContent: 'space-between' },

});
