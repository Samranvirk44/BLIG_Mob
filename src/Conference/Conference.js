import React, { Component } from 'react';
import { Text, View, Image, StatusBar, ImageBackground, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Tabs, Tab, Header, Body, Button, Title, Icon, Content, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class Conference extends Component {
    render() {
        return (
            <View style={style.main_view}>

                <StatusBar hidden={false} backgroundColor="black" />
                <ImageBackground resizeMode="stretch" source={require('../images/bimg15.png')} style={style.background_syle}>
                    <Text allowFontScaling={false} style={style.txt_style}>Conference Call </Text>
                    <Image resizeMode="stretch" source={require('../images/cnct_img15.png')} style={style.contact_img} ></Image>
                    <Image resizeMode="stretch" source={require('../images/add_img15.png')} style={style.add_img} ></Image>
                    <View style={style.main1_view} >
                        <View style={style.icon_outer_view}>
                            <View style={style.first_view}>
                                <Image resizeMode="stretch" source={require('../images/dailer_img15.png')} style={style.dailer_img} />
                            </View >
                            <Text allowFontScaling={false} style={style.dailer_txt}>Keypad</Text>
                        </View>
                        <View style={style.icon_outer_view}>
                            <View style={style.first_view}>
                                <Image resizeMode="stretch" source={require('../images/mute_img15.png')} style={style.dailer_img} />
                            </View>
                            <Text allowFontScaling={false} style={style.dailer_txt}>Mute</Text>
                        </View>
                        <View style={style.icon_outer_view}>
                            <View style={style.first_view}>
                                <Image resizeMode="stretch" source={require('../images/phone_img15.png')} style={style.dailer_img} />
                            </View>
                            <Text allowFontScaling={false} style={style.dailer_txt}>Contacts</Text>
                        </View>
                    </View>
                    <View style={style.main2_view} >
                        <View style={style.icon_outer_view}>
                            <View style={style.first_view}>
                                <Image resizeMode="stretch" source={require('../images/video_img15.png')} style={style.dailer_img2} />
                            </View >
                            <Text allowFontScaling={false} style={style.dailer_txt}>Video Call</Text>
                        </View>
                        <View style={style.icon_outer_view}>
                            <View style={style.first_view}>
                                <Image resizeMode="stretch" source={require('../images/speaker_img15.png')} style={style.dailer_img2} />
                            </View>
                            <Text allowFontScaling={false} style={style.dailer_txt}>Speaker</Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                        <View style={[style.icon_outer_view, { marginTop: 70 }]}>
                            <View style={{ justifyContent: "center", alignItems: "center", height: 58.72, width: 58.72, borderWidth: 1, borderColor: "#EC9705", borderRadius: 50 }}>
                                <Icon onPress={() => Actions.pop()} name="cross" type="Entypo" style={{ color: 'white' }} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </View>
        );
    }
}


const style = StyleSheet.create({
    h2: { width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' },
    background_syle: { flex: 1, justifyContent: 'center', alignItems: "center" },
    icon_outer_view: { flexDirection: "column", alignItems: "center" },
    dailer_txt: { color: "#CCCCCC", fontSize: 11 },
    contact_img: { width: 93.89, height: 77.33, marginTop: 30 },
    add_img: { width: 42.85, height: 42.85, marginTop: 20 },
    dailer_img: { width: 28, height: 29 },
    dailer_img2: { width: 28, height: 22 },
    main1_view: { flexDirection: "row", justifyContent: "space-around", width: "70%", marginTop: 50 },
    main2_view: { flexDirection: "row", justifyContent: 'space-between', width: "40%", marginTop: 20 },
    txt_style: { color: "#FFFFFF", fontSize: 22, },
    main_view: { flex: 1, },
    first_view: { justifyContent: "center", alignItems: "center", height: 58.72, width: 58.72, borderWidth: 1, borderColor: "#EC9705", borderRadius: 10 }
});
