import React from 'react';
import { makeFriend } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import './FriendsAccepted.css'

const FriendsAccepted = () => {
    const dispatch = useDispatch()
    const friendrequests = useSelector(state => (state.user.friends.incomingfriends))

    const friendsAcceptedSubmit = async (e) => {
        e.preventDefault()
        console.log(friendrequests[1].requester_id)
        const id = friendrequests[1].requester_id
        const data = await dispatch(makeFriend(id))
    }

    return (
        <>
            <div className='testcontainer1'>
                <button onClick={friendsAcceptedSubmit}>Accept</button>
            </div>
        </>
    )
}

export default FriendsAccepted
