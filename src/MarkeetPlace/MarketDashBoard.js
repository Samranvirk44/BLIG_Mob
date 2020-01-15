import React, { Component } from 'react';
import { Icon, Input, Badge, Button, Tabs, Fab, Tab, Container, Header, Right, Body, Title, Content } from 'native-base'
import { StyleSheet, Text, View } from 'react-native';
import Tab1 from './Tabs/Feature';
import Tab2 from './Tabs/Home';
import Tab3 from './Tabs/Individual'
import { Actions } from 'react-native-router-flux';

export default class Marketplace extends Component {
    state = {
        active: false
    }

    render() {
        return (
            <Container>
                <Header hasTabs iosBarStyle="light-content" androidStatusBarColor="#110717" style={styles.header}>
                    <View style={styles.h2}>
                        <Icon onPress={() => this.props.Screen(3)} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body style={{ alignItems: "center" }}>
                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <Title allowFontScaling={false} style={{ color: 'white' }}>Marketplace</Title>
                        </View>
                    </Body>
                    <View style={styles.h2}>
                    </View>
                </Header>


                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#EC9705' }}>
                    <Tab heading="Featured" tabStyle={{ backgroundColor: '#110717' }} activeTabStyle={{ backgroundColor: '#110717' }} textStyle={{ color: '#545454' }} activeTextStyle={{ color: '#CCCCCC' }}>
                        <Tab1 />
                    </Tab>
                    <Tab heading="Home" tabStyle={{ backgroundColor: '#110717' }} activeTabStyle={{ backgroundColor: '#110717' }} textStyle={{ color: '#545454' }} activeTextStyle={{ color: '#CCCCCC' }}>
                        <Tab2 />
                    </Tab>
                    <Tab heading="Individual" tabStyle={{ backgroundColor: '#110717' }} activeTabStyle={{ backgroundColor: '#110717' }} textStyle={{ color: '#545454' }} activeTextStyle={{ color: '#CCCCCC' }}>
                        <Tab3 />
                    </Tab>
                </Tabs>
                <Fab
                    // active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#EC9705', width: 50, height: 50 }}
                    position="bottomRight"
                    onPress={() => Actions.CreateCompany()}>
                    <Icon onPress={() => Actions.CreateCompany()} name="plus" style={{ color: 'white' }} type="FontAwesome5" />


                </Fab>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    h2: { width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' },
    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },

    v1: { width: '100%', height: 100, backgroundColor: '#1F1724' },
})