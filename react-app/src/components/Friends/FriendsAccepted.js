import React, {useEffect} from 'react';
import { getAllUsers, makeFriend, obtainFriends } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import './FriendsAccepted.css'

const FriendsAccepted = () => {
    const dispatch = useDispatch()
    // const friendrequests = useSelector(state => (state.user.friends.incomingfriends))
    const requester_user = useSelector(state => Object.values(state.user))

    const incomingfriends = requester_user.map(requester => {
        return requester?.incomingfriends
    })

    // if (incomingfriends !== undefined) {
    //     incomingfriends.forEach(incomingfriend => {
    //         console.log(Object.values(incomingfriend))
    //     })
    // }

    useEffect(() => {
        dispatch(obtainFriends())
        dispatch(getAllUsers())
    },[dispatch])


    const friendsAcceptedSubmit = async (e) => {
        e.preventDefault()
        const id = requester_user.id
        console.log(id)
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
