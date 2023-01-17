import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { getCashData, checkLogin, resultCal } from '../store/actions';





const Results = () => {


    const verify = useSelector(state => state.verify);
    // const [color, setColor] = useState('');

    const dispatch = useDispatch()

    let navigate = useNavigate();

    let startAmount = verify.startAmount;
    let systemAmount = verify.systemAmount;

    let allCash = () => {
        let all = 0;
        verify.cashArr.forEach((cash) => {
            all = all + cash;
        })

        return all;
    }

    let Answer = () => {
        let ans = (allCash() - (systemAmount + startAmount));
        let obj;
        if (ans === 0) {
            obj = { text: '正确', ans: '', color: '' }
        }
        if (ans > 0) {
            obj = { text: '多', ans: parseFloat(ans.toFixed(2)), color: 'green' }
        }
        if (ans < 0) {
            obj = { text: '少', ans: parseFloat(ans.toFixed(2)), color: 'red' }
        }
        if(isNaN(ans)) {
            obj = { text: 'Error', ans: '', color: 'red' }
        }

        return (
        <div 
        className={`
        ${obj.color} result-text 
        ${allCash() === 0 ? 'result-text-position' : 'result-text-position-zero'}
        `}
        >{obj.text}{obj.ans}</div>)

    }




    useEffect(() => {
        setInterval(() => {
            dispatch(getCashData());
            dispatch(checkLogin((b) => {
                if (b.login) {
                    navigate('/calculator')
                } else {
                    navigate('/')
                }
            }))
        }, 3000)

    }, [dispatch, navigate])

    return (
        <Answer />

    )
}

export default Results;