import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableWithoutFeedback, ImageBackground, StyleSheet } from 'react-native';

import Video from 'react-native-video';
export default class Finance extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
         
                <View style={styles.main_view}>
                    <View style={styles.v2}>
                        <Text allowFontScaling={false} style={styles.text0}>Company Detail </Text>
                        <View style={styles.v3}>
                            <Video source={require('../../../../../images/video/v.mp4')}   // Can be a URL or a local file.
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
                                
                                paused={true}
                                controls={true}                                  // Store reference
                                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                onError={this.videoError}               // Callback when video cannot be loaded
                                style={styles.backgroundVideo} />
                        </View>

                        <View style={styles.v4}>
                            <View style={styles.v5}>
                                <Image source={require('../../../../../images/Profile/lastrevenue.png')} style={styles.img} resizeMode="stretch" />
                            </View>
                            <View style={styles.v6}>
                                <Text allowFontScaling={false} style={styles.text}>Last Year Revenue</Text>
                                <Text allowFontScaling={false} style={styles.text2}>$90000</Text>
                            </View>
                        </View>
                        <View style={styles.v4}>
                            <View style={styles.v5}>
                                <Image source={require('../../../../../images/Profile/expectedrevenue.png')} style={styles.img} resizeMode="stretch" />
                            </View>
                            <View style={styles.v6}>
                                <Text allowFontScaling={false} style={styles.text}>Expected Revenue</Text>
                                <Text allowFontScaling={false} style={styles.text2}>$90000</Text>
                            </View>
                        </View>
                        <View style={styles.v4}>
                            <View style={styles.v5}>
                                <Image source={require('../../../../../images/Profile/equity.png')} style={styles.img} resizeMode="stretch" />
                            </View>
                            <View style={styles.v6}>
                                <Text allowFontScaling={false} style={styles.text}>Percentage Equity</Text>
                                <Text allowFontScaling={false} style={styles.text2}>Per Stage 7%</Text>
                            </View>
                        </View>
                       
                    </View >
                </View>
           
        );
    }
}


const styles = StyleSheet.create({
    main_view: { flex: 1, alignItems: 'center', backgroundColor: '#110717' },
    v2: { width: '95%', backgroundColor: '#1F1724', alignItems: 'center', borderRadius: 5, marginTop: 10,marginBottom:10 },
    backgroundVideo: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 },
    v3: { width: '90%', height: 200 },
    v4: { width: '100%', flexDirection: 'row', height: 40, },
    v5: { height: 30, width: '20%', alignItems: 'center', justifyContent: 'center' },
    v6: { height: 30, padding: 10, width: '80%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' },
    v7: { height: 90, width: '100%', backgroundColor: '#1F1724', marginTop: 10, flexDirection: 'row' },
    img: { width: 20, height: 20 },
    text0: { color: 'white', fontSize: 18, marginTop: 5, marginBottom: 5 },
    text: { color: '#878787', fontSize: 16 },
    text2: { color: 'white', fontSize: 16 },
    text3: { color: 'white', fontSize: 14 },
    btnimage: { height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }

});
