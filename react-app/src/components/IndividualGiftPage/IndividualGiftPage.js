import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'
import { obtainGifts, deleteGift, updateGift } from '../../store/gift'
import { obtainGiftlists } from '../../store/giftlist'
import './IndividualGiftPage.css'

const Gifts = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    // const current_user = useSelector((state) => state.session.user)
    const giftlist = useSelector((state => state.giftlist.giftlists))
    console.log(giftlist, 'this is the giftlists id')
    let gifts = useSelector(state => Object.values(state.gift.gifts))
    const [gift_name, setGiftName] = useState('')
    const [gift_description, setGiftDescription] = useState('')
    const [gift_link, setGiftLink] = useState('')
    const [purchased, setPurchased] = useState(false)
    const ifcurrentuserownslist = useRef()

    const delGift = async (event, gift) => {
        event.preventDefault()
        let gift_id = gift.id
        await dispatch(deleteGift({gift_id, gift_name, gift_description, gift_link, purchased}))
    }

    useEffect(async () => {
       await dispatch(obtainGifts(id))
       await dispatch(obtainGiftlists())
    }, [])

    // console.log(id)
    // console.log(giftlist[id])



    return (
        <>
            <div className='giftPageContainer'>
                <div className='giftContainer'>
                    <div className='giftContainerName'>{giftlist[id]?.list_name}</div>
                    <div className='giftContainerLabelsContainer'>
                        <div className='giftContainerLabels'>Gift </div>
                        <div className='giftContainerLabels'>Description </div>
                        <div className='giftContainerLabels'>Link </div>
                    </div>
                    {gifts.map((gift) =>
                        <div className='singleGift'>
                            <div className='singleGiftLabels'>{gift.gift_name}</div>
                            <div className='singleGiftLabels'>{gift.gift_description}</div>
                            <a className='singleGiftLabelsLink' href={`https://${gift.gift_link}`}> {gift.gift_link} </a>
                            {/* <label className='singleGiftLabels' for='purchased'>Purchased</label>
                            <input className='singleGiftLabels' id='purchased' type='checkbox' name='purchased'></input> */}
                            {giftlist[id]?.id === gift.list_id &&
                            <>
                            { ifcurrentuserownslist.current = true }
                            <button className='singleGiftDeleteButton' onClick={(event) => delGift(event, gift)}> X </button>
                            <NavLink className='editGiftButton' to={`/editgift/${gift.id}`}>Edit Gift</NavLink>
                            </>
                            }
                        </div>
                    )}
                </div>
            </div>
            <div className='addSingleGiftContainer'>
                { ifcurrentuserownslist.current &&
                <NavLink className='addGiftButton' to={`/gifts/${id}/giftform`}> A D D </NavLink>
                }
            </div>
        </>
    )
}

export default Gifts
