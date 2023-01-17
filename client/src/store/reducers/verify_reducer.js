import {
    LOGIN,
    INPUT_CONTENT,
    LOGIN_SPINNER,
    LOGIN_IMAGE,
    LOGOUT,
    CHECK_LOGIN,
    CASH_DATA,
    CASH_CHANGE,
    ADD_CASH,
    START_AMOUNT,
    SYSTEM_AMOUNT,
    RESET_AMOUNT,
    PATH_NAME,
    RESULT
} from '../types';

import happinessImg from '../../image/happiness.webp';

const defaultState = {
    inputContent: '密码登入',
    loginSpinner: false,
    loginImg: happinessImg,
    login: false,
    systemAmount: 0,
    startAmount: 0,
    cashArr: [],
    resetBtn: false,
    result: 0
}

export default function verifyReducer(state = defaultState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, ...action.payload, loginSpinner: false }

        case INPUT_CONTENT: {
            return { ...state, inputContent: action.payload }
        }
        case LOGIN_SPINNER: {
            return { ...state, loginSpinner: action.payload }
        }
        case LOGIN_IMAGE: {
            return { ...state, loginImg: action.payload }
        }
        case LOGOUT: {
            return { ...state, ...action.payload }
        }
        case CHECK_LOGIN: {
            return { ...state, ...action.payload }
        }
        case CASH_DATA: {
            return { ...state, ...action.payload }
        }
        case CASH_CHANGE: {
            return {...state, ...action.payload}
        }
        case ADD_CASH: {
            return {...state, cashArr: action.payload}
        }
        case START_AMOUNT: {
            return {...state, startAmount: action.payload}
        }
        case SYSTEM_AMOUNT: {
            return {...state, systemAmount: action.payload}
        }
        case RESET_AMOUNT: {
            return {...state, ...action.payload}
        }
        case PATH_NAME: {
            return {...state, resetBtn: action.payload}
        }
        case RESULT: {
            return {...state, result: action.payload}
        }


        default:
            return state;
    }
}