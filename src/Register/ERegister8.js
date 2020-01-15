/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, Image, ScrollView, StyleSheet, Dimensions, TouchableWithoutFeedback, StatusBar, Text, View } from 'react-native';
import styles from '../Styles/Styles';
import DocumentPicker from 'react-native-document-picker';
import Toast, { DURATION } from 'react-native-easy-toast';
//import readXlsxFile from 'read-excel-file'
import { writeFile, readFile } from 'react-native-fs';
import XLSX from 'xlsx';
//var d3 = require("d3");

import {
    BarChart,
    PieChart,
} from 'react-native-chart-kit'
const data = {
    labels: ['2011', '2012', '2013'],
    datasets: [{
        data: [25, 45, 28],

    }]
}
const data2 = [
    { name: 'Profit', population: 2, color: '#FF557A', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Loss', population: 2, color: '#0C99BA', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Expenditure', population: 5, color: '#EC9705', legendFontColor: '#7F7F7F', legendFontSize: 12 },
]
export default class ERegister8 extends Component {
    constructor(props) {
        super(props),
            this.state = {
                fileuri: '',
                fileuri2: '',
                noyears: '',
                avatarsource: null,
                progressfile1: 0,
                progressfile2: 0
            }
    }
    componentDidMount = async () => {

        this.setState({ fileuri: this.props.objF[0], fileuri2: this.props.objF[1] })
    }

    pickfile = async (index) => {
        // Pick a single file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],

            });
            console.log("response=>", res)
            if (res.name.slice(res.name.length - 4, res.name.length) == 'xlsx') {
                console.log("if running")
                readFile(res.uri, 'ascii').then((res) => {
                    const workbook = XLSX.read(res, { type: 'binary' });
                    console.log("workbook=>", workbook.SheetNames)
                    //               console.log("workbook=>",workbook.Sheets)
                    // console.log("workbook=>",workbook.)

                    var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    var data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
                    console.log(data)


                    /* DO SOMETHING WITH workbook HERE */
                });

                // d3.csv(require('http://mywebsite.com/mycsvfile.csv'),function (data) {
                //     return data;
                //     //console.log(data)
                // },function(error,rows){
                //     console.log("rows",rows)
                //     console.log("error",error)
                // }
                // )
                // .catch(err=>console.log("error",err))
                const source = { uri: res.uri };
                if (index == 1) {
                    this.setState({ progressfile1: 0 })
                    var f1 = setInterval(() => {
                        // console.log(this.state.progressaddress)
                         let temp = this.state.progressfile1
                         temp += 10
                         this.setState({ progressfile1: temp })
                         if (temp >= 100) {
                             clearInterval(f1)
                         }
                     }, 200);
                    this.setState({
                        fileuri: res.name,
                        // noyears:res.name,
                        // avatarsource: source
                    })
                } else {
                    this.setState({ progressfile2: 0 })
                    var f2 = setInterval(() => {
                        // console.log(this.state.progressaddress)
                         let temp = this.state.progressfile2
                         temp += 10
                         this.setState({ progressfile2: temp })
                         if (temp >= 100) {
                             clearInterval(f2)
                         }
                     }, 200);
                    this.setState({
                        // fileuri: res.name, 
                        fileuri2: res.name,
                        //    avatarsource: source
                    })
                }
            } else {
                this.refs.toast.show('Select Only Excel File!', DURATION.LENGTH_LONG);
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    gotoReg6 = () => {
        this.props.Screenno(7)
    }
    gotoReg8 = () => {

        if (this.state.fileuri == 'Choose .xlsx File' | this.state.fileuri2 == 'Choose .xlsx File') {
            //alert('in')
            this.refs.toast.show('Please Attach Files', DURATION.LENGTH_LONG);
        }
        else {
            // alert('else')
            this.props.senddata(7, this.state)
            this.props.Screenno(9)
        }
    }
    render() {
        console.disableYellowBox = ['Warning: Each', 'Warning: Failed']
        return (
            <View style={styles.container}>
                <StatusBar hidden={false} backgroundColor="black" />
                <ImageBackground resizeMode="stretch" source={require('../images/breg7.png')} style={styles.imagebackground}>

                    <Image source={this.props.LoanFinancing > 0 ? require('../images/reg8.png') : require('../images/reg9.png')} style={styles.image} />
                    <View style={styles.mainview}>
                        <ScrollView style={{ width: '100%' }}>

                            <Text allowFontScaling={false} style={styles.text4ER8}>Expected Forecast / Plan</Text>
                            <View style={styles.v1ER8}>
                                <View style={styles.v1styleER8}>
                                    <Text allowFontScaling={false} numberOfLines={1} onPress={() => this.pickfile(1)} style={styles.text2ER8}>{this.state.fileuri}</Text>
                                </View>
                                <TouchableWithoutFeedback onPress={() => this.pickfile(1)}>
                                    <ImageBackground resizeMode="stretch" source={require('../images/browser.png')} style={styles.imagebackground2}>
                                        <Text allowFontScaling={false} onPress={() => this.pickfile(1)} style={styles.text3ER8}>Browse</Text>
                                    </ImageBackground>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={{ alignSelf: 'center', width: '60%', overflow: 'hidden', marginTop: 5, height: 5, backgroundColor: 'black', borderRadius: 5 }}>
                                <View style={{ width: this.state.progressfile1 + '%', height: 5, backgroundColor: 'white' }}>
                                </View>
                            </View>
                            <Text allowFontScaling={false} style={styles.text4ER8}>Previous Cash Flow </Text>
                            <View style={styles.v1ER8}>
                                <View style={styles.v1styleER8}>
                                    <Text allowFontScaling={false} numberOfLines={1} onPress={() => this.pickfile(2)} style={styles.text2ER8}>{this.state.fileuri2}</Text>
                                </View>
                                <TouchableWithoutFeedback onPress={() => this.pickfile(2)}>
                                    <ImageBackground resizeMode="stretch" source={require('../images/browser.png')} style={styles.imagebackground2}>
                                        <Text allowFontScaling={false} onPress={() => this.pickfile(2)} style={styles.text3ER8}>Browse</Text>
                                    </ImageBackground>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={{ alignSelf: 'center', width: '60%', overflow: 'hidden', marginTop: 5, height: 5, backgroundColor: 'black', borderRadius: 5 }}>
                                <View style={{ width: this.state.progressfile2 + '%', height: 5, backgroundColor: 'white' }}>
                                </View>
                            </View>
                            <PieChart
                                style={{ marginTop: 30, alignSelf: 'center' }}
                                data={data2}
                                width={Dimensions.get('window').width - 50}
                                height={100}
                                chartConfig={{
                                    //  backgroundColor: 'black',
                                    backgroundGradientFrom: 'black',
                                    backgroundGradientTo: '#EC9705',
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    }
                                }}
                                accessor="population"
                                backgroundColor="transparent"
                                paddingLeft="15"
                                absolute
                            />
                            <BarChart
                                style={{
                                    marginTop: 20,
                                    borderRadius: 16,
                                    alignSelf: 'center'
                                }}
                                data={data}
                                width={Dimensions.get('window').width - 50}
                                height={170}
                                svg={{ fill: 'green' }}
                                yAxisLabel={'*'}
                                chartConfig={{
                                    //  backgroundColor: 'black',
                                    backgroundGradientFrom: 'black',
                                    backgroundGradientTo: 'black',
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16,
                                    }
                                }}

                                fromZero
                            />
                        </ScrollView>
                    </View>

                    <View style={styles.v4ER8}>
                        <TouchableWithoutFeedback onPress={this.gotoReg6}>
                            <Image source={require('../images/left.png')} style={styles.imgsize} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.gotoReg8}>
                            <Image source={require('../images/right.png')} style={styles.imgsize} />
                        </TouchableWithoutFeedback>
                    </View>
                    <Toast
                        ref="toast"
                        style={{ backgroundColor: 'black' }}
                        position='bottom'
                        //  positionValue={60}
                        // fadeInDuration={7}
                        // fadeOutDuration={1000}
                        opacity={1}
                        textStyle={{ color: 'white' }}
                    />

                </ImageBackground>
            </View>
        );
    }
}

