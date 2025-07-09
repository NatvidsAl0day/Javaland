import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Tours from '../pages/Tours';
import ToursDetails from '../pages/TourDetails';
import Login from '../pages/Login';

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to='/home'/>} />
            <Route path="/home" element={<Home/>}/>
            <Route path="/tours" element={<Tours/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/tours/:id" element={<ToursDetails/>}/>

        </Routes>
        
    )
}

export default Routers;