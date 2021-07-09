import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getAllUsers, obtainFriends } from '../../store/user'
import './HomePage.css'

const HomePage = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(obtainFriends())
    },[dispatch])

    return (
        <>
            <div className='HomePage'>
                <NavLink to={`/users/${user.id}`}> Go to Profile </NavLink>
            </div>
        </>
    )
}


export default HomePage
