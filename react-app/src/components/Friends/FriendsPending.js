import React from 'react'
import { obtainFriends } from '../../store/user'
import { useDispatch } from 'react-redux'
import "./FriendsPending.css"

const FriendsPending = () => {
    const dispatch = useDispatch()

    // const getFriendRequestsSubmit = async (e) => {
    //     e.preventDefault()
    //     const data = await dispatch(obtainFriends())
    // }

    return (
        <>
            <div className='testcontainer'>
                {/* <button onClick={getFriendRequestsSubmit}>Temporary get pending friend requests dispatch button</button> */}
            </div>
        </>
    )
}


export default FriendsPending
