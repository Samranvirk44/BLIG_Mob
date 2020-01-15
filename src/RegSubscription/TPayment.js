import React, { Component } from 'react';
import { Text, View, StyleSheet,ActivityIndicator,Dimensions, TouchableWithoutFeedback, ImageBackground, Image, Switch } from 'react-native';
import { Content, Container, Item, Label, Input, Header, Title, Button, Body, Icon, } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Uri from '../DeviceIp'
export default class PaymentData extends Component {
    state = {
        switchValue: false,
        I_Id: '',
        M_Id: '',
        name: '',
        loading:false,
        TransactionId: '',
        url:Uri//'http://192.168.100.4:80',// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'

    }
    Milestone_Payment = async () => {
        this.setState({loading:true})
        if (this.state.TransactionId != '' & this.state.name != '' & this.props.I_Id != '') {
            let data = {
                values: [{
                    c_investor_id: this.props.C_Id,   //its from company_investor.id (fk)
                    milestone_id: this.props.M_Id,   //its from milestone.id  (fk)
                    amount: this.props.Amount,        //its from milestone.amount
                    transaction_number: this.state.TransactionId,// I dont know
                    status: 'Review',
                    date: new Date()
                }]
            }
            console.log(this.props.I_Id, this.props.M_Id, this.props.C_Id)
            await fetch(this.state.url + '/MileStones/Payment_MileStone', {
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
                    console.log("MileStones Payment", resjson.Message);
                    if (resjson.Successful) {
                        if (resjson.flag) {
                            alert('You have already payed!')
                            this.setState({loading:false})
                        } else {
                            this.setState({loading:false})
                            Actions.pop();
                            setTimeout(() => {
                                 Actions.PSuccessful();                            
                            }, 100);
                        }
                    }
                    else {
                        alert('Not Payment Successful');
                        this.setState({loading:false})
                    }
                })
                .catch(err => {
                    this.setState({loading:false})
                    alert(err);
                })
        } else {
            this.setState({loading:false})
            alert('fill the required field')
        }

        //     <View style={styles.v}>
        //     <Text allowFontScaling={false} style={styles.text1}>Save data for future payments</Text>
        //     <Switch

        //         value={this.state.switchValue}
        //         onValueChange={(switchValue) => this.setState({ switchValue: switchValue })}
        //         trackColor={{
        //             true: '#EC9005',
        //             false: '#1F1724',
        //         }}
        //         thumbColor='#EC9707'
        //         style={{ width: 70 }} />

        // </View>
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#110717' }}>
                <Header iosBarStyle="light-content" hasTabs androidStatusBarColor="#110717" style={styles.header}>
                    <Button style={{ width: 70 }} transparent>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </Button>
                    <Body>
                        <Title allowFontScaling={false} style={{ alignSelf: 'center', color: '#CCCCCC' }}>Payment Data</Title>
                    </Body>
                    <Button style={{ width: 70 }} badge vertical transparent>
                        <Title allowFontScaling={false} style={{ alignSelf: 'center', color: '#CCCCCC' }}></Title>
                    </Button>
                </Header>
                <Content padder>
                    <Image source={require('../images/Ellipse.png')} style={styles.Img} />
                    <Item style={styles.item} floatingLabel>
                        <Label allowFontScaling={false} style={styles.username}>Name</Label>
                        <Input keyboardType="email-address" allowFontScaling={false} onChangeText={(value) => this.setState({ name: value })} value={this.state.name} style={styles.input} />
                    </Item>
                    <Item style={styles.item} floatingLabel>
                        <Label allowFontScaling={false} style={styles.username}>Transaction ID</Label>
                        <Input keyboardType="email-address" allowFontScaling={false} onChangeText={(value) => this.setState({ TransactionId: value })} value={this.state.TransactionId} style={styles.input} />
                    </Item>


                </Content>
                {
            this.state.loading ?
              <View style={{ position: 'absolute', backgroundColor: "rgba(0,0,0,0.4)", width: Dimensions.get('window').width, height: Dimensions.get('window').height, }}>
                <ActivityIndicator size="large" color="#EC9705" style={{ position: 'absolute', top: (Dimensions.get('window').height / 2) - 40, left: (Dimensions.get('window').width / 2) - 20 }} />

              </View>
              : null
          }
                <View style={styles.v5}>
                    <TouchableWithoutFeedback onPress={() => this.Milestone_Payment()}>
                        <View style={styles.v6}>
                            <ImageBackground resizeMode="stretch" source={require('../images/buttoncolor.png')} style={styles.btnimage}>
                                <Text onPress={() => this.Milestone_Payment()} allowFontScaling={false} style={styles.text3}>Proceed</Text>
                            </ImageBackground>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Container >


        );
    }
}
const styles = StyleSheet.create({
    item: { marginTop: 30 },
    v: { width: '100%', marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' },
    text1: { marginTop: 15, color: '#878787', fontSize: 14 },
    text4: { color: '#EC9705', fontSize: 28, marginTop: 5 },
    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },
    v5: { height: 70, width: '100%', backgroundColor: '#1F1724', alignItems: 'center', justifyContent: 'center' },
    input: { color: 'white' },
    username: { color: '#cececd' },
    Img: { width: 100, height: 100, alignSelf: 'center', marginTop: 20, borderRadius: 50, overflow: 'hidden' },
    v6: { width: '60%', height: 50 },
    text3: { color: 'white', fontSize: 14, overflow: 'hidden' },
    btnimage: { height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' },
});
