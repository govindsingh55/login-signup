import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
    isLogin: false,
    token: null,
    isLoggingIn: false,
    isSigningUp: false,
    errors: null,
}

const Reducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload.token
            }
        case 'SET_LOGIN':
            return {
                ...state,
                isLoggingIn: action.payload.isLoggingIn
            }
        case 'SIGNUP':
            return {
                ...state,
                isSigningUp: true
            }
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                token: action.payload.token,
                isSigningUp: false
            }
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                errors: action.payload.errors
            }
        default: 
            return state
    }
}

export default createStore(Reducer, applyMiddleware(thunk));