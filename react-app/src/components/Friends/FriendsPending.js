import React from 'react'
import { obtainFriends } from '../../store/user'
import { useDispatch } from 'react-redux'
import "./FriendsPending.css"

const FriendsPending = () => {
    const dispatch = useDispatch()

    const getFriendSubmit = async (e) => {
        e.preventDefault()
        const data = await dispatch(obtainFriends())
    }

    return (
        <>
            <div className='testcontainer'>
                <button onClick={getFriendSubmit}>Temporary get pending friend requests dispatch button</button>
            </div>
        </>
    )
}


export default FriendsPending
