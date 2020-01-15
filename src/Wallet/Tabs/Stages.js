import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Content, } from 'native-base';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast';
import { test } from '../../Converter';
import Uri from '../../DeviceIp'
export default class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      Stages: [],
      milestones_desc: '',
      milestone_start: '06/30/2019',
      amount: '$40000',
      date: '06/30/2019',
      M_Description: [],
      url: Uri//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
    }
  }

  UNSAFE_componentWillMount() {
    console.log('will mount calling')
    this.setState({ loading: true })
    setTimeout(() => {
      if (this.props.DataObj) {
        this.GetMileStone(this.props.DataObj);
      } else {
        this.setState({ loading: false })
        console.log("Available wallet data obj null")
      }
    }, 3000);
  }

  GetMileStone = async (investorid) => {
    console.log(investorid)
    let data = {
      Id: investorid.Id,
      Status: 'Going'
    }
    let uri = '';
    if (investorid.Type == 'Investor') {
      uri = this.state.url + '/Wallet/Wallet_Investor';
    } else if (investorid.Type == 'Entrepreneur') {
      uri = this.state.url + '/Wallet/Wallet_Entrepreneur';
    }
    await fetch(uri, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
      .then(res => res.json())
      .then(resjson => {
        //                console.log("data=>",resjson)
        if (resjson.Successful) {
          let temp=[]
          for (let index = 0; index < resjson.data.length; index++) {
            temp.push(resjson.data[index].id)
          }
          this.GetMileStoneDescription(temp,resjson.data)
        }
        else {
          this.setState({ loading: false })
          this.refs.toast.show('Not any payment in Review!', DURATION.LENGTH_LONG);
        }
      }
      ).catch(err => {
        this.setState({ loading: false })
        this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

        console.log(err)
      })
  }

  GetMileStoneDescription = async (M_Id,M_Data) => {
    let data = {
      M_Id:M_Id,
    };
    await fetch(this.state.url + '/Wallet/Milestone_Description', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
      .then(res => res.json())
      .then(resjson => {
     //                   console.log("data=>",resjson)
        if (resjson.Successful) {
        this.setState({ loading: false,M_Description:resjson.data,Stages:M_Data})
           }
        else {
          this.setState({ loading: false })
          this.refs.toast.show('Not any payment in Review!', DURATION.LENGTH_LONG);
        }
      }
      ).catch(err => {
        this.setState({ loading: false })
        this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

        console.log(err)
      })
  }
  render() {
    return (
      <Container style={styles.Containerstyle}>
        <Content>
          {
            this.state.Stages.map((data, index) => (
              <View key={index} style={styles.v1}>
                <View style={styles.v2}>
                  <Text allowFontScaling={false} style={styles.text3}>Milestone</Text>
                  <Text allowFontScaling={false} style={styles.text2}>{this.state.M_Description[index].project_description}</Text>
                </View>
                <View style={styles.v3}>
                  <View style={styles.v4}>
                    <Text allowFontScaling={false} style={styles.text}>Amount</Text>
                    <Text allowFontScaling={false} style={styles.text2}>${test(data.amount)}</Text>
                  </View>
                  <View style={styles.v4}>
                    <Text allowFontScaling={false} style={styles.text}>Assigned</Text>
                    <Text allowFontScaling={false} style={styles.text2}>{data.date.slice(0, 10)}</Text>
                  </View>
                </View>
              </View>

            ))
          }

        </Content>
        {
          this.state.loading ?
            <View style={{ position: 'absolute', backgroundColor: "rgba(0,0,0,0.4)", width: Dimensions.get('window').width, height: Dimensions.get('window').height, }}>
              <ActivityIndicator size="large" color="#EC9705" style={{ position: 'absolute', top: (Dimensions.get('window').height / 3) - 40, left: (Dimensions.get('window').width / 2) - 20 }} />

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
console.log('red')
const styles = StyleSheet.create({
  Containerstyle: { backgroundColor: '#110717' },
  text: { fontSize: 12, color: '#545454' },
  text2: { fontSize: 14, color: '#FFFFFF' },
  text3: { marginBottom: 10, fontSize: 14, color: '#878484' },
  v1: { width: '95%', backgroundColor: '#1F1724', alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 10 },
  v2: { width: '100%', flexDirection: "column" },
  v3: { flexDirection: "row", marginTop: 10, justifyContent: "space-between", alignItems: 'center' },
  v4: { width: 100, height: 40, flexDirection: "column", alignItems: 'center', justifyContent: "center" },
  v5: { width: 100, height: 40, flexDirection: "column", alignItems: 'center', justifyContent: "center" }
})