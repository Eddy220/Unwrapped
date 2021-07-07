import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import './HomePage.css'

const HomePage = () => {
    const { id } = useParams()
    const user = useSelector((state) => state.session.user)

    return (
        <>
            <div className='HomePage'>
                <NavLink to={`/users/${user.id}`}> Go to Profile </NavLink>
            </div>
        </>
    )
}


export default HomePage
