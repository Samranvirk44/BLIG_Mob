export const counterincrement = () => {
    return {
        type: 'INCREASE_COUNTER'
    }
}
export const counterdecrement = () => {
    return {
        type: 'DECREASE_COUNTER'
    }
}

export const counterset = (v) => {
    return {
        type: 'COUNTER_SET',
        value: v
    }
}
export const signup = (email,pass) => {
    return {
        type: 'SignUp',
        Email:email,
        Password:pass
    }
}