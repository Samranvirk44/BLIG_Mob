import React, { Component } from 'react';
import { Text, Dimensions, ActivityIndicator, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Input, Textarea, DatePicker, Header, Body, Title, Icon, Badge, Content, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast';
import { test } from '../../Converter';
import Uri from '../../DeviceIp'
export default class CreateOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sdate: "Start Date",
            edate: "End Date",
            minimumenddate:new Date(),
            Descrption: '',
            offerdescValidate: true,
            totalprice: '',
            totalpriceValidate: true,
            loading: false,
            user_id: '',
            I__Id: '',
            E_Id: '',
            url: Uri,//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com',
            Type: ''
        }
    }
    Validation = (v) => {
        const number = /^[0-9]+$/
        if (number.test(v)) {
            this.setState({
                totalprice: v,
                totalpriceValidate: true
            })
        }
        else if (v.length == 0) {
            this.setState({
                totalprice: '',
                totalpriceValidate: false
            })

        }
    }
    Set_Bid = async () => {
        let data = [
            {
                company_id: this.props.Company_Id,
                offer_desc: this.state.Descrption,
                start_date: this.state.sdate,
                end_date: this.state.edate,
                total_price: this.state.totalprice,
                user_id: this.state.user_id,//this.props.user_id
                status: 'Review'
            }
        ];
        if (this.state.Type == this.props.Type && this.state.Id == this.props.entre_id) {
            this.refs.toast.show('You can not bid on your company', DURATION.LENGTH_LONG);
        }
        else if(this.state.user_id!=''){
            await fetch(this.state.url+'/MarketPlace/Set_Bid', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            })
                .then(res => res.json())
                .then(resjson => {
                    console.log(resjson.Message)
                    if (resjson.Successful) {
                        Actions.pop()
                    }
                })
                .catch(err => {
                    this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
                })
        }
    }
    componentDidMount = () => {
        //   console.log(this.props.Type, this.props.entre_id)
        DeviceInfo.getMacAddress().then(mac => {
            this.setState({ loading: true });
            this.get_id(mac)

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

                    this.setState({ user_id: resjson.data.user_id })
                    if (resjson.data.Type == 'Investor') {
                        console.log('Investor::::')
                        this.setState({ Id: resjson.data.investor_id, Type: false })
                    } else if (resjson.data.Type == 'Entrepreneur') {
                        console.log('Entrepreneur::::')
                        this.setState({ Id: resjson.data.entrepreneur_id, Type: true })
                    }
                    this.setState({ loading: false })
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })

    }


    render() {
        return (
            <Container style={{ backgroundColor: '#110717' }}>
                <Header androidStatusBarColor="#110717" style={styles.header}>

                    <View style={styles.h2}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body style={{ alignItems: "center" }}>

                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <Title allowFontScaling={false} style={[styles.sendername]}>Create an Offer</Title>
                        </View>
                    </Body>
                    <View style={styles.h2}>
                    </View>
                </Header>
                <Content padder>
                    <View style={styles.v1}>
                        <Text allowFontScaling={false} style={[styles.text1, { marginBottom: 10 }]}>Offer Descriptoin</Text>
                        <Textarea allowFontScaling={false} value={this.state.Descrption} rowSpan={5} placeholderTextColor="#878787" onChangeText={(v) => this.setState({ Descrption: v })}
                            bordered placeholder="Describe your offer" style={[styles.textareabid, !this.state.offerdescValidate ? styles.textareaerror : null]} />
                        <View style={styles.v2}>
                            <DatePicker
                                placeHolderTextStyle={{ color: '#878787' }}

                              //  defaultDate={new Date(2018, 4, 4)}
                                minimumDate={new Date()}
                               // maximumDate={new Date(2022, 12, 31)}
                                locale={"en"}
                                hideText={true}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}

                                placeHolderText={this.state.sdate}
                                onDateChange={(val) => this.setState({ sdate: val.toString().substr(4, 12),minimumenddate:val })}

                                textStyle={{ color: "#878787" }}

                                // onDateChange={date => this.setDate(date)}
                                disabled={false}
                            />
                            <Icon name="calendar" style={{ color: '#EC9705' }} type="AntDesign" />

                        </View>
                        <View style={styles.v2}>
                            <DatePicker
                                placeHolderTextStyle={{ color: "#878787" }}
                              //  defaultDate={new Date(2018, 4, 4)}
                                minimumDate={this.state.minimumenddate}
                               // maximumDate={new Date(2025, 12, 31)}
                                locale={"en"}
                                hideText={true}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText={this.state.edate}
                                onDateChange={(val) => this.setState({ edate: val.toString().substr(4, 12), })}

                                textStyle={{ color: "#878787" }}

                                // onDateChange={date => this.setDate(date)}
                                disabled={false}
                            />
                            <Icon name="calendar" style={{ color: '#EC9705' }} type="AntDesign" />

                        </View>
                        <View style={styles.v3}>
                            <Text allowFontScaling={false} style={{ color: 'white', fontSize: 14 }}>Total Price</Text>
                            <View style={{ flexDirection: 'row', width: 80, alignItems: 'center', justifyContent: 'center' }}>
                                <Text allowFontScaling={false} style={{ fontSize: 14, color: 'white' }}>$</Text>
                                <Input onChangeText={(value) => this.Validation(value)} numberOfLines={1} value={this.state.totalprice} style={[styles.totalstyle, !this.state.totalpriceValidate ? styles.error : null]} />
                            </View>
                        </View>
                    </View>

                </Content>
                <View style={{ flexDirection: "row", height: 70, backgroundColor: '#1F1724', justifyContent: 'space-around' }}>

                    <TouchableWithoutFeedback onPress={() => this.Set_Bid()}>
                        <View style={styles.v9}>
                            <Text onPress={() => this.Set_Bid()} allowFontScaling={false} style={{ color: '#FFFFFF' }}>Sent Offer</Text>
                        </View>
                    </TouchableWithoutFeedback>
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
            </Container>


        );
    }
}
const styles = StyleSheet.create({
    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },
    sendername: { color: '#CCCCCC' },
    textareabid: { color: 'white', borderRadius: 5, borderColor: '#878787' },
    h2: { width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' },
    v1: { width: '100%', backgroundColor: '#1F1724', padding: 10, borderRadius: 10 },
    v2: { alignItems: 'center', borderBottomColor: '#878787', borderBottomWidth: 2, flexDirection: 'row', justifyContent: 'space-between' },
    v3: { marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    text1: { color: 'white', fontSize: 18 },
    v9: { width: '60%', borderWidth: 1, borderColor: '#EC9705', borderRadius: 20, height: 40, marginTop: 5, alignItems: "center", justifyContent: "center", alignSelf: 'center' },
    totalstyle: { height: 20, padding: 0, color: '#878787', fontSize: 14, borderBottomWidth: 2, borderBottomColor: 'grey', },
    textareaerror: { borderColor: 'red' },
    error: { borderBottomColor: 'red' }

});
