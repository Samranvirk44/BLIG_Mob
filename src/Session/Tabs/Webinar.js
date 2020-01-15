//This is an example code for Bottom Navigation//
import React from 'react';
import { Text, View, StyleSheet,Image,TouchableWithoutFeedback } from 'react-native';
import { Container,Content } from 'native-base'
import pic from '../../images/session/add_img15.png';
import {Actions} from 'react-native-router-flux'
export default class Webinar extends React.Component {
  render() {
    return (
        <Container style={styles.container}>
        <Content padder>
           <Text allowFontScaling={false} style={styles.text}>Suggessions for you</Text>

           <TouchableWithoutFeedback onPress={() => Actions.SessionModal()}>
           <View style={styles.suggession}>
             <View style={{width:'38%',alignItems:'center'}}>
                 <Image source={pic} style={{width:110,height:110}}></Image>
             </View>
             <View style={{width:'58%',flexDirection:'column'}}>
                 <Text allowFontScaling={false} style={{color:'white',marginBottom:4}}>How to grow a business using social media</Text>
                 <Text allowFontScaling={false} style={{color:'#878787',marginTop:20}}>SAT, SEP 20</Text>
                 <Text allowFontScaling={false} style={{color:'white'}}>William Alleoren</Text>
             </View>
           </View>
           </TouchableWithoutFeedback>
           <Text allowFontScaling={false} style={[styles.text,{marginTop:10}]}>Upcoming Webinar</Text>
           <View style={styles.suggession}>
             <View style={{width:'38%',alignItems:'center'}}>
                 <Image source={pic} style={{width:110,height:110}}></Image>
             </View>
             <View style={{width:'58%',flexDirection:'column'}}>
                 <Text allowFontScaling={false}style={{color:'white',marginBottom:4}}>How to structure a logo design presentation</Text>
                 <Text allowFontScaling={false} style={{color:'#878787',marginTop:20}}>May 24th, 07:45 PM</Text>
                 <Text allowFontScaling={false} style={{color:'white'}}>Albert Sameo</Text>
             </View>
           </View>
        </Content>
       

    </Container>
    );
  }
}
const styles = StyleSheet.create({
   container:{backgroundColor:'#110717'},
   text:{color:'white',fontSize:16,marginBottom:10},
   suggession:{flexDirection:'row',width:'100%',height:140,backgroundColor:'#1F1724',borderRadius:10,alignItems:'center',justifyContent:'center'},

})