/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Image, ActivityIndicator, Dimensions, ScrollView, YellowBox, TouchableWithoutFeedback, StatusBar, Text, View } from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast'
import { Item, Input, Icon, Label, Button, Container, Content, Textarea } from 'native-base';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal'
import ImagePicker from 'react-native-image-picker';
import styles from '../Styles/Styles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import Geocoder from 'react-native-geocoder';
import Modal from "react-native-modal";
import mapstyle from '../Investor/mapstyle.json'
import Geolocation from '@react-native-community/geolocation';
import Uri from '../DeviceIp'

var NY = {
  lat: 51.5074,
  lng: 0.1278
};
export default class ERegister5 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ComRegId: '',
      ComName: '',
      ComRegIdValidate: true,
      ComNameValidate: true,
      Description: '',
      DescriptionValidate: true,
      cityname: 'City',
      statename: 'State',
      cca2: 'GB',
      Cname: '',
      latlng: {
        latitude: 51.5070,
        longitude: 0.1278
      },
      latitude: 51.5070,
      longitude: 0.1278,
      isModalVisible: false,
      mapoff: false,
      loading: false,
      url: Uri//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'

      // avatarSource: ''
    }
  }

  UNSAFE_componentWillMount = async () => {
    // console.log("data=>", this.props.obj)
    //console.log("Type=>", this.props.Type)
    await this.setState({ ComRegId: this.props.obj[0], ComName: this.props.obj[1], Description: this.props.obj[2], cityname: this.props.obj[3], statename: this.props.obj[4], Cname: this.props.obj[5], cca2: this.props.obj[6] })
    if (this.state.cityname == 'City') {
    //  this.getcurrentLocation()
    }
  }

  getcurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        setTimeout(() => {
          this.setState({mapoff:false})
        }, 2000);
        NY.lat = position.coords.latitude;
        NY.lng = position.coords.longitude;
      },
      (error) => {
        this.setState({mapoff:false})
        alert('Can not get current Location');
  
        // See error code charts below.
        //    console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );

  }

  gotoReg4 = () => {
    this.props.Screenno(1)
  }
  gotoReg5 = () => {
    if (this.state.ComRegId.length == 0 || this.state.ComName.length == 0 || this.state.cityname == 'City' || this.state.Description == '') {
      this.refs.toast.show('Please Fill All the Required Fields', DURATION.LENGTH_LONG);
    }
    else {
      this.props.senddata(2, this.state)
      this.props.Screenno(3)
    }
  }

  toggleModal = () => {
    // alert('here')
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  selectplace = async (latlng) => {
    this.setState({ flagplaces: false })
    // console.log(latlng[0])
    let temp = this.state.latlng
    //console.log(temp[0].latlng.latitude)
    temp.latitude = latlng[0].lat;
    temp.longitude = latlng[0].lng
    this.setState({ latlng: temp })
  }
  data = () => {
    Geocoder.geocodePosition(NY).then(res => {
      // console.log(res)

      this.setState({
        cityname: res[0].locality != null ? res[0].locality : res[0].adminArea,
        statename: res[0].adminArea,
        //count: res[0].country,
        cca2: res[0].countryCode,
        Cname: res[0].country
      })
      //   console.log('city:', city, 'state:', state, 'country:', country, 'countryCode:', countrycode)
    })

      .catch(err => console.log(err))
  }

  Validation = (v, type) => {
    const name = /^[a-zA-Z0-9 ]+$/
    const number = /^[0-9]+$/
    if (type == 'ComRegId') {
      if (number.test(v)) {
        this.setState({
          ComRegId: v,
          ComRegIdValidate: true
        })
      }
      else if (v.length == 0) {
        this.setState({
          ComRegId: '',
          ComRegIdValidate: false
        })
      }
    }
    else if (type == 'ComName') {
      if (name.test(v)) {
        this.setState({
          ComName: v,
          ComNameValidate: true
        })
      }
      else if (v.length == 0) {
        this.setState({
          ComName: '',
          ComNameValidate: false
        })
      }
    }
    else if (type == 'Description') {

      this.setState({
        Description: v,
        DescriptionValidate: true
      })

      if (v.length == 0) {
        this.setState({
          Description: '',
          DescriptionValidate: false
        })
      }
    }
  }
  CurrentLocation = async () => {
    this.setState({ mapoff: true })
    this.getcurrentLocation()
  }
  CheckValidateRegisterNumber = async () => {
    let data = {
      Reg_No: this.state.ComRegId
    }
    if (this.state.ComRegId != '') {
      await fetch(this.state.url + '/DashboardCompany/Check_C_Id', {
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
           console.log("responsse==>",resjson)
          if (resjson.Successful) {
            if (resjson.flag) {
              if(resjson.entre_id!=this.props.E_Id){
                this.setState({ComRegId:''});
                alert('Registeration ID already exist!')
              }
              else{
                this.setState({ComRegId:''});
                alert('this Registeration ID already exist in your Companies!')
              }
            } 
          }
        }).catch(err => alert(err))
    }
  }
  render() {
    // console.disableYellowBox = ['Warning: Each', 'Warning: Failed']
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} backgroundColor="black" />
        <ImageBackground resizeMode="stretch" source={require('../images/breg5.png')} style={styles.imagebackground}>
          <Image source={require('../images/reg3.png')} style={styles.image} />
          <View style={styles.mainview2}>
            <ScrollView>
              <Item style={[styles.itemstyle, !this.state.ComRegIdValidate ? styles.error : null]} floatingLabel>
                <Label allowFontScaling={false} style={styles.username}>Company Registration ID</Label>
                <Input allowFontScaling={false} onEndEditing={()=>this.CheckValidateRegisterNumber()} onChangeText={(value) => this.Validation(value, 'ComRegId')} value={this.state.ComRegId} style={styles.input} />
              </Item>
              <Item style={[styles.itemstyle, !this.state.ComNameValidate ? styles.error : null]} floatingLabel>
                <Label allowFontScaling={false} style={styles.username}>Company Name</Label>
                <Input allowFontScaling={false} onChangeText={(value) => this.Validation(value, 'ComName')} value={this.state.ComName} style={styles.input} />
              </Item>
              <Textarea value={this.state.Description} allowFontScaling={false} rowSpan={5} onChangeText={(v) => this.Validation(v, 'Description')} placeholder="Company Description" placeholderTextColor="#878787" style={[styles.v33, { color: 'white', height: 180 }, !this.state.DescriptionValidate ? styles.textareaError : null]} />
              <View style={[styles.v33, { height: 150 }]}>
                <Text allowFontScaling={false} style={styles.upicture}>Select Your Location</Text>
                <Icon onPress={this.toggleModal} name="location" style={styles.iconr4} type="Entypo" />
                <View style={styles.rview}>
                  <Text allowFontScaling={false} style={[styles.upicture, { marginLeft: 4 }]}>{this.state.cityname}, </Text>
                  <Text allowFontScaling={false} style={[styles.upicture, { marginLeft: 4 }]}>{this.state.statename}, </Text>
                  <Text allowFontScaling={false} style={[styles.upicture, { marginLeft: 4 }]}>{this.state.Cname}</Text>
                </View>

              </View>
            </ScrollView>
          </View>
          <View style={styles.vl}>
            <TouchableWithoutFeedback onPress={this.gotoReg4}>
              <Image source={require('../images/left.png')} style={styles.imgsize} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.gotoReg5}>
              <Image source={require('../images/right.png')} style={styles.imgsize} />
            </TouchableWithoutFeedback>
          </View>
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
          <Modal isVisible={this.state.isModalVisible} backdropOpacity={0} style={styles.r4modal}>
            <View style={styles.modalv1}>
              <View style={styles.modalv2}>
                <View style={styles.modalv3}>
                  <Icon type="MaterialIcons" name="search" style={styles.modalicon} />
                  <GooglePlacesAutocomplete query={{ key: 'AIzaSyAPf5uSr8qCuWREWqsLPV9MF6mj8mTL-dw' }}
                    placeholder='Search'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed={this.state.mapoff}    // true/false/undefined
                    fetchDetails={true}
                    styles={{
                      textInputContainer: {
                        borderTopWidth: 0,
                        height: 30,
                        backgroundColor: '#110717',
                        // paddingTop:0,
                        width: '80%',
                        borderBottomWidth: 0
                      },
                      description: {
                        color: 'white'
                      },
                      textInput: {
                        // width:'60%'
                        height: 30,
                        color: '#818181',
                        borderRadius: 20,
                        backgroundColor: '#110717',
                        marginTop: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        fontSize: 16,
                      },
                      poweredContainer: {
                        height: 0, width: 0,
                        margin: 0, padding: 0,
                      },
                    }}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                      // this.selectplace([details.geometry.location])
                      this.setState({ mapoff: true })
                      setTimeout(() => {
                          this.setState({ mapoff: false })
                        this.setState({
                          latitude: details.geometry.location.lat,
                          longitude: details.geometry.location.lng
                        })
                        NY.lat = details.geometry.location.lat;
                        NY.lng = details.geometry.location.lng;
                      }, 1500);
                      //console.log(details.geometry.location.lat);
                    }}
                  />
                </View>
                <View style={{ width: '100%', height: 400 }}>
                  {
                    this.state.mapoff ?
                      <View style={{ width: '100%', height: 400, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#EC9705" />
                      </View>
                      :
                      <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        customMapStyle={mapstyle}
                        loadingEnabled={true}
                        region={{
                          latitude: this.state.latitude,
                          longitude: this.state.longitude,
                          latitudeDelta: 0.015,
                          longitudeDelta: 0.0121,
                        }}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                      // customMapStyle={mapstyle}
                      >
                        <Marker coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}></Marker>

                      </MapView>
                  }
                </View>
              </View>
              <Button onPress={() => this.CurrentLocation()} style={styles.modalbtn}>
                <Text onPress={() => this.CurrentLocation()} allowFontScaling={false} style={{ color: 'white' }}>Select Current Location</Text>
              </Button>
              <Button onPress={() => { this.data(), this.toggleModal() }} style={styles.modalbtn}>
                <Text onPress={() => { this.data(), this.toggleModal() }} allowFontScaling={false} style={{ color: 'white' }}>Save Location</Text>
              </Button>
            </View>
          </Modal>


        </ImageBackground>
      </View>




    );
  }
}


