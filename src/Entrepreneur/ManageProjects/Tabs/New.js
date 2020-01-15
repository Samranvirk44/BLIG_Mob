import React, { Component } from 'react';
import { Container, Content, } from 'native-base';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import styles from '../../../Styles/Styles';
import { Actions } from 'react-native-router-flux';
import {test} from '../../../Converter';
import Uri from '../../../DeviceIp'
export default class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '2 hours ago',
      status: 'Review',
      NewCompany: [],
      InvestorList: [],
      ContractedList: [],
      url:Uri,// 'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com',
 Active:false
      //text: 'Video needed for personal apparel and website header area',
      // deadline: 'Due in 28 days'
    }
  }
  componentDidMount() {
    console.log('in New:',this.props.data)
    if (this.props.data.Type == 'Investor') {
      this.setState({Active:false})
      this.InvestorProposal(this.props.data.investor_id)
    } else if (this.props.data.Type == 'Entrepreneur') {
      this.setState({Active:true})
      this.EntrepreneurProposal(this.props.data.entrepreneur_id)
    }
  }
  EntrepreneurProposal = async (Id) => {
    let data = {
      E_Id: Id,
      status: 'Review'
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
        //console.log("response ", resjson.Message, resjson)
        if (resjson.Successful) {
          this.setState({ InvestorList: resjson.investors_name, ContractedList: resjson.data1, NewCompany: resjson.companies_contracted_name })
        }
      })
  }
  CancelContract  = async(id) => {
    console.log("cancelling ....",id)
    let data = {
      C_Id:id,
      Status: 'Cancelled'
    }
      await fetch(this.state.url+'/Contract/Contract_Status', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      })
        .then(res => res.json())
        .then(resjson => {
          console.log("Contract Cancelled", resjson.Message);
          if (resjson.Successful) {
            Actions.refresh()
          }
        })
    
  }
  render() {
    // console.log("component mount caliind")

    return (

      <Container style={styles.Containerr}>
        <Content padder>
          {
            this.state.NewCompany.map((data, index) => (
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
                <View style={styles.v3u}>
                  <TouchableWithoutFeedback onPress={() => Actions.CheckDetail({Active:this.state.Active, Contract_Id: this.state.ContractedList[index].id, Company_Id: this.state.ContractedList[index].company_id })} >
                    <View style={styles.v4u}>
                      <Text onPress={() => Actions.CheckDetail({Active:this.state.Active, Contract_Id: this.state.ContractedList[index].id, Company_Id: this.state.ContractedList[index].company_id })} allowFontScaling={false} style={styles.textu}>Check Details</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.CancelContract(this.state.ContractedList[index].id)} >
                    <View style={styles.vbtn}>
                      <Text onPress={() => this.CancelContract(this.state.ContractedList[index].id)} allowFontScaling={false} style={styles.textu}>Cancel</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>

            ))
          }

        </Content>
      </Container>

    );
  }
}
