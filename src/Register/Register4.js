/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, Image, ScrollView, ActivityIndicator, TouchableWithoutFeedback, StyleSheet, Dimensions, StatusBar, Text, View } from 'react-native';
import { Item, Input, Icon, Label, Button } from 'native-base';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal'
import ImagePicker from 'react-native-image-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import Geocoder from 'react-native-geocoder';
import Modal from "react-native-modal";
import styles from '../Styles/Styles';
import mapstyle from '../Investor/mapstyle.json'
import Geolocation from '@react-native-community/geolocation';
import Toast, { DURATION } from 'react-native-easy-toast';
import Uri from '../DeviceIp'
const options = {
    title: 'Select Image',
    mediaType: 'photo',
    //  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',

    },
};
var NY = {
    lat: 51.5074,
    lng: 0.1278
};


const createFormData = (photo, body) => {
    const data = new FormData();

    data.append("photo", {
        name: photo.fileName,
        type: photo.type,
        uri:
            Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });

    return data;
};




export default class IRegister4 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: null,
            Repname: '',
            repnameValidate: true,
            cityname: 'City',
            statename: 'State',
            //  city: 'City',
            //state: 'State',
            //country: 'Country',
            cca2: 'GB',
            Cname: 'United Kingdom',
            idproof: '',
            addressproof: '',
            latlng: {
                latitude: 51.5074,
                longitude: 0.1278
            },
            latitude: 51.5074,
            longitude: 0.1278,
            isModalVisible: false,
            mapoff: false,
            progressid: 0,
            progressaddress: 0,
            url:Uri //'http://192.168.100.4:80'// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'

            // avatarSource: ''
        }
    }

    componentDidMount = async () => {
        await this.setState({ Repname: this.props.objIR4[0], cityname: this.props.objIR4[1], statename: this.props.objIR4[2], Cname: this.props.objIR4[3], cca2: this.props.objIR4[4], idproof: this.props.objIR4[5], addressproof: this.props.objIR4[6] })
        if (this.state.cityname == 'City') {
            this.getcurrentLocation()
        }
    }
    getcurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                //  console.log(position);
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                setTimeout(() => {
                    this.setState({ mapoff: false })
                }, 2000);
                NY.lat = position.coords.latitude;
                NY.lng = position.coords.longitude;
            },
            (error) => {
                this.setState({ mapoff: false })
                alert('Can not get current Location', DURATION.LENGTH_LONG);

                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
        );

    }
    gotoReg3 = () => {
        if (this.props.Type == 'Investor') {
            this.props.Screenno(2)
        } else {
            this.props.Screenno(3)
        }
    }
    gotoReg5 = () => {
        if (this.state.Repname == '' | this.state.idproof == '' | this.state.addressproof == '') {
            this.refs.toast.show('Fill the required Fields', DURATION.LENGTH_LONG);
        }
        else {
            this.props.senddata(4, this.state)
            if (this.props.Type == 'Investor') {
                this.props.Screenno(5)
            } else {
                this.props.Screenno(45)
            }
        }
    }
    toggleModal = () => {
        // alert('here')
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    selectplace = async (latlng) => {
        this.setState({ flagplaces: false })
        //console.log(latlng[0])
        let temp = this.state.latlng
        //console.log(temp[0].latlng.latitude)
        temp.latitude = latlng[0].lat;
        temp.longitude = latlng[0].lng
        this.setState({ latlng: temp })
    }
    data = () => {
        Geocoder.geocodePosition(NY).then(res => {
            //             console.log(res[0])

            this.setState({
                cityname: res[0].locality != null ? res[0].locality : res[0].adminArea,
                statename: res[0].adminArea,
                //count: res[0].country,
                cca2: res[0].countryCode,
                Cname: res[0].country
            })
            //  console.log('city:', city, 'state:', state, 'country:', country, 'countryCode:', countrycode)
        })

            .catch(err => console.log(err))
    }
    imagepicker = (v) => {
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                //   console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                let size = response.fileSize / 1048576;
                //console.log("image size", response.fileSize / 1048576)
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                //console.log("file size of image", response.fileSize / 1024000)
                if (size <= 1) {
                    if (v == 1) {
                        this.setState({
                            photo: response,
                            progressid:0
                        });

                        var idd = setInterval(() => {
                       //      console.log(this.state.progressid )

                            let temp1 = this.state.progressid
                            temp1 += 10
                            this.setState({ progressid: temp1 })
                            if (temp1 >= 80) {
                                clearInterval(idd)
                            }
                        }, 200);
                        this.handleUploadPhoto(1)
                    }
                    else {
                        this.setState({
                            photo: response,
                            progressaddress:0
                        });
                        var addr = setInterval(() => {
                        //     console.log(this.state.progressaddress)
                            let temp = this.state.progressaddress
                            temp += 10
                            this.setState({ progressaddress: temp })
                            if (temp >= 80) {
                                clearInterval(addr)
                            }
                        }, 200);
                        this.handleUploadPhoto(2)
                    }
                }
                else {
                    alert("Filesize greater than 1mb")
                }
            }
        });
    }


    handleUploadPhoto = async (v) => {
        console.log("upload is calling")
        await fetch(this.state.url + '/Image/UploadImages', {
            method: "POST",
            body: createFormData(this.state.photo, { userId: v })
        })
            .then(res => res.json())
            .then(response => {
                console.log("Upload succes", response);
                if (response.Successful) {
                    if (v == 1) {
                        this.setState({ progressid: 100 })
                        this.setState({ photo: null, idproof: response.uri });
                    } else {
                        this.setState({ progressaddress: 100 })
                        this.setState({ photo: null, addressproof: response.uri });
                    }
                } else {
                    alert("Upload Failed!");
                }
            })
            .catch(error => {
                console.log("upload error", error);
                alert("Upload failed!");
            });
    };

    Validation = (v, type) => {
        const name = /^[a-zA-Z ]+$/
        if (type == 'Repname') {
            if (name.test(v)) {
                this.setState({
                    Repname: v,
                    repnameValidate: true
                })
            }
            else if (v.length == 0) {
                this.setState({
                    Repname: '',
                    repnameValidate: false
                })
            }
        }
    }
    CurrentLocation = async () => {
        this.setState({ mapoff: true })
        this.getcurrentLocation()
    }
    render() {
        const { photo } = this.state //photo.uri contain the uri of uploaded photo
        console.log("Type=>", this.props.Type)
        const Type = this.props.Type == 'Investor' ? true : false;
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} backgroundColor="black" />
                <ImageBackground resizeMode="stretch" source={require('../images/breg5.png')} style={styles.imagebackground}>
                    <Image source={this.props.Type == 'Investor' ? require('../images/reg3.png') : require('../images/reg4.png')} style={styles.image} />
                    <View style={styles.mainview2}>
                        <ScrollView>
                            <Item style={[styles.itemstyle, !this.state.repnameValidate ? styles.error : null]} floatingLabel>
                                <Label allowFontScaling={false} style={styles.username}>Representative Name</Label>
                                <Input allowFontScaling={false} onChangeText={(value) => this.Validation(value, 'Repname')} value={this.state.Repname} style={styles.input} />
                            </Item>

                            {
                                Type ?
                                    <View style={[styles.v33, { height: 150 }]}>
                                        <Text allowFontScaling={false} style={styles.upicture}>Select Your Location</Text>
                                        <Icon onPress={this.toggleModal} name="location" style={styles.iconr4} type="Entypo" />

                                        <View style={styles.rview}>
                                            <Text allowFontScaling={false} style={[styles.upicture, { marginLeft: 4 }]}>{this.state.cityname}, </Text>
                                            <Text allowFontScaling={false} style={[styles.upicture, { marginLeft: 4 }]}>{this.state.statename}, </Text>
                                            <Text allowFontScaling={false} style={[styles.upicture, { marginLeft: 4 }]}>{this.state.Cname}</Text>
                                        </View>

                                    </View>
                                    :
                                    <View></View>
                            }
                            <View style={styles.v33}>
                                <Text allowFontScaling={false} style={styles.upicture}>Upload Proof of ID</Text>
                                <TouchableWithoutFeedback onPress={() => this.imagepicker(1)}>
                                    <Image resizeMode="stretch" source={require('../images/icloud.png')} style={styles.image2} />
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={styles.fileformat}>Formats Allowed JPG/PNG</Text>
                                <Text allowFontScaling={false} style={styles.upicture}>Maximum Size 1MB</Text>
                                <Text allowFontScaling={false} numberOfLines={1} style={styles.fname}>{this.state.idproof}</Text>
                                <View style={{ width: '80%', overflow: 'hidden', marginTop: 5, height: 5, backgroundColor: 'black', borderRadius: 5 }}>
                                    <View style={{ width: this.state.progressid + '%', height: 5, backgroundColor: 'white' }}>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.v33}>
                                <Text allowFontScaling={false} style={styles.upicture}>Upload Proof of Address</Text>
                                <TouchableWithoutFeedback onPress={() => this.imagepicker(2)}>
                                    <Image resizeMode="stretch" source={require('../images/icloud.png')} style={styles.image2} />
                                </TouchableWithoutFeedback>
                                <Text allowFontScaling={false} style={styles.fileformat}>Formats Allowed JPG/PNG</Text>
                                <Text allowFontScaling={false} style={styles.upicture}>Maximum Size 1MB</Text>
                                <Text allowFontScaling={false} style={styles.fname} numberOfLines={1} >{this.state.addressproof}</Text>

                                <View style={{ width: '80%', overflow: 'hidden', marginTop: 5, height: 5, backgroundColor: 'black', borderRadius: 5 }}>
                                    <View style={{ width: this.state.progressaddress + '%', height: 5, backgroundColor: 'white' }}>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.vl}>
                        <TouchableWithoutFeedback onPress={this.gotoReg3}>
                            <Image source={require('../images/left.png')} style={styles.imgsize} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.gotoReg5}>
                            <Image source={require('../images/right.png')} style={styles.imgsize} />
                        </TouchableWithoutFeedback>
                    </View>

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
                                        this.state.mapoff ? <View style={{ width: '100%', height: 400, justifyContent: 'center', alignItems: 'center' }}>
                                            <ActivityIndicator size="large" color="#EC9705" />
                                        </View>
                                            : <MapView
                                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                                style={styles.map}
                                                customMapStyle={mapstyle}
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
                                <Text onPress={() => { this.data(), this.toggleModal() }} allowFontScaling={false} style={styles.text1}>Save Location</Text>
                            </Button>
                        </View>
                    </Modal>
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
                </ImageBackground>
            </View>




        );
    }
}

