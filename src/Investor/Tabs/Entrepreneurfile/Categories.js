import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, StatusBar, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux'
export default class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: '#643F00',
            colorvalue: ['black', 'black', 'black', 'black', 'black'],
            //colorvalue: ['black', 'black', 'black', 'black', 'black', 'black', 'black'],
            Services: ['Music', 'Film', 'Gaming', 'Technology', 'Fashion'],
            Categories: [],
            Categoriesindex:[],
        }
    }

    selectedbox = (key) => {
        //////////
        let reqservices = this.state.Categories;
        let Cindex=this.state.Categoriesindex;
        let temp = this.state.colorvalue;
        temp[key] = temp[key] == 'black' ? '\#643F00' : 'black';

        
        if (reqservices.includes(this.state.Services[key])) {
            reqservices.splice(reqservices.indexOf(this.state.Services[key]), 1)
            Cindex.splice(Cindex.indexOf(key+1),1)

        }
        else {
          //  console.log("index=>", Cindex,key)
            Cindex.push(key+1);
            reqservices.push(this.state.Services[key])
            
        }
        //  console.log(reqservices)
        this.setState({ colorvalue: temp, Categories: reqservices,Categoriesindex:Cindex })
        //  this.props.senddata(8, { ServicesReuired: reqservices })
        ////////

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#19131D' }}>

                <Header hasTabs iosBarStyle="light-content" androidStatusBarColor="#19131D" style={{ width: '100%', justifyContent: 'center', backgroundColor: '#19131D' }}>

                    <Button transparent>
                        <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />

                    </Button>

                    <Body>
                        <Title allowFontScaling={false} style={[style.txt_style, { alignSelf: 'center' }]}>Categories</Title>
                    </Body>
                    <Button transparent>
                        <Icon name="info" style={{ color: '#19131D' }} type="AntDesign" />

                    </Button>
                </Header>
                <View style={style.main_view}>

                    <View style={style.main3_view}>
                        <View style={style.main2_view} >
                            <TouchableWithoutFeedback onPress={() => this.selectedbox(0)}>
                                <View style={style.icon_outer_view}>
                                    <View style={[style.first_view, { backgroundColor: this.state.colorvalue[0] }]}>
                                        <Image resizeMode="stretch" source={require('../../../images/music.png')} style={style.dailer_img} />
                                    </View >
                                    <Text allowFontScaling={false} style={style.dailer_txt}>Music</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.selectedbox(1)}>
                                <View style={style.icon_outer_view}>
                                    <View style={[style.first_view, { backgroundColor: this.state.colorvalue[1] }]}>
                                        <Image resizeMode="stretch" source={require('../../../images/film.png')} style={style.dailer_img} />
                                    </View>
                                    <Text allowFontScaling={false} style={style.dailer_txt}>Film</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={style.main2_view} >
                            <TouchableWithoutFeedback onPress={() => this.selectedbox(2)}>
                                <View style={style.icon_outer_view}>
                                    <View style={[style.first_view, { backgroundColor: this.state.colorvalue[2] }]}>
                                        <Image resizeMode="stretch" source={require('../../../images/gaming.png')} style={style.dailer_img} />
                                    </View >
                                    <Text allowFontScaling={false} style={style.dailer_txt}>Gaming</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.selectedbox(3)}>
                                <View style={style.icon_outer_view}>
                                    <View style={[style.first_view, { backgroundColor: this.state.colorvalue[3] }]}>
                                        <Image resizeMode="stretch" source={require('../../../images/technology.png')} style={style.dailer_img} />
                                    </View>
                                    <Text allowFontScaling={false} style={style.dailer_txt}>Technology</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={style.main2_view} >
                            <TouchableWithoutFeedback onPress={() => this.selectedbox(4)}>
                                <View style={style.icon_outer_view}>
                                    <View style={[style.first_view, { backgroundColor: this.state.colorvalue[4] }]}>
                                        <Image resizeMode="stretch" source={require('../../../images/fashion.png')} style={style.dailer_img} />
                                    </View >
                                    <Text allowFontScaling={false} style={style.dailer_txt}>Fashion</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.selectedbox(5)}>
                                <View style={style.icon_outer_view}>
                                    <View style={[style.first_view, { backgroundColor: this.state.colorvalue[5] }]}>
                                    </View>
                                    <Text allowFontScaling={false} style={style.dailer_txt}>More</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => Actions.IDashBoard({ CatTypes: {Ct:this.state.Categories,flag:1,Cindex:this.state.Categoriesindex} })} >
                        <View style={style.last_view}>
                            <Text allowFontScaling={false} onPress={() => Actions.IDashBoard({ CatTypes: {Ct:this.state.Categories ,flag:1,Cindex:this.state.Categoriesindex}})} style={style.last_txt}>Select Categories</Text>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>

        );
    }
}


const style = StyleSheet.create({
    main_view: { flex: 1, backgroundColor: '#19131D', justifyContent: "space-between", alignItems: "center" },
    main3_view: { justifyContent: 'center', alignItems: 'center', width: "100%", height: "80%" },
    main2_view: { flexDirection: "row", justifyContent: 'space-around', width: "100%", height: "33%", alignItems: 'center' },
    icon_outer_view: { justifyContent: 'center', alignItems: "center", height: '100%', width: '50%', marginTop: 8 },
    first_view: { justifyContent: "center", alignItems: "center", height: '70%', width: '65%', borderWidth: 1, borderColor: "#EC9705", borderRadius: 10 },
    dailer_img: { width: 42, height: 39 },
    dailer_txt: { color: "#CCCCCC", fontSize: 17, opacity: 1, marginTop: 1 },
    txt_style: { color: "#CCCCCC", fontSize: 22, },
    txt_view: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
    last_view: { justifyContent: "center", alignItems: "center", height: 40, width: '90%', borderWidth: 1, borderColor: "#EC9705", borderRadius: 50 },
    last_txt: { fontSize: 14, color: "#CCCCCC" }
});
