import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput,} from 'react-native';
import { Container, Content, } from 'native-base';

export default class Invest extends Component {
    constructor(props){
        super(props);
        this.state={
            Amount:this.props.Amount,
            validate1:true,
        }
    }
   

    // Investment=(value)=>{
    //     //console.log(this.state.Amount,value)
    //     this.props.SendData(1,value)
    //     this.setState({
    //         Amount:value
    //       })
    //   }

      number_Validation = (v) => {
     //   console.log('in',v)
        const number = /^[0-9]+$/
        if (number.test(v)) {
       //     console.log('in',v)
            this.props.SendData(1,v.toString())
            this.setState({
                Amount: v.toString(),
                validate1: true
            })
        }
        else if (v.length == 0) {
            this.setState({
                Amount: '',
                validate1: false
            })
        }

    }

    render() {
        return (
            <Container style={{ backgroundColor: '#110717' }}>
         
            <Content padder>
                    <View style={style.main_view}>

                        <Image resizeMode="stretch" source={require('../images/Profile/money.png')} style={style.money_img} ></Image>

                        <Text allowFontScaling={false} style={style.text_style}>How much you want to invest?</Text>

                        <View style={style.main2_view}>
                            <TextInput allowFontScaling={false} value={this.state.Amount} onChangeText={(value)=>this.number_Validation(value)}  style={[style.input_style,!this.state.validate1? style.error : null]} placeholder="£7000" placeholderTextColor="#cececd" ></TextInput>
                            <View style={style.v1}>
                                <Text allowFontScaling={false} style={style.text_style2}>Suggested Amount</Text>
                            </View>
                            <View style={style.count_main}>

                                <Text allowFontScaling={false} style={style.text_inner_style}>£900</Text>
                                <Text allowFontScaling={false} style={style.text_inner_style}>£8000</Text>
                                <Text allowFontScaling={false} style={style.text_inner_style}>£70000</Text>
                                <Text allowFontScaling={false} style={style.text_inner_style}>£600000</Text>

                            </View>
                            <View style={style.equity}>
                                <Text allowFontScaling={false} style={style.text}>Percentage Equity</Text>
                                <Text allowFontScaling={false} style={style.text2}>{this.props.Equity}%</Text>
                            </View>
                        </View>
                    </View>
                </Content>
               
            </Container>

        );
    }
}
const style = StyleSheet.create({
    main_view: { flex: 1, backgroundColor: '#110717', alignItems: "center" },
    v1: { flexDirection: "row", marginTop: 30, marginBottom: 10, },
    main2_view: { backgroundColor: "#1F1724", padding: 20, borderRadius: 10, width: "100%" },
    count_main: { backgroundColor: "#1F1724", flexDirection: 'row', justifyContent: 'space-around', width: "100%" },
    money_img: { width: 70, height: 90, marginTop: 30 },
    text_style: { fontSize: 14, color: "#FFFFFF", paddingBottom: 10, paddingTop: 35 },
    text_style2: { fontSize: 12, color: "#FFFFFF", alignSelf: 'flex-start' },
    input_style: { height: 50, width: '100%', borderBottomColor: '#EC9705', borderBottomWidth: 1, color: "#FFFFFF", fontSize: 16 },
    text_inner_style: { fontSize: 14, color: "#878787" },
    equity: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 },
    text: { color: '#878787', fontSize: 12 },
    text2: { color: 'white', fontSize: 16 },
    error:{borderBottomColor:'red',borderBottomWidth:2}
});

