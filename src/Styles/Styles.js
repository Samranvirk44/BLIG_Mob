import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
   ///Welcome
   container: { flex: 1 },
   img: { width: 250, height: 250, marginTop: '20%' },
   imgbackground: { width: '100%', height: '100%', alignItems: 'center' },

   tex2: { fontSize: 14, color: '#CCCCCC' },
   text3: { fontSize: 18, color: 'white' },

   //loginsignup
   logostyl: { width: 250, height: 250, marginTop: '-40%' },

   v1: { width: 254, height: 56, backgroundColor: '#120E17', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#EC9705', borderRadius: 40 },
   imagbackground: { width: 254, height: 56, marginTop: 25, alignItems: 'center', justifyContent: 'center' },
   img1: { width: 250, height: 250 },
   bgimg: { width: '100%', height: '100%' }, //alignItems: 'center' },


   //LOGIN
   containerlogin: { width: '100%', height: '100%' }, //Dimensions.get('window').height },
   ltext: { color: 'white', fontSize: 35, },
   stext: { fontSize: 21, color: '#DEDEDE' },
   Item: { width: '80%', borderBottomWidth: 0, marginTop: 32 },
   username: { color: '#CCCCCC', fontSize: 15 },
   input: { width: '100%', color: 'white' },
   icon: { color: 'white', marginTop: -20, fontSize: 18 },
   ltext2: { fontSize: 16, color: '#CCCCCC' },
   vmargin: { marginTop: '50%' },
   v: { width: '100%', alignItems: 'flex-end' },//add flex direction
   item2: { borderBottomWidth: 1, borderBottomColor: '#EC9705', marginTop: 22 },
   error: { borderBottomWidth: 2, borderBottomColor: 'red' },

   ///signup
   btnimage2: { width: 254, height: 56, marginTop: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
   itemstyle: { width: '80%', borderBottomWidth: 1, borderBottomColor: '#EC9705', marginTop: 10, alignSelf: 'center' },
   flabel: { borderBottomWidth: 0, marginTop: 12 },
   alreadyAcount:{ color: '#EC9705', marginTop: 10, alignSelf: 'center' },

   //Register1
   mainview: { height: '80%', justifyContent: 'center', alignItems: 'center', width: '100%' },
   imagebackground: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
   imgsize: { width: 120, height: 50 },
   imagesize: { width: 40, height: 45 },
   v11: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 20 },
   v2: { width: 105, height: 170, alignItems: 'center', justifyContent: 'center', padding: 5 },
   text: { fontStyle: "normal", fontSize: 14, color: '#CCCCCC', marginTop: 20 },
   v3: { justifyContent: 'center', alignItems: 'center', width: '100%', height: 95, borderWidth: 2, borderColor: '#EC9705', borderRadius: 10 },

   //Reg2
   btnimage: { width: 254, height: 56, alignItems: 'center', justifyContent: 'center' },
   businesskind: { fontSize: 16, color: '#CCCCCC', marginTop: 10 },

   //Reg3
   textstyle: { fontSize: 16, color: '#CCCCCC', marginTop: 10, marginTop: -5 },
   text2: { fontSize: 16, color: '#CCCCCC', marginTop: 15, },
   track: { height: 15, borderWidth: 2, borderColor: '#C4C3C3', borderRadius: 10 },
   thumb: { width: 35, height: 35, borderWidth: 5, borderRadius: 20, borderColor: '#C4C3C3' },
   text1: { color: 'white' },

   //Reg4
   country: { width: '80%', alignItems: 'flex-end', alignSelf: 'center', borderBottomColor: '#EC9705', borderBottomWidth: 1, paddingBottom: 5 },
   mainview2: { height: '80%', width: '100%', paddingBottom: 5 },
   image: { width: 159, height: 44, alignSelf: 'center' },
   image2: { width: 50, height: 50, alignSelf: 'center' },
   vl: { flexDirection: 'row', justifyContent: 'center', },
   flabel: { borderBottomWidth: 0 },
   iconstyle: { marginTop: -30, fontSize: 18 },
   fileformat: { color: '#EC9705' },
   fname: { color: '#FFFFFF', fontSize: 10 },
   upicture: { color: '#CCCCCC', fontSize: 12 },
   v33: { width: '80%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderStyle: 'dotted', borderWidth: 2, borderRadius: 10, marginTop: 10, height: 150, borderColor: '#EC9705' },
   map: {
      // ...StyleSheet.absoluteFillObject,
      //  height: Dimensions.get('screen').height,
      width: '100%',
      borderRadius: 10,
      height: 400,
      // justifyContent: 'flex-end',
      alignItems: 'center',
   },
   iconr4: { marginTop: 5, color: '#EC9705', fontSize: 35 },
   rview: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 5 },
   rview2: { alignSelf: 'center', width: '80%', alignItems: 'flex-end' },
   r4input: { width: '90%', color: 'white' },
   r4modal: { alignItems: 'center', position: "absolute", width: '100%', alignSelf: 'center' },
   modalv1: { width: '95%', height: 600, backgroundColor: '#1F1724', borderRadius: 20 },
   modalv2: { width: '90%', alignSelf: 'center', borderRadius: 10 },
   modalv3: { flexDirection: 'row', width: '100%', borderWidth: 1, backgroundColor: '#110717', marginBottom: 5, borderColor: '#818181', borderRadius: 20, marginTop: 20 },
   modalicon: { color: '#CCCCCC', marginLeft: 8, marginTop: 5 },
   modalbtn: { width: '60%', height: 40, borderRadius: 30, backgroundColor: '#EC9705', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 10 },




   //Reg5
   //v1style: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 2, width: '80%' },
   v2style: { width: 95, height: 120, alignItems: 'center', justifyContent: 'center', padding: 5 },
   v3style: { justifyContent: 'center', alignItems: 'center', width: '100%', height: 85, borderWidth: 2, borderColor: '#EC9705', borderRadius: 10 },
   textstyle2: { fontSize: 11, color: '#CCCCCC', marginTop: 2 },
   imgsize2: { width: 46, height: 38 },
   text11: { alignSelf: 'center', fontSize: 16, color: '#CCCCCC', marginTop: 10, marginBottom: 10 },

   //Reg8
   v1style: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 2 },
   imgsize22: { width: 38, height: 35 },

   //RegSubscription
   v4: { width: '100%', flexDirection: "row", alignSelf: "center", justifyContent: "center", marginTop: 20 },
   v5: { height: 120, width: '85%', borderRadius: 10, alignItems: "center", borderWidth: 1, borderColor: '#EC9705', justifyContent: 'center' },
   v9: { flexDirection: "column", alignItems: 'center', width: '50%' },
   text4: { fontSize: 25, color: '#FFFFFF', alignSelf: "center", },
   duration: { color: '#FFFFFF' },
   v10: { flexDirection: 'row', alignItems: "center", width: '90%' },

   //payment
   pv1: { width: '100%', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' },
   pv2: { alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#EC9705', height: 40, width: '30%', borderRadius: 20 },
   pv3: { flexDirection: 'row', borderBottomColor: '#878787', borderBottomWidth: 2, alignItems: 'center' },
   pv4: { width: 20, height: 20, backgroundColor: '#E91D26', borderRadius: 10 },
   pv7: { marginLeft: -10, width: 20, height: 20, backgroundColor: '#F59500', borderRadius: 10 },
   pv8: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
   pv9: { width: '45%', overflow: 'hidden' },
   pv10: { width: 20, height: 20, borderWidth: 1, borderColor: '#EC9705', borderRadius: 10 },
   ptext1: { marginTop: 15, color: '#878787', fontSize: 14 },
   ptext4: { color: '#EC9705', fontSize: 28, marginTop: 5 },
   ptext2: { color: 'white', },
   item: { marginTop: 10 },
   Label: { fontSize: 14, color: '#878787', marginTop: 30 },
   save: { fontSize: 14, color: '#878787' },
   pinput: { color: '#878787', fontSize: 14 },
   pheader: { width: '100%', justifyContent: 'center', backgroundColor: '#110717' },
   h2: { width: 30, height: '100%', justifyContent: 'center', alignItems: 'center' },
   h3: { width: 50, height: '100%', justifyContent: 'center', alignItems: 'center' },
   v6: { width: '60%', height: 50, },
   ptext3: { color: 'white', fontSize: 14, overflow: 'hidden' },
   pv5: { height: 70, width: '100%', backgroundColor: '#1F1724', alignItems: 'center', justifyContent: 'center' },

   // Credit Card
   cdtext: { color: '#FFFFFF', alignSelf: 'flex-end', marginRight: 20 },
   cardNo: { fontSize: 27, color: '#FFFFFF', alignSelf: 'center' },
   valid: { color: '#FFFFFF', fontSize: 12 },
   thru: { marginTop: -4, color: '#FFFFFF', fontSize: 12 },
   cdicon: { color: '#FFFFFF', fontSize: 7, padding: 2 },
   cvv: { fontSize: 12, color: '#FFFFFF' },
   chName: { fontSize: 18, color: '#FFFFFF' },
   chNo: { fontSize: 18, color: '#FFFFFF' },
   cdView1: { width: '100%', height: 400, alignItems: 'center' },
   cdView2: { width: '50%', height: 80, marginBottom: 30, marginLeft: 35 },
   cdView3: { width: '100%', flexDirection: 'row', alignItems: 'center', height: 30, justifyContent: 'space-between' },
   cdView4: { flexDirection: 'row', alignItems: 'center' },
   cdView5: { flexDirection: 'row', width: '40%', height: '100%', alignItems: 'center', justifyContent: 'flex-end' },
   cdimage: { width: 350, height: 240, justifyContent: 'flex-end' },

   //ERegister3

   mainviewE3: { height: '80%', justifyContent: 'center', alignItems: 'center', width: '100%' },
   textE3: { fontSize: 16, color: '#CCCCCC', marginTop: 5 },

   //ERegister6
   text1ER6: { color: 'white', marginBottom: 5 },
   coin: { width: 181, height: 194 },

   //ERegister7

   text1: { color: 'white', marginBottom: 5 },
   coinER7: { width: 174, height: 141, },
   upictureER7: { color: '#878484', fontSize: 12 },
   image3: { width: 120, height: 30, alignSelf: 'center', marginTop: 5, marginBottom: 5 },
   v3ER7: { width: '80%', justifyContent: 'center', alignItems: 'center', borderStyle: 'dotted', borderWidth: 2, borderRadius: 10, marginTop: 10, height: 150, borderColor: '#EC9705' }
   ,
   backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
   },
   view1: { width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
   view2: { width: '88%', backgroundColor: '#FFFFFF', height: 3, borderRadius: 2 },
   view3: { backgroundColor: '#EC9705', height: 3, borderRadius: 2 },
   delimage: { width: 20, height: 22 },

   //ERegister8

   v1ER8: { width: '80%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
   imagebackground2: { width: 90, height: 50, alignItems: 'center', justifyContent: 'center' },
   v1styleER8: { justifyContent: 'center', width: 180, borderColor: '#EC9705', borderTopLeftRadius: 30, borderBottomLeftRadius: 30, height: 50, borderWidth: 1 },
   textER8: { fontSize: 16, color: '#CCCCCC', marginTop: 10, marginBottom: 10, marginLeft: -160, },
   v4ER8: { flexDirection: 'row', justifyContent: 'space-around' },
   text2ER8: { fontSize: 14, color: '#CCCCCC', marginLeft: 20 },
   text3ER8: { fontSize: 14, color: '#CCCCCC' },
   text4ER8: { fontSize: 18,marginBottom:5, color: '#CCCCCC', alignSelf: 'center', marginTop: 10 }, //add alignself

   ///////Manage Projects
   ///tabs
   ///Active
   Containerr: { alignItems: 'center', backgroundColor: '#110717' },
   texte: { fontSize: 12, color: '#545454' },
   text2e: { fontSize: 14, color: '#FFFFFF' },
   v1e: { width: '100%', backgroundColor: '#1F1724', alignSelf: "center", borderRadius: 10, marginTop: 10, padding: 10 },
   v3e: { flexDirection: "row", marginTop: 10, justifyContent: 'space-between' },
   v4e: { height: 40, flexDirection: "column" },
   v5e: { width: '100%', flexDirection: 'row' },
   v6e: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
   v22: { width: '15%', justifyContent: "center" },
   v44: { width: '82%', marginLeft: 10, flexDirection: "column", justifyContent: 'center' },
   imagestyle: { width: 50, height: 50, alignSelf: 'center' },
   text1e: { fontSize: 16, color: '#CCCCCC' },
   text22: { fontSize: 12, color: '#8D8D8D' },
   deadline: { color: '#8D8D8D', marginLeft: 10, marginTop: 15 },
   date: { color: '#8D8D8D', fontSize: 10 },
   //new

   textu: { fontSize: 12, color: '#FFFFFF' },
   v3u: { flexDirection: "row", marginTop: 14, justifyContent: 'space-between', marginBottom: 5 },
   v4u: { height: 37, width: '47%', borderRadius: 20, flexDirection: "column", backgroundColor: '#EC9705', alignItems: 'center', justifyContent: 'center' },
   vbtn: { height: 37, width: '47%', borderRadius: 20, flexDirection: "column", borderWidth: 1, borderColor: '#EC9705', alignItems: 'center', justifyContent: 'center' },
   //completed
   //cancelled //both are same style with new
   Containerstyle: { backgroundColor: '#110717' },
   sendername: { color: '#CCCCCC', alignSelf: 'center' },
   vc: { flexDirection: 'column', width: '100%', marginTop: 10 },
   vcc: { width: '100%', borderBottomWidth: 1, borderBottomColor: '#1F1724' },
   text1s: { fontSize: 14, color: '#CCCCCC', alignSelf: 'flex-start', padding: 10 },
   //market place //create company
   inputt: { color: 'grey', fontSize: 15, marginLeft: 5 },
   v7: { width: '75%', borderWidth: 1, borderColor: '#EC9705', borderRadius: 23, height: 43, marginTop: 5, alignItems: "center", justifyContent: "center", alignSelf: 'center', backgroundColor: '#EC9705' },
   footer: { flexDirection: 'row', width: '100%', justifyContent: 'space-around', height: 70, alignSelf: 'center', backgroundColor: '#1F1724', marginTop: 5 },
   textarea: { width: '90%', color: "#878787", borderRadius: 6, height: 90, borderColor: '#878787' },
   textareaError: { borderColor: 'red' },
   v3m: { width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10, height: 150 },
   upicturem: { color: '#878484', fontSize: 12 },
   inputitem: { width: '90%', borderBottomWidth: 1, marginTop: 12, alignSelf: 'center', borderColor: '#878787' },

});