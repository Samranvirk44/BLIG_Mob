import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, ImageBackground, StatusBar, Image, TouchableWithoutFeedback } from 'react-native';
import { Rating } from 'react-native-elements';
import backgoundImage from '../images/mask.png'
import ratebutton from '../images/rate.png'
import ratingBackground from '../images/rating.png'
import Toast, { DURATION } from 'react-native-easy-toast'
import Uri from '../DeviceIp'
// create a component
class MyClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ratingCompleted: '',
            rating: [1, 1, 1, 1, 1],//time, professionalism, leadership, success rate communication skills
            totalScore: 1,
            url: Uri,//'http://192.168.100.4:80',//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com',
            loading: false
        }
    }
    ratingResult = (ratingValue, index) => {
        let rating1 = this.state.rating;
        rating1[index] = ratingValue;
        this.setState({ rating: rating1 })
        console.log('rating:', this.state.rating)
        var total = ((this.state.rating[0] + this.state.rating[1] + this.state.rating[2] + this.state.rating[3] + this.state.rating[4]) / 5)
        // console.log('sum1:',total)
        this.setState({
            totalScore: total
        })
        //console.log('sum:',this.state.totalScore)
    }
    Submit = async () => {
        this.setState({ loading: true })
        await this.SubmitRating()
        await this.UpdateStatus()
        this.setState({ loading: false })

    }
    SubmitRating = async () => {
        this.setState({ loading: true })
        let data = {
            C_Id: this.props.C_Id,
            milestone_id: this.props.M_Id,
            values: this.state.rating
        }
        await fetch(this.state.url + '/Investor/Rate_MileStone', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Company List", resjson.Message);
                if (resjson.Successful) {

                    this.setState({ loading: false })
                    Actions.pop()
                    this.refs.toast.show(resjson.Message, DURATION.LENGTH_LONG);
                }
            }).catch(err => {
                console.log(err)
                this.setState({ loading: false })
                this.refs.toast.show('Failed', DURATION.LENGTH_LONG);
            })

    }
    UpdateStatus = async () => {
        this.setState({ loading: true })
        let data = {
            M_Id: this.props.M_Id,
            Status: 'Completed'
        }
        await fetch(this.state.url + '/Contract/Milestone_Completed', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Company List", resjson.Message);
                if (resjson.Successful) {
                    this.setState({ loading: false })
                    Actions.pop()
                    this.refs.toast.show('Successfully Updated thanks', DURATION.LENGTH_LONG);
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
            })
    }

    render() {
        return (
            <View style={styles.container}>

                <StatusBar backgroundColor="#110717" barStyle="light-content" />
                <ImageBackground resizeMode="stretch" source={backgoundImage} style={styles.bgi1}>
                    <Image source={ratingBackground} resizeMode="stretch" style={styles.bgi2}></Image>
                    <Text style={styles.text1}>Feedback to Entrepreneur</Text>
                    <View style={styles.v11}>
                        <Rating
                            type='custom'
                            //ratingImage={WATER_IMAGE}
                            ratingImage={require('../images/Investor/star.png')}
                            ratingColor='#EC9705'
                            ratingBackgroundColor='#707070'
                            ratingCount={5}
                            style={styles.ratings}
                            imageSize={25}
                            startingValue={this.state.rating[0]}
                            //   readonly={true}
                            onFinishRating={(v) => this.ratingResult(v, 0)}
                        //  style={{ paddingVertical: 50 }}
                        />
                        <Text allowFontScaling={false} style={styles.textTime}>Time</Text>
                    </View>
                    <View style={styles.v11}>
                        <Rating
                            type='custom'
                            //ratingImage={WATER_IMAGE}
                            ratingImage={require('../images/Investor/star.png')}
                            ratingColor='#EC9705'
                            ratingBackgroundColor='#707070'
                            ratingCount={5}
                            style={styles.ratings}
                            imageSize={25}
                            startingValue={this.state.rating[1]}
                            // readonly={true} 
                            onFinishRating={(v) => this.ratingResult(v, 1)}

                        //  style={{ paddingVertical: 50 }}
                        />
                        <Text allowFontScaling={false} style={styles.textTime}>Professionalism</Text>
                    </View>
                    <View style={styles.v11}>
                        <Rating
                            type='custom'
                            //ratingImage={WATER_IMAGE}
                            ratingImage={require('../images/Investor/star.png')}
                            ratingColor='#EC9705'
                            ratingBackgroundColor='#707070'
                            ratingCount={5}
                            style={styles.ratings}
                            imageSize={25}
                            startingValue={this.state.rating[2]}
                            // readonly={true}
                            onFinishRating={(v) => this.ratingResult(v, 2)}
                        //  style={{ paddingVertical: 50 }}
                        />
                        <Text allowFontScaling={false} style={styles.textTime}>Leadership</Text>
                    </View>
                    <View style={styles.v11}>
                        <Rating
                            type='custom'
                            //ratingImage={WATER_IMAGE}
                            ratingImage={require('../images/Investor/star.png')}
                            ratingColor='#EC9705'
                            ratingBackgroundColor='#707070'
                            ratingCount={5}
                            style={styles.ratings}
                            imageSize={25}
                            startingValue={this.state.rating[3]}
                            // readonly={true}
                            onFinishRating={(v) => this.ratingResult(v, 3)}
                        //  style={{ paddingVertical: 50 }}
                        />
                        <Text allowFontScaling={false} style={styles.textTime}>Success Rate Per Stage</Text>
                    </View>
                    <View style={styles.v11}>
                        <Rating
                            type='custom'
                            //ratingImage={WATER_IMAGE}
                            ratingImage={require('../images/Investor/star.png')}
                            ratingColor='#EC9705'
                            ratingBackgroundColor='#707070'
                            ratingCount={5}  //no of stars
                            style={styles.ratings}
                            imageSize={25}
                            startingValue={this.state.rating[4]}
                            //readonly={true}
                            onFinishRating={(v) => this.ratingResult(v, 4)}
                        //  style={{ paddingVertical: 50 }}
                        />
                        <Text allowFontScaling={false} style={styles.textTime}>Communication Skills</Text>
                    </View>
                    <Text style={styles.text2}>Total Score :<Text style={{ fontSize: 20 }}> {this.state.totalScore}</Text></Text>
                    <TouchableWithoutFeedback onPress={() => this.Submit()} >
                        <Image source={ratebutton} resizeMode="stretch" style={styles.button}></Image>
                    </TouchableWithoutFeedback>
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
                    {
                        this.state.loading ?
                            <View style={{ position: 'absolute', backgroundColor: "rgba(0,0,0,0.4)", width: Dimensions.get('window').width, height: Dimensions.get('window').height, }}>
                                <ActivityIndicator size="large" color="#EC9705" style={{ position: 'absolute', top: (Dimensions.get('window').height / 2) - 40, left: (Dimensions.get('window').width / 2) - 20 }} />

                            </View>
                            : null
                    }

                </ImageBackground>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#110717',
    },
    v11: { width: '100%', height: 40, flexDirection: "row", alignItems: "center" },
    bgi1: { width: '100%', height: '100%' },
    bgi2: { width: '70%', height: 200, alignSelf: 'center', marginTop: 40 },
    text1: { color: 'white', fontSize: 20, alignSelf: 'center', marginTop: 30, marginBottom: 10 },
    text2: { color: 'white', fontSize: 15, marginLeft: 30 },
    textTime: { fontSize: 14, color: '#CCCCCC' },
    button: { width: '55%', alignSelf: 'center', marginTop: 23, height: 45 },
    ratings: { backgroundColor: '#110717', marginLeft: 0, marginRight: 0, padding: 10, width: '50%' },
});

//make this component available to the app
export default MyClass;