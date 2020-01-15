import React, { Component } from 'react';
import { StyleSheet, Text, View,StatusBar, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { Icon, Button, Container, Header, Body, Title, Content } from 'native-base'
import Swiper from 'react-native-swiper'
import pic1 from '../images/session/bg1.jpg'
import pic2 from '../images/session/bg2.jpg'
import pic3 from '../images/session/bg3.jpg';
import {Actions} from 'react-native-router-flux'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
        ' Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when' +
        ' an unknown printer took a galley of type and scrambled it to make a type specimen' +
        ' book. It has survived not only five centuries, but also the leap into electronic ' +
        'typesetting, remaining essentially unchanged.',
        day:'SAT',
        date:'SEP 20th',
        location:'Lahore, Pakistan -'
        
    };
  }
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar hidden={false} barStyle="light-content"/>
        <Content> 
         
          <View style={{ height: 350}}>
           <Swiper style={styles.wrapper}
              // containerStyle={{height:100,}}
              showsButtons={true}
              dotColor='#110717'
              activeDotColor='#EC9705'
              containerStyle={{borderBottomRightRadius:50,overflow:'hidden',borderBottomLeftRadius:50}}
            >
              <View style={styles.slide1}>
                <ImageBackground source={pic1} resizeMode="stretch" style={[styles.imagestylo,{alignItems:'center'}]}>
                <Header transparent androidStatusBarColor="#110717" style={styles.header}>
                    <Button transparent>
                      <Icon onPress={()=>Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </Button>
                    <Body>
                      <Title allowFontScaling={false} style={[styles.txt_style, { alignSelf: 'center' ,color:'white'}]}>Seminar</Title>
                    </Body>
                    <View style={styles.h2}>
                    </View>
                  </Header>
                </ImageBackground>
              </View>
              <View style={styles.slide2}>
                <ImageBackground source={pic2} resizeMode="stretch" style={styles.imagestylo}>
                  <Header transparent androidStatusBarColor="#110717" style={styles.header}>
                    <Button transparent>
                      <Icon onPress={()=>Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </Button>
                    <Body>
                      <Title allowFontScaling={false} style={[styles.txt_style, { alignSelf: 'center' ,color:'white'}]}>Seminar</Title>
                    </Body>
                    <View style={styles.h2}>
                    </View>
                  </Header>
                </ImageBackground>
              </View>
              <View style={styles.slide3}>
                <ImageBackground source={pic3} resizeMode="stretch" style={styles.imagestylo}>
                  <Header transparent androidStatusBarColor="#110717" style={styles.header}>
                    <Button transparent>
                      <Icon onPress={()=>Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </Button>
                    <Body>
                      <Title  allowFontScaling={false} style={[styles.txt_style, { alignSelf: 'center' ,color:'white'}]}>Seminar</Title>
                    </Body>
                    <View style={styles.h2}>
                    </View>
                  </Header>
                </ImageBackground>
              </View>
              
            </Swiper>
           
          </View>
         
         
         
         
          <View style={styles.suggession}>
            <View style={{ width: '65%', flexDirection: 'column' }}>
           <View style={{flexDirection:'row'}}><Text style={styles.datetime}>{this.state.day}</Text><Text style={styles.datetime}> {this.state.date}</Text></View>
              <Text allowFontScaling={false} style={{ color: 'white', fontSize: 18 }}>Seminar Audiography</Text>
              <View style={{flexDirection:'row'}}><Text style={styles.datetime}>{this.state.location}</Text><Text style={[styles.datetime,{color:'#363636'}]}>Show on map</Text></View>
            </View>
            <Icon name="bookmark-outline"  style={{ color: '#878787',fontSize:40}} type="MaterialCommunityIcons" /> 
          </View>
          <View style={{ width: '90%', flexDirection: 'column', alignSelf: 'center', marginTop: 20 }}>
            <View style={{ width: 70, height: 30, marginBottom: 20, backgroundColor: '#1F1724', alignItems: "center", borderRadius: 20, justifyContent: 'center' }}>
              <Text allowFontScaling={false} style={{ color: '#878787', fontSize: 14 }}>Audio</Text>
            </View>
            <Text allowFontScaling={false} style={{ color: 'white', fontSize: 14 }}>{this.state.text}</Text>
          </View>
        </Content>
        <View style={{ flexDirection: "row", height: 80, justifyContent: 'space-around' }}>
          <TouchableWithoutFeedback onPress={()=>Actions.Ticket()}>
            <View style={styles.v9}>
              <Text allowFontScaling={false} style={{ color: '#FFFFFF' }}>Get Ticket</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#110717'
  },
  h2: { width: 60, height: '100%', justifyContent: 'center', alignItems: 'center' },
  header: { width: '100%', justifyContent: 'center' },
  v9: { width: '60%', borderWidth: 1, borderColor: '#EC9705', borderRadius: 20, height: 40, marginTop: 5, alignItems: "center", justifyContent: "center", alignSelf: 'center' },
  suggession: { flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  wrapper: {},
  slide1: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: { width: '100%', justifyContent: 'center', },

  slide2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
    borderBottomLeftRadius:50,borderBottomStartRadius:50 ,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  imagestylo: { width: '100%', height: '100%',borderBottomLeftRadius:50,borderBottomStartRadius:50 , },
  datetime:{ color: '#878787', marginBottom: 4 }
});
