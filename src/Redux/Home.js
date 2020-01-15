import React, { Component } from 'react';
import Counterapp from '../Navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './Reducer/Reducer'
// const initialState={
//   counter:0
// }

// const reducer=(state=initialState,action)=>{
// switch(action.type){
//   case 'INCREASE_COUNTER':
//     return {counter:state.counter+1}
//     //break;
//     case 'DECREASE_COUNTER':
//       return {counter:state.counter-1}
// }
//   return state;
// }
const store = createStore(reducer)
class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    render() {
       
        return (
            <Provider store={store}>
                <Counterapp />
            </Provider>
        );
    }
}
export default HomeScreen;