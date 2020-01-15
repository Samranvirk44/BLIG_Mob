import React, { Component } from 'react';
import { Drawer, Left, Icon, Container, Header, Button, Body, Title, Content, } from 'native-base';
import { Text, View, StyleSheet, Image,TouchableWithoutFeedback } from 'react-native';
import styles from '../../../Styles/Styles';
import {test} from '../../../Converter';
import Uri from '../../../DeviceIp'
export default class Completed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: 'Sep 18,2019',
      status: 'Completed',
      NewCompany: [],
      InvestorList: [],
      ContractedList: [],
      Type: 'Investor',
      url: Uri//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'

    }
  }
  componentDidMount() {
    console.log('in completed:',this.props.data)
    if (this.props.data.Type == 'Investor') {
      this.InvestorProposal(this.props.data.investor_id)
    } else if (this.props.data.Type == 'Entrepreneur') {
      this.EntrepreneurProposal(this.props.data.entrepreneur_id)
    }
  }
  EntrepreneurProposal = async (Id) => {
    
    //console.log('entreid::entreproposals::id',Id)
    let data = {
      E_Id: Id,
      status: this.state.status
    }
    await fetch(this.state.url+'/Entrepreneur/Proposal', {
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
          this.setState({ InvestorList: resjson.Investors_List, ContractedList: resjson.Contracted_List, NewCompany: resjson.companies_contracted_name })
        }
      })
  }
  InvestorProposal = async (Id) => {
    let data = {
      I_Id: Id,
      Status: this.state.status
    }
    await fetch(this.state.url+'/Investor/Investor_Contract_Detail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
      .then(res => res.json())
      .then(resjson => {
        console.log("response ", resjson.Message, resjson)
        if (resjson.Successful) {
          this.setState({ InvestorList: resjson.investors_name, ContractedList: resjson.data1, NewCompany: resjson.companies_contracted_name })
        }
      })
  }
  render() {
    return (

      <Container style={styles.Containerr}>
        <Content padder>
          {
            this.state.NewCompany.map((data, index) => (
              <TouchableWithoutFeedback key={index} onPress={()=>Actions.CheckDetail({Contract_Id: this.state.ContractedList[index].id, Active:false,Company_Id:this.state.ContractedList[index].company_id})}>
              <View key={index} style={styles.v1e}>
                <View style={styles.v5e}>
                  <View style={styles.v22}>
                    <Image source={{ uri: data.uri }} style={styles.imagestyle} resizeMode='stretch'></Image>
                  </View>

                  <View style={styles.v44}>
                    <View style={styles.v6e}>
                      <Text allowFontScaling={false} style={styles.text1e}>{data.name}</Text>
                      <Text allowFontScaling={false} numberOfLines={1} style={styles.date}>{this.state.date}</Text>
                    </View>
                    <View style={styles.v6e}>
                      <Text allowFontScaling={false} style={{ fontSize: 14, color: '#CCCCCC' }}>{this.state.InvestorList[index].name}</Text>
                      <Text allowFontScaling={false} numberOfLines={1} style={{ color: '#EC9705', fontSize: 14 }}>${test(this.state.ContractedList[index].total_investment)}</Text>
                    </View>
                    <Text allowFontScaling={false} numberOfLines={1} style={styles.date}>{this.state.ContractedList[index].investor_equity}% Equity</Text>
                  </View>

                </View>
                <View style={styles.v3e}>
                  <View style={styles.v4e}>
                    <Text allowFontScaling={false} style={styles.texte}>Status</Text>
                    <Text allowFontScaling={false} style={styles.text2e}>{this.state.status}</Text>
                  </View>
                  <View style={styles.v4e}>
                    <Text allowFontScaling={false} style={styles.texte}>Amount</Text>
                    <Text allowFontScaling={false} style={styles.text2e}>${test(this.state.ContractedList[index].total_investment)}</Text>
                  </View>
                </View>
              </View>
              </TouchableWithoutFeedback>
            ))
          }
        </Content>
      </Container>

    );
  }
}