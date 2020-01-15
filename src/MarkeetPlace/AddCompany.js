import React, { Component } from 'react';
import { TouchableWithoutFeedback, Dimensions, ActivityIndicator, Text, View, Image, ImageBackground } from 'react-native';
import styles from '../Styles/Styles'
import { Icon, Button, Container, Content, Header, Body, Title, Item, Label, Input, Textarea } from 'native-base'

import MediaMeta from 'react-native-media-meta';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import DocumentPicker from 'react-native-document-picker';
import MultiSelect from 'react-native-multiple-select';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast';
import { writeFile, readFile } from 'react-native-fs';
import Url from '../DeviceIp';
import XLSX from 'xlsx';

const options = {
  title: 'Select Video',
  mediaType: 'video',
  durationLimit: 5,
  allowsEditing: true,
  //  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',

  },
};
const options2 = {
  title: 'Select Photo',
  mediaType: 'photo',
  //  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
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


export default class AddCompany extends Component {

  constructor(props) {
    super(props)
    this.state = {
      logodata: null,
      companyname: '',
      companynameValidate: true,
      RegNo: '',
      companyidValidate: true,
      salesequity: 0,
      salesequityValidate: true,
      videouri: 'video uri',
      logouri: require('../images/MarkeetPlace/photo.png'),
      uploadfile: 'Upload .xlsx File',
      uploadfile2: 'Upload .xlsx File',
      company_desc: '',
      company_descValidate: true,
      flag: true,
      Ent: null,
      selectedItems: [],
      items: [{
        id: 1,
        name: 'Music',
      }, {
        id: 2,
        name: 'Film',
      }, {
        id: 3,
        name: 'Fashion',
      }, {
        id: 4,
        name: 'Gaming',
      }, {
        id: 5,
        name: 'Technology',
      },],
      btntext: 'Proceed',
      Id: '',
      loading: false,
      uri:Url//'http://192.168.100.4:80',// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'

    }
  }

  handleUploadPhoto = async () => {
    console.log("uplod is calling")
    await fetch(this.state.uri + '/Image/UploadImages', {
      method: "POST",
      body: createFormData(this.state.logodata, { userId: 12 })
    })
      .then(response => response.json())
      .then(response => {
        console.log("Upload succes", response);
        if (response.Successful) {
          this.setState({ logodata: null, logouri: { uri: this.state.logodata.uri } });
        }
        else {
          alert("Upload Failed")
        }
        //  alert("Upload success!");
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };
  videopicker = () => {
    // after you take the video...
    ImagePicker.launchImageLibrary(options, (video) => {
      const path = video.path; // for android
      const maxTime = 90000; // 1 and half min
      const minTime = 60000;
      if (Platform.OS === 'android') {
        if (video.path != null) {
          MediaMeta.get(path)
            .then((metadata) => {
              console.log("duration=>", metadata.duration)
              if (metadata.duration > maxTime || metadata.duration < minTime) {
                alert(
                  'Video duration must be (60-90) seconds'
                );
              } else {
                // Upload or do something else
                this.setState({ videouri: video.uri, });
              }
            }).catch(err => console.error(err));
        }
      }
      else {
        if (video.path != null) {
          const path1 = video.uri.substring(7) // for ios

          MediaMeta.get(path1)
            .then((metadata) => {
              if (metadata.duration > maxTime || metadata.duration < minTime) {
                Alert.alert(
                  'Sorry',
                  'Video duration must be(60-90) seconds',
                  [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                  ],
                  { cancelable: false }
                );
              } else {
                // Upload or do something else
                this.setState({ videouri: video.uri, });
              }
            }).catch(err => console.error(err));
        }
      }


    });
  }

  imagepicker = (v) => {
    ImagePicker.showImagePicker(options2, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('image picked')
        // const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // console.log(response.uri)
        const source = { uri: response.uri };
        let size = response.fileSize / 1048576;
        //console.log("image size", response.fileSize / 1048576)
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        //console.log("file size of image", response.fileSize / 1024000)
        if (size <= 1) {
          this.setState({
            logodata: response,
            //    logouri:source
          });
          this.handleUploadPhoto()
        }
        else {
          alert("Filesize greater than 1mb")
        }

      }
    });
  }
  onSelectedItemsChange = selectedI => {
    console.log(selectedI)
    this.setState({ selectedItems: selectedI });
  };
  pickfile = async (index) => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],

      });
      console.log(res)
      if (res.name.slice(res.name.length - 4, res.name.length) == 'xlsx') {

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

        //  const source = { uri: res.uri };
        if (index == 1) {
          this.setState({
            uploadfile: res.name,
            // noyears:res.name,
            //    avatarsource: source
          })
        } else {
          this.setState({
            // fileuri: res.name, 
            uploadfile2: res.name,
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
  back = () => {
    this.setState({ btntext: 'Proceed', flag: true })
  }
  AddCompany = () => {
    if (this.state.flag) {
      this.setState({ btntext: 'Add to Marketplace', flag: false })
    } else {
      console.log("logo=>",this.state.logodata)
      if (this.state.logodata == null //| this.state.companyname == '' | this.state.RegNo == '' | this.state.salesequity <= 0 | this.state.videouri == 'video uri',
       // this.state.uploadfile == 'Upload .xlsx File' | this.state.uploadfile2 == 'Upload .xlsx File' | this.state.company_desc == '' | this.state.selectedItems.length == 0
      ) {
         console.log(this.state.logodata)
        // console.log(this.state.companyname)
        // console.log(this.state.salesequity)
        // console.log(this.state.company_desc)
        // console.log(this.state.RegNo)
        // console.log("l",this.state.selectedItems.length)
        // console.log(this.state.videouri)
        // console.log(this.state.uploadfile)
        // console.log(this.state.uploadfile2)
        // console.log('add company ')
        alert('Fill the required Fields')
      } else {
        console.log("logo=>",this.state.logodata)
       // this.CreateCompany();
      }
      //
    }
  }
  CreateCompanyTypes = async (companyid) => {
    let data = {
      id: companyid,
      Types: this.state.selectedItems
    }
    await fetch(this.state.uri + '/Company/MCompanyTypes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
      .then(res => res.json())
      .then(resjson => {
        console.log("Successfully McompanyTypes created", resjson.Message)
        if (resjson.Successful) {
          this.setState({ loading: false })
          Actions.pop()
        } else {
          this.setState({ loading: false })
          this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
        }
      }).catch(err => {
        this.setState({ loading: false })
        this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);

      })

  }
  componentDidMount = () => {

    DeviceInfo.getMacAddress().then(mac => {
      this.setState({ MacAddress: mac });
      this.get_id(mac);
    });
  }
  get_id = async (mac) => {
    console.log('in getID function', this.state.MacAddress)
    let data = {
      MacAddress: mac,
    }
    await fetch(this.state.uri + '/Session/Get_Current_Id', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
      .then(res => res.json())
      .then(resjson => {
        console.log("Id's", resjson.Message, resjson)
        if (resjson.Successful) {
          console.log("Successful  ")
          if (resjson.data.Type == 'Investor') {
            this.setState({ Id: resjson.data.investor_id, Ent: false })
          } else if (resjson.data.Type == 'Entrepreneur') {
            this.setState({ Id: resjson.data.entrepreneur_id, Ent: true })
          }
        }
        //            console.log('temp:', temp)
      }).catch(err => {
        console.log('error:', err)
      })
  }
  CreateCompany = async () => {
    //  let id = i;
    console.log("id=>", this.state.Id)
    this.setState({ loading: true })
    let data = [
      {
        reg_num: this.state.RegNo,
        company_logo: this.state.logouri.uri,
        company_name: this.state.companyname,
        sales_equity: this.state.salesequity,
        company_desc: this.state.company_desc,
        video_attachment: this.state.videouri,
        file1_attachment: this.state.uploadfile,
        file2_attachment: this.state.uploadfile2,
        marketplace: true,
        entre_id: this.state.Id,
        entreprenuer: this.state.Ent,
        feature: false
      }
    ];
    if (this.state.Id != '') {
      await fetch(this.state.uri + '/MarketPlace/Create_MarketCompany', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      })
        .then(res => res.json())
        .then(resjson => {
          //  console.log(resjson.Message, resjson.id);
          if (resjson.Successful) {
            this.CreateCompanyTypes(resjson.id)
          }
        }).catch(err => {
          this.setState({ loading: false })
          this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG)
          console.log(err)
        })
    } else {
      this.setState({ loading: false })
      this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
    }
  }

  Validation = (v, type) => {
    const name = /^[a-zA-Z0-9 ]+$/
    const number = /^[0-9]+$/
    if (type == 'companyid') {
      if (number.test(v)) {
        this.setState({
          RegNo: v,
          companyidValidate: true
        })
      }
      else if (v.length == 0) {
        this.setState({
          RegNo: '',
          companyidValidate: false
        })
      }
    }
    else if (type == 'companyname') {
      if (name.test(v)) {
        this.setState({
          companyname: v,
          companynameValidate: true
        })
      }
      else if (v.length == 0) {
        this.setState({
          companyname: '',
          companynameValidate: false
        })
      }
    }
    else if (type == 'salesequity') {
      console.log(v.length, number.test(v))
      if (number.test(v)) {
        //console.log(v.length)
        if (v <= 100 & v >= 1) {
          this.setState({
            salesequity: v,
            salesequityValidate: true
          })
        }
      } else if (!number.test(v)) {
        console.log("else", v.length)
        this.setState({
          salesequity: '0',
          salesequityValidate: false
        })
        if (v.length == 0) {
          console.log("else", v, number.test(v))
          this.setState({
            salesequity: '',
            salesequityValidate: false
          })
        }
      }
      else if (v.length == 0) {
        console.log("else", v, number.test(v))
        this.setState({
          salesequity: '',
          salesequityValidate: false
        })
      }
    }
    else if (type == 'companydesc') {

      this.setState({
        company_desc: v,
        company_descValidate: true
      })

      if (v.length == 0) {
        this.setState({
          company_desc: '',
          company_descValidate: false
        })
      }
    }
  }
  CheckValidateRegisterNumber = async () => {
    let data = {
      Reg_No: this.state.RegNo
    }
    if (this.state.RegNo != '') {
      await fetch(this.state.uri + '/DashboardCompany/Check_C_Id', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data
        }),
      })
        .then(res => res.json())
        .then(resjson => {
          // console.log()
          if (resjson.Successful) {
            if (resjson.flag) {
              if (resjson.entre_id != this.state.Id) {
                this.setState({ RegNo: '' });
                alert('Company ID Already Exist!')
              }else{
//                this.setState({ RegNo: '' });
                alert('Company ID Already Exist in your Companies!')
              }
            }
          }
        }).catch(err => alert(err))
    }
    else{
      alert('Failed company Id!!')
    }
  }
  render() {
    //const { selectedItems } = this.state.selectedItems;

    return (
      <Container style={styles.Containerstyle}>
        <Header iosBarStyle="light-content" hasTabs androidStatusBarColor="#110717" style={styles.pheader}>
          <View style={styles.h2}>
            {
              this.state.flag ?
                <Icon onPress={() => Actions.pop()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
                : <Icon onPress={() => this.back()} name="arrowleft" style={{ color: 'white' }} type="AntDesign" />
            }
          </View>
          <Body >
            <Title allowFontScaling={false} style={[styles.sendername]}>Market Place</Title>
          </Body>
          <Button transparent>
          </Button>
        </Header>
        <Content padder>
          <View style={{ width: '100%', backgroundColor: '#1F1724', borderRadius: 10, alignItems: 'center', paddingBottom: 10 }}>
            {
              this.state.flag ?
                <View style={{ width: '100%', backgroundColor: '#1F1724', borderRadius: 10, alignItems: 'center' }}>
                  <Text allowFontScaling={false} style={{ color: '#FFFFFF', alignSelf: 'flex-start', marginLeft: 10, marginTop: 10, fontSize: 16 }}>Company Detail</Text>
                  <TouchableWithoutFeedback onPress={this.imagepicker}>
                    <Image resizeMode="stretch" source={this.state.logouri} style={{ width: 45, height: 45, marginTop: 25 }} />
                  </TouchableWithoutFeedback>
                  <Text allowFontScaling={false} style={{ color: 'grey' }}>Upload Company Photo</Text>
                  <Item style={[styles.inputitem, !this.state.companyidValidate ? styles.error : null]} floatingLabel>
                    <Label allowFontScaling={false} style={styles.inputt}>Company ID</Label>
                    <Input allowFontScaling={false} onEndEditing={()=>this.CheckValidateRegisterNumber()} onChangeText={(value) => this.Validation(value, 'companyid')} value={this.state.RegNo} style={styles.input} />
                  </Item>
                  <Item style={[styles.inputitem, !this.state.companynameValidate ? styles.error : null]} floatingLabel>
                    <Label allowFontScaling={false} style={styles.inputt}>Company Name</Label>
                    <Input allowFontScaling={false} onChangeText={(value) => this.Validation(value, 'companyname')} value={this.state.companyname} style={styles.input} />
                  </Item>
                  <Item style={[styles.inputitem, !this.state.salesequityValidate ? styles.error : null]} floatingLabel>
                    <Label allowFontScaling={false} style={styles.inputt}>Percentage Equity</Label>
                    <Input allowFontScaling={false} onChangeText={(value) => this.Validation(value, 'salesequity')} value={this.state.salesequity} style={styles.input} />
                  </Item>
                  <Textarea allowFontScaling={false} rowSpan={5} value={this.state.company_desc} onChangeText={(v) => this.Validation(v, 'companydesc')} bordered placeholder="Company Description" placeholderTextColor="#878787" style={[styles.textarea, !this.state.company_descValidate ? styles.textareaError : null]} />
                </View>

                :
                <View style={{ width: '100%', backgroundColor: '#1F1724', borderRadius: 10, alignItems: 'center' }}>

                  <View style={{ width: '90%', justifyContent: 'center', marginTop: 15 }}>
                    <MultiSelect
                      // hideTags
                      style
                      items={this.state.items}
                      uniqueKey="id"
                      ref={(component) => { this.multiSelect = component }}
                      onSelectedItemsChange={this.onSelectedItemsChange}
                      selectedItems={this.state.selectedItems}
                      selectText="Select Types"
                      styleInputGroup={{ backgroundColor: '#1F1724' }} //icon background color
                      searchInputPlaceholderText="Search Items..."
                      onChangeInput={(text) => console.log(text)}
                      //altFontFamily="ProximaNova-Light"
                      tagRemoveIconColor="#CCC"
                      tagBorderColor="#EC9705"
                      tagTextColor="#CCC"
                      selectedItemTextColor="#CCC"
                      selectedItemIconColor="grey"
                      itemTextColor="grey"
                      //  displayKey="name"
                      searchInputStyle={{ color: '#CCC', backgroundColor: '#1F1724' }}
                      submitButtonColor="#EC9705"
                      submitButtonText="Select"
                      hideDropdown   //hide the right icon
                      //  styleDropdownMenu	={{backgroundColor:'red'}}
                      styleItemsContainer={{ backgroundColor: 'grey', }}   //items background color
                      styleRowList={{ marginTop: 1, backgroundColor: '#1F1724' }} //item row background color
                      styleDropdownMenuSubsection={{ backgroundColor: '#1F1724', borderBottomColor: 'grey' }}//
                    //               searchIcon
                    //             hideTags
                    />


                  </View>


                  <View style={[styles.v1ER8, { width: '90%', marginTop: 15 }]}>
                    <View style={{ justifyContent: 'center', width: '60%', borderColor: '#EC9705', borderTopLeftRadius: 30, borderBottomLeftRadius: 30, height: 50, borderWidth: 1 }}>
                      <Text allowFontScaling={false} numberOfLines={1} onPress={() => this.videopicker()} style={styles.text2ER8}>{this.state.videouri}</Text>
                    </View>
                    <TouchableWithoutFeedback style={{ width: '40%' }} onPress={() => this.videopicker()}>
                      <ImageBackground resizeMode="stretch" source={require('../images/browser.png')} style={{ width: 100, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Text allowFontScaling={false} onPress={() => this.videopicker()} style={styles.text3ER8}>Browse</Text>
                      </ImageBackground>
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={[styles.v1ER8, { width: '90%', marginTop: 15 }]}>
                    <View style={{ justifyContent: 'center', width: '60%', borderColor: '#EC9705', borderTopLeftRadius: 30, borderBottomLeftRadius: 30, height: 50, borderWidth: 1 }}>
                      <Text allowFontScaling={false} numberOfLines={1} onPress={() => this.pickfile(1)} style={styles.text2ER8}>{this.state.uploadfile}</Text>
                    </View>
                    <TouchableWithoutFeedback style={{ width: '40%' }} onPress={() => this.pickfile(1)}>
                      <ImageBackground resizeMode="stretch" source={require('../images/browser.png')} style={{ width: 100, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Text allowFontScaling={false} onPress={() => this.pickfile(1)} style={styles.text3ER8}>Browse</Text>
                      </ImageBackground>
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={[styles.v1ER8, { width: '90%', marginTop: 15 }]}>
                    <View style={{ justifyContent: 'center', width: '60%', borderColor: '#EC9705', borderTopLeftRadius: 30, borderBottomLeftRadius: 30, height: 50, borderWidth: 1 }}>
                      <Text allowFontScaling={false} numberOfLines={1} onPress={() => this.pickfile(2)} style={styles.text2ER8}>{this.state.uploadfile2}</Text>
                    </View>
                    <TouchableWithoutFeedback style={{ width: '40%', marginTop: 15 }} onPress={() => this.pickfile(2)}>
                      <ImageBackground resizeMode="stretch" source={require('../images/browser.png')} style={{ width: 100, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Text allowFontScaling={false} onPress={() => this.pickfile(2)} style={styles.text3ER8}>Browse</Text>
                      </ImageBackground>
                    </TouchableWithoutFeedback>
                  </View>

                </View>
            }

          </View>

        </Content>
        <View style={styles.footer}>
          <TouchableWithoutFeedback onPress={() => this.AddCompany()}>
            <View style={styles.v7}>
              <Text onPress={() => this.AddCompany()} allowFontScaling={false} style={{ color: '#FFFFFF' }}>{this.state.btntext}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
          opacity={1}
          textStyle={{ color: 'white' }}
        />
      </Container>
    );
  }
}