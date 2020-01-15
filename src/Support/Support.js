
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon,  Button, Container, Content, Header,Body,Title, } from 'native-base'
import styles from '../Styles/Styles'
import { Actions } from 'react-native-router-flux';
export default class Support extends React.Component {
    //Profile Screen to show from Open profile button
    constructor(props) {
        super(props);
        this.state = {
            help:'Help & Education',
            switch:true
              }
    }
    render() {
        return (
            <Container style={styles.Containerstyle}>
                <Header androidStatusBarColor="#110717" style={styles.pheader}>

                    <View style={styles.h2}>
                        <Icon onPress={()=>Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body >
                    <Title allowFontScaling={false} style={[styles.sendername]}>Support</Title>
                    </Body>
                    <Button transparent>   
                    </Button>
                </Header>
                <Content>
                      
                    <View style={styles.vc}>
                        <View style={styles.vcc}>
                        <Text allowFontScaling={false} style={styles.text1s}>{this.state.help}</Text>
                        </View>
                        <View style={styles.vcc}>
                        <Text allowFontScaling={false} style={styles.text1s}>Contact with customer support</Text>
                        </View>
                        <View style={styles.vcc}>
                        <Text allowFontScaling={false} style={styles.text1s}>Forum</Text>
                        </View>
                        <View style={styles.vcc}>
                        <Text allowFontScaling={false} style={styles.text1s}>Blog</Text>
                        </View>
                        
                    </View>
                </Content>
            </Container>
        );
    }
}
