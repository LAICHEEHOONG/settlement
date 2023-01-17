import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from "@react-icons/all-files/ai/AiFillEyeInvisible";
import { AiFillEye } from '@react-icons/all-files/ai/AiFillEye';

import happyImg from '../image/happiness.webp'
// import hopeImg from '../image/hope.webp';
// import goodImg from '../image/good.webp';

import { Spinner } from 'react-bootstrap';

import { login, inputContent, loginSpinner, loginImage, checkLogin } from '../store/actions';




const Login = () => {

    const verify = useSelector(state => state.verify);

    const dispatch = useDispatch();

    let navigate = useNavigate();

    let password = useRef();

    const [hide, setHide] = useState(true)


    useEffect(() => {
        dispatch(checkLogin((b) => {
            if (b.login) {
                navigate('/calculator')
            } else {
                navigate('/')
            }
        }))

    }, [dispatch, navigate])

    const toggleHide = () => {
        if (hide) {
            setHide(false);
        } else {
            setHide(true);
        }
    }





    const submitPassword = (e) => {
        e.preventDefault()
        dispatch(loginSpinner(true))
        dispatch(login(password.current.value, (obj) => {
            if (obj.login) {
                navigate('/calculator')
            }
        }));

        password.current.value = '';

        setTimeout(() => {
            dispatch(inputContent('密码登入'));
            dispatch(loginImage(happyImg));
        }, 5000)

    }







    return (
        <main className="form-signin">
            <form onSubmit={(e) => submitPassword(e)}>

                {
                    verify.loginSpinner ?
                        <Spinner animation="border" role="status" className="login-spinner">
                            <span className="visually-hidden"  >Loading...</span>
                        </Spinner>
                        : null
                }

                {
                    !verify.loginSpinner ? <img className="mb-4 login-img" src={verify.loginImg} alt="login-img" />
                        : null
                }


                <h1 className="h3 mb-3 fw-normal">
                    {verify.inputContent}
                </h1>


                <div className="">
                    <input
                        autoComplete='current-password'
                        ref={password}
                        required="required"
                        type={`${hide ? 'password' : 'text'}`}
                        className="form-control mb-2 password-input"
                        placeholder="请输入密码" />
                    <span className="eye" onClick={toggleHide}>
                        {
                            !hide ? <AiFillEye /> : <AiFillEyeInvisible />
                        }
                    </span>
                </div>

                <button type="submit" className='mb-1  w-100 btn btn-lg btn-primary'>
                    登入
                </button>

                <p className="mt-5 mb-3 text-muted">&copy; 结算计算器 – 2022</p>
            </form>
        </main>
    )
}

export default Login;