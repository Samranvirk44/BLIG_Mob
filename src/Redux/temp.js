import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Platform, StyleSheet, Text, Button, View } from 'react-native';
import { counterdecrement, counterincrement, counterset } from './Actions/Actions'

class Counterapp extends Component {


    render() {
        //  const {navigate} = this.props.navigation;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>

                    <Button style={{ width: 50 }}
                        title="Increment"
                        onPress={() => this.props.counterset(5)}
                    />
                    <Text style={{ width: 50, fontSize: 18, alignSelf: 'center' }}>{this.props.counter}</Text>
                    <Button style={{ width: 50 }}
                        title="Decrement"
                        //  onPress={() => this.props.decreasecounter()}
                        onPress={() => this.props.counterdecrement()}
                    />

                </View>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        counter: state.counter
    }
}
//   function mapDispatchToProps(dispatch){
//       return{
//           increasecounter:()=>dispatch({ type:'INCREASE_COUNTER'}),
//           decreasecounter:()=>dispatch({type:'DECREASE_COUNTER'})
//       }
//   }
export default connect(mapStateToProps, { counterincrement, counterdecrement, counterset })(Counterapp);
