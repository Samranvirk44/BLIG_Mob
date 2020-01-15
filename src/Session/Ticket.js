import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Image, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Tabs, Tab, Header, Body, Button, Title, Icon, Content, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import edit from '../images/session/edit.png'
import standardB from '../images/session/btn1.png'
import premiumB from '../images/session/btn2.png'
import Darkbg from '../images/session/darkbg.png'
import lightbg from '../images/session/lightbg.png'

export default class Ticket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            regularPrice: '$129',
            standardPrice: '$200',
            premiumPrice: '$300',
        }
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#110717' }}>
                <Header hasTabs androidStatusBarColor="#110717" iosBarStyle="light-content" style={{alignItems:'center',backgroundColor:'#110717'}}>
            <View style={styles.h2}>
    <Icon onPress={()=>Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
</View>
<Body >
<Title allowFontScaling={false} style={[styles.sendername]}>Get Ticket</Title>
</Body>
<Button transparent>   
</Button>
        </Header>
                <Content padder>
                    <View style={styles.gtv1}>
                        <Text allowFontScaling={false} style={styles.gtt1}>Ticket Details</Text>
                        <Image resizeMode="stretch" source={edit} style={styles.gti1}></Image>
                    </View>

                    <TouchableWithoutFeedback onPress={() => Actions.CreditCard()}>
                        <View style={{ marginTop: 10 }}>
                            <ImageBackground resizeMode="stretch" source={Darkbg} style={styles.gti2}>
                                <View style={styles.gtv2}>
                                    <ImageBackground resizeMode="stretch" source={standardB} style={styles.gti3}>
                                        <Text allowFontScaling={false} style={styles.gtt2}>Regular</Text></ImageBackground>
                                    <Text allowFontScaling={false} style={styles.gtt3}>{this.state.regularPrice}</Text>
                                </View>
                                <View style={styles.gtv3}>
                                    <Text allowFontScaling={false} style={styles.gtt4}>Features</Text>
                                    <View style={styles.gtv4}>
                                        <Text allowFontScaling={false} style={styles.gtt5}>.</Text>
                                        <Text allowFontScaling={false} style={styles.gtt6}>Lorem ipsum</Text>
                                    </View>
                                    <View style={styles.gtv4}>
                                        <Text allowFontScaling={false} style={styles.gtt5}>.</Text>
                                        <Text allowFontScaling={false} style={styles.gtt6}>Lorem ipsum</Text>
                                    </View>
                                    <View style={styles.gtv4}>
                                        <Text allowFontScaling={false} style={styles.gtt5}>.</Text>
                                        <Text allowFontScaling={false} style={styles.gtt6}>Lorem ipsum</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => Actions.CreditCard()}>
                        <View style={{ marginTop: 10 }}>
                            <ImageBackground resizeMode="stretch" source={Darkbg} style={styles.gti2}>
                                <View style={styles.gtv2}>
                                    <ImageBackground resizeMode="stretch" source={standardB} style={styles.gti3}>
                                        <Text allowFontScaling={false} style={styles.gtt2}>Standard</Text></ImageBackground>
                                    <Text allowFontScaling={false} style={styles.gtt3}>{this.state.standardPrice}</Text>
                                </View>
                                <View style={styles.gtv3}>
                                    <Text allowFontScaling={false} style={styles.gtt4}>Features</Text>

                                    <View style={styles.gtv4}>
                                        <Text allowFontScaling={false} style={styles.gtt5}>.</Text>
                                        <Text allowFontScaling={false} style={styles.gtt6}>Lorem ipsum</Text>
                                    </View>

                                    <View style={styles.gtv4}>
                                        <Text allowFontScaling={false} style={styles.gtt5}>.</Text>
                                        <Text allowFontScaling={false} style={styles.gtt6}>Lorem ipsum</Text>
                                    </View>

                                    <View style={styles.gtv4}>
                                        <Text allowFontScaling={false} style={styles.gtt5}>.</Text>
                                        <Text allowFontScaling={false} style={styles.gtt6}>Lorem ipsum</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => Actions.CreditCard()}>
                        <View style={{ marginTop: 10 }}>
                            <ImageBackground resizeMode="stretch" source={lightbg} style={styles.gti2}>
                                <View style={styles.gtv2}>
                                    <ImageBackground resizeMode="stretch" source={premiumB} style={styles.gti3}>
                                        <Text allowFontScaling={false} style={styles.gtt7}>Premium</Text></ImageBackground>
                                    <Text allowFontScaling={false} style={styles.gtt3}>{this.state.premiumPrice}</Text>
                                </View>
                                <View style={styles.gtv3}>
                                    <Text allowFontScaling={false} style={styles.gtt4}>Features</Text>

                                    <View style={styles.gtv4}>
                                        <Text allowFontScaling={false} style={styles.gtt5}>.</Text>
                                        <Text allowFontScaling={false} style={styles.gtt6}>Lorem ipsum</Text>
                                    </View>

                                    <View style={styles.gtv4}>
                                        <Text allowFontScaling={false} style={styles.gtt5}>.</Text>
                                        <Text allowFontScaling={false} style={styles.gtt6}>Lorem ipsum</Text>
                                    </View>

                                    <View style={styles.gtv4}>
                                        <Text allowFontScaling={false} style={styles.gtt5}>.</Text>
                                        <Text allowFontScaling={false} style={styles.gtt6}>Lorem ipsum</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableWithoutFeedback>
                </Content>
            </Container>


        );
    }
}
const styles = StyleSheet.create({
    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },
    gtv1: { flexDirection: 'row', justifyContent: 'space-between' },
    gtv2: { width: '36%', height: 100, flexDirection: "column", alignItems: 'center', justifyContent: 'center' },
    gtv3: { width: '60%', height: 100, marginLeft: 10, flexDirection: 'column' },
    gtv4: { width: '95%', flexDirection: 'row', alignItems: 'center', height: 20, alignSelf: 'flex-end' },

    gtt1: { color: 'white', marginLeft: 5 },
    gtt2: { color: 'white', fontSize: 10 },
    gtt3: { color: 'white', fontSize: 30 },
    gtt4: { color: 'white', fontSize: 18, marginTop: 10 },
    gtt5: { color: 'white', fontSize: 50, marginBottom: 30 },
    gtt6: { color: 'white', fontSize: 14, marginLeft: 8 },
    gtt7: { color: '#EC9705', fontSize: 10 },


    sendername: { color: '#CCCCCC' ,alignSelf:'center'},
    gti1: { width: 20, height: 20, marginRight: 5 },
    gti2: { width: '100%', height: 110, flexDirection: 'row' },
    gti3: { width: 70, height: 25, alignItems: 'center', justifyContent: 'center' },




});
