import React, { useEffect, useRef } from "react";
import Results from "./results";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { checkLogin, getCashData, cashChange, addCash, changeStartAmount, changeSystemAmount } from '../store/actions';



const Calculator = () => {


    const verify = useSelector(state => state.verify);

    let navigate = useNavigate();

    const dispatch = useDispatch();

    let newCash = useRef();


    useEffect(() => {
        dispatch(checkLogin((b) => {
            if (b.login) {
                navigate('/calculator')
            } else {
                navigate('/')
            }
        }))

        dispatch(getCashData())

    }, [dispatch, navigate, verify.systemAmount, verify.startAmount, verify.login])


    const onChange = (e, i) => {
        let v = e.target.value;
        if (v !== '') {
            dispatch(cashChange(v, i));
        }
    }

    const startAmountOnChange = (e) => {
        let startAmount = e.target.value;
        if (startAmount !== '') {
            setTimeout(() => {
                dispatch(changeStartAmount(startAmount))
            }, 1000);
        }
    }

    const systemAmountOnChange = (e) => {
        let systemAmount = e.target.value;
        dispatch(changeSystemAmount(systemAmount))
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (newCash.current.value !== '') {
            dispatch(addCash(newCash.current.value));
            newCash.current.value = '';
        }

        clearInputValue();
    }

    const clearInputValue = () => {
        const allCashInput = document.querySelectorAll('.cash');

        allCashInput.forEach(tag => {
            tag.value = '';
        })
    }



    return (
        <main className={`form-signin main`} >

            <form onSubmit={onSubmit} className={`${verify.cashArr.length === 0 ? 'main-left' : 'main-left-zero' }`}>

                <Results />

                <div className="d-flex">
                    <div className="m-1">
                        {/* ???????????? */}
                        <div className="form-floating">
                            <input
                                step='any'
                                onChange={systemAmountOnChange}
                                onClick={clearInputValue}
                                type="number"
                                className="form-control mb-2 systemAmount"
                                placeholder="????????????" />
                            <label htmlFor="floatingPassword">
                                ????????????: {verify.systemAmount}
                            </label>
                        </div>
                        {/* ?????? */}
                        <div className="form-floating">
                            <input
                                step='any'
                                onChange={startAmountOnChange}
                                onClick={clearInputValue}
                                type="number"
                                className="form-control mb-2 startAmount"
                                placeholder="??????" />
                            <label htmlFor="floatingPassword">
                                ??????: {verify.startAmount}
                            </label>
                        </div>

                    </div>


                    <div className="m-1">

                        <div className="form-floating">
                            <input
                                step='any'
                                id='newCash'
                                onClick={clearInputValue}
                                ref={newCash}
                                type="number"
                                className="form-control mb-2 "
                                placeholder="????????????" />
                            <label htmlFor="floatingPassword">
                                ????????????
                            </label>
                        </div>

                        <button type="submit" className='mb-3 w-100 btn btn-lg btn-primary' style={{ height: '58px' }}>
                            ????????????
                        </button>

                    </div>

                    <div className="m-1"  >
                        {
                            verify.cashArr.length > 0 || verify.cashArr !== undefined ?

                                verify.cashArr.map((cash, i) => {
                                    // console.log(arr)
                                    return (
                                        <div className="form-floating" key={i}>
                                            <input
                                                // step='any'
                                                onChange={(event) => onChange(event, i)}
                                                onClick={clearInputValue}
                                                type="number"
                                                className="form-control mb-2 cash"
                                                placeholder="????????????" />
                                            <label htmlFor="floatingPassword">
                                                {`??????: ${cash}`}
                                            </label>
                                        </div>

                                    )
                                })
                                : null
                        }
                    </div>

                </div>




                <p className={`
                
                mt-5 mb-3 text-muted 
                ${verify.cashArr.length === 0 ? 'result-text-position' : 'result-text-position-zero'}
                `}>&copy; ??????????????? ??? 2022</p>
            </form>
        </main>
    )
}

export default Calculator;


