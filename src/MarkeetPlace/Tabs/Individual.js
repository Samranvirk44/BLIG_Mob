import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Button, Fab, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Url from '../../DeviceIp';
export default class Individual extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FeaturedCompanies1: [],
            FeaturedCompanies: [],
            Arraylength: [],
            ageEquity: '23%',
            location: 'Lahore,Pakistan',
            companyName: 'General Electroclinic',
            name2: 'Target Company',
            MacAddress: '',
            ID: '',
            uri:Url// 'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
        }
    }

    componentWillMount = async () => {

        DeviceInfo.getMacAddress().then(mac => {
            this.setState({ MacAddress: mac });
            this.get_id(mac);
        });

    }
    get_individual = async (id,Ent) => {
        console.log('id got in function:', id)
        let data = {
            marketplace: true,
            entrepreneur: false,
            id: id,
            entrepreneur:Ent
        }
        await fetch(this.state.uri+'/MarketPlace/MCompany_Individual', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("companies data", resjson.Message)
                if (resjson.Successful) {
                    let data = resjson.data;
                    let length = data.length / 2;
                    let col1 = data.slice(0, length.toFixed(0))
                    let col2 = data.slice(length.toFixed(0))
                    let Rowdata = [col1, col2]
                    this.setState({ FeaturedCompanies: col1, FeaturedCompanies1: col2 })
                }
            })
    }
    get_id = async (mac) => {
        console.log('in EntreID function', this.state.MacAddress)
        let data = {
            MacAddress: mac,
        }
        await fetch(this.state.uri+'/Session/Get_Current_Id', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {

                console.log("Id's", resjson.Message, resjson.data)
                if (resjson.Successful) {
                    if (resjson.data.Type == 'Entrepreneur') {
                        console.log('entre id pass to function', resjson.data.entrepreneur_id)
                        this.get_individual(resjson.data.entrepreneur_id,true)
                    }
                    else if (resjson.data.Type == 'Investor') {
                        console.log('investor id pass to function', resjson.data.investor_id)
                        this.get_individual(resjson.data.investor_id,false)

                    }
                }
            }).catch(err=>console.log("error=>",err))
    }
    render() {
        console.log(this.state.FeaturedCompanies)
        return (
            <Container style={styles.Containerstyle}>

                <Content>
                    {
                        this.state.FeaturedCompanies.map((Company, index) => {
                            return <View key={index} style={styles.v1}>
                                <TouchableWithoutFeedback onPress={() => Actions.CompanyProfile({ CompanyId: Company.id,Active:false })}>
                                    <View key={Company.id} style={styles.v2}>
                                        <Button transparent style={{ alignSelf: "flex-end" }}>
                                            <Icon name="md-more" style={styles.iconstyle} type="Ionicons" />
                                        </Button>
                                        <Image source={{ uri: Company.company_logo }} style={styles.imagestyle}></Image>
                                        <View style={styles.v3}>
                                            <Text allowFontScaling={false} style={styles.text1}>{Company.company_name}</Text>
                                            <Text allowFontScaling={false} style={styles.text2}>{Company.state_id},{Company.country_id}</Text>

                                        </View>
                                        <View style={styles.v4}>
                                            <Text allowFontScaling={false} style={styles.text2}>%age Equity</Text>
                                            <Text allowFontScaling={false} style={styles.text3}>{Company.sales_equity}</Text>
                                        </View>

                                    </View>
                                </TouchableWithoutFeedback>
                                {this.state.FeaturedCompanies1[index] ?
                                    <TouchableWithoutFeedback onPress={() => { Actions.CompanyProfile({ CompanyId: this.state.FeaturedCompanies1[index].id }) }}>
                                        <View key={this.state.FeaturedCompanies1[index].id} style={styles.v2}>
                                            <Button transparent style={{ alignSelf: "flex-end" }}>
                                                <Icon name="md-more" style={styles.iconstyle} type="Ionicons" />
                                            </Button>
                                            <Image source={{ uri: this.state.FeaturedCompanies1[index].company_logo }} style={styles.imagestyle}></Image>
                                            <View style={styles.v3}>
                                                <Text allowFontScaling={false} style={styles.text1}>{this.state.FeaturedCompanies1[index].company_name}</Text>
                                                <Text allowFontScaling={false} style={styles.text2}>{this.state.FeaturedCompanies1[index].state_id},{this.state.FeaturedCompanies1[index].country_id}</Text>

                                            </View>
                                            <View style={styles.v4}>
                                                <Text allowFontScaling={false} style={styles.text2}>%age Equity</Text>
                                                <Text allowFontScaling={false} style={styles.text3}>{this.state.FeaturedCompanies1[index].sales_equity}</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    : <View style={{ width: '45%' }}></View>
                                }
                            </View>

                        })
                    }

                </Content>

            </Container>

        );
    }
}
const styles = StyleSheet.create({
    Containerstyle: { backgroundColor: '#110717' },
    v1: { width: '100%', flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 10 },
    v2: { width: '45%', height: 200, backgroundColor: '#1F1724', borderRadius: 10, flexDirection: "column", alignItems: "center" },
    v3: { flexDirection: 'column', justifyContent: "flex-start", width: '85%' },
    v4: { flexDirection: "row", justifyContent: "space-between", width: '80%' },

    imagestyle: { width: 70, height: 70, alignSelf: "center", marginBottom: 15, borderRadius: 5 },
    iconstyle: { color: '#8D8D8D' },

    text1: { color: '#D5D5D5', fontSize: 14 },
    text2: { color: '#8D8D8D', fontSize: 12 },
    text3: { color: '#EC9705', fontSize: 16 }
})