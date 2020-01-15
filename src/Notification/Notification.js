import React, { Component } from 'react';
import { Container, Content, Icon,  Header,  Body, Title,} from 'native-base';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import styles from '../Styles/Styles';
import { Actions } from 'react-native-router-flux';
export default class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Notification:[],
            amount: '$400000',
            date: '2 hours ago',
            status: 'Completed',
            text: 'Video needed for personal apparel and website header area',
            deadline: 'Due in 28 days'
        }
    }
    render() {
        return (

            <Container style={styles.Containerr}>
                <Header hasTabs iosBarStyle="light-content" androidStatusBarColor="#110717" style={styles.pheader}>

                    <View style={styles.h2}>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body style={{ alignItems: "center" }}>
                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <Title allowFontScaling={false} style={{ color: 'white' }} >Notification</Title>
                        </View>
                    </Body>
                    <View style={styles.h2}>
                    </View>
                </Header>
                <Content padder>
                    {
                        this.state.Notification.map((data,index)=>(
                            <View style={styles.v1e}>
                            <View style={styles.v5e}>
                                <View style={styles.v22}>
                                    <Image source={require('../images/Investor/Ellipse3x.png')} style={styles.imagestyle} resizeMode='stretch'></Image>
                                </View>
    
                                <View style={styles.v44}>
                                    <View style={styles.v6e}>
                                        <Text allowFontScaling={false} style={styles.text1e}>Franvi Yanco Inc.</Text>
                                        <Text allowFontScaling={false} numberOfLines={1} style={styles.date}>{this.state.date}</Text>
                                    </View>
    
                                    <Text allowFontScaling={false} style={styles.text22}>{this.state.text}</Text>
                                </View>
    
                            </View>
                            <View style={styles.v3u}>
                                <TouchableWithoutFeedback onPress={() => Actions.Feedback()}>
                                    <View style={styles.v4u}>
                                        <Text allowFontScaling={false} style={styles.textu}>Check Details</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => Actions.pop()}>
                                <View style={styles.vbtn}>
                                    <Text allowFontScaling={false} style={styles.textu}>Later</Text>
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
