import React from "react";
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Header from "./components/header";
import MainLayout from "./hoc/mainLayout";
import Login from "./components/login";
import Calculator from "./components/calculator";
import FourOFour from "./components/404";



const App = () => {


    return (
        <BrowserRouter>
            <Header />
            <MainLayout>
                <Routes>
                    <Route path='*' element={<FourOFour />} />
                    <Route path='/calculator' element={<Calculator />} />
                    <Route path='/' element={<Login />} />
                </Routes>

            </MainLayout>
        </BrowserRouter>
    );
}

export default App;