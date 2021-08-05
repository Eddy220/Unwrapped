import React, {useEffect, useState} from 'react';
import { getAllUsers, makeFriend, obtainFriends, deleteFriend } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import './FriendsAccepted.css'
import { Link, useHistory } from "react-router-dom"
import gift from '../../../src/images/z-gift.png'

const FriendsAccepted = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const friendrequests = useSelector(state => (state.user.friends.incomingfriends))
    const user = useSelector(state => state.session.user)
    const users = useSelector(state => state.user)
    const requester_user = useSelector(state => {
        let incomingfriendrequests = []
        if (!state.user.friends.incomingfriends) return null
        Object.keys(state.user.friends.incomingfriends).map((key) => {
            let accepter = state.user.friends.incomingfriends[key].accepter_id
            let status = state.user.friends.incomingfriends[key].status
            let requester = state.user.friends.incomingfriends[key].requester_id
            if (accepter == user.id && status == false) {
                incomingfriendrequests.push(requester)
            }
        })
        return incomingfriendrequests
    })

    const friends = useSelector(state => {
        let incomingfriendrequests = []
        if (!state.user.friends.incomingfriends) return null
        Object.keys(state.user.friends.incomingfriends).map((key) => {
            let accepter = state.user.friends.incomingfriends[key].accepter_id
            let status = state.user.friends.incomingfriends[key].status
            let friend = state.user.friends.incomingfriends[key].requester_id
            if (status == true && friend != user.id) {
                incomingfriendrequests.push(friend)
            }
            if (status == true && accepter != user.id) {
                incomingfriendrequests.push(accepter)
            }
        })
        return incomingfriendrequests
    })



    const incomingfriends = requester_user? requester_user.map(requester => {
        return requester?.incomingfriends
    }) : null

    const comingfriends = friends? friends.map(friend => {
        return friend?.incomingfriends
    }) : null


    const friendsAcceptedSubmit = async (e) => {
        e.preventDefault()
        const id = e.target.value
        console.log(id)
        const data = await dispatch(makeFriend(id))
        history.push('/friends')
        history.go(0)
    }

    const friendsDeleteSubmit = async (e) => {
        e.preventDefault()
        const id = e.target.value
        // console.log(id, 'this is the ID!!!')
        const data = await dispatch(deleteFriend(id))
        history.push('/friends')
        history.go(0)
    }
    // console.log(friends, 'hey this is friends')

    return (
        <>
        <div className='FriendsOuter'>
            <div className='FriendsContainer'> Friends:
                {friends && friends.map((id) => {
                    return (
                        <>
                            <Link key={id} className='FriendsLinks'to={`/users/${users[id].id}`}>{users[id]?.username}</Link>
                            <button className='friendButton' type='button' key={id} value={id} onClick={friendsDeleteSubmit}>Remove</button>
                        </>

                    )
                })}
            </div>
            <div className='FriendsContainerImage'>
                <img className='FriendsImage' src={gift}></img>
            </div>
            <div className='FriendsContainer'> Friend Requests:
                {requester_user && requester_user.map((id) => {
                    return (
                        <>
                            <Link key={id} className='FriendsLinks'to={`/users/${users[id].id}`}>{users[id]?.username}</Link>
                            <div className='friendButtons'>
                                <button className='friendButton' type='button' key={id} value={id} onClick={friendsAcceptedSubmit}>Accept</button>
                                <button className='friendButton' type='button' key={id} value={id} onClick={friendsDeleteSubmit}>Cancel</button>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default FriendsAccepted
