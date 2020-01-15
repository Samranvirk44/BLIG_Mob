import React, { Component } from 'react';
import { Dimensions, StyleSheet, StatusBar, TouchableOpacity, AsyncStorage, View, Image, TouchableWithoutFeedback } from 'react-native';
import { Container, Drawer, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
import IHome from './Tabs/Entrepreneurfile/Dashboard';
import Wallet from '../Wallet/Wallet';
import Profile from '../Profile/Profile';
import MarketPlace from '../MarkeetPlace/MarketDashBoard';
import Inbox from '../Inbox/Inbox';
import SideBar from '../Drawer/Drawer';
export default class InvestorMain extends Component {
    constructor(props) {
        super(props);
        //  this.open = this.openDrawer.bind(this)
        this.state = {
            screennumber: 3,
            Icons: [require('../images/wallet.png'), require('../images/inbox.png'), require('../images/searchA.png'), require('../images/markeet.png'), require('../images/profile.png')],
            tcolor: ['#8D8D8D', '#8D8D8D', 'white', '#8D8D8D', '#8D8D8D']
        }
    }
    SelectScreen = (no) => {
        this.setState({ screennumber: no });
        this.changeicon(no-1)
    }
    Screen = () => {
        if (this.state.screennumber == 1) {
            return (<Wallet Screen={(no) => this.SelectScreen(no)} />)
        }
        else if (this.state.screennumber == 2) {
            return (<Inbox Screen={(no) => this.SelectScreen(no)} />)
        }
        else if (this.state.screennumber == 3) {
       //     console.log("/////////////////////////=>",this.props.CatTypes)
            return (<IHome openDrawer={() => this.openDrawer()} Categories={this.props.CatTypes} Kinds={this.props.KTypes} />)
        }
        else if (this.state.screennumber == 4) {
            return (<MarketPlace Screen={(no) => this.SelectScreen(no)} />)
        }
        else if (this.state.screennumber == 5) {
            return (<Profile Screen={(no) => this.SelectScreen(no)} />)
        }
    }
    closeDrawer = () => {
        this.drawer._root.close()
    }
    openDrawer = () => {
        // console.log("i am") 
        this.drawer._root.open()
    };
    changeicon = (index) => {
        let SelectedIcon = [require('../images/wallet.png'), require('../images/inbox.png'), require('../images/search.png'), require('../images/markeet.png'), require('../images/profile.png')]
        let Resetcolor = ['#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D', '#8D8D8D']
        switch (index) {
            case 0:
                SelectedIcon[index] = require('../images/walletA.png');
                Resetcolor[index]='white'
                this.setState({ Icons: SelectedIcon ,tcolor:Resetcolor});
                break;

            case 1:
                SelectedIcon[index] = require('../images/inboxA.png');
                Resetcolor[index]='white'
                this.setState({ Icons: SelectedIcon ,tcolor:Resetcolor});
                 break;

            case 2:
                SelectedIcon[index] = require('../images/searchA.png');
                Resetcolor[index]='white'
                this.setState({ Icons: SelectedIcon ,tcolor:Resetcolor});
                break;

            case 3:
                SelectedIcon[index] = require('../images/markeetA.png');
                Resetcolor[index]='white'
                this.setState({ Icons: SelectedIcon ,tcolor:Resetcolor});
                break;

            case 4:
                SelectedIcon[index] = require('../images/profileA.png');
                Resetcolor[index]='white'
                this.setState({ Icons: SelectedIcon ,tcolor:Resetcolor});
               break;
        }


    }
    render() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                openDrawerOffset={0.05}
                content={<SideBar  close={()=>this.closeDrawer()}/>}
            >
                <Container style={{ height: '100%', backgroundColor: 'red' }}>

                    {this.Screen()}
                    <Footer style={{ backgroundColor: '#1F1724', borderTopColor: '#1F1724' }}>
                        <FooterTab style={{ backgroundColor: '#1F1724', height: 65 }}>

                            <Button style={styles.btn} onPress={() => { this.SelectScreen(1), this.changeicon(0) }} vertical>
                                <Image resizeMode="stretch" source={this.state.Icons[0]} style={styles.img} />
                                <Text allowFontScaling={false} style={[styles.text, { color: this.state.tcolor[0] }]}>WALLET</Text>
                            </Button>

                            <Button style={styles.btn} onPress={() => { this.SelectScreen(2), this.changeicon(1) }} vertical>
                                <Image resizeMode="stretch" source={this.state.Icons[1]} style={styles.img} />
                                <Text allowFontScaling={false} style={[styles.text, { color: this.state.tcolor[1] }]}>INBOX</Text>
                            </Button>

                            <Button style={styles.btn} onPress={() => { this.SelectScreen(3), this.changeicon(2) }} vertical>
                                <Image resizeMode="stretch" source={this.state.Icons[2]} style={styles.img} />
                                <Text numberOfLines={1} allowFontScaling={false} style={[styles.text, { width: 80, color: this.state.tcolor[2] }]}>DASHBOARD</Text>
                            </Button>

                            <Button style={styles.btn} onPress={() => { this.SelectScreen(4), this.changeicon(3) }} vertical>
                                <Image resizeMode="stretch" source={this.state.Icons[3]} style={styles.img} />
                                <Text numberOfLines={1} allowFontScaling={false} style={[styles.text, { color: this.state.tcolor[3] }]}>MARKEET</Text>
                            </Button>

                            <Button style={styles.btn} onPress={() => { this.SelectScreen(5), this.changeicon(4) }} vertical>
                                <Image resizeMode="stretch" source={this.state.Icons[4]} style={styles.img2} />
                                <Text allowFontScaling={false} style={[styles.text, { color: this.state.tcolor[4] }]}>PROFILE</Text>
                            </Button>


                        </FooterTab>
                    </Footer>
                </Container>
            </Drawer>
        );
    }
}
const styles = StyleSheet.create({
    text: { fontSize: 7, marginTop: 5 },
    img: { width: 30, height: 30 },
    img2: { width: 25, height: 30 },
    btn: { backgroundColor: '#1F1724' },
});