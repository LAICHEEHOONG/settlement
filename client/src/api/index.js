import axios from 'axios';
import goodImg from '../image/good.webp';
import drunkImg from '../image/drunk.webp';

export const resetAmount = async () => {
    try {
        const resetData = await axios.get('/api/settlement/reset');

        // console.log(resetData.data);

        return resetData.data;
    } catch (err) {
        console.log(err);
    }
}

export const changeSystemAmount = async (systemAmount) => {
    try {
        const patchSystemAmount = await axios.patch('/api/settlement/systemAmount', { systemAmount });

        return patchSystemAmount.data.systemAmount;
    } catch (err) {
        console.log(err);
    }
}

export const changeStartAmount = async (startAmount) => {
    try {
        const patchStartAmount = await axios.patch('/api/settlement/startAmount', { startAmount });

        return patchStartAmount.data.startAmount;
    } catch (err) {
        console.log(err);
    }
}

export const addCash = async (cash) => {
    try {
        const add_cash = await axios.patch('/api/settlement', { cash });
        return add_cash.data;//cashArr
    } catch (err) {
        console.log(err);
    }
}

export const login = async (password) => {

    try {
        const response = await axios.post('/api/login', { password });

        let data = response.data;

        if (data.login) {
            data = { ...data, loginImg: goodImg, inputContent: '密码正确' }
        } else {
            data = { ...data, loginImg: drunkImg, inputContent: '密码错误' }
        }
        // console.log(data);


        return data;//{login: true} or {login: false}

    } catch (err) {
        console.log(err);
    }
}

export const checkLogin = async () => {
    try {
        const response = await axios.get('/api/verify');
        // console.log(response.data)
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const getCashData = async () => {
    try {
        const res = await axios.get('/api/settlement');
        const data = res.data;
        // console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}

export const cashChange = async (v, i) => {
    try {
        const updateCashChange = await axios.patch('/api/settlement/change-cash', { v, i });

        return updateCashChange.data;

    } catch (err) {
        console.log(err);
    }
}