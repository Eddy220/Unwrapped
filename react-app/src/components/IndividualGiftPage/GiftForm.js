import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeGift } from '../../store/gift';
import './GiftForm.css'


const GiftForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [gift_name, setGiftName] = useState('')
    const [gift_description, setGiftDescription] = useState('')
    const [gift_link, setGiftLink] = useState('')
    let { id } = useParams()

    const updateGiftName = (event) => {
        setGiftName(event.target.value)
    }

    const updateGiftDescription = (event) => {
        setGiftDescription(event.target.value)
    }

    const updateGiftLink = (event) => {
        setGiftLink(event.target.value)
    }

    const onGiftSubmit = async (event) => {
        event.preventDefault()
        await dispatch(makeGift({id, gift_name, gift_description, gift_link}))
        history.push(`/lists`)
    }

    return (
        <>
            <div className='giftOuter'>
                <form className='addGiftContainer' onSubmit={onGiftSubmit}>
                    <div>
                        <label className='giftLabel'> Gift Name</label>
                        <input
                        className='giftInput'
                        type='text'
                        name='gift_name'
                        onChange={updateGiftName}
                        value={gift_name}
                        ></input>
                    </div>
                    <div>
                        <label className='giftLabel'> Gift Description</label>
                        <input
                        className='giftInput'
                        type='text'
                        name='gift_description'
                        onChange={updateGiftDescription}
                        value={gift_description}
                        ></input>
                    </div>
                    <div>
                        <label className='giftLabel'> Gift Link</label>
                        <input
                        className='giftInput'
                        type='text'
                        name='gift_link'
                        onChange={updateGiftLink}
                        value={gift_link}
                        ></input>
                    </div>
                    <button className='addGiftBtn' type='submit' >Add</button>
                </form>
            </div>
        </>
    )
}


export default GiftForm
