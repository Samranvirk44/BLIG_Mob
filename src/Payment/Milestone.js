import React, { Component } from 'react';
import { Text, View,  StyleSheet, Image,TouchableWithoutFeedback } from 'react-native';
import {  Content, Container } from 'native-base';

export default class MileStone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: '#EC9705',
            selectmile: ['#110717', '#EC9705', '#110717', '#110717', '#110717'],
            no:2
        }
        this.updatedata(this.props.Mno)
    }
    updatedata(Mno){
        let index = this.state.selectmile.indexOf('#EC9705')
        let temp = this.state.selectmile
        temp[index] = '#110717'
        temp[Mno-1] = this.state.selected
        this.props.SendData(2,Mno);
        this.setState({ choice: temp,no:Mno })


    }
    selecctedchoice = (key) => {
        let index = this.state.selectmile.indexOf('#EC9705')
        let temp = this.state.selectmile
        temp[index] = '#110717'
        temp[key] = this.state.selected
        this.props.SendData(2,key+1);
        this.setState({ choice: temp,no:key+1 })

    }
    render() {
        return (
            <Container style={{ backgroundColor: '#110717' }}>
             
                <Content padder>
                   

                        <View style={style.v2}>
                            <Image resizeMode="stretch" source={require('../images/Profile/stairs.png')} style={style.stair_img} ></Image>

                            <Text allowFontScaling={false} style={style.text_style2}>How many stages you want?</Text>

                            <View style={style.main2_view}>
                                <View style={style.count_main}>
                                    <TouchableWithoutFeedback onPress={() => this.selecctedchoice(0)}>
                                        <View style={[style.count_style, { backgroundColor: this.state.selectmile[0] }]}>
                                            <Text allowFontScaling={false} style={style.text_style}>1</Text>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={() => this.selecctedchoice(1)}>
                                        <View style={[style.count_style, { backgroundColor: this.state.selectmile[1] }]}>
                                            <Text allowFontScaling={false} style={style.text_style}>2</Text>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={() => this.selecctedchoice(2)}>
                                        <View style={[style.count_style, { backgroundColor: this.state.selectmile[2] }]}>
                                            <Text allowFontScaling={false} style={style.text_style}>3</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => this.selecctedchoice(3)}>
                                        <View style={[style.count_style, { backgroundColor: this.state.selectmile[3] }]}>
                                            <Text allowFontScaling={false} style={style.text_style}>4</Text>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={() => this.selecctedchoice(4)}>
                                        <View style={[style.count_style, { backgroundColor: this.state.selectmile[4] }]}>
                                            <Text allowFontScaling={false} style={style.text_style}>5</Text>
                                        </View>
                                    </TouchableWithoutFeedback>

                                </View>
                                <View style={style.text_view}>
                                    <Text allowFontScaling={false} style={style.text_note_style}>Note :</Text>
                                    <Text allowFontScaling={false} style={style.text_count_style}>If you will select stages then your
                                     amount will be release in {this.state.no} stages to the enterpreneur.Otherwise, your
                                     amount will be in escrow till the work is not completed.</Text>
                                </View>

                            </View>
                        </View>

                  
                </Content>
                
            </Container>


        );
    }
}
const style = StyleSheet.create({
   main_view: { flex: 1, backgroundColor: '#110717', justifyContent: "center", alignContent: "center", alignItems: "center" },
    main2_view: { backgroundColor: "#1F1724", borderRadius: 10, alignItems: "center", width: "100%" ,marginTop:20},
    count_main: {marginTop:30, flexDirection: 'row', justifyContent: 'space-around',  width: "100%" },
    stair_view: { flexDirection: "row", marginTop: 80, backgroundColor: "#110717", justifyContent: "space-around", width: 90, height: 98 },
    stair_img: { width: 60, height: 90, marginTop:30 },
    text_style: { fontSize: 14, color: "white" },
    text_style2: { fontSize: 14, color: "white",marginTop:20 },
    text_view: { fontSize: 10, width: "100%", marginTop: 20, padding: 13, justifyContent: "center" },
    text_count_style: { fontSize: 14, color: "#878787", height: 80 },
    text_note_style: { fontSize: 15, color: "#FFFFFF" },
    count_style: { height: 50, width: 50, borderRadius: 50, justifyContent: "center",  alignItems: "center" },
    v2: { alignItems: "center"},
 });
