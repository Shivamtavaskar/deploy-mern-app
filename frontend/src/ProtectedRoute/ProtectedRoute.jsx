import React from 'react'
import useAuth from '../hooks/useAuth'
import {Outlet, Navigate} from "react-router-dom"

const ProtectedRoute = () => {

    const isAuthenticated = useAuth()
    
    if(isAuthenticated){
        return <Outlet/>
    }else{
        return <Navigate to="/login"/>
    }
}

export default ProtectedRoute
