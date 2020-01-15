

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableWithoutFeedback, } from 'react-native';
import { Icon, Container, Content, } from 'native-base'
import bgpic from '../../images/Investor/bgpic.png'
import flag from '../../images/Investor/flag.png'
import check from '../../images/Investor/check.png'
import investorpic from '../../images/Ellipse.png'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown: [],
            flag: [],
            dropdown2: [],
            flag2: [],
            days: '03',
            hours: '00',
            minutes: '35',
            seconds: '40',
            fetchdata: false,
            InvestorsName: [],
            MileStonesData: [],
            CompanyContracts: []

        }

    }
    selectDropdown = (i) => {
        let temp = this.state.dropdown
        let temp2 = this.state.flag
        temp2 = [false, false, false, false, false,],
            temp = ['caretdown', 'caretdown', 'caretdown', 'caretdown', 'caretdown',]
        temp[i] = this.state.dropdown[i] == 'caretdown' ? 'caretup' : 'caretdown';
        temp2[i] = this.state.flag[i] == true ? false : true;
        this.setState({
            dropdown: temp,
            flag: temp2
        })
    }
    selectDropdown2 = (i1, i2) => {

        let temp = this.state.dropdown2
        let temp2 = this.state.flag2
        temp[i1][i2] = this.state.dropdown2[i1][i2] == 'caretdown' ? 'caretup' : 'caretdown';
        temp2[i1][i2] = this.state.flag2[i1][i2] == true ? false : true;
        this.setState({
            dropdown2: temp,
            flag2: temp2,

        })

    }
    componentDidMount = () => {
        // console.log("Number of milestones", this.props.MileStones[0].length)
          console.log("Investor names", this.props.InvestorNames)
        //   console.log("Company Contract", this.props.CompanyContrat)
        let tempdropdown = Array(this.props.CompanyContrat.length).fill('caretdown');
        let tempflag = Array(this.props.CompanyContrat.length).fill(false);
        //let tempmilestone=

        let tempmilestone = Array(this.props.MileStones.length).fill(Array(5).fill('caretdown'))
        let tempmilestoneflag = Array(this.props.MileStones.length).fill(Array(5).fill(false))
        this.setState({
            CompanyContracts: this.props.CompanyContrat,
            InvestorsName: this.props.InvestorNames,
            MileStonesData: this.props.MileStones,
            dropdown: tempdropdown,
            flag: tempflag,
            dropdown2: tempmilestone,
            flag2: tempmilestoneflag
        })
        setTimeout(() => {
            console.log("Contracts", this.props.CompanyContrat)

        }, 2000);
    }

    render() {
        return (

            <Container style={styles.Containerstyle}>
                <Content padder>

                    {
                        this.state.CompanyContracts.map((data, index1) => (
                            <View key={index1} style={styles.v2}>

                                <TouchableWithoutFeedback onPress={() => this.selectDropdown(index1)}>
                                    <View style={styles.v5}>
                                        <View style={styles.v4}>
                                            <Image resizeMode="stretch" source={investorpic} style={{ width: 40, height: 40 }} />
                                            <Text allowFontScaling={false} style={[styles.text2, { marginLeft: 10 }]}>{this.state.InvestorsName[index1]}</Text>
                                        </View>
                                        <View>
                                            <Icon type="AntDesign" name={this.state.dropdown[index1]} style={styles.icondown}></Icon>
                                        </View>

                                    </View>
                                </TouchableWithoutFeedback>
                                {
                                    this.state.MileStonesData[index1].map((data2, index2) => (
                                        this.state.flag[index1] ?
                                            <View key={index2} style={{ width: '100%', alignItems: 'center' }}>
                                                <TouchableWithoutFeedback onPress={() => this.selectDropdown2(index1, index2)}>
                                                    <View style={styles.v5}>
                                                        <View style={styles.v4}>
                                                            <Image source={flag} style={{ width: 40, height: 40, }}></Image>
                                                            <Text allowFontScaling={false} style={styles.text2}>Stage {index2 + 1}</Text>
                                                        </View>
                                                        <View>
                                                            <Icon type="AntDesign" name={this.state.dropdown2[index1][index2]} style={styles.icondown}></Icon>
                                                        </View>

                                                    </View>
                                                </TouchableWithoutFeedback>

                                                {
                                                    this.state.flag2[index1][index2] ?
                                                        <View style={styles.v7}>

                                                            <View style={styles.v8}>

                                                                <View style={styles.v3}>
                                                                    <ImageBackground source={bgpic} resizeMode="stretch" style={styles.bgimage}>
                                                                        <Text allowFontScaling={false} style={{ fontSize: 30, color: '#FFFFFF' }}>{this.state.days}</Text>
                                                                    </ImageBackground>
                                                                    <Text allowFontScaling={false} style={styles.text3}>DAYS</Text>
                                                                </View>
                                                                <Text allowFontScaling={false} style={styles.text33}>:</Text>

                                                                <View style={styles.v3}>
                                                                    <ImageBackground source={bgpic} resizeMode="stretch" style={styles.bgimage}>
                                                                        <Text allowFontScaling={false} style={{ fontSize: 30, color: '#FFFFFF' }}>{this.state.hours}</Text>
                                                                    </ImageBackground>
                                                                    <Text allowFontScaling={false} style={styles.text3}>HOURS</Text>
                                                                </View>
                                                                <Text allowFontScaling={false} style={styles.text33}>:</Text>
                                                                <View style={styles.v3}>
                                                                    <ImageBackground source={bgpic} resizeMode="stretch" style={styles.bgimage}>
                                                                        <Text allowFontScaling={false} style={{ fontSize: 30, color: '#FFFFFF' }}>{this.state.minutes}</Text>
                                                                    </ImageBackground>
                                                                    <Text allowFontScaling={false} style={styles.text3}>MINUTES</Text>
                                                                </View>
                                                                <Text allowFontScaling={false} style={styles.text33}>:</Text>
                                                                <View style={styles.v3}>
                                                                    <ImageBackground source={bgpic} resizeMode="stretch" style={styles.bgimage}>
                                                                        <Text allowFontScaling={false} style={{ fontSize: 30, color: '#FFFFFF' }}>{this.state.seconds}</Text>
                                                                    </ImageBackground>
                                                                    <Text allowFontScaling={false} style={styles.text3}>SECONDS</Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.v6}>
                                                                <Text allowFontScaling={false} style={styles.text4}>Start Date</Text>
                                                                <Text allowFontScaling={false} style={styles.text4}>{data2.milestone_start.slice(0, 10)}</Text>
                                                            </View>

                                                            <View style={styles.v6}>
                                                                <Text allowFontScaling={false} style={styles.text4}>End Date</Text>
                                                                <Text allowFontScaling={false} style={styles.text4}>{data2.milestone_end.slice(0, 10)}</Text>
                                                            </View>

                                                            <View style={styles.v6}>
                                                                <Text allowFontScaling={false} style={styles.text4}>Payment Status</Text>
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Image source={check} style={{ width: 20, height: 20, }}></Image>
                                                                    <Text allowFontScaling={false} style={styles.text4}>{data2.status}</Text>
                                                                </View>
                                                            </View>
                                                        </View>

                                                        : <View></View>
                                                }
                                            </View>
                                            : <View></View>

                                    ))
                                }


                            </View>

                        ))
                    }
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    headerstyle: {
        backgroundColor: '#110717'
    },
    Containerstyle: { backgroundColor: '#110717' },
    headerbody: { flexDirection: 'row' },
    icondown: { color: '#FFFFFF', fontSize: 12, alignSelf: "flex-end" },
    bgimage: { width: '100%', height: 60, alignItems: "center", justifyContent: "center" },

    v2: { backgroundColor: '#1F1724', alignItems: "center", width: '100%', alignSelf: "center", borderRadius: 10,marginTop:5 },
    v3: { width: '22%', flexDirection: "column", height: 60, borderRadius: 5, alignItems: "center" },
    v4: { width: 100, alignItems: 'center', flexDirection: "row", justifyContent: "space-between" },
    v5: { height: 60, width: '100%', padding: 20, flexDirection: "row", alignSelf: "center", justifyContent: "space-between" },
    v6: { width: '100%', padding: 10, flexDirection: "row", justifyContent: "space-between", alignContent: "center" },
    v7: { alignItems: "center", width: '90%' },
    v8: { width: '100%', height: 100, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },


    text33: { fontSize: 40, color: '#FFFFFF' },
    text2: { fontSize: 16, color: '#FFFFFF', alignSelf: "center" },
    text3: { color: '#FFFFFF', fontSize: 12 },
    text4: { color: '#FFFFFF', fontSize: 14 },





});