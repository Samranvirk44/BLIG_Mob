import React, { Component } from 'react';
import { Text, View,  StyleSheet,TouchableWithoutFeedback,ImageBackground  } from 'react-native';
import {  Content, Container ,Header,Badge,Body,Icon,Title,Button} from 'native-base';
import { CreditCardInput } from "react-native-credit-card-input";
import Toast, { DURATION } from 'react-native-easy-toast';
import styless from '../Styles/Styles';
import {Actions} from 'react-native-router-flux'
export default class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 300,
            selected: '#EC9705',
            choice: ['#110717', '#EC9705', '#110717'],
            boxcolor: '#110717',
            switchValue: false,
            cardNo: 0,
            validity: '',
            cvv: '',
            CHname: '',

        }
    }
    componentDidMount = () => {
  //this.setState({amount:this.props.Amount})
    }
 
    
    render() {
        return (
            <Container style={{ backgroundColor: '#110717' }}>
            <Header hasTabs androidStatusBarColor="#110717" iosBarStyle="light-content" style={{alignItems:'center',backgroundColor:'#110717'}}>
            <View style={styles.h2}>
    <Icon onPress={()=>Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
</View>
<Body >
<Title allowFontScaling={false} style={[styles.sendername]}>Payment Data</Title>
</Body>
<Button transparent>   
</Button>
        </Header>
      
        
                <Content padder>
                    <Text style={styles.text1}>Total Investment</Text>
                    <Text style={styles.text4}>${this.state.amount}</Text>
                    <View style={{ width: '100%',}}>
                         <CreditCardInput onChange={this._onChange}
                         requiresName={true}
                        // requiresPostalCode={true}
                         brand={false}
                         labelStyle={{color:'#cececd'}}
                         allowScroll={true}
                       //  cardBrandIcons=
                        // brand='master card'
                      //  validColor="white"
                        inputStyle={{color:'white'}}
                       // invalidColor="#EC9705"
                        cardImageFront={require('../images/creditCard.png')}
                        cardImageBack={require('../images/creditCard.png')}
                         />
                    </View>

                </Content>
                <View style={styless.pv5}>
                    <TouchableWithoutFeedback onPress={()=>Actions.Congratulation({Type:this.props.Type})}>
                        <View style={styless.v6}>
                            <ImageBackground resizeMode="stretch" source={require('../images/buttoncolor.png')} style={[styless.btnimage, { width: '100%' }]}>
                                <Text allowFontScaling={false} style={styless.ptext3}>Proceed to confirm</Text>
                            </ImageBackground>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <Toast
                    ref="toast"
                    style={{ backgroundColor: 'black' }}
                    position='bottom'
                    //  positionValue={60}
                    // fadeInDuration={7}
                    // fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: 'white' }}
                />
            </Container>


        );
    }
}
const styles = StyleSheet.create({
    v1: { width: '100%', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' },
    v2: { alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#EC9705', height: 40, width: '30%', borderRadius: 20 },
    v3: { flexDirection: 'row', borderBottomColor: '#878787', borderBottomWidth: 2, alignItems: 'center' },
    v4: { width: 20, height: 20, backgroundColor: '#E91D26', borderRadius: 10 },
    v7: { marginLeft: -10, width: 20, height: 20, backgroundColor: '#F59500', borderRadius: 10 },
    v8: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    v9: { width: '45%', overflow: 'hidden' },
    v10: { width: 20, height: 20, borderWidth: 1, borderColor: '#EC9705', borderRadius: 10 },
    text1: { marginTop: 15, color: '#878787', fontSize: 14 },
    text4: { color: '#EC9705', fontSize: 28, marginTop: 5 },
    text2: { color: 'white', },
    item: { marginTop: 10 },
    Label: { fontSize: 14, color: '#878787', marginTop: 30 },
    save: { fontSize: 14, color: '#878787' },
    input: { color: '#878787', fontSize: 14 },
    sendername: { color: '#CCCCCC' ,alignSelf:'center'},


});
