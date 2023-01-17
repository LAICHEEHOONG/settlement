import * as api from '../../api';
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

export const resultCal = (arr, systemAmount, startAmount) => {
    console.log('resultCal')

    let allCash = () => {
        let all = 0;
        arr.forEach((cash) => {
            all = all + cash;
        })

        return all;
    }

    let ans =   (allCash() + startAmount) - systemAmount;

    return {
        type: RESULT,
        payload: ans
    }
}

export const pathName = (toggle) => ({
    type: PATH_NAME,
    payload: toggle
})

export const resetAmount = () => ({
    type: RESET_AMOUNT,
    payload: api.resetAmount()
})

export const changeSystemAmount = (systemAmount) => ({
    type: SYSTEM_AMOUNT,
    payload: api.changeSystemAmount(systemAmount)
})

export const changeStartAmount = (startAmount) => ({
    type: START_AMOUNT,
    payload: api.changeStartAmount(startAmount)
})


export const addCash = (cash) => ({
    type: ADD_CASH,
    payload: api.addCash(cash)
})

export const cashChange = (v, i) => ({
    type: CASH_CHANGE,
    payload: api.cashChange(v, i)
})

export const getCashData = async () => {

    return {
        type: CASH_DATA,
        payload: api.getCashData()
    }
}



export const checkLogin = async (cb) => {
    try {
        cb(await api.checkLogin());
        return {
            type: CHECK_LOGIN,
            payload: api.checkLogin()
        }

    } catch (err) {
        console.log(err)
    }


}


export const login = async (password, cb) => {
    try {
        cb(await api.login(password))
        return {
            type: LOGIN,
            payload: api.login(password)
        }

    } catch (err) {
        console.log(err);
    }

}

export const inputContent = (content) => ({
    type: INPUT_CONTENT,
    payload: content
})

export const loginSpinner = (onOff) => ({
    type: LOGIN_SPINNER,
    payload: onOff
})

export const loginImage = (img) => ({
    type: LOGIN_IMAGE,
    payload: img
})

export const logout = () => ({
    type: LOGOUT,
    payload: { login: false }
})

