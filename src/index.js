import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Provider from './context/Provider';

import IsLoggedIn from "./routes/IsLoggedIn";
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';

import GlobalStyle from './styles/GlobalStyle';
import ResetStyle from "./styles/ResetStyle";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider>
            <BrowserRouter>
                <ResetStyle></ResetStyle>
                <GlobalStyle></GlobalStyle>
                <Routes>
                    <Route path="/" element={<IsLoggedIn></IsLoggedIn>}></Route>
                    <Route path="/login" element={<Login></Login>}></Route>
                    <Route path="/cadastro" element={<Register></Register>}></Route>
                    <Route path="/home" element={<Home></Home>}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);