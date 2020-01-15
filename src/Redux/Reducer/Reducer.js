const initialState = {
    counter: 0
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'INCREASE_COUNTER':
            return { counter: state.counter + 1 }
        //break;
        case 'DECREASE_COUNTER':
            return { counter: state.counter - 1 }
        case 'COUNTER_SET':
            return { counter: action.value }
        case 'SignUp':
            return { 

                
            }


    }
    return state;
}