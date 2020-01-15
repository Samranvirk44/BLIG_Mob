import React, { Component } from 'react';
import { StyleSheet,View } from 'react-native';
import { Tabs, Tab, Header, Body, Button, Title, Icon, Content, Container } from 'native-base';
import Seminar from './Tabs/Seminar'
import Webinar from './Tabs/Webinar'
import { Actions } from 'react-native-router-flux';

export default class Session extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'LION',  
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
<Title allowFontScaling={false} style={[styles.sendername]}>Sessions</Title>
</Body>
<Button transparent>   
</Button>
        </Header>
                <Content>                        
                            <Tabs initialPage={this.props.page} locked={true} tabBarUnderlineStyle={{ backgroundColor: '#EC9705' }}>
                                <Tab  tabStyle={styles.tabstyle} textStyle={styles.inatextstyle} activeTextStyle={styles.atextcolor} activeTabStyle={styles.activeTabStyle} heading="Webinar">
                                    <Webinar />
                                </Tab>
                                <Tab tabStyle={styles.tabstyle} textStyle={styles.inatextstyle} activeTextStyle={styles.atextcolor} activeTabStyle={styles.activeTabStyle} heading="Seminar">
                                    <Seminar />
                                </Tab>
                            </Tabs>
                        
                   
                </Content>
            </Container>


        );
    }
}
const styles = StyleSheet.create({
    tabstyle: { backgroundColor: '#110717' },
    inatextstyle: { color: '#A5A5A5' },
    atextcolor: { color: 'white' },
    activeTabStyle: { backgroundColor: '#19131D' },

    sendername: { color: '#CCCCCC' ,alignSelf:'center'},


   
});
