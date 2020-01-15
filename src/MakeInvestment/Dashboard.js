/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, } from 'react-native';
import { Icon, Button, Container, Content, Header, Left, Body, Right, Title, } from 'native-base'
import Video from 'react-native-video';
import { Rating } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';
import { test } from '../Converter';
import Uri from '../DeviceIp'
export default class InvestorDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url:Uri,//'http://192.168.100.4:80',// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com',
            flga1: false,
            flag2: false,
            flag3: true,
            flag4: false,
            flag5: false,
            flag6: false,
            dropdown: ['caretdown', 'caretdown', 'caretdown', 'caretdown', 'caretdown', 'caretdown', 'caretdown'],
            flag: [false, false, false, false, false, false],

            ContracCreated: {
                ContractNumber: '#QW1265777',
                ContractAmount: '$24000000000',
                ContractStarted: '6/30/2019',
                ContractEnded: '9/30/19',
            },

            videoName: 'companydetails.studio',
            videocontrol: true,
            pdfName: 'companydetails.pdf',

            WorkStages: {
                Stage01: '$240000000',
                deliveryDate1: '6/30/2019',
                Stage02: '$240000000',
                deliveryDate2: '7/30/2019',
                Stage03: '$240000000',
                deliveryDate3: '8/30/2019',
            },
            RequirmentDetails: {
                stage01: '$24000000000',
                RequirmentDetailsText: "Lorem Ipsum is simply dummy text of the printing and " +
                    "typesetting industry. Lorem Ipsum has been the industry's standard dummy text" +
                    "ever since the 1500s, when an unknown printer took a galley of type and scrambled " +
                    "it to make a type specimen book. It has survived not only five centuries, but also " +
                    "the leap into electronic typesetting, remaining essentially unchanged."
            },
            ModificationDetails: {
                ModificationDetailsText: "Lorem Ipsum is simply dummy text of the printing and " +
                    "typesetting industry. Lorem Ipsum has been the industry's standard dummy text" +
                    "ever since the 1500s, when an unknown printer took a galley of type and scrambled " +
                    "it to make a type specimen book. It has survived not only five centuries, but also " +
                    "the leap into electronic typesetting, remaining essentially unchanged."
            },
            EnterpreneurDelivered: {
                textfirst: "Here is your desired work for your company. " +
                    "I have attached a file and a video in the attachment below. " +
                    "Please take a look and give your feedback about it. " +
                    "I'll wait for your kind response.",
                textTwo: 'Thanks',
                textthree: 'Ameer',
            },

            //

            ContractData: [{ contract_number: "", investment_end: "", total_investment: 0 }],
            ContractWorkStages: [],
            Feedback: [1, 1, 1, 1, 1],
            totalScore: 1,
            Modification: [],
            DeliveredMilestone: [],
            SubmitedMilestone: [],
        }
    }
    selectDropdown = (i) => {
        let temp = this.state.dropdown
        let temp2 = this.state.flag
        temp2 = [false, false, false, false, false, false]
        temp = ['caretdown', 'caretdown', 'caretdown', 'caretdown', 'caretdown', 'caretdown', 'caretdown']
        temp[i] = 'caretup'
        temp2[i] = true
        this.setState({
            dropdown: temp,
            flag: temp2
        })
    }
    componentDidMount = async () => {
        //        console.log(this.props.Contract_Id)
        this.setState({ loading: true })
       await this.GetModificationDescription()
        await this.CompanyContractsDetail()
        await this.CompanyContractsStages()
        await this.Feedback()
        await this.GetDeliveredSubmittedWork('Complete')
        await this.GetDeliveredSubmittedWork('Completed')
        this.setState({ loading: false })

    }
    CompanyContractsDetail = async () => {
        let data = {
            Contract_Id: this.props.Contract_Id
        }
        await fetch(this.state.url + '/DashboardCompany/Company_ContractDetail', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Company Contract Detail", resjson.Message, resjson)
                if (resjson.Successful) {
                    this.setState({ ContractData: resjson.Data })
                }
            }).catch(err => {
                console.log('error:', err)
            })

    }
    CompanyContractsStages = async () => {
        let data = {
            Contract_Id: this.props.Contract_Id
        }
        await fetch(this.state.url + '/DashboardCompany/Company_Contract_Stages', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Company Contract Stages ", resjson.Message)// resjson.data[0].milestones)
                if (resjson.Successful) {
                    this.setState({ ContractWorkStages: resjson.data[0].milestones })
                    console.log(resjson.data[0].milestones.length)
                    //   if (resjson.data[0].milestones.length >= 1)
                    //     this.Feedback(resjson.data[0].milestones[0].id)
                }
            }).catch(err => {
                console.log('error:', err)
            })
    }
    UpdateStatus = async (id) => {
        this.setState({ loading: true })
        let data = {
            M_Id: id,
            Status: 'Complete'
        }
        await fetch(this.state.url + '/Contract/Milestone_Status', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Company List", resjson.Message);
                if (resjson.Successful) {
                    this.setState({ loading: false })
                    this.refs.toast.show('Successfully Updated thanks', DURATION.LENGTH_LONG);
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
            })
    }
    Feedback = async (m_id) => {
        console.log("feedback calling")
        let data = {
            C_Id: this.props.Contract_Id,
            milestone_id: m_id//            milestone_id
        }
        await fetch(this.state.url + '/Entrepreneur/Get_Feedback', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("MileStone rating ", resjson.Message,);
                if (resjson.Successful) {
                    let tempfeedback=this.state.Feedback
                    for (let index = 0; index < resjson.data[0].rate_milestones.length; index++) {
                        tempfeedback[0] += resjson.data[0].rate_milestones[index].rate_value_time;
                        tempfeedback[1] += resjson.data[0].rate_milestones[index].rate_value_professionalism;
                        tempfeedback[2] += resjson.data[0].rate_milestones[index].rate_value_leadership;
                        tempfeedback[3] += resjson.data[0].rate_milestones[index].rate_value_success_rate_per_stage;
                        tempfeedback[4] += resjson.data[0].rate_milestones[index].rate_value_communicaion_skils           
                        
                    }
                    this.setState({ Feedback: tempfeedback })
                    let total = 0;
                    for (let index = 0; index < 5; index++) {
                        total += tempfeedback[index];
                    }
                    this.setState({ totalScore: total / 5 })
                }
            }).catch(err => {
                console.log("Error=>", err)
            })
    }
    SelectMilestone = (m_id, m_status) => {
        console.log("data=>", m_id, m_status, this.props.Company_Id)
        //        this.Feedback(m_id)
        if (m_status == 'Modify') {

        }
    }
    GetModificationDescription = async () => {
        let data = {
            C_Id: this.props.Contract_Id,
        }
        await fetch(this.state.url + '/Entrepreneur/Modification_Description', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Modification Description", resjson.Message);
                if (resjson.Successful) {
                    this.setState({ Modification: resjson.data[0].milestones })
                }
            }).catch(err => {
                console.log("Error=>", err)
            })
    }
    GetDeliveredSubmittedWork = async (s) => {
        let data = {
            C_Id: this.props.Contract_Id,
            status: s
        }
        await fetch(this.state.url + '/Entrepreneur/Entrepreneur_Delivered', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Modification Description", resjson.Message);
                if (resjson.Successful) {
                    if (s == 'Complete') {
                        this.setState({ DeliveredMilestone: resjson.data[0].milestones })
                    } else if (s == 'Completed')
                        this.setState({ SubmitedMilestone: resjson.data[0].milestones })
                }
            }).catch(err => {
                console.log("Error=>", err)
            })
    }
    render() {
        return (

            <Container style={styles.Containerstyle}>
                <Header hasTabs iosBarStyle="light-content" androidStatusBarColor="#110717" style={styles.header}>

                    <View style={styles.h2}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>


                    <Body style={{ alignItems: "center" }}>

                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <Title allowFontScaling={false} style={{ color: 'white' }}>Company Detail</Title>
                        </View>
                    </Body>

                    <View style={styles.h2}>
                    </View>

                </Header>

                <Content>

                    <View style={styles.v1}>
                        <View style={styles.v2}>

                            <Image source={{ uri: this.props.Curi!=null? this.props.Curi:'/empty' }} style={styles.imagestyle} resizeMode='stretch'></Image>
                        </View>

                        <View style={styles.v3}>
                            <Text allowFontScaling={false} style={styles.text1}>{this.props.Cname}</Text>
                            <Title allowFontScaling={false} style={{ marginLeft: 10, borderWidth: 1, borderColor: 'white', borderRadius: 5, padding: 2, fontSize: 8, color: 'white' }}>{this.props.Cstatus}</Title>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.selectDropdown(0)}>
                        <View style={styles.v5}>
                            <Text allowFontScaling={false} style={styles.text2} >Contract Created</Text>
                            <Icon type="AntDesign" name={this.state.dropdown[0]} style={styles.icondown}></Icon>

                        </View >
                    </TouchableWithoutFeedback>
                    {
                        this.state.flag[0] ?
                            <View style={{ backgroundColor: '#1F1724' }}>

                                <View style={styles.v4}>
                                    <Text allowFontScaling={false} style={styles.text3} >Contract Number</Text>
                                    <Text allowFontScaling={false} style={styles.text2} >{this.state.ContractData[0].contract_number}</Text>
                                </View>
                                <View style={styles.v4}>
                                    <Text allowFontScaling={false} style={styles.text3} >Contract Amount</Text>
                                    <Text allowFontScaling={false} style={styles.text2} >£{test(this.state.ContractData[0].total_investment)}</Text>
                                </View>
                                <View style={styles.v4}>
                                    <Text allowFontScaling={false} style={styles.text3} >Contract Started</Text>
                                    <Text allowFontScaling={false} style={styles.text2} >Empty</Text>
                                </View>
                                <View style={styles.v4}>
                                    <Text allowFontScaling={false} style={styles.text3} >Contract Ended</Text>
                                    <Text allowFontScaling={false} style={styles.text2} >{this.state.ContractData[0].investment_end.slice(0, 10)}</Text>
                                </View>

                            </View>
                            : <View></View>
                    }

                    <TouchableWithoutFeedback onPress={() => this.selectDropdown(1)}>
                        <View style={styles.v5}>
                            <Text allowFontScaling={false} style={styles.text2} >Work Stages</Text>
                            <Icon type="AntDesign" name={this.state.dropdown[1]} style={styles.icondown}></Icon>

                        </View >
                    </TouchableWithoutFeedback>
                    {
                        this.state.flag[1] ?
                            <View style={{ backgroundColor: '#1F1724' }}>
                                {
                                    this.state.ContractWorkStages.map((data, index1) => (
                                        <View style={{ borderBottomWidth: 1, padding: 5, borderColor: '#8D8D8D', backgroundColor: '#1F1724' }}>
                                            <View key={index1} style={styles.v4}>
                                                <View style={{ flexDirection: "column" }}>
                                                    <Text allowFontScaling={false} style={styles.text4} >Stage {index1 + 1}</Text>
                                                    <Text allowFontScaling={false} style={styles.text4} >Delivery Date</Text>
                                                </View>
                                                <View style={{ flexDirection: "column" }}>
                                                    <Text allowFontScaling={false} style={styles.text5} >£{test(data.amount)}</Text>
                                                    <Text allowFontScaling={false} style={styles.text4} >{data.milestone_end.slice(0, 10)}</Text>
                                                </View>
                                            </View>
                                            {
                                                data.status == 'Going' | data.status == 'Modify' ?
                                                    <TouchableWithoutFeedback onPress={() => this.UpdateStatus(data.id)}>
                                                        <View style={{ width: 100, height: 40, alignSelf: 'flex-end', backgroundColor: '#EC9705', borderColor: '#EC9705', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ fontSize: 16, color: 'white' }}>Submit</Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                    : <View></View>
                                            }
                                        </View>
                                    ))
                                }

                            </View>
                            : <View></View>
                    }

                    <TouchableWithoutFeedback onPress={() => this.selectDropdown(2)}>
                        <View style={styles.v5}>
                            <Text allowFontScaling={false} style={styles.text2} >Requirment Details</Text>
                            <Icon type="AntDesign" name={this.state.dropdown[2]} style={styles.icondown}></Icon>

                        </View >
                    </TouchableWithoutFeedback>
                    {
                        this.state.flag[2] ?
                            <View style={{ backgroundColor: '#1F1724' }}>

                                {
                                    this.state.ContractWorkStages.map((data, index2) => (
                                        <View key={index2} style={{ marginTop: 5 }}>
                                            <View style={styles.v7}>
                                                <Text allowFontScaling={false} style={styles.text3} >Stage {index2 + 1}</Text>
                                                <Text allowFontScaling={false} style={styles.text2} >£{test(data.amount)}</Text>
                                            </View>
                                            <View style={styles.v6}>

                                                <Text allowFontScaling={false} style={styles.textArea} >{data.project_description}</Text>



                                            </View>
                                            <View style={styles.v7}>
                                                <Text allowFontScaling={false} style={styles.text3}>{this.state.pdfName}</Text>
                                                <TouchableWithoutFeedback>
                                                    <Image source={require('../images/Investor/pdf3.png')} resizeMode="stretch" style={{ width: '8%', height: 25 }}></Image>

                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>

                                    ))
                                }

                            </View>
                            : <View></View>
                    }

                    <TouchableWithoutFeedback onPress={() => this.selectDropdown(3)}>
                        <View style={styles.v5}>
                            <Text allowFontScaling={false} style={styles.text2} >Entrepreneur Delivered Work</Text>
                            <Icon type="AntDesign" name={this.state.dropdown[3]} style={styles.icondown}></Icon>

                        </View >
                    </TouchableWithoutFeedback>
                    {
                        this.state.flag[3] ?
                            <View style={{ backgroundColor: '#1F1724' }}>
                                {
                                    this.state.DeliveredMilestone.map((data, index5) => (
                                        <View style={{ padding: 10 }}>
                                            <Text style={styles.text1}>{data.project_tittle}</Text>
                                            <Text style={styles.text4}>{data.project_description}</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={styles.text4}>Start Date</Text>
                                                <Text style={styles.text4}>End Date</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ color: 'white' }}>{data.milestone_start.slice(0, 10)}</Text>
                                                <Text style={{ color: 'white' }}>{data.milestone_end.slice(0, 10)}</Text>
                                            </View>
                                        </View>
                                    ))
                                }


                            </View>
                            : <View></View>
                    }


                    <TouchableWithoutFeedback onPress={() => this.selectDropdown(4)}>
                        <View style={styles.v5}>
                            <Text allowFontScaling={false} style={styles.text2} >Entrepreneur Submitted Work</Text>
                            <Icon type="AntDesign" name={this.state.dropdown[4]} style={styles.icondown}></Icon>

                        </View >
                    </TouchableWithoutFeedback>
                    {
                        this.state.flag[4] ?
                            <View style={{ backgroundColor: '#1F1724' }}>
                                {
                                    this.state.SubmitedMilestone.map((data, index5) => (
                                        <View style={{ padding: 10 }}>
                                            <Text style={styles.text1}>{data.project_tittle}</Text>
                                            <Text style={styles.text4}>{data.project_description}</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={styles.text4}>Start Date</Text>
                                                <Text style={styles.text4}>End Date</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ color: 'white' }}>{data.milestone_start.slice(0, 10)}</Text>
                                                <Text style={{ color: 'white' }}>{data.milestone_end.slice(0, 10)}</Text>
                                            </View>
                                        </View>
                                    ))
                                }


                            </View>
                            : <View></View>
                    }

                    <TouchableWithoutFeedback onPress={() => this.selectDropdown(5)}>
                        <View style={styles.v5}>
                            <Text allowFontScaling={false} style={styles.text2} >Modification Requested</Text>
                            <Icon type="AntDesign" name={this.state.dropdown[5]} style={styles.icondown}></Icon>

                        </View >
                    </TouchableWithoutFeedback>
                    {
                        this.state.flag[5] ?
                            <View style={{ backgroundColor: '#1F1724' }}>


                                <View style={styles.v7}>
                                    <Text allowFontScaling={false} style={styles.text2} >Modification Details</Text>
                                </View>
                                {
                                    this.state.Modification.map((data, index4) => (
                                        <View key={index4} style={styles.v6}>
                                            <Text allowFontScaling={false} style={styles.textArea} >{data.modefication_detail}</Text>
                                        </View>
                                    ))
                                }

                            </View>
                            : <View></View>
                    }

                    <TouchableWithoutFeedback onPress={() => this.selectDropdown(6)}>
                        <View style={styles.v5}>
                            <Text allowFontScaling={false} style={styles.text2} >Rate Enterpreneur's Work</Text>
                            <Icon type="AntDesign" name={this.state.dropdown[6]} style={styles.icondown}></Icon>

                        </View >
                    </TouchableWithoutFeedback>
                    {
                        this.state.flag[6] ?
                            <View style={{ backgroundColor: '#1F1724' }}>


                                <View style={styles.v7}>
                                    <Text allowFontScaling={false} style={styles.text2} >Feedback To Enterpreneur</Text>
                                </View>

                                <View style={styles.v11}>
                                    <Rating
                                        type='custom'
                                        //ratingImage={WATER_IMAGE}
                                        ratingImage={require('../images/Investor/star.png')}
                                        ratingColor='#EC9705'
                                        ratingBackgroundColor='#707070'
                                        ratingCount={5}
                                        style={{ backgroundColor: '#1F1724', marginLeft: 0, marginRight: 0, padding: 10, width: '50%' }}
                                        imageSize={25}
                                        startingValue={this.state.Feedback[0]}
                                        readonly={true}
                                    //onFinishRating={this.ratingCompleted}
                                    //  style={{ paddingVertical: 50 }}
                                    />
                                    <Text allowFontScaling={false} style={styles.textTime}>Time</Text>
                                </View>

                                <View style={styles.v11}>
                                    <Rating
                                        type='custom'
                                        //ratingImage={WATER_IMAGE}
                                        ratingImage={require('../images/Investor/star.png')}
                                        ratingColor='#EC9705'
                                        ratingBackgroundColor='#707070'
                                        ratingCount={5}
                                        style={{ backgroundColor: '#1F1724', marginLeft: 0, marginRight: 0, padding: 10, width: '50%' }}
                                        imageSize={25}
                                        startingValue={this.state.Feedback[1]}
                                        readonly={true}
                                    //onFinishRating={this.ratingCompleted}
                                    //  style={{ paddingVertical: 50 }}
                                    />
                                    <Text allowFontScaling={false} style={styles.textTime}>Professionalism</Text>
                                </View>

                                <View style={styles.v11}>
                                    <Rating
                                        type='custom'
                                        //ratingImage={WATER_IMAGE}
                                        ratingImage={require('../images/Investor/star.png')}
                                        ratingColor='#EC9705'
                                        ratingBackgroundColor='#707070'
                                        ratingCount={5}
                                        style={{ backgroundColor: '#1F1724', marginLeft: 0, marginRight: 0, padding: 10, width: '50%' }}
                                        imageSize={25}
                                        startingValue={this.state.Feedback[2]}
                                        readonly={true}
                                    //onFinishRating={this.ratingCompleted}
                                    //  style={{ paddingVertical: 50 }}
                                    />
                                    <Text allowFontScaling={false} style={styles.textTime}>Leadership</Text>
                                </View>

                                <View style={styles.v11}>
                                    <Rating
                                        type='custom'
                                        //ratingImage={WATER_IMAGE}
                                        ratingImage={require('../images/Investor/star.png')}
                                        ratingColor='#EC9705'
                                        ratingBackgroundColor='#707070'
                                        ratingCount={5}
                                        style={{ backgroundColor: '#1F1724', marginLeft: 0, marginRight: 0, padding: 10, width: '50%' }}
                                        imageSize={25}
                                        startingValue={this.state.Feedback[3]}
                                        readonly={true}
                                    //onFinishRating={this.ratingCompleted}
                                    //  style={{ paddingVertical: 50 }} 
                                    />
                                    <Text allowFontScaling={false} style={styles.textTime}>Success Rate Per Stage</Text>
                                </View>

                                <View style={styles.v11}>
                                    <Rating
                                        type='custom'
                                        ratingImage={require('../images/Investor/star.png')}
                                        ratingColor='#EC9705'
                                        ratingBackgroundColor='#707070'
                                        ratingCount={5}
                                        style={{ backgroundColor: '#1F1724', marginLeft: 0, marginRight: 0, padding: 10, width: '50%' }}
                                        imageSize={25}
                                        startingValue={this.state.Feedback[4]}
                                        readonly={true}
                                    //onFinishRating={this.ratingCompleted}
                                    //  style={{ paddingVertical: 50 }}
                                    />
                                    <Text allowFontScaling={false} style={styles.textTime}>Communication Skills</Text>
                                </View>
                                <View style={styles.v11}>
                                    <Text allowFontScaling={false} style={styles.textTime2}>Total Score :</Text>
                                    <Text allowFontScaling={false} style={styles.textTime3}>{this.state.totalScore}</Text>
                                </View>

                                <View style={styles.buttonview2}>
                                    <TouchableWithoutFeedback><Image source={require('../images/Investor/Group.png')} resizeMode="stretch" style={styles.buttonStyle3}>
                                    </Image>
                                    </TouchableWithoutFeedback>
                                </View>


                            </View>
                            : <View></View>
                    }



                </Content>
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
            </Container >







        );
    }
}
const styles = StyleSheet.create({
    h2: { width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' },
    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },

    headerstyle: {
        backgroundColor: '#110717'
    },
    Containerstyle: { backgroundColor: '#110717' },
    headerbody: { flexDirection: 'row' },
    headerbodyView: { backgroundColor: '#14E272', width: 9, height: 9, borderRadius: 10 },
    v1: { flexDirection: 'row', height: 80, width: '100%', backgroundColor: '#1F1724' },
    v2: { width: 50, height: 50, backgroundColor: '#1F1724', borderWidth: 1, borderRadius: 40, borderColor: '#EC9705', marginTop: 10, marginLeft: 5, alignItems: 'center' },
    v3: { width: '75%', height: 70, alignItems: "flex-start", backgroundColor: '#1F1724', padding: 8 },
    imagestyle: { width: '60%', height: 55, marginTop: 8 },
    text1: { height: 40, fontSize: 18, color: '#FFFFFF' },
    button1: { height: 20, width: '25%', backgroundColor: '#1F1724', alignSelf: 'flex-start', borderRadius: 20 },
    v4: { height: 60, width: '100%', padding: 5, justifyContent: 'space-between', alignItems: 'center', flexDirection: "row" },
    text2: { fontSize: 16, color: '#FFFFFF' },
    icondown: { color: '#FFFFFF', fontSize: 12 },
    text3: { color: '#8D8D8D' },
    v5: { height: 60, width: '100%', backgroundColor: '#110717', padding: 20, justifyContent: 'space-between', alignItems: 'center', flexDirection: "row" },
    text4: { fontSize: 14, color: '#8D8D8D', padding: 5 },
    text5: { fontSize: 16, color: '#EC9705', alignSelf: 'flex-end', padding: 5 },

    v6: {
        width: '100%', padding: 8,
        backgroundColor: '#1F1724'
    },
    text6: { color: '#8D8D8D' },
    v7: { width: '100%', backgroundColor: '#1F1724', padding: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: "row" },
    textArea: { color: '#8D8D8D', width: '100%', padding: 5 },
    v8: { width: '100%', backgroundColor: '#1F1724', padding: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: "row" },
    text7: { color: '#8D8D8D', padding: 10 },
    v10: { width: '100%', backgroundColor: '#1F1724', padding: 20, justifyContent: 'space-between', alignItems: "flex-start", flexDirection: "column" },
    video: { width: '90%', height: 200, backgroundColor: '#1F1724', marginLeft: 20, borderRadius: 10, justifyContent: "center" },
    backgroundVideo: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, borderRadius: 10 },
    buttonView: { height: 70, width: '100%', backgroundColor: '#1F1724', alignItems: 'center', flexDirection: "row" },
    buttonStyle: { width: '100%', height: 40, justifyContent: 'center', alignItems: 'center' },

    btntext: { alignSelf: "center", fontSize: 14, color: '#FFFFFF' },
    v11: { width: '100%', height: 40, flexDirection: "row", alignItems: "center" },
    textTime: { fontSize: 14, color: '#CCCCCC' },
    textTime2: { fontSize: 16, color: '#CCCCCC', marginLeft: 32 },
    textTime3: { fontSize: 20, color: '#FFFFFF', marginLeft: 5 },
    buttonStyle3: { width: '70%', height: 50 },
    buttonview2: { width: '100%', alignItems: 'center', justifyContent: 'center', height: 70 }


});