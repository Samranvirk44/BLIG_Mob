
import React, { Component } from 'react';
import { ImageBackground, BackHandler, StatusBar, Dimensions, ActivityIndicator, ScrollView, TouchableWithoutFeedback, Text, View, ToastAndroid } from 'react-native';
import { Item, Input, Icon, Label, } from 'native-base';
import styles from '../Styles/Styles'
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';
import DeviceInfo from 'react-native-device-info';
import Uri from '../DeviceIp'
export default class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      pass: '',
      MacAddress: null,
      loading: false,
      emailValidate: true,
      passValidate: true,
      showpass: true,
      Type: '',
      url:Uri //'http://192.168.100.4:80'//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
    }
    DeviceInfo.getMacAddress().then(mac => {
      this.setState({ MacAddress: mac, loading: true });

      this.CheckStatus(mac);
    });
    BackHandler.addEventListener('hardwareBackPress', this.onBack)
  }
  onBack = () => {
    console.log('index', Actions.state.index)
    // on back button press has disabled if return true
    return false
  }

  CheckRegisteration = async (email) => {
    let data = {
      Email: email
    }
    await fetch(this.state.url + '/Session/Check_Registeration', {
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
          console.log("Email from check registratin=>")
          if (resjson.Investor) {
            this.setState({ loading: false })
            this.Update_Session(false)
          }
          else if (resjson.Entrepreneur) {
            this.setState({ loading: false })
            this.Update_Session(true)

          }
          else {
            this.setState({ loading: false })
            Actions.Registration({ Email: resjson.Email })
          }
        } else {
          this.setState({ loading: false })
          console.log("User not registered")
        }
      }).catch(err => alert(err))
  }
  Update_Session = async (v) => {
    if (this.state.MacAddress != null) {
      let data = {
        Mac: this.state.MacAddress,
        Entrepreneur: v
      }
      await fetch(this.state.url + '/Session/Session_Update', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      })
        .then(res => res.json())
        .then(resjson => {
          if (resjson.Successful) {
            console.log("Successfully update session!!")
            DeviceInfo.getMacAddress().then(mac=>{
              this.GetEmailId(v,mac);
            })
           // this.CheckSubs_Payment(v)
            //  Actions.LogIn();
          }
        }).catch(err => {
          this.setState({ loading: false })
        })
    }
  }
  GetEmailId = async (v,mac) => {
    console.log(mac)
    let data = {
      Mac: mac
    }
    await fetch(this.state.url + '/Session/Check_Session', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
      .then(res => res.json())
      .then(resjson => {
        console.log('response email=>', resjson)
        if (resjson.Successful) {
          console.log(resjson.Email, resjson.Ent)
          this.setState({ Type: resjson.Ent })
          this.CheckSubs_Payment(v)
        }
      })
      .catch(err => alert(err))
  }
  CheckStatus = async (mac) => {
    console.log(mac)
    let data = {
      Mac: mac
    }
    await fetch(this.state.url + '/Session/Check_Session', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
      .then(res => res.json())
      .then(resjson => {
        console.log('response email=>', resjson)
        if (resjson.Successful) {
          console.log(resjson.Email, resjson.Ent)
          //this.setState({loading:false})
          this.setState({ Type: resjson.Ent })
          this.CheckRegisteration(resjson.Email);
        } else {
          this.setState({ loading: false })
          console.log("Email logout")
        }
      }).catch(err => {
        this.setState({ loading: false })
        this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

      })
  }
  gotoReg1 = async () => {
    console.log('function calling')
    if (!this.state.loading) {
      if (this.state.email == '' || this.state.pass == '') {
        console.log('function calling if')
        this.refs.toast.show('Enter the Email and Password', DURATION.LENGTH_LONG);
      } else {
        console.log('function calling else')
        this.setState({ loading: true })
        await fetch(this.state.url + '/LogIn/LogIn', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: this.state.email,
            Pass: this.state.pass,
          }),
        })
          .then(res => res.json())
          .then(resjson => {
            if (resjson.Successful) {
              console.log('successful');
              this.CreateSession();
              // Actions.Registration({Email:this.state.email})
            }
            else {
              this.setState({ loading: false })
              console.log('failed');
              this.refs.toast.show(resjson.Message, DURATION.LENGTH_LONG);
            }
          }
          )
          .catch(err => {
            this.setState({ loading: false })
            this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
          })
      }
    }
  }
  CreateSession = async () => {
    // console.log("will mount calling")

    let data = {
      Email: this.state.email,
      Mac: this.state.MacAddress,
    }
    console.log("data=>", data)
    await fetch(this.state.url + '/Session/CreateSession_LogIn', {
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
        if (resjson.Successful) {
          console.log('successful')
          this.CheckRegisteration(this.state.email)
          // Actions.Registration({ Email: this.state.email })
        }
        else {
          this.setState({ loading: false })
          console.log('Failed');
          this.refs.toast.show(resjson.Message, DURATION.LENGTH_LONG);

        }
      }
      )
      .catch(err => {
        this.setState({ loading: false })
        this.refs.toast.show('Network Reques Failed!', DURATION.LENGTH_LONG);
      })
  }

  gotoSignUp = () => {
    Actions.SignUp();
  }
  Validation = (v, type) => {
    const email = /^[a-zA-Z0-9@.]+$/
    if (type == 'email') {
      if (email.test(v)) {
        this.setState({
          email: v,
          emailValidate: true
        })
      }
      else if (v.length == 0) {
        this.setState({
          email: '',
          emailValidate: false
        })
      }
    }
    else if (type == 'password') {
      this.setState({
        pass: v,
        passValidate: true

      })
      if (v.length == 0) {
        this.setState({
          pass: '',
          passValidate: false
        })
      }

    }
  }
  CheckSubs_Payment = async (v) => {
    let data = {
      Mac: this.state.MacAddress
    }
    await fetch(this.state.url + '/Session/User_Subs_Payment', {
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
          console.log("response=>", resjson)
          console.log("Typee=>", this.state.Type)
          
           // console.log("Typee=> in if",)
            if (this.state.Type == true) {
              console.log("response=>", resjson.entrepreneur.length)
              if (resjson.entrepreneur.length == 0) {
                Actions.Registration()
              } else if (resjson.entrepreneur[0].active) {
                Actions.EDashBoard();
              } else if (resjson.investor[0].active == null & resjson.entrepreneur[0].active == null) {
                Actions.SubPlan();
              }
            } else if (this.state.Type == false) {
              console.log("response=>", resjson.investor.length)
              if (resjson.investor.length == 0) {
                Actions.Registration()
              } else if (resjson.investor[0].active) {
                Actions.IDashBoard();
              } else if (resjson.investor[0].active == null & resjson.entrepreneur[0].active == null) {
                Actions.SubPlan();
              }

            }
          
          ////////
          //   if(resjson.entrepreneur.length==0){

          //   }
          //  else if (resjson.entrepreneur[0].active) {
          //     Actions.EDashBoard();
          //   }
          //   else if(resjson.investor.length==0){

          //   } else if (resjson.investor[0].active) {
          //     Actions.IDashBoard();
          //   } else if (resjson.investor[0].active == null & resjson.entrepreneur[0].active == null) {
          //     Actions.SubPlan();
          //   }
          // if (resjson.Active) {
          // //  this.setState({loading:false})
          //   if (v) {
          //     Actions.EDashBoard();
          //   } else {
          //     Actions.IDashBoard();
          //   }
          // } else {
          //   this.setState({ loading: false });
          //   Actions.SubPlan();
          // }
        } else {
          this.setState({ loading: false })
          Actions.SubPlan();
          this.refs.toast.show('You did not subscribe any plan yet!', DURATION.LENGTH_LONG);
        }
      }).catch(err => {
        this.setState({ loading: false })
        console.log(err)
        this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
      })

  }
  render() {
    return (

      <View style={styles.containerlogin}>
        <StatusBar hidden={false} backgroundColor="black" barStyle="light-content" />
        <ImageBackground resizeMode="stretch" source={require('../images/signup.png')} style={styles.bgimg}>
          <ScrollView >
            <View style={styles.vmargin}>
              <Text allowFontScaling={false} style={[styles.ltext, { marginLeft: 10 }]}>LOGIN<Text style={styles.stext}>/Sign up</Text> </Text>
              <Item style={[styles.itemstyle, !this.state.emailValidate ? styles.error : null, { marginTop: 30 }]} floatingLabel>
                <Label allowFontScaling={false} style={styles.username}>Email</Label>
                <Input  allowFontScaling={false} onChangeText={(value) => this.Validation(value, 'email')} 
                onEndEditing={() => {
                  if (/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(this.state.email.toLowerCase())) {

                  } else {
                      alert('Invalid Email Address')
                      this.setState({ email: '' })
                  }
              }}
                value={this.state.email} style={styles.input} />
              </Item>

              <View style={[styles.v, { width: '80%', alignSelf: 'center' }]}>
                <Item style={[styles.item2, !this.state.passValidate ? styles.error : null,]} floatingLabel>
                  <Label allowFontScaling={false} style={styles.username}>Password</Label>
                  <Input allowFontScaling={false} secureTextEntry={this.state.showpass} onChangeText={(value) => this.Validation(value, 'password')} style={styles.input} />
                </Item>
                <Icon onPress={() => this.setState({ showpass: !this.state.showpass })} name='eye' style={styles.icon} type="AntDesign" />
              </View>

              <TouchableWithoutFeedback onPress={this.gotoReg1}>
                <ImageBackground source={require('../images/buttoncolor.png')} style={[styles.btnimage2, { marginTop: 50 }]}>
                  <Text allowFontScaling={false} onPress={this.gotoReg1} style={styles.ltext2}>Login</Text>
                </ImageBackground>
              </TouchableWithoutFeedback>
              <Text allowFontScaling={false} style={styles.alreadyAcount} onPress={() => this.gotoSignUp()}>Create new Acount? / SignUp</Text>

            </View>

          </ScrollView>
          {
            this.state.loading ?
              <View style={{ position: 'absolute', backgroundColor: "rgba(0,0,0,0.4)", width: Dimensions.get('window').width, height: Dimensions.get('window').height, }}>
                <ActivityIndicator size="large" color="#EC9705" style={{ position: 'absolute', top: (Dimensions.get('window').height / 2) - 40, left: (Dimensions.get('window').width / 2) - 20 }} />

              </View>
              : null
          }

        </ImageBackground>
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
      </View>

    );
  }
}