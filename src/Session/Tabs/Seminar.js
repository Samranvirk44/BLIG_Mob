import React, { Component } from 'react';
import { StyleSheet, Text, StatusBar, View, Image, ImageBackground, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Button, Icon } from 'native-base';
import pic from '../../images/session/seminar.jpg'
import pic2 from '../../images/session/seminar2.jpg'
import pic3 from '../../images/session/3seminar3.jpg'
import pic4 from '../../images/session/seminar4.jpg'
import pic5 from '../../images/session/seminar5.jpg'
import { Actions } from 'react-native-router-flux';
export default class Featured extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: 'Lahore,Pakistan',
            Name: 'Webinar Audiography',
            day: 'SAT,',
            date: 'SEP 20',
            latestday: 'MON,',
            latestDate: 'SEP 22'
        }
    }
    render() {
        return (
            <Container style={styles.Containerstyle}>

                <StatusBar barStyle="light-content" hidden={false} />
                <Content padder>
                    <Text allowFontScaling={false} style={styles.text11}>Upcoming Seminar</Text>
                    <View style={styles.v11}>
                        <ScrollView horizontal={true} style={{ height: 150 }}>
                            <TouchableWithoutFeedback onPress={() => Actions.SessionModal()}>
                                <ImageBackground source={pic3} resizeMode="stretch" style={styles.imagestyle2}>
                                    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, marginBottom: 20 }}>
                                        <Text allowFontScaling={false} style={styles.text22}>{this.state.latestday}</Text>
                                        <Text allowFontScaling={false} style={[styles.text2, { color: '#FFFFFF' }]}> {this.state.latestDate}</Text>
                                    </View>
                                    <Text allowFontScaling={false} style={styles.text12}>{this.state.Name}</Text>
                                </ImageBackground>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => Actions.SessionModal()}>
                                <ImageBackground source={pic4} resizeMode="stretch" style={styles.imagestyle3}>

                                    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, marginBottom: 20 }}>
                                        <Text allowFontScaling={false} style={styles.text22}>{this.state.latestday}</Text>
                                        <Text allowFontScaling={false} style={[styles.text2, { color: '#FFFFFF' }]}> {this.state.latestDate}</Text>
                                    </View>
                                    <Text allowFontScaling={false} style={styles.text12}>{this.state.Name}</Text>
                                </ImageBackground>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => Actions.SessionModal()}>
                                <ImageBackground source={pic5} resizeMode="stretch" style={styles.imagestyle3}>

                                    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, marginBottom: 20 }}>
                                        <Text allowFontScaling={false} style={styles.text22}>{this.state.latestday}</Text>
                                        <Text allowFontScaling={false} style={[styles.text2, { color: '#FFFFFF' }]}> {this.state.latestDate}</Text>
                                    </View>
                                    <Text allowFontScaling={false} style={styles.text12}>{this.state.Name}</Text>
                                </ImageBackground>
                            </TouchableWithoutFeedback>
                        </ScrollView>
                    </View>
                    <Text style={styles.text11}>Latest Seminar</Text>
                    <View allowFontScaling={false} style={styles.v1}>

                        <TouchableWithoutFeedback onPress={() => Actions.SessionModal()}>
                            <View style={styles.v2}>

                                <Image source={pic} style={styles.imagestyle}></Image>
                                <View style={styles.v3}>
                                    <View style={{ flexDirection: 'row' }}><Text style={styles.text2}>{this.state.day}</Text><Text style={styles.text2}> {this.state.date}</Text></View>

                                    <Text allowFontScaling={false} style={styles.text1}>{this.state.Name}</Text>
                                    <Text allowFontScaling={false} style={styles.text2}>{this.state.location}</Text>
                                </View>


                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => Actions.SessionModal()}>
                            <View style={styles.v2}>

                                <Image source={pic2} style={styles.imagestyle}></Image>
                                <View style={styles.v3}>
                                    <View style={{ flexDirection: 'row' }}><Text style={styles.text2}>{this.state.day}</Text><Text style={styles.text2}> {this.state.date}</Text></View>
                                    <Text allowFontScaling={false} style={styles.text1}>{this.state.Name}</Text>
                                    <Text allowFontScaling={false} style={styles.text2}>{this.state.location}</Text>
                                </View>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </Content>
            </Container>

        );
    }
}
const styles = StyleSheet.create({
    Containerstyle: { backgroundColor: '#110717' },
    v1: { width: '100%', flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
    v2: { width: '48%', height: 220, borderRadius: 10, flexDirection: "column", alignItems: "center" },
    v3: { flexDirection: 'column', alignItems: 'flex-start', width: '100%' },
    v11: { width: '100%', marginTop: 10 },

    imagestyle: { width: '100%', height: 155, borderRadius: 10, alignSelf: "center", },
    text1: { color: '#D5D5D5', fontSize: 14 },
    text12: { color: 'white', fontSize: 14, position: 'absolute', bottom: 0, marginLeft: 15, marginBottom: 15, },
    text2: { color: '#8D8D8D', fontSize: 12 },
    text22: { color: 'white', fontSize: 12, marginLeft: 15, marginBottom: 10 },
    text11: { color: '#D5D5D5', fontSize: 18, marginTop: 25 },
    imagestyle2: { width: 200, height: 150, borderRadius: 10, overflow: 'hidden' },
    imagestyle3: { width: 200, height: 150, borderRadius: 10, marginLeft: 10, overflow: 'hidden' }


})