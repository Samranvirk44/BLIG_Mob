import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, ActivityIndicator, View, Image, ImageBackground, TouchableWithoutFeedback, } from 'react-native';
import { Icon, Input, Button, Container, Content, Header, Body, Title, DatePicker } from 'native-base'
import ImagePicker from 'react-native-image-picker';
import lion from '../images/lion.png';
import Cub from '../images/pawprint.png';
import Roar from '../images/lion1.png';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast';
import { test } from '../Converter';
import Uri from '../DeviceIp'
const options = {
    title: 'Select Avatar',
    mediaType: 'photo',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
const createFormData = (photo, body) => {
    const data = new FormData();

    data.append("photo", {
        name: photo.fileName,
        type: photo.type,
        uri:
            Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });

    return data;
};
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Type: 'Investor',
            userdata: [{
                Response_time: '',
                country_id: '',
                created_at: '',
                dob: '',
                email: '',
                first_name: '',
                language: '',
                profile_pic: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
            }],
            Categories: [],
            TotalInvestment: 0,
            Kind: ['CUB', 'LION', 'ROAR'],
            Services: ['Promotion', 'Radio Promotion', 'Television Transmission', 'Digital Promotion'
                , 'Brand Development', 'Acount Manager', 'Business Consultance'],
            ETypes: [],
            EServices: [],
            Kindicons: [Cub, lion, Roar],
            KIcon: Cub,
            BusinessKind: '',
            OnGoingContracts: 0,
            PaidContracts: 0,
            edit: false,
            photo: null,
            ////
            MacAddress: '',
            email: '',
            entrepreneur_id: '',
            user_id: '',
            investor_id: '',
            loading: false,
            iconnames: {
                lock: {
                    name: 'pencil-lock-outline',
                    type: 'MaterialCommunityIcons'
                },
                unlock: {
                    name: "edit-3",
                    type: "Feather"
                }
            },
            iconname: 'pencil-lock-outline',
            icontype: 'MaterialCommunityIcons',
            url:Uri//'http://192.168.100.4:80',// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'
        }
    }
    Edit = () => {
        if (this.state.edit == true) {
            this.updateProfile();
        }
        this.setState({
            edit: this.state.edit == false ? true : false,
            iconname: this.state.iconname == 'pencil-lock-outline' ? this.state.iconnames.unlock.name : this.state.iconnames.lock.name,
            icontype: this.state.icontype == 'MaterialCommunityIcons' ? this.state.iconnames.unlock.type : this.state.iconnames.lock.type
        })
    }
    EditEmail = (value) => {
        let temp = this.state.userdata;
        temp[0].email = value
        this.setState({
            userdata: temp
        })
    }
    handleUploadPhoto = async () => {
        console.log("uplod is calling")
        await fetch(this.state.url + '/Image/UploadImages', {
            method: "POST",
            body: createFormData(this.state.photo, { userId: 123 })
        })
            .then(response => response.json())
            .then(response => {
                console.log("Upload succes", response);
                let temp = this.state.userdata
                temp[0].profile_pic = this.state.photo.uri

                if (response.Successful) {
                    this.setState({ photo: null, userdata: temp });
                }
                else {
                    alert("Upload Failed")
                }
            })
            .catch(error => {
                console.log("upload error", error);
                alert("Upload failed!");
            });
    };
    componentDidMount = () => {
        DeviceInfo.getMacAddress().then(mac => {
            this.setState({ MacAddress: mac, loading: true });
            this.get_id(mac)

        });
    }
    InvestorTypes = async (v) => {

        let data = {
            I_id: v,
        }
        await fetch(this.state.url + '/Investor/Investor_Types', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Investor Types", resjson.Message, resjson.data)
                if (resjson.Successful) {
                    this.setState({ Categories: resjson.data })
                }
            })

    }
    Entrepreneur_Contracts = async (id, v) => {
        let data = {
            E_Id: id,
            Status: v
        }
        await fetch(this.state.url + '/Entrepreneur/Entrepreneur_Contracts', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("OnGoing Contracts", resjson.Message)
                if (resjson.Successful) {
                    if (v == 'Going') {
                        console.log(resjson.data)
                        this.setState({ OnGoingContracts: resjson.data })
                    } else if (v == 'Paid') {
                        this.setState({ PaidContracts: resjson.data })

                    }
                }
            })

    }
    Entrepreneur_TypeServices = async (v) => {
        //  console.log('entrepreneur calling')
        let data = {
            E_Id: v,
        }
        await fetch(this.state.url + '/Entrepreneur/Entrepreneur_Company_Types', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                   console.log("Entrepreneur business kind===============>", resjson.business_kind)
                if (resjson.Successful) {
                    this.setState({ ETypes: resjson.business_kind, EServices: resjson.business_types })

                }

            }).catch(err => alert(err))
    }
    Entrepreneur_TotalInvestment = async (v) => {
        let data = {
            E_Id: v,
        }
        await fetch(this.state.url + '/Entrepreneur/Entrepreneur_TotalInvestment', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("OnGoing Contracts", resjson.Message)
                if (resjson.Successful) {
                    if (resjson.data[0].total != null) {
                        this.setState({ TotalInvestment: resjson.data[0].total })
                    }
                    else {
                        console.log("Total investment is  null");
                    }
                }
            })

    }
    Investor_Contracts = async (id, v) => {
        let data = {
            I_id: id,
            Status: v
        }
        await fetch(this.state.url + '/Investor/Investor_Contracts', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("OnGoing Contracts", resjson.Message)
                if (resjson.Successful) {
                    if (v == 'Going') {
                        this.setState({ OnGoingContracts: resjson.data })
                    } else if (v == 'Paid') {
                        this.setState({ PaidContracts: resjson.data })

                    }
                }
            })

    }
    GetTotalInvestment = async (v) => {
        let data = {
            I_id: v
        }

        await fetch(this.state.url + '/Profile/Investor_TotalInvestment', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                // console.log("Total Investment", resjson.Message, ) //TotalInvestment: resjson.data[0].Investment,
                if (resjson.Successful) {
                    this.setState({ loading: false, BusinessKind: this.state.Kind[resjson.data[0].Kind - 1], KIcon: this.state.Kindicons[resjson.data[0].Kind - 1] })
                }
            })
            .catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })

    }
    InvestorTotalInvestment = async (v) => {
        let data = {
            I_Id: v
        }
        console.log("Total Investment calling ....", v)

        await fetch(this.state.url + '/Investor/Investor_Investment', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Total Investment", resjson)
                if (resjson.Successful) {
                    this.setState({ loading: false, TotalInvestment: resjson.total_investment[0].total_investment, })
                }
            })
            .catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })

    }
    GetUserProfile = async (v) => {
        let data = {
            u_id: v
        }

        await fetch(this.state.url + '/Profile/Users_Profile', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Profile data", resjson.Message, resjson)
                if (resjson.Successful) {
                    this.setState({ userdata: resjson.data, loading: false })
                }
            }).catch(err => {
                console.log("error", err)
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })

    }
    updateProfile = async () => {
        let userid = 8;
        let data = {
            profile_pic: this.state.userdata[0].profile_pic,
            Email: this.state.userdata[0].email,
            id: userid
        }
        await fetch(this.state.url + '/Profile/Profile', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("companies data", resjson.Message)
            })

    }
    EditprofilePic = () => {
        if (this.state.edit == true) {
            ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    console.log('image picked')
                    const sourcee = { uri: response.uri };
                    let size = response.fileSize / 1048576;
                    if (size <= 1) {
                        this.setState({
                            photo: response
                        })
                        this.handleUploadPhoto();
                    }
                    else {
                        alert("Filesize greater than 1mb")
                    }

                }
            });

        }
        else {
            console.log('false')
        }
    }


    get_id = async (mac) => {
        let MacAddress = mac;
        let data = {
            MacAddress: MacAddress
        }
        await fetch(this.state.url + '/Session/Get_Current_Id', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                if (resjson.Successful) {
                    this.GetUserProfile(resjson.data.user_id);//userid
                    if (resjson.data.Type == 'Investor') {
                        console.log('Investor::::')
                        this.GetTotalInvestment(resjson.data.investor_id);//investor _Id
                        this.Investor_Contracts(resjson.data.investor_id, 'Going');
                        this.Investor_Contracts(resjson.data.investor_id, 'Paid');
                        this.InvestorTypes(resjson.data.investor_id);
                        this.InvestorTotalInvestment(resjson.data.investor_id)
                    } else if (resjson.data.Type == 'Entrepreneur') {
                        console.log('Entrepreneur::::')
                        this.Entrepreneur_TotalInvestment(resjson.data.entrepreneur_id);
                        this.Entrepreneur_Contracts(resjson.data.entrepreneur_id, 'Paid');
                        this.Entrepreneur_Contracts(resjson.data.entrepreneur_id, 'Going');
                        this.Entrepreneur_TypeServices(resjson.data.entrepreneur_id)
                    }
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

            })

    }



    render() {
        return (
            <Container style={styles.Containerstyle}>
                <Header iosBarStyle="light-content" hasTabs androidStatusBarColor="#110717" style={styles.header}>

                    <View style={styles.h2}>
                        <Icon onPress={() => this.props.Screen(3)} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                    </View>
                    <Body >
                        <Title allowFontScaling={false} style={[styles.sendername]}>Profile</Title>
                    </Body>
                    <Button transparent onPress={() => this.Edit()} >
                        <Icon name={this.state.iconname} type={this.state.icontype} />
                    </Button>
                </Header>

                <Content>

                    <View style={styles.v2}>
                        <View style={styles.v22}>
                            <TouchableWithoutFeedback onPress={() => this.EditprofilePic()}>
                                <Image source={{ uri: this.state.userdata[0].profile_pic }} style={styles.imagestyle}></Image>
                            </TouchableWithoutFeedback>
                            <View style={styles.v3}>
                                <View style={styles.headerbodyView}></View></View>
                        </View>
                        <View style={styles.v4}>
                            <Text allowFontScaling={false} style={styles.text1}>{this.state.userdata[0].first_name}</Text>
                            <View style={{ flexDirection: 'row', width: '80%',justifyContent:'center' }}>

                                {
                                    this.state.Categories.map((data, index) => (
                                        <Text key={index} allowFontScaling={false} style={styles.text22}>{data}, </Text>
                                    ))
                                }
                            </View>
                            <View style={{ flexDirection: 'row', width: '80%',justifyContent:'center' }}>

                                {
                                    this.state.EServices.map((data, index) => (
                                        index <= 2 ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text key={index} allowFontScaling={false} style={styles.text22}>{this.state.Services[data.business_type]}, </Text>
                                            </View>
                                            :
                                            <View>
                                                </View>
                                    ))
                                }

                            </View>
                            <View style={{ flexDirection: 'row', width: '80%',alignItems:'center',justifyContent:'center' }}>

                                {
                                    this.state.EServices.map((data, index) => (
                                        index > 2 ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text key={index} allowFontScaling={false} style={styles.text22}>{this.state.Services[data.business_type]}, </Text>
                                            </View>
                                            :
                                            <View>
                                                </View>
                                    ))
                                }

                            </View>
                            <View style={styles.v5}>
                                {
                                    this.state.ETypes.length == 0 ?
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image source={this.state.KIcon} style={styles.imagestyle3}></Image>
                                            <Text allowFontScaling={false} style={styles.text3}>{this.state.BusinessKind}</Text>
                                        </View>
                                        :
                                        this.state.ETypes.map((data, index) => (
                                            <Text key={index} allowFontScaling={false} style={styles.text2}>{this.state.Kind[data.business_kind]}, </Text>
                                        ))
                                }
                            </View>
                        </View>
                        <View style={styles.v6}>
                            <View style={styles.v7}>
                                <Text allowFontScaling={false} style={styles.text4}>${test(this.state.TotalInvestment)}</Text>
                                <Text allowFontScaling={false} style={styles.text5}>Total Investment</Text>
                            </View>
                            <Text allowFontScaling={false} style={styles.text6}>|</Text>

                            <View style={styles.v8}>
                                <Text allowFontScaling={false} style={styles.text4}>{this.state.OnGoingContracts}</Text>
                                <Text allowFontScaling={false} style={styles.text5}>Ongoing Contracts</Text>
                            </View>

                            <Text allowFontScaling={false} style={styles.text6}>|</Text>

                            <View style={styles.v7}>
                                <Text allowFontScaling={false} style={styles.text4}>{this.state.PaidContracts}</Text>
                                <Text allowFontScaling={false} style={styles.text5}>Paid Contracts</Text>
                            </View>
                        </View>
                        <View style={{ width: '90%', height: 100, marginTop: 10 }}><Text style={{ fontSize: 16, color: '#CCCCCC' }}>User Information</Text></View>
                    </View>
                    <View style={styles.v10}>
                        <View style={styles.v11}>
                            <Image source={require('../images/Investor/envelope3.png')} style={styles.imagestyle5}></Image>
                        </View>

                        <View style={styles.v12}>
                            <Text allowFontScaling={false} style={styles.text7}>Email</Text>
                            <Input editable={this.state.edit} onChangeText={(value) => this.EditEmail(value)} value={this.state.userdata[0].email} underlineColorAndroid="transparent" placeholderTextColor={'white'} style={{ width: '80%', color: 'white', marginLeft: -6 }}></Input>
                        </View>
                    </View>
                    <View style={styles.v10}>
                        <View style={styles.v11}>
                            <Image source={require('../images/Investor/Group567.png')} resizeMode="stretch" style={styles.imagestyle3}></Image>
                        </View>

                        <View style={styles.v12}>
                            <Text allowFontScaling={false} style={styles.text7}>Date of Birth</Text>
                            <Text allowFontScaling={false} style={styles.text8}>{this.state.userdata[0].dob}</Text>
                        </View>
                    </View>

                    <View style={styles.v10}>
                        <View style={styles.v11}>
                            <Image source={require('../images/Investor/placeholder3.png')} resizeMode="stretch" style={styles.imagestyle7}></Image>
                        </View>

                        <View style={styles.v12}>
                            <Text allowFontScaling={false} style={styles.text7}>From</Text>
                            <Text allowFontScaling={false} style={styles.text8}>{this.state.userdata[0].country_id}</Text>
                        </View>
                    </View>

                    <View style={styles.v10}>
                        <View style={styles.v11}>
                            <Image source={require('../images/Investor/Group567.png')} resizeMode="stretch" style={styles.imagestyle3}></Image>
                        </View>

                        <View style={styles.v12}>
                            <Text allowFontScaling={false} style={styles.text7}>Member Since</Text>
                            <Text allowFontScaling={false} style={styles.text8}>{this.state.userdata[0].created_at.slice(0, 10)}</Text>
                        </View>
                    </View>

                    <View style={styles.v10}>
                        <View style={styles.v11}>
                            <Image source={require('../images/Investor/clock3.png')} resizeMode="stretch" style={styles.imagestyle9}></Image>
                        </View>

                        <View style={styles.v12}>
                            <Text allowFontScaling={false} style={styles.text7}>Avg. response time</Text>
                            <Text allowFontScaling={false} style={styles.text8}>{this.state.userdata[0].Response_time}</Text>
                        </View>
                    </View>

                    <View style={styles.v10}>
                        <View style={styles.v11}>
                            <Image source={require('../images/Investor/earth3.png')} resizeMode="stretch" style={styles.imagestyle9}></Image>
                        </View>

                        <View style={styles.v12}>
                            <Text allowFontScaling={false} style={styles.text7}>Language</Text>
                            <Text allowFontScaling={false} style={styles.text8}>{this.state.userdata[0].language}</Text>
                        </View>
                    </View>
                </Content>
                {
                    this.state.loading ?
                        <View style={{ position: 'absolute', backgroundColor: "rgba(0,0,0,0.4)", width: Dimensions.get('window').width, height: Dimensions.get('window').height, }}>
                            <ActivityIndicator size="large" color="#EC9705" style={{ position: 'absolute', top: (Dimensions.get('window').height / 2) - 40, left: (Dimensions.get('window').width / 2) - 20 }} />

                        </View>
                        : null
                }
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
    h2: { width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' },
    header: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },
    Containerstyle: { backgroundColor: '#110717' },
    imagestyle3: { width: 20, height: 20, },
    imagestyle5: { width: 22, height: 18, },
    imagestyle7: { width: 18, height: 22, },
    imagestyle9: { width: 22, height: 22, },

    sendername: { color: '#CCCCCC', alignSelf: 'center' },
    headerbodyView: { backgroundColor: '#14E272', width: 15, height: 15, borderRadius: 10 },
    imagestyle: { width: 100, height: 100, borderRadius: 50, borderColor: '#cececd', borderWidth: 1 },

    v22: { width: 120, height: 100, flexDirection: "row", justifyContent: "center" },
    v2: { backgroundColor: '#110717', width: '100%', height: 300, alignItems: "center", marginTop: 10 },
    v3: { width: 10, height: 10, marginTop: 30, marginLeft: -8 },
    v4: { width: '100%', height: 80, flexDirection: "column", alignItems: "center", justifyContent: 'center' },
    v5: { flexDirection: "row", justifyContent: "space-between", backgroundColor: '#110717', width: 55 },
    v6: { width: '95%', height: 80, backgroundColor: '#1F1724', alignItems: "center", borderRadius: 20, flexDirection: "row", justifyContent: "space-around" },
    v7: { width: 100, borderRadius: 20, height: 80, backgroundColor: '#1F1724', flexDirection: "column", alignItems: "center", justifyContent: "center" },
    v8: { width: 120, borderRadius: 20, height: 80, backgroundColor: '#1F1724', flexDirection: "column", alignItems: "center", justifyContent: "center" },
    v10: { width: '100%', height: 80, flexDirection: "row" },
    v11: { width: 80, height: 80, alignItems: "center", justifyContent: "space-around" },
    v12: { width: 250, height: 60, marginTop: 20, flexDirection: "column", alignItems: "flex-start" },

    text1: { fontSize: 18, color: '#CCCCCC' },
    text2: { fontSize: 12, color: '#CCCCCC' },
    text22: { fontSize: 12, color: '#EC9705' },
    text3: { color: '#D28102' },
    text4: { fontSize: 14, color: '#FFFFFF' },
    text5: { color: '#545454', fontSize: 12 },
    text6: { fontSize: 20, color: '#707070' },
    text7: { color: '#8D8D8D', fontSize: 14 },
    text8: { color: '#FFFFFF', fontSize: 14 },





})