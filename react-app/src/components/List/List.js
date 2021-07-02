import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { obtainGiftlists, postGiftlist,  } from '../../store/giftlist'
import './List.css'

const Giftlists = () => {
    const dispatch = useDispatch()
    const [list_name, setGiftlist] = useState('')
    const user = useSelector(state => state.session.user)
    let giftlists = useSelector(state => Object.values(state.giftlist.giftlists))
    console.log(giftlists)
    let { id } = useParams()

    const updateGiftlists = (event) => {
        setGiftlist(event.target.value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const add = await dispatch(postGiftlist({list_name}))
    }

    useEffect(() => {
        const id = user.id
        dispatch(obtainGiftlists(id))
    }, [dispatch])

    return (
        <>
            <div className='lists'>
                {giftlists.map((giftlist) =>
                    <div>{giftlist.list_name}</div>
                )}
            </div>
            <form className='listsForm' onSubmit={onSubmit}>
                <div className='listsFormContainer'>
                    <label className='listsFormLabel'>START A NEW LIST</label>
                    <input
                    className='listsFormInput'
                    type='text'
                    placeholder='List Name...'
                    value={list_name}
                    onChange={updateGiftlists}
                    >
                    </input>
                    <button className='listSubmitBtn'> SUBMIT </button>
                </div>
            </form>
        </>
    )
}

export default Giftlists
