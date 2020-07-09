import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
    isLogin: false,
    token: null,
    isLoggingIn: false,
    isSigningUp: false,
    signupErrors: null,
    loginErrors: null,
    user: null
}

const Reducer = (state = initialState, action) => {
    switch(action.type){
        case 'RESET_TOKEN':
            return {
                ...state,
                token: action.payload.token
            }
        case 'LOGIN':
            return {
                ...state,
                isLoggingIn: true,
                token: null,
                loginErrors: null
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isLoggingIn: false
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isLoggingIn: false,
                loginErrors: action.payload.errors
            }
        case 'SIGNUP':
            return {
                ...state,
                isSigningUp: true,
                token: null,
                signupErrors: null
            }
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isSigningUp: false
            }
        case 'SIGNUP_FAILURE':
            return {
                ...state,
                isSigningUp: false,
                signupErrors: action.payload.errors
            }
        default: 
            return state
    }
}

export default createStore(Reducer, applyMiddleware(thunk));