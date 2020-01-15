import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

import Register2 from './Register2';
import ERegister3 from './ERegister3';
import ERegister5 from './ERegister5';
import Register5 from './Register5';
import ERegister6 from './ERegister6';
import ERegister7 from './ERegister7';
import ERegister8 from './ERegister8';
import Register9 from './Register9';
import RegSubscription from './RegSubs';
import DeviceInfo from 'react-native-device-info';
import { Actions } from 'react-native-router-flux';
import Uri from '../DeviceIp'
export default class RegisterFragment extends Component {
    constructor(props) {
        super(props);
        this.state = {

            Type:'Entrepreneur',
            Bligequity: 1,
            Investorequity: 75,
            Loanfinancing: 0,
            Term: 0,

            ComRegId: '',
            Companyname: '',
            Representativenname: '',
            Description: '',
            Cityname: 'City',
            statename: 'State',
            Countryname: 'United Kingdom',
            code: 'GB',
            idproof: null,
            addressproof: null,
            lat: 51.5070,
            lng: 0.1278,


            Companytypes: [],
            ServicesReuired: [],
            RegSubscription: 0,  //sub plan
            Amount: 300,
            SwitchVal: null,

            Kindoffunding: 0,
            Video: '',
            Filename: '',
            Filename2: '',
            Companyfinancial: null,
            FinancialReport1: 'Choose .xlsx File',
            FinancialReport2: 'Choose .xlsx File',
            screennumber: 0,
            url:Uri,//'http://192.168.100.4:80',// 'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com',
            Eid: null,
            C_Id: null,
            MacAddress: ''
        }
        DeviceInfo.getMacAddress().then(mac => {
            this.setState({ MacAddress: mac })
            this.Get_id(mac)
        });
    }



    Get_id = async (mac) => {
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
                    if (resjson.data.Type == 'Investor') {
                        console.log('Investor::::')
                        
                    } else if (resjson.data.Type == 'Entrepreneur') {
                        console.log('Entrepreneur::::', resjson.data.entrepreneur_id)
                        this.setState({ Eid: resjson.data.entrepreneur_id });
                    }
                }
            }).catch(err=>{
                console.log(err)
                alert(err)
            })

    }

    Registration = async () => {
        await this.CompanyRegistration();
        // await this.CompanyServices();
        //await this.CompanyTypes();

        await this.Uploadid();
        await this.UploadAddress();
        Actions.pop();
        // await this.Update_Session()
        // await this.UserSubscription()
    }
    UserSubscription = async () => {
        //let userid = null
        let userid = this.state.Eid;
        let Ent = true


        let data = {
            values: [{
                subscription_id: (this.state.RegSubscription + 1),
                user_id: userid,
                payed: false,
                entreprenuer: Ent
            }]
        }
        await fetch(this.state.url + '/User/User_Subscription', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => console.log("user subscription", resjson.Message))
    }

    Uploadid = async () => {
        let userid = null;
        let Ent = false
        if (this.state.Type == 'Investor') {
            userid = this.state.Iid,
                Ent = false
        }
        else {
            userid = this.state.Eid;
            Ent = true
        }
        var data = {
            values: [{
                user_id: userid,
                entreprenuer: Ent,
                identity_proof: true,
                profile_pic: false,
                uri: this.state.idproof,
            }]
        }
        await fetch(this.state.url + '/Image/Uploadimg_Table', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => console.log("Upload IDImage in the table", resjson.Message))

    }
    UploadAddress = async () => {
        let userid = null;
        let Ent = false
        userid = this.state.Eid;
        Ent = true
        var data = {
            values: [{
                user_id: userid,
                entreprenuer: Ent,
                identity_proof: false,
                profile_pic: false,
                uri: this.state.addressproof,
            }]
        }
        await fetch(this.state.url + '/Image/Uploadimg_Table', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => console.log("Upload IDImage in the table", resjson.Message))

    }
    CompanyTypes = async (id) => {
        let SelectedCompany = [];
        let CTypes = ['Music', 'Film', 'Fashion', 'Gaming', 'Technology'];
        for (let index = 0; index < this.state.Companytypes.length; index++) {
            SelectedCompany.push(CTypes.indexOf(this.state.Companytypes[index]) + 1);
        }

        let data = {
            C_Id: id,
            Types: SelectedCompany
        }
        await fetch(this.state.url + '/Company/ECompanyTypes', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => console.log("E company types", resjson.Message))
    }
    CompanyServices = async (id) => {
        let RequiredServices = []
        let Services = ['Promotion', 'Radio Promotion', 'Television Transmision', 'Digital Promotion'
            , 'Brand Development', 'Acount Manager', 'Business Consultance'];

        for (let index = 0; index < this.state.ServicesReuired.length; index++) {
            RequiredServices.push(Services.indexOf(this.state.ServicesReuired[index]) + 1)
        }
        let data = {
            C_Id: id,
            Services: RequiredServices
        }
        await fetch(this.state.url + '/Company/ECompanyServices', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("E company services", resjson.Message)
                if (resjson.Successful) {
                    this.CompanyTypes(id)
                }
            })
    }

    CompanyRegistration = async () => {

        let data = {
            values: [{
                reg_num: this.state.ComRegId,
                company_name: this.state.Companyname,
                company_desc: this.state.Description,
                country_id: this.state.Countryname,
                state_id: this.state.statename,
                city_id: this.state.Cityname,
                company_cat_id: this.state.kindno==null?this.state.Kinds.indexOf(this.state.Kind)+1:this.state.kindno,     //company kind lion or roar
                //company kind lion or roar
                entre_id: this.state.Eid,
                investment_req: this.state.Kindoffunding,
                Loan_Financing: this.state.Loanfinancing,    //loan
                investment_eq: this.state.Investorequity,
                investment_duration: this.state.Term,
                blig_equity: this.state.Bligequity,

                file1_attachment: this.state.FinancialReport1,
                file2_attachment: this.state.FinancialReport2,
                video_attachment: this.state.Video,

                marketplace: false,
                feature: false,
                entreprenuer: true,
                status: 'In Progress', //after add the status
                created_at: new Date(),

                funding: this.state.Kindoffunding,
                longitude: this.state.lng,
                latitude: this.state.lat

            }]
        }
        await fetch(this.state.url + '/Company/Create_Company', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => {
                console.log("Company Registration", resjson.Message)
                this.setState({ C_Id: resjson.id })
                if (resjson.Successful) {
                    this.CompanyServices(resjson.id)
                }
            })
    }

    setdata = (key, data) => {
        switch (key) {
            case 0:

                this.setState({ Kind: data.kind, kindno: data.kindno });
                console.log(data.kind)
                break;
            case 1:
                this.setState({ Term: data.Term, Bligequity: data.Bligequity, Investorequity: data.Investorequity, Loanfinancing: data.Loanfinancing });
                if(data.Loanfinancing>0){
                    this.setState({Kindoffunding:0})
                }
                break;
            case 2:
                this.setState({ ComRegId: data.ComRegId, Companyname: data.ComName, Description: data.Description, Cityname: data.cityname, statename: data.statename, Countryname: data.Cname, code: data.cca2, lat: data.latitude, lng: data.longitude });
                break;
            case 3:
                this.setState({ Companytypes: data.Companytype });
                break;
            case 4:
                console.log(data.kindoffunding)
                this.setState({ Kindoffunding: data.kindoffunding });
                break;
            case 5:
                console.log("video", data.videouri)
                this.setState({
                    Video: data.videouri,
                });

                break;
            case 6:
                this.setState({
                    FinacialReport: data.fileuri,
                    FinancialReport2: data.fileuri2,
                })
                break;
            case 7:
                this.setState({ ServicesReuired: data.ServicesReuired })
                break;
            case 8:
                console.log(data.index)
                this.setState({ RegSubscription: data.index, Amount: data.amount });
                break;
        }

    }

    selectScreen = (v) => {
        this.setState({ screennumber: v })
    }
    Screen = () => {
        if (this.state.screennumber == 0) {
            return (<Register2 No={this.props.No} PType={this.props.Type} Type={this.state.Type} Kind={this.state.Kind} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)
        } else if (this.state.screennumber == 1) {
            return (<ERegister3 obj={[this.state.Bligequity, this.state.Investorequity, this.state.Loanfinancing, this.state.Term]} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)
        }
        else if (this.state.screennumber == 2) {
            return (<ERegister5 E_Id={this.state.Eid} Type={this.state.Type} obj={[this.state.ComRegId, this.state.Companyname, this.state.Description,
            this.state.Cityname, this.state.statename, this.state.Countryname, this.state.code,
            ]} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)

        }
        else if (this.state.screennumber == 3) {

            return (<Register5 LoanFinancing={this.state.Loanfinancing} Type={this.state.Type} CompanyType={this.state.Companytypes} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)}/>)

        }
        else if (this.state.screennumber == 4) {
            return (<ERegister6 Funding={this.state.Kindoffunding} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)
        }
        else if (this.state.screennumber == 5) {
            return (<ERegister7 LoanFinancing={this.state.Loanfinancing} File={this.state.Video} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)
        }
        else if (this.state.screennumber == 6) {

            return (<ERegister8 LoanFinancing={this.state.Loanfinancing} objF={[this.state.FinancialReport1, this.state.FinancialReport2]} Services={this.state.ServicesReuired} Type={this.state.Type} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)

        } else if (this.state.screennumber == 7) {

            return (<Register9 Register={() => this.Registration()} Services={this.state.ServicesReuired} Type={this.state.Type} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)

        }
        
    }


    render() {

        return (
            <View style={styles.v}>
                <StatusBar barStyle="light-content" />
                {this.Screen()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    v: { height: '100%', width: '100%' }
});