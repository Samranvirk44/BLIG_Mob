/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, Image, Platform, Alert, TouchableWithoutFeedback, StatusBar, Button, Text, View } from 'react-native';
import pic from '../images/delete.png'
import ImagePicker from 'react-native-image-picker';
import styles from '../Styles/Styles'
import MediaMeta from 'react-native-media-meta';
import Toast, { DURATION } from 'react-native-easy-toast'
const options = {
    title: 'Select Video',
    mediaType: 'video',
    durationLimit: 90,
    //  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class ERegister7 extends Component {
    constructor(props) {
        super(props)
        this.state = {

            filename: '',
            completed: '90% completed',
            width: '90%',
            progressvideo: 0
        }
    }
    componentDidMount = () => {

        this.setState({ filename: this.props.File })
    }

    videopicker = () => {
        // after you take the video...
        ImagePicker.launchImageLibrary(options, (video) => {
            const path = video.path; // for android
            const maxTime = 90000; // 1 and half min
            const minTime = 60000;
            if (Platform.OS === 'android') {
                if (video.path != null) {
                    MediaMeta.get(path)
                        .then((metadata) => {
                            this.setState({ progressvideo: 0 })
                            console.log("duration=>", metadata.duration)
                            if (metadata.duration > maxTime || metadata.duration < minTime) {
                                Alert.alert(
                                    'Sorry',
                                    'Video duration must be (60-90) seconds',
                                    [
                                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                                    ],
                                    { cancelable: false }
                                );
                            } else {
                                var addr = setInterval(() => {
                                   // console.log(this.state.progressaddress)
                                    let temp = this.state.progressvideo
                                    temp += 10
                                    this.setState({ progressvideo: temp })
                                    if (temp >= 100) {
                                        clearInterval(addr)
                                    }
                                }, 200);
                                // Upload or do something else
                                this.setState({ filename: video.uri, });
                            }
                        }).catch(err => console.error(err));
                }
            }
            else {
                if (video.path != null) {
                    const path1 = video.uri.substring(7) // for ios

                    MediaMeta.get(path1)
                        .then((metadata) => {
                            if (metadata.duration > maxTime || metadata.duration < minTime) {
                                Alert.alert(
                                    'Sorry',
                                    'Video duration must be(60-90) seconds',
                                    [
                                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                                    ],
                                    { cancelable: false }
                                );
                            } else {
                                // Upload or do something else
                                this.setState({ filename: video.uri, });
                            }
                        }).catch(err => console.error(err));
                }
            }


        });
    }

    gotoReg5 = () => {
        if (this.props.LoanFinancing > 0) {
            this.props.Screenno(3)
        } else {
            this.props.Screenno(4)
        }
//        this.props.Screenno(4)
    }
    gotoReg7 = () => {
        if(this.state.filename.length==0){

            this.refs.toast.show('Please upload an video',DURATION.LENGTH_LONG);
        }
        else{
       this.props.senddata(5,{videouri:this.state.filename})
       this.props.Screenno(6)}
    }
    render() {

        console.disableYellowBox = ['Warning: Each', 'Warning: Failed']
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} barStyle="light-content" backgroundColor="black" />
                <ImageBackground resizeMode="stretch" source={require('../images/breg5.png')} style={styles.imagebackground}>
                    <Image source={this.props.LoanFinancing > 0 ? require('../images/reg5.png') : require('../images/reg6.png')} style={styles.image} />
                    <View style={styles.mainview}>
                        <Image resizeMode="stretch" source={require('../images/r6logo.png')} style={styles.coinER7} />
                        <Text allowFontScaling={false} style={styles.text}>What do you require funding for ?</Text>
                        <View style={styles.v3ER7}>
                            <Text allowFontScaling={false} style={styles.upictureER7}>Upload Video</Text>
                            <TouchableWithoutFeedback onPress={this.videopicker}>
                                <Image resizeMode="stretch" source={require('../images/icloud.png')} style={styles.image2} />
                            </TouchableWithoutFeedback>
                            <Text allowFontScaling={false} style={styles.fileformat}>Formats Allowed .mp4 (60-90)seconds</Text>
                            <Text allowFontScaling={false} style={styles.fname}>{this.state.filename}</Text>
                            <View style={{ width: '80%', overflow: 'hidden', marginTop: 5, height: 5, backgroundColor: 'black', borderRadius: 5 }}>
                                <View style={{ width: this.state.progressvideo + '%', height: 5, backgroundColor: 'white' }}>
                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableWithoutFeedback onPress={this.gotoReg5}>
                            <Image source={require('../images/left.png')} style={styles.imgsize} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.gotoReg7}>
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

                </ImageBackground>
            </View>
        );
    }
}

