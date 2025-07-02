import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'


function OnlyAdmin({ children }) {
    const { userdata } = UserAuth()

    if (userdata?.normal && !userdata?.admin) { return <Navigate to={'/account'} /> }
    return children
}

export default OnlyAdmin