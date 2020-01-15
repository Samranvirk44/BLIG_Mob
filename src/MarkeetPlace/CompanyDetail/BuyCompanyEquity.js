
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image ,TouchableWithoutFeedback} from 'react-native';
import { Icon, Button, Container, Content, Header, Body, Title, } from 'native-base'
import styles from '../../Styles/Styles';
import {Actions} from 'react-native-router-flux';
import Uri from '../../DeviceIp'
export default class BuyComEquity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '$400000',
            date: '06/30/2019',
            status: 'Pending',
            Companyname: 'General Electronics',
            industry: 'Electronics Industry',
            Company:[],
            Bid:[],
            url: Uri//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'


        }
    }
    componentDidMount(){
        this.Show_Bid()
    }
    Show_Bid=async()=>{
        let data= {
            C_Id:this.props.Company_Id
        }
         await fetch(this.state.url+'/MarketPlace/Show_Bid', {
             method: 'POST',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({ data }),
         })
             .then(res => res.json())
             .then(resjson => {
                 console.log(resjson.Message,resjson.data)
                 if (resjson.Successful) {
                     this.setState({Company:resjson.data.CompanyData,Bid:resjson.data.Biddata})
                 }
             })
             .catch(err=>alert(err))
          
     }
    render() {
        return (
            <Container style={styles.Containerstyle}>
                <Header hasTabs androidStatusBarColor="#110717" style={styles.pheader}>

                    <View style={styles.h2}>
                        <Icon onPress={()=>Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body >
                        <Title allowFontScaling={false} style={[styles.sendername]}>Buy Company Equity</Title>
                    </Body>
                    <Button transparent>
                    </Button>
                </Header>
                <Content padder>
                    {
                        this.state.Bid.map((data,index)=>(
                            <View style={styles.v1e}>
                            <View style={styles.v5e}>
                                <View style={styles.v22}>
                                    <Image source={{uri:this.state.Company[0].company_logo}} style={styles.imagestyle} resizeMode='stretch'></Image>
                                </View>
    
                                <View style={styles.v44}>
                                    <View style={styles.v6e}>
                                        <Text allowFontScaling={false} style={styles.text1e}>{this.state.Company[0].company_name}</Text>
                                        <Text allowFontScaling={false} numberOfLines={1} style={[styles.date, { fontSize: 12 }]}>Date</Text>
                                    </View>
                                    <View style={styles.v6e}>
                                        <Text allowFontScaling={false} style={styles.text22}>{this.state.industry}</Text>
                                        <Text allowFontScaling={false} style={styles.text2e}>{data.start_date.slice(0,10)}</Text>
                                    </View>
                                </View>
    
                            </View>
                            <View style={styles.v3e}>
                                <View style={styles.v4e}>
                                    <Text allowFontScaling={false} style={styles.texte}>Amount</Text>
                                    <Text allowFontScaling={false} style={styles.text2e}>£{data.total_price}</Text>
                                </View>
                                <View style={styles.v4e}>
    
                                    <Text allowFontScaling={false} style={styles.texte}>Status</Text>
                                    <Text allowFontScaling={false} style={styles.text2e}>{data.status}</Text>
                                </View>
                            </View>
                        </View>
                        ))
                    }

                </Content>
            </Container>
        );
    }
}
