import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'
import { obtainGifts } from '../../store/gift'
import './IndividualGiftPage.css'

const Gifts = () => {
    const dispatch = useDispatch()
    let gifts = useSelector(state => Object.values(state.gift.gifts))
    const { id } = useParams()

    useEffect(async () => {
       await dispatch(obtainGifts(id))
    }, [])

    return (
        <>
            <div className='giftPageContainer'>
                <div className='giftContainer'>
                    {gifts.map((gift) =>
                        <div> {gift.gift_name} {gift.gift_description} {gift.gift_link} </div>
                    )}
                </div>
            </div>
            <NavLink className='addGiftLink' to={`/gifts/${id}/giftform`}> ADD </NavLink>
        </>
    )
}

export default Gifts
