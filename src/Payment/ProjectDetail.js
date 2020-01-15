

import React, { Component } from 'react';
import { Text, View, ImageBackground, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Input, Textarea, DatePicker, Header, Body, Button, Title, Icon, Badge, Content, Container } from 'native-base';
import flag from '../images/Investor/flag.png';
import DocumentPicker from 'react-native-document-picker';
var moment = require('moment')

export default class InvestmentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown2: ['caretdown', 'caretdown', 'caretdown', 'caretdown', 'caretdown',],
            flag: [false, false, false, false, false,],
            MileStone: [],
            Equity: this.props.Equity,
            MileStoneData: [],
            validate1: true,
            validate3: true,
            sdate: new Date()

        }

    }
    componentDidMount = () => {
        //   console.log(this.props.MileStones + 1)
        let temp = [];
        let temp2 = [];
        for (let index = 0; index <= this.props.MileStones - 1; index++) {
            temp.push(index)
            temp2.push({
                project_tittle: '',
                project_description: '',
                milestone_start: null,
                milestone_end: null,
                filename: 'Attache your document here',
                amount: '0',
            });
        }
        //console.log(temp)
        this.setState({ MileStone: temp, MileStoneData: temp2 })
    }
    selectDropdown = (i) => {
        let ResetIcon = ['caretdown', 'caretdown', 'caretdown', 'caretdown', 'caretdown',];
        let ResetFlag = [false, false, false, false, false,]
        ResetIcon[i] = this.state.dropdown2[i] == 'caretdown' ? 'caretup' : 'caretdown';
        ResetFlag[i] = this.state.flag[i] == true ? false : true;
        this.setState({
            dropdown2: ResetIcon,
            flag: ResetFlag
        })
    }

    SetProjectTitle = (index, v) => {
        // console.log(index,v)
        let temp = this.state.MileStoneData;
        const name = /^[a-zA-Z]+$/

        if (name.test(v)) {
            temp[index].project_tittle = v
            this.setState({ MileStoneData: temp, validate1: true })
            this.props.SendData(3, this.state.MileStoneData)
        }
        else if (v.length == 0) {
            temp[index].project_tittle = ''
            this.setState({ MileStoneData: temp, validate1: false })
            this.props.SendData(3, this.state.MileStoneData)
        }

    }
    SetProjectDetail = (index, v) => {

        let temp = this.state.MileStoneData;
        temp[index].project_description = v;
        this.setState({ MileStoneData: temp })
        this.props.SendData(3, this.state.MileStoneData)
        // console.log(index,v)

    }
    SetStartDate = (index, v) => {
        let vv = moment(v).format('YYYY-MM-DD') + " " + moment().format().slice(11, 19);
        console.log(vv)
        let temp = this.state.MileStoneData;
        temp[index].milestone_start = vv;
        this.setState({ MileStoneData: temp })
        this.props.SendData(3, this.state.MileStoneData)
    }
    SetEndDate = (index, v) => {
        let vv = moment(v).format('YYYY-MM-DD') + " " + moment().format().slice(11, 19);
        let temp = this.state.MileStoneData;
        temp[index].milestone_end = vv;
        this.setState({ MileStoneData: temp })
        this.props.SendData(3, this.state.MileStoneData)
    }

    SetAmount = (index, v) => {
        let temp = this.state.MileStoneData;
        let tempp = 0
        const number = /^[0-9]+$/
        if (number.test(v)) {
           
            temp[index].amount = v
                this.setState({ MileStoneData: temp, validate3: true })
                this.props.SendData(3, this.state.MileStoneData);
            for (let i = 0; i < this.state.MileStoneData.length; i++) { 
                if(parseInt(this.state.MileStoneData[i].amount, 10)){
                    tempp += parseInt(this.state.MileStoneData[i].amount, 10)
                }
            }
            if (parseInt(tempp, 10) <= parseInt(this.props.Amount, 10)) {
               
            } else {
                temp[index].amount = ''
                this.setState({ MileStoneData: temp, validate3: true })
              //  console.log(tempp,this.props.Amount,temp[index].amount.toString().slice(0,2))
                this.props.SendData(3, this.state.MileStoneData);
                alert('Total amout should be lesser than your Investment!')
            }

        }
        else if (v.length == 0) {
            console.log("dd=>",parseInt(v,10))
            temp[index].amount = ''
            this.setState({ MileStoneData: temp, validate3: false })
            this.props.SendData(3, this.state.MileStoneData)
        }
    }
    pickfile = async (index, v) => {
        // Pick a single file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            console.log('Response', res)
            let filename = res.name
            console.log('name:', filename)
            let temp = this.state.MileStoneData;
            temp[index].filename = filename;
            this.setState({
                MileStoneData: temp,
                filename: filename

            })
            this.props.SendData(3, this.state.MileStoneData)
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }


    render() {

        return (

            <Container style={styles.Containerstyle}>
                <Content padder>
                    <View style={{ width: '100%', height: 160 }}>
                        <Image source={require('../images/Profile/projectdetail.png')} style={styles.img} />
                    </View>
                    {
                        this.state.MileStoneData.map((data, key) => {
                            return (
                                <View key={key} style={styles.v2}>
                                    <TouchableWithoutFeedback onPress={() => this.selectDropdown(key)}>
                                        <View style={styles.v5}>
                                            <View style={styles.v4}>
                                                <Image source={flag} style={{ width: 40, height: 40, }}></Image>
                                                <Text allowFontScaling={false} style={styles.text2}>Stage {key + 1}</Text>
                                            </View>
                                            <View>
                                                <Icon type="AntDesign" name={this.state.dropdown2[key]} style={styles.icondown}></Icon>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    {
                                        this.state.flag[key] ?
                                            <View style={styles.v11}>
                                                <Text allowFontScaling={false} style={styles.text1}> Project Detail</Text>
                                                <Input allowFontScaling={false} value={data.project_tittle} onChangeText={(v) => this.SetProjectTitle(key, v)} style={[styles.titleinput, !this.state.validate1 ? styles.error : null]} placeholder="Project Title" placeholderTextColor="#878787" />
                                                <Textarea allowFontScaling={false} value={data.project_description} onChangeText={(v) => this.SetProjectDetail(key, v)} rowSpan={5} placeholderTextColor="#878787" bordered placeholder="Project Detail" style={{ color: 'white', borderRadius: 5 }} />
                                                <View style={styles.v22}>
                                                    <DatePicker
                                                        placeHolderTextStyle={{ color: '#878787' }}
                                                        // formatChosenDate={"MMM do, YYYY"}
                                                        // defaultDate={new Date(2018, 4, 4)}
                                                        minimumDate={new Date()}
                                                        // maximumDate={new Date(2018, 12, 31)}
                                                        locale={"en"}
                                                        hideText={true}
                                                        timeZoneOffsetInMinutes={undefined}
                                                        modalTransparent={false}
                                                        animationType={"fade"}
                                                        androidMode={"default"}
                                                        placeHolderText={'Start Date'}
                                                        onDateChange={(val) => { this.SetStartDate(key, val), this.setState({ sdate: val }) }}
                                                        textStyle={{ color: "#878787" }}
                                                        // onDateChange={date => this.setDate(date)}
                                                        disabled={false}
                                                    />
                                                    <Icon name="calendar" style={{ color: '#EC9705' }} type="AntDesign" />

                                                </View>
                                                <View style={styles.v22}>
                                                    <DatePicker
                                                        placeHolderTextStyle={{ color: "#878787" }}
                                                        // defaultDate={new Date(2018, 4, 4)}
                                                        minimumDate={this.state.sdate}
                                                        //maximumDate={new Date(2018, 12, 31)}
                                                        locale={"en"}
                                                        hideText={true}
                                                        timeZoneOffsetInMinutes={undefined}
                                                        modalTransparent={false}
                                                        animationType={"fade"}
                                                        androidMode={"default"}
                                                        placeHolderText={'End Date'}
                                                        onDateChange={(val) => { this.SetEndDate(key, val), this.setState({ edate: val.toString().substr(4, 12), }) }}
                                                        textStyle={{ color: "#878787" }}
                                                        // onDateChange={date => this.setDate(date)}
                                                        disabled={false}
                                                    />
                                                    <Icon name="calendar" style={{ color: '#EC9705' }} type="AntDesign" />

                                                </View>
                                                <TouchableWithoutFeedback onPress={(v) => this.pickfile(key, v)}>
                                                    <View style={styles.v33}>
                                                        <Text onPress={(v) => this.pickfile(key, v)} allowFontScaling={false} style={styles.text22}>{data.filename}</Text>
                                                        <Image source={require('../images/Investor/pdf3.png')} style={styles.imagestyle4} resizeMode="stretch" />
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <Text style={styles.text12}>How much you want to invest at this stage?</Text>
                                                <Input value={data.amount} onChangeText={(value) => this.SetAmount(key, value)} style={[styles.titleinput, !this.state.validate3 ? styles.error : null]} placeholder="Amount" placeholderTextColor="#878787" />
                                                <View style={styles.v33}>
                                                    <Text allowFontScaling={false} style={styles.text22}>Percentage Equity</Text>
                                                    <Text allowFontScaling={false} style={styles.text22}>{this.state.Equity}%</Text>
                                                </View>
                                            </View>

                                            : <View></View>
                                    }
                                </View>

                            )
                        })

                    }
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },
    v11: { width: '100%', backgroundColor: '#1F1724', padding: 10 },
    v22: { alignItems: 'center', borderBottomColor: '#878787', borderBottomWidth: 2, flexDirection: 'row', justifyContent: 'space-between' },
    v33: { marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    text1: { color: 'white', fontSize: 18 },
    text12: { color: 'white', fontSize: 18, marginTop: 15, marginBottom: 20 },
    text22: { color: '#878787', },
    Containerstyle: { backgroundColor: '#110717' },
    icondown: { color: '#FFFFFF', fontSize: 12, alignSelf: "flex-end" },
    imagestyle3: { width: 20, height: 20, },
    imagestyle4: { width: 30, height: 30, },
    img: { margin: 10, alignSelf: 'center', width: 100, height: 100 },
    sendername: { color: '#CCCCCC', alignSelf: 'center' },
    h2: { width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' },

    v2: { backgroundColor: '#1F1724', alignItems: "center", width: '100%', alignSelf: "center", borderRadius: 10, marginBottom: 10 },
    v4: { width: 100, alignItems: 'center', flexDirection: "row", justifyContent: "space-between" },
    v5: { height: 60, width: '100%', padding: 20, flexDirection: "row", alignSelf: "center", justifyContent: "space-between" },
    v7: { alignItems: "center", width: '90%' },
    text2: { fontSize: 16, color: '#FFFFFF', alignSelf: "center" },
    titleinput: { color: 'white', borderBottomWidth: 1, borderBottomColor: '#878787' },
    error: { borderBottomColor: 'red', borderBottomWidth: 2 }

});