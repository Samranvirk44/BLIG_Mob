import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Container, Content, } from 'native-base'
import DeviceInfo from 'react-native-device-info';
import pic from '../../images/Investor/9500.png'
export default class CompanyDetail extends React.Component {
    constructor(props) {
        super(props);

    }
    
    render() {
        return (
            <Container style={styles.Containerstyle}>

                <View style={styles.v2}>


                    <View style={styles.v5}>
                        <Text allowFontScaling={false} style={styles.text3}>About Company</Text>
                    </View>

                    <View style={styles.v6}>
                        <Text allowFontScaling={false} style={styles.text4}>%age Equity</Text>
                        <Text allowFontScaling={false} style={styles.text5}>{this.props.data.equity}</Text>
                    </View>

                    <View style={styles.v7}>
                        <Text allowFontScaling={false} style={{ color: '#8D8D8D' }}>{this.props.data.details}</Text>
                    </View>



                </View>

            </Container>
        );
    }
}
const styles = StyleSheet.create({
    Containerstyle: { backgroundColor: '#110717' },
    v2: { backgroundColor: '#110717', width: '100%', alignItems: "center", marginTop: 10 },
    v5: { width: '90%', height: 40, marginTop: 10 },
    v6: { width: '90%', height: 40, flexDirection: "row", justifyContent: "space-between" },
    v7: { width: '90%', },
    text3: { fontSize: 18, color: '#D5D5D5' },
    text4: { fontSize: 15, color: '#8D8D8D' },
    text5: { fontSize: 20, color: '#EC9705' },


})