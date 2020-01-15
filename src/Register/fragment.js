import React, { Component } from 'react';
import { StyleSheet, View, BackHandler, StatusBar, ActivityIndicator, Dimensions } from 'react-native';
import Register1 from './Register1'
import Register2 from './Register2'
import IRegister3 from './IRegister3'
import ERegister3 from './ERegister3'
import Register4 from './Register4';
import ERegister5 from './ERegister5';
import Register5 from './Register5';
import ERegister6 from './ERegister6';
import ERegister7 from './ERegister7';
import ERegister8 from './ERegister8';
import Register9 from './Register9';
import IRegister6 from './IRegister6';
import DeviceInfo from 'react-native-device-info';
import Toast, { DURATION } from 'react-native-easy-toast';
import { Actions } from 'react-native-router-flux';
import Uri from '../DeviceIp'
export default class RegisterFragment extends Component {
    constructor(props) {
        super(props);
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }
    state = {
        Type: '',
        CheckType: true,
        Kind: 'Cub',
        kindno: 1,
        InvestorFunding: 0,

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
        idproof: '',
        addressproof: '',
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
        screennumber: 1,

        Eid: null,
        Iid: null,
        C_Id: null,
        Email: '',
        MacAddress: '',
        loading: false,
        creat_at: new Date(),
        ICreat_at: new Date(),
        ECreat_at: new Date(),
        Services: ['Promotion', 'Radio Promotion', 'Television Transmission', 'Digital Promotion'
            , 'Brand Development', 'Acount Manager', 'Business Consultance'],
        Types: ['Music', 'Film', 'Fashion', 'Gaming', 'Technology'],
        Kinds: ['Cub', 'Lion', 'Roar'],
        url: Uri//'http://192.168.100.4:80'//'http://ec2-18-222-128-84.us-east-2.compute.amazonaws.com'

    }
    UNSAFE_componentWillMount() {
        DeviceInfo.getMacAddress().then(mac => {
            this.GetEmail(mac)
            this.get_id(mac)
            this.setState({ MacAddress: mac })
        });

        if (this.props.No) {
            this.setState({ screennumber: 2, loading: true })
            setTimeout(() => {
                this.setState({ loading: true })
                if (this.props.Type == 'Investor') {
                    this.GetInvestorTypeServices();
                } else {
                    this.GetCompany()
                }
                this.setState({ Type: this.props.Type })
            }, 3000);
        }
    }

    onBackPress = () => {
        // on back button press has disabled if return true
        return true
    }
    Update_Session = async () => {
        let Ent = false
        if (this.state.Type == 'Investor') {
            Ent = false
        } else if (this.state.Type == 'Entrepreneur') {
            Ent = true
        }
        let data = {
            Mac: this.state.MacAddress,
            Entrepreneur: Ent
        }
        await fetch(this.state.url + '/Session/Session_Update', {
            method: 'PUT',
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
                console.log("user registration", resjson.Message)
                if (resjson.Successful) {
                    Actions.SubPlan();
                }

            }).catch(err => {
                alert(err)
            })
    }
    GetEmail = async (mac) => {
        let data = {
            MacAddress: mac
        }
        await fetch(this.state.url + '/Session/Get_Email', {
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
                console.log("user Email", resjson.Message)
                if (resjson.Successful) {
                    this.CheckRegisteration(resjson.data[0].email)
                    this.setState({ Email: resjson.data[0].email })
                }
            }).catch(err => alert(err))
    }
    CheckRegisteration = async (email) => {
        this.setState({ loading: true })
        let data = {
            Email: email
        }
        await fetch(this.state.url + '/Session/Check_Registeration', {
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
                    console.log("Registration from check registratin=>")

                    console.log("Registration from check registratin=>", resjson.Investor_Data)
                    this.setState({
                        Representativenname: resjson.User_Data[0].first_name != null ? resjson.User_Data[0].first_name : '',
                        Countryname: resjson.User_Data[0].country_id != null ? resjson.User_Data[0].country_id : 'United Kingdom',
                        statename: resjson.User_Data[0].state_id != null ? resjson.User_Data[0].state_id : 'State',
                        Cityname: resjson.User_Data[0].city_id != null ? resjson.User_Data[0].city_id : 'City',
                        idproof: resjson.User_Data[0].identity_proof != null ? resjson.User_Data[0].identity_proof : '',
                        addressproof: resjson.User_Data[0].address_proof != null ? resjson.User_Data[0].address_proof : '',
                        lat: resjson.User_Data[0].latitude != null ? resjson.User_Data[0].latitude : 51.5070,
                        lng: resjson.User_Data[0].longitude != null ? resjson.User_Data[0].longitude : 0.1278,
                        creat_at: resjson.User_Data[0].created_at != null ? resjson.User_Data[0].created_at : new Date(),
                        InvestorFunding: resjson.Investor_Data.length == 0 ? 0 : resjson.Investor_Data[0].total_investment,
                        loading: false
                    })
                    if (resjson.Investor) {
                        console.log('Type')
                        this.setState({ loading: false, Type: 'Investor' })
                        this.GetInvestorTypeServices();//investor _Id
                        // this.Update_Session(false)
                    }
                    else if (resjson.Entrepreneur) {
                        this.setState({ loading: false, Type: 'Entrepreneur' })
                        console.log('Company Calling...')
                        this.GetCompany();
                        //   this.Update_Session(true)

                    }
                    else {
                        this.setState({ loading: false })
                        //   Actions.Registration({ Email: resjson.Email })
                    }
                } else {
                    this.setState({ loading: false })
                    console.log("User not registered")
                }
            }).catch(err => {
                this.setState({ loading: false })
                alert(err)
            })
    }
    User_Registration = async () => {
        console.log("User Registration")
        let data = {
            //  email:this.props.email,
            Email: this.state.Email,
            values: [{
                first_name: this.state.Representativenname,
                country_id: this.state.Countryname,
                state_id: this.state.statename,
                city_id: this.state.Cityname,
                identity_proof: this.state.idproof,
                address_proof: this.state.addressproof,
                latitude: this.state.lat,
                longitude: this.state.lng,
                //  kind_business: this.state.kindno,
                created_at: this.state.creat_at,
                active: false
            }]
        }
        await fetch(this.state.url + '/Register/User_Reg', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data
            }),
        })
            .then(res => res.json())
            .then(resjson => console.log("user registration", resjson.Message))
    }
    InvesotrRegistration = async () => {
        console.log('Investor Registration=>', this.state.InvestorFunding)
        let data = {
            Email: this.state.Email,
            values: [{
                total_investment: this.state.InvestorFunding,

                //   blig_equity: this.state.Bligequity,
                //   mini_eq_require: this.state.Investorequity,
                business_kind: this.state.kindno,
                created_at: this.state.ICreat_at

            }]
        }
        await fetch(this.state.url + '/Register/Investor_Reg', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => { console.log("investor registration", resjson.Message, resjson.id), this.setState({ Iid: resjson.id }) })

    }
    InvestorServices = async () => {
        let RequiredServices = []
        let Services = ['Promotion', 'Radio Promotion', 'Television Transmission', 'Digital Promotion'
            , 'Brand Development', 'Acount Manager', 'Business Consultance'];

        for (let index = 0; index < this.state.ServicesReuired.length; index++) {
            console.log(Services.indexOf(this.state.ServicesReuired[index]))
            console.log(this.state.ServicesReuired[index])
            RequiredServices.push(Services.indexOf(this.state.ServicesReuired[index]) + 1)
        }
        let data = {
            Email: this.state.Email,
            Services: RequiredServices
        }
        await fetch(this.state.url + '/Investor/IServices', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => console.log("investor services", resjson.Message))
    }
    InvestorTypes = async () => {
        let SelectedCompany = [];
        let CTypes = ['Music', 'Film', 'Fashion', 'Gaming', 'Technology'];
        for (let index = 0; index < this.state.Companytypes.length; index++) {
            SelectedCompany.push(CTypes.indexOf(this.state.Companytypes[index]) + 1);
        }
        let data = {
            Email: this.state.Email,
            Types: SelectedCompany
        }
        await fetch(this.state.url + '/Investor/ITypes', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => console.log("investor types", resjson.Message))
    }
    EntrepreneurRegistration = async () => {
        let data = {
            Email: this.state.Email,
            //   business_kind:this.state.kindno,
            created_at: this.state.ECreat_at
        }
        await fetch(this.state.url + '/Register/Entrepreneur_Reg', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        })
            .then(res => res.json())
            .then(resjson => { console.log("entrepreneur registration", resjson.Message, resjson.id), this.setState({ Eid: resjson.id }) })
    }
    get_id = async (mac) => {
        let data = {
            MacAddress: mac
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
                    //  console.log(resjson)
                    if (resjson.data.Type == 'Investor') {
                        console.log('Investor::::')
                        this.setState({ Iid: resjson.data.investor_id })
                        //     this.GetInvestorTypeServices();//investor _Id
                    } else if (resjson.data.Type == 'Entrepreneur') {
                        console.log('Entrepreneur::::id=>', resjson.data.entrepreneur_id)
                        this.setState({ Eid: resjson.data.entrepreneur_id })
                        //    this.GetCompany();
                    }
                }
            }).catch(err => {
                this.setState({ loading: false })
                this.refs.toast.show('Network Request Failed!', DURATION.LENGTH_LONG);
            })

    }
    GetInvestorTypeServices = async () => {

        let data = {
            entre_id: this.state.Iid
        }

        if (this.state.Iid != '' & this.state.Iid != null) {
            console.log('Calling=>', this.state.Iid)
            await fetch(this.state.url + '/Investor/Get_Investor_TS', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            })
                .then(res => res.json())
                .then(resjson => {
                    // {"Investor_Types": {"add_pro": null, "blig_equity": 90, "business_kind": null, "country_id": null, "created_at": null, "created_by": null, "id": 9, "id_pro": null, "investor_id": null, "investortypes": [[Object], [Object]], "latitude": null, "longitude": null, "mini_eq_company_require": null, "mini_eq_require": 10, "state_id": null, "total_c_invested": null, "total_invested": null, "total_investment": null, "updated_at": "2019-12-20T11:49:49.918Z", "updated_by": null, "user_id": 10}, "Message": "Successfully", "Services": {"id": 9, "investorservices": [[Object], [Object], [Object], [Object]]}, "Successful": true}
                    //  console.log("ITypesServices=>",resjson.Investor_Types.investortypes) 
                    //  console.log("ITypesServices=>",resjson.Investor_Types.business_kind)
                    if (resjson.Successful) {
                        console.log("ITypesServices=>", resjson.Services.investorservices)
                        let ITypes = []
                        let IServices = []
                        for (let index = 0; index < resjson.Investor_Types.investortypes.length; index++) {
                            //      console.log(this.state.Types[resjson.Investor_Types.investortypes[index].companytype_id - 1])
                            ITypes.push(this.state.Types[resjson.Investor_Types.investortypes[index].companytype_id - 1])
                        }
                        for (let index = 0; index < resjson.Services.investorservices.length; index++) {
                            //  console.log(this.state.Services[resjson.Services.investorservices[index].companytype_id - 1])
                            IServices.push(this.state.Services[resjson.Services.investorservices[index].services_id - 1])
                        }
                        this.setState({ Companytypes: ITypes, ServicesReuired: IServices, kindno: resjson.Investor_Types.business_kind, Kind: this.state.Kinds[resjson.Investor_Types.business_kind - 1] })
                    }
                }).catch(err => {
                    alert(err)
                })
        } else {
            this.setState({ loading: false })
        }
    }
    GetCompany = async () => {
        // console.log('entre id', this.state.Eid)
        let data = {
            entre_id: this.state.Eid
        }
        if (this.state.Eid != '' & this.state.Eid != null) {
            console.log('Calling=>', this.state.Eid)
            await fetch(this.state.url + '/Company/E_RG_Company', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            })
                .then(res => res.json())
                .then(resjson => {
                    console.log("resjson/////////////////////////////////////////////////////////////////////////////=>", resjson)
                    if (resjson.Successful) {
                        console.log('Company kind====================>', resjson.company_Types )
                        // console.log('Company',resjson.company_Types.Loan_Financing)
                        this.setState({
                            ComRegId: resjson.company_Types.reg_num.toString(),
                            Companyname: resjson.company_Types.company_name,
                            Description: resjson.company_Types.company_desc,
                            Bligequity: resjson.company_Types.blig_equity,
                            Investorequity: resjson.company_Types.investment_eq,
                            Loanfinancing: resjson.company_Types.Loan_Financing,
                            Term: resjson.company_Types.investment_duration,
                            Kindoffunding: resjson.company_Types.investment_req,
                            Video: resjson.company_Types.video_attachment,
                            FinancialReport1: resjson.company_Types.file1_attachment,
                            FinancialReport2: resjson.company_Types.file2_attachment,
                            Kind: this.state.Kinds[resjson.company_Types.company_cat_id - 1],
                            kindno: resjson.E_data[0].business_kind
                        })
                        let Services = []
                        for (let index = 0; index < resjson.Services.entrepreneurservices.length; index++) {
                            Services.push(this.state.Services[resjson.Services.entrepreneurservices[index].service_id - 1])
                        }
                        //  console.log('Services', resjson.Services.entrepreneurservices)
                        let Types = []
                        for (let index = 0; index < resjson.company_Types.entrepreneurcompanies.length; index++) {
                            Types.push(this.state.Types[resjson.company_Types.entrepreneurcompanies[index].companytype_id - 1])
                        }
                        this.setState({ Companytypes: Types, ServicesReuired: Services })
                        //console.log('Types', resjson.company_Types.entrepreneurcompanies)
                    }
                })
                .catch(err => {
                    alert(err)
                })
        }
        else {
            this.setState({ loading: false })
        }
    }
    Registration = async () => {
        if ((this.state.Type == 'Entrepreneur') & (this.state.ComRegId == '' | this.state.Companyname == '' | this.state.Description == '' | this.state.Representativenname == '' | this.state.statename == 'State' | this.state.idproof == '' | this.state.addressproof == '')) {
            this.refs.toast.show('Fill the Form Carefully!', DURATION.LENGTH_LONG);
        } else if ((this.state.Type == 'Investor') & (this.state.Representativenname == '' | this.state.statename == 'State' | this.state.idproof == '' | this.state.addressproof == '')) {
            this.refs.toast.show('Fill the Form Carefully!', DURATION.LENGTH_LONG);
        } else {
            this.setState({ loading: true })

            await this.User_Registration();
            if (this.state.Type == 'Entrepreneur') {
                await this.EntrepreneurRegistration();
                await this.CompanyRegistration();
                //  await this.CompanyServices();
                //   await this.CompanyTypes();
            }
            else if (this.state.Type == 'Investor') {
                await this.InvesotrRegistration();
                await this.InvestorServices();
                await this, this.InvestorTypes();
            }
            await this.Uploadid();
            await this.UploadAddress();
            await this.Update_Session()
            //   await this.UserSubscription()
            this.setState({ loading: false })
        }

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
        let Services = ['Promotion', 'Radio Promotion', 'Television Transmission', 'Digital Promotion'
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
        console.log('==============>', this.state.kindno,this.state.Kind)
        let data = {
            values: [{
                reg_num: this.state.ComRegId,
                company_name: this.state.Companyname,
                company_desc: this.state.Description,
                country_id: this.state.Countryname,
                state_id: this.state.statename,
                city_id: this.state.Cityname,
                company_cat_id: this.state.kindno==null?this.state.Kinds.indexOf(this.state.Kind)+1:this.state.kindno,     //company kind lion or roar
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
            case 1:
                this.setState({ Type: data.type, CheckType: data.CheckType })
                console.log(data.CheckType)
                break;
            case 2:
                this.setState({ Kind: data.kind, kindno: data.kindno });
                            console.log("====================>",data.kindno)
                break;
            case 3:
                if (this.state.Type == 'Investor') {
                    this.setState({ Bligequity: data.Bligequity, Investorequity: data.Investorequity, Loanfinancing: data.Loanfinancing });
                }
                else if (this.state.Type == 'Entrepreneur') {
                    this.setState({ Term: data.Term, Bligequity: data.Bligequity, Investorequity: data.Investorequity, Loanfinancing: data.Loanfinancing, });
                    if (data.Loanfinancing > 0) {
                        this.setState({ Kindoffunding: 0 })
                    }
                }                //    console.log(data)
                break;
            case 4:
                if (this.state.Type == 'Investor') {
                    this.setState({ Representativenname: data.Repname, Cityname: data.cityname, statename: data.statename, Countryname: data.Cname, code: data.cca2, idproof: data.idproof, addressproof: data.addressproof, lat: data.latitude, lng: data.longitude });
                } else if (this.state.Type == 'Entrepreneur') {
                    this.setState({ Representativenname: data.Repname, Cityname: data.cityname, statename: data.statename, Countryname: data.Cname, code: data.cca2, idproof: data.idproof, addressproof: data.addressproof });
                }
                break;
            case 45:
                this.setState({ ComRegId: data.ComRegId, Companyname: data.ComName, Description: data.Description, Cityname: data.cityname, statename: data.statename, Countryname: data.Cname, code: data.cca2, lat: data.latitude, lng: data.longitude });
                break;
            case 5:
                this.setState({ Companytypes: data.Companytype });
                break;
            case 6:
                if (this.state.Type == 'Entrepreneur') {
                    this.setState({ Kindoffunding: data.kindoffunding });
                } else if (this.state.Type == 'Investor') {
                    this.setState({ InvestorFunding: data.kindoffunding })
                }
                break;
            case 77:
                if (this.state.Type == 'Entrepreneur') {
                    this.setState({
                        Video: data.Video,
                    });
                }
                break;
            case 7:
                if (this.state.Type == 'Entrepreneur') {
                    this.setState({
                        FinancialReport1: data.fileuri,
                        FinancialReport2: data.fileuri2,

                    })
                }
                break;
            case 8:
                if (this.state.Type == 'Entrepreneur') {
                    this.setState({ ServicesReuired: data.ServicesReuired })
                } else if (this.state.Type == 'Investor') {
                    console.log(data.ServicesReuired)
                    this.setState({ ServicesReuired: data.ServicesReuired })
                }
                break;
            case 9:
                if (this.state.Type == 'Entrepreneur') {
                    this.setState({ Companytype: data.Companytype });
                }
                break;
            case 10:
                if (this.state.Type == 'Investor') {
                    this.setState({ RegSubscription: data.index, Amount: data.amount });
                } else if (this.state.Type == 'Entrepreneur') {
                    this.setState({ RegSubscription: data.index, Amount: data.amount });
                }
                break;
        }

    }

    selectScreen = (v) => {
        this.setState({ screennumber: v })
    }
    Screen = () => {
        if (this.state.screennumber == 1) {
            return (<Register1 InvestorRefresh={() => this.GetInvestorTypeServices()} EntrepreneurRefresh={() => this.GetCompany()} Active={this.props.Active != null ? this.props.Active : false} CheckType={this.state.CheckType} Type={this.state.Type} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)
        }
        else if (this.state.screennumber == 2) {
            return (<Register2 No={this.props.No} PType={this.props.Type} Type={this.state.Type} KindNo={this.state.kindno} Kind={this.state.Kind} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)
        }
        else if (this.state.screennumber == 3) {
            if (this.state.Type == 'Investor') {
                return (<IRegister3 obj={[this.state.Bligequity, this.state.Investorequity, this.state.Loanfinancing]} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)
            }
            else if (this.state.Type == 'Entrepreneur') {
                return (<ERegister3 obj={[this.state.Bligequity, this.state.Investorequity, this.state.Loanfinancing, this.state.Term]} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)
            }
        }
        else if (this.state.screennumber == 4) {
            return (<Register4 Type={this.state.Type} objIR4={[this.state.Representativenname,
            this.state.Cityname, this.state.statename, this.state.Countryname, this.state.code,
            this.state.idproof, this.state.addressproof]}
                senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)

        }
        else if (this.state.screennumber == 45) {
            return (<ERegister5 E_ID={this.state.Eid} Type={this.state.Type} obj={[this.state.ComRegId, this.state.Companyname, this.state.Description,
            this.state.Cityname, this.state.statename, this.state.Countryname, this.state.code,
            ]} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)

        }
        else if (this.state.screennumber == 5) {

            return (<Register5 LoanFinancing={this.state.Loanfinancing} Type={this.state.Type} CompanyType={this.state.Companytypes} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)

        }
        else if (this.state.screennumber == 6) {
            if (this.state.Type == 'Entrepreneur') {
                return (<ERegister6 Funding={this.state.Kindoffunding} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)
            } else if (this.state.Type == 'Investor') {
                return (<IRegister6 Funding={this.state.InvestorFunding} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)
            }
        }
        else if (this.state.screennumber == 7) {
            if (this.state.Type == 'Entrepreneur') {
                return (<ERegister7 LoanFinancing={this.state.Loanfinancing} File={this.state.Video} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)
            }
        }
        else if (this.state.screennumber == 8) {

            return (<ERegister8 LoanFinancing={this.state.Loanfinancing} objF={[this.state.FinancialReport1, this.state.FinancialReport2]} Services={this.state.ServicesReuired} Type={this.state.Type} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)

        } else if (this.state.screennumber == 9) {

            return (<Register9 LoanFinancing={this.state.Loanfinancing} Register={() => this.Registration()} Services={this.state.ServicesReuired} Type={this.state.Type} senddata={(k, v) => this.setdata(k, v)} Screenno={(v) => this.selectScreen(v)} />)

        }

    }


    render() {

        return (
            <View style={styles.v}>
                <StatusBar barStyle="light-content" />
                {this.Screen()}
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
            </View>
        );
    }
}
const styles = StyleSheet.create({
    v: { height: '100%', width: '100%' }
});