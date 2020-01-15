import React, { Component } from 'react';
import { Text, View, Image,TouchableWithoutFeedback, StyleSheet } from 'react-native';

import Video from 'react-native-video';
export default class Finance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videocontrol: true,
            document:'You can download company registration document by clicking on the pdf file',
        }
    }

    render() {
        return (

            <View style={styles.main_view}>
                <View style={styles.v2}>
                    <Text style={styles.text0}>Company Detail </Text>
                    <View style={styles.video}>

                        <Video source={this.props.video}   // Can be a URL or a local file.
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
                    <View style={styles.v4}>
                        <View style={styles.v5}>
                            <Image source={require('../../images/Profile/lastrevenue.png')} style={styles.img} resizeMode="stretch" />
                        </View>
                        <View style={styles.v6}>
                            <Text style={styles.text}>Last Year Revenue</Text>
                            <Text style={styles.text2}>£{this.props.last_y_rev}</Text>
                        </View>
                    </View>
                    <View style={styles.v4}>
                        <View style={styles.v5}>
                            <Image source={require('../../images/Profile/expectedrevenue.png')} style={styles.img} resizeMode="stretch" />
                        </View>
                        <View style={styles.v6}>
                            <Text style={styles.text}>Expected Revenue</Text>
                            <Text style={styles.text2}>£{this.props.next_y_rev}</Text>
                        </View>
                    </View>
                    <View style={styles.v4}>
                        <View style={styles.v5}>
                            <Image source={require('../../images/Profile/equity.png')} style={styles.img} resizeMode="stretch" />
                        </View>
                        <View style={styles.v6}>
                            <Text style={styles.text}>Percentage Equity</Text>
                            <Text style={styles.text2}>{this.props.percentage_equity}%</Text>
                        </View>
                    </View>
                    <Text style={styles.text0}>Company Description </Text>
                    <Text style={styles.text4}>{this.props.company_desc}</Text>
                    <Text style={styles.text0}>Company Registration Document </Text>
                  
                   <View style={{flexDirection:'row',width:'90%',alignSelf:'flex-start',alignItems:'center'}}>
                    <Text style={styles.text4}>{this.state.document} </Text>
                    <Image source={require('../../images/Investor/pdf3.png')} style={styles.img2} resizeMode="stretch" />
                    </View>
                </View >
            </View>

        );
    }
}


const styles = StyleSheet.create({
    main_view: { flex: 1, alignItems: 'center', backgroundColor: '#110717' },
    v2: { width: '95%', backgroundColor: '#1F1724', alignItems: 'center', borderRadius: 5, marginTop: 10, marginBottom: 10 },
    backgroundVideo: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 },
  //  v3: { width: '90%', height: 200 },
    v4: { width: '100%', flexDirection: 'row', height: 40, },
    v5: { height: 30, width: '20%', alignItems: 'center', justifyContent: 'center' },
    v6: { height: 30, paddingRight: 5, width: '80%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' },
   // v7: { height: 90, width: '100%', backgroundColor: '#1F1724', marginTop: 10, flexDirection: 'row' },
    img: { width: 20, height: 20 },
    img2: { width: 25, height: 25 },
    text0: { color: 'white', fontSize: 18,marginLeft:10, marginTop: 5, marginBottom: 5,alignSelf:'flex-start' },
    text: { color: '#878787', fontSize: 16 },
    text2: { color: 'white', fontSize: 16 },
   // text3: { color: 'white', fontSize: 14 },
    text4: { color: '#878787', fontSize: 14,marginLeft:10, marginTop: 5, marginBottom: 5,alignSelf:'flex-start'  },
   // btnimage: { height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' },
    video: { width: '90%', height: 200, backgroundColor: '#1F1724', borderRadius: 10, justifyContent: "center", marginBottom: 25 },
    backgroundVideo: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, borderRadius: 10 },


});
