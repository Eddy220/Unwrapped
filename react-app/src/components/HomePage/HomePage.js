import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getAllUsers, obtainFriends } from '../../store/user'
import './HomePage.css'
import UpcomingDates from '../UpcomingDates/UpcomingDates'
import document from '../../../src/images/z-document.png'
import giftbox from '../../../src/images/z-gift-box.png'
import gift from '../../../src/images/z-gift.png'

const HomePage = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector((state) => state.session.user)
    const users = useSelector(state => state.user)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(obtainFriends())
    },[dispatch])

    useEffect(() => {
        if (user && users) {
            setIsLoaded(true)
    }}, [users])

    return isLoaded && (
        <>
            <div className='HomePage'>
                <div className='HomePageProfilePicContainer'>
                    <img className='HomePageProfilepic' src={user.profile_image}></img>
                </div>
                <div className='HomePageGreetingContainer'>
                    <div className='HomePageGreeting'> Welcome back, {user.full_name}!
                        <NavLink className='GoToProfileButton' to={`/users/${user.id}`}> Go to Profile </NavLink>
                    </div>
                </div>
            <UpcomingDates/>
            </div>
            <div className='HomePageImageOuter'>
                <div className='HomePageImagesContainer'>
                    <img className='HomePageImage' src={giftbox}></img>
                </div>
                <div className='HomePageImagesContainer'>
                    <img className='HomePageImage' src={giftbox}></img>
                </div>
                <div className='HomePageImagesContainer'>
                    <img className='HomePageImage' src={giftbox}></img>
                </div>
                <div className='HomePageImagesContainer'>
                    <img className='HomePageImage' src={giftbox}></img>
                </div>
                <div className='HomePageImagesContainer'>
                    <img className='HomePageImage' src={giftbox}></img>
                </div>
                <div className='HomePageImagesContainer'>
                    <img className='HomePageImage' src={giftbox}></img>
                </div>
            </div>
        </>
    )
}


export default HomePage
