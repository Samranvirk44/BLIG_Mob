import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableWithoutFeedback, ImageBackground, StyleSheet } from 'react-native';
import Video from 'react-native-video';
export default class FinanceInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videocontrol: true,
        }
    }
   
   
    render() {
        return (
            <View style={styles.main_view}>
                <View style={styles.v2}>
                    <View style={styles.v3}>
                        <Image source={require('../../images/Profile/income.png')} style={styles.img} resizeMode="stretch" />
                    </View>
                    <View style={styles.v4}>
                        <Text allowFontScaling={false} style={styles.text}>Income</Text>
                        <Text allowFontScaling={false} style={styles.text2}>£90000</Text>
                    </View>

                </View>
                <View style={styles.v2}>
                    <View style={styles.v3}>
                        <Image source={require('../../images/Profile/expenditure.png')} style={styles.img} resizeMode="stretch" />
                    </View>
                    <View style={styles.v4}>
                        <Text allowFontScaling={false} style={styles.text}>Expenditure</Text>
                        <Text allowFontScaling={false} style={styles.text2}>${this.props.data.expenditures}</Text>
                    </View>

                </View>
                <View style={styles.v2}>
                    <View style={styles.v3}>
                        <Image source={require('../../images/Profile/profit.png')} style={styles.img} resizeMode="stretch" />
                    </View>
                    <View style={styles.v4}>
                        <Text allowFontScaling={false} style={styles.text}>Profit</Text>
                        <Text allowFontScaling={false} style={styles.text2}>${this.props.data.profit}</Text>
                    </View>

                </View>
                <Text style={{ color: 'white', alignSelf: 'flex-start', marginLeft: 20, marginBottom: 10 }}>Company Details</Text>

                <View style={styles.video}>

                    <Video source={{uri:this.props.data.videoName}}   // Can be a URL or a local file.
                        resizeMode="stretch"
                        ref={(ref) => {
                            this.player = ref
                        }}
                        bufferConfig={{
                            minBufferMs: 150,
                            maxBufferMs: 500,
                            bufferForPlaybackMs: 2500,
                            bufferForPlaybackAfterRebufferMs: 5000
                        }}
                        onEnd={() => this.setState({ videocontrol: !this.state.videocontrol })}
                        paused={this.state.videocontrol}
                        controls={false}                                  // Store reference
                        //onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        //  onError={this.videoError}               // Callback when video cannot be loaded
                        style={styles.backgroundVideo} >
                    </Video>
                    <TouchableWithoutFeedback onPress={() => this.setState({ videocontrol: !this.state.videocontrol })}>
                        <View style={{ opacity: 1, alignItems: 'center', width: '100%', backgroundColor: 'transparent', }}>
                            {
                                this.state.videocontrol ?
                                    <Image source={require('../../images/Investor/play.png')} style={{ width: 50, height: 50 }} />
                                    :
                                    <View style={{ width: '50%', height: 50 }}>
                                    </View>
                            }
                        </View>

                    </TouchableWithoutFeedback>

                </View>
                <View style={styles.v22}>
                    <View style={styles.v33}>
                        <Image source={require('../../images/Profile/lastrevenue.png')} style={styles.img2} resizeMode="stretch" />
                    </View>
                    <View style={styles.v43}>
                        <Text allowFontScaling={false} style={styles.textss}>Last year revenue</Text>
                        <Text allowFontScaling={false} style={styles.text2ss}>{this.props.data.LYrevenue}</Text>
                    </View>

                </View>
                <View style={styles.v22}>
                    <View style={styles.v33}>
                        <Image source={require('../../images/Profile/expectedrevenue.png')} style={styles.img2} resizeMode="stretch" />
                    </View>
                    <View style={styles.v43}>
                        <Text allowFontScaling={false} style={styles.textss}>Expected revenue</Text>
                        <Text allowFontScaling={false} style={styles.text2ss}>{this.props.data.Erevenue}</Text>
                    </View>

                </View>
                <View style={styles.v22}>
                    <View style={styles.v33}>
                        <Image source={require('../../images/Profile/equity.png')} style={styles.img2} resizeMode="stretch" />
                    </View>
                    <View style={styles.v43}>
                        <Text allowFontScaling={false} style={styles.textss}>Percentage equity</Text>
                        <Text allowFontScaling={false} style={styles.text2ss}>{this.props.data.equity}</Text>
                    </View>

                </View>
                <View style={styles.v22}>
                    <View style={styles.v33}>
                        <Image source={require('../../images/Profile/income.png')} style={styles.img2} resizeMode="stretch" />
                    </View>
                    <View style={styles.v43}>
                        <Text allowFontScaling={false} style={styles.textss}>Investment Required</Text>
                        <Text allowFontScaling={false} style={styles.text2ss}>{this.props.data.Investment}</Text>
                    </View>

                </View>

            </View >

        );
    }
}


const styles = StyleSheet.create({
    main_view: { flex: 1, alignItems: 'center', backgroundColor: '#110717' },
    v22: { marginTop: 0, width: '90%', borderRadius: 5, marginBottom: 10, flexDirection: 'row' },
    v33: { height: 30, width: '15%', alignItems: 'center', justifyContent: 'center' },
    v43: { height: 30, padding: 10, width: '87%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' },
    img2: { width: 20, height: 20 },
    textss: { color: 'white', fontSize: 16 },
    text2ss: { color: 'white', fontSize: 18 },

    v2: { height: 80, width: '95%', backgroundColor: '#1F1724', borderRadius: 5, marginBottom: 10, flexDirection: 'row' },
    v3: { height: 90, width: '30%', alignItems: 'center', justifyContent: 'center' },
    v4: { height: 90, padding: 10, width: '70%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' },
    img: { width: 45, height: 45 },
    text: { color: 'white', fontSize: 17 },
    text2: { color: 'white', fontSize: 19 },
    video: { width: '90%', height: 200, backgroundColor: '#1F1724', borderRadius: 10, justifyContent: "center", marginBottom: 25 },
    backgroundVideo: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, borderRadius: 10 },


});