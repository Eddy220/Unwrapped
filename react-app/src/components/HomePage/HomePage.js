import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getAllUsers, obtainFriends } from '../../store/user'
import './HomePage.css'
import UpcomingDates from '../UpcomingDates/UpcomingDates'

const HomePage = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector((state) => state.session.user)
    const users = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(obtainFriends())
    },[dispatch])

    return (
        <>
            <div className='HomePage'>
                <div className='HomePageGreeting'> Welcome back, {user.username}!
                    <NavLink to={`/users/${user.id}`}> Go to Profile </NavLink>
                </div>
                {/* <UpcomingDates/> */}
            </div>
        </>
    )
}


export default HomePage
