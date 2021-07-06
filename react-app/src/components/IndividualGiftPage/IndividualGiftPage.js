import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'
import { obtainGifts, deleteGift, updateGift } from '../../store/gift'
import './IndividualGiftPage.css'

const Gifts = () => {
    const dispatch = useDispatch()
    let gifts = useSelector(state => Object.values(state.gift.gifts))
    const [gift_name, setGiftName] = useState('')
    const [gift_description, setGiftDescription] = useState('')
    const [gift_link, setGiftLink] = useState('')
    const [purchased, setPurchased] = useState(false)

    const { id } = useParams()

    const delGift = async (event) => {
        event.preventDefault()
        await dispatch(deleteGift({id, gift_name, gift_description, gift_link, purchased}))
    }

    useEffect(async () => {
       await dispatch(obtainGifts(id))
    }, [])

    return (
        <>
            <div className='giftPageContainer'>
                <div className='giftContainer'>
                    {gifts.map((gift) =>
                        <div>
                            <div> {gift.gift_name} {gift.gift_description} {gift.gift_link} </div>
                            <button onClick={(event) => delGift(event)}> X </button>
                            <NavLink to={`/editgift/${gift.id}`}>Edit Gift</NavLink>
                        </div>
                    )}
                </div>
            </div>
            <NavLink className='addGiftLink' to={`/gifts/${id}/giftform`}> ADD </NavLink>
        </>
    )
}

export default Gifts
