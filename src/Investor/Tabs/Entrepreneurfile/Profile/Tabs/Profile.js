import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, ScrollView, StatusBar, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Tabs, Tab, Header, Body, Button, Title, Icon, Content, Container } from 'native-base';
import Tab1 from './About'
import Tab2 from './Finance';
import {Actions} from 'react-native-router-flux'
export default class Profile extends Component {

    render() {
        return (
            <Container style={{ backgroundColor: '#110717' }}>
                <Header androidStatusBarColor="#110717" style={styles.header}>

                    <Button transparent>
                        <Icon name="arrowleft" style={{ color: 'white' }} type="AntDesign" />

                    </Button>

                    <Body>
                        <Title allowFontScaling={false} style={[styles.txt_style, { alignSelf: 'center' }]}>Profile</Title>
                    </Body>
                    <Button transparent>
                        <Icon name="info" style={{ color: '#19131D' }} type="AntDesign" />

                    </Button>
                </Header>
                <Content>

                    <View style={styles.v1}>
                        <View style={styles.v2}>
                            <Image resizeMode="stretch" source={require('../../../../../images/Ellipse.png')} style={{ width: 85, height: '60%' }} />
                        </View>
                        <View style={styles.v3}>
                            <Text allowFontScaling={false} style={{ color: 'white', fontSize: 16 }}>Fravi Yako uno</Text>
                            <Text allowFontScaling={false} style={styles.text}>Film Industry</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image resizeMode="stretch" source={require('../../../../../images/lion.png')} style={{ width: 20, height: 20 }} />
                                <Text  style={styles.text}>Lion</Text>
                            </View>
                        </View>
                    </View>

                    <Tabs tabBarUnderlineStyle={{ backgroundColor: '#EC9705' }}>
                        <Tab tabStyle={styles.tabstyle} textStyle={styles.inatextstyle} activeTextStyle={styles.atextcolor} activeTabStyle={styles.activeTabStyle} heading="About">
                            <Tab1 />
                        </Tab>
                        <Tab tabStyle={styles.tabstyle} textStyle={styles.inatextstyle} activeTextStyle={styles.atextcolor} activeTabStyle={styles.activeTabStyle} heading="Finance">
                            <Tab2 />
                        </Tab>
                    </Tabs>


                </Content>
                <View style={styles.v5}>
                    <View style={styles.v6}>
                        <Image source={require('../../../../../images/Profile/Dialler.png')} style={styles.img} resizeMode="stretch" />
                    </View>
                        <View style={styles.v4}>
                        <TouchableWithoutFeedback onPress={() =>alert("iam")}>
                            <ImageBackground resizeMode="stretch" source={require('../../../../../images/buttoncolor.png')} style={styles.btnimage}>
                                <Text allowFontScaling={false} style={styles.text3}>Make an Investmenttt</Text>
                            </ImageBackground>

                    </TouchableWithoutFeedback>
                        </View>
                </View>
            </Container>


        );
    }
}
const styles = StyleSheet.create({
    tabstyle: { backgroundColor: '#110717' },
    inatextstyle: { color: '#A5A5A5' },
    atextcolor: { color: 'white' },
    activeTabStyle: { backgroundColor: '#19131D' },
    text: { color: 'white', fontSize: 12 },
    v1: { height: 150, width: '100%', flexDirection: 'row' },
    v2: { width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-end' },
    v3: { width: '60%', height: '100%', marginLeft: 5, justifyContent: 'center' },
    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },
    v5: { height: 60, width: '100%', backgroundColor: '#1F1724', flexDirection: 'row' },
    v6: { height: 60, width: '30%', alignItems: 'center', justifyContent: 'center' },
    v4: { height: 60, width: '70%', justifyContent: 'center', alignItems: 'center' },
    text3: { color: 'white', fontSize: 14, overflow: 'hidden' },
    btnimage: { height: 50, width: '90%', justifyContent: 'center', alignItems: 'center' },
    img: { width: 40, height: 40 },

});
