import React, {useEffect} from 'react';
import { getAllUsers, makeFriend, obtainFriends } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import './FriendsAccepted.css'
import { Link, useHistory } from "react-router-dom"

const FriendsAccepted = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    // const friendrequests = useSelector(state => (state.user.friends.incomingfriends))
    const user = useSelector(state => state.session.user)
    const users = useSelector(state => state.user)
    const requester_user = useSelector(state => {
        let incomingfriendrequests = []
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
        Object.keys(state.user.friends.incomingfriends).map((key) => {
            let status = state.user.friends.incomingfriends[key].status
            let friend = state.user.friends.incomingfriends[key].requester_id
            if (status == true) {
                incomingfriendrequests.push(friend)
            }
        })
        return incomingfriendrequests
    })



    const incomingfriends = requester_user.map(requester => {
        return requester?.incomingfriends
    })

    const comingfriends = friends.map(friend => {
        return friend?.incomingfriends
    })




    const friendsAcceptedSubmit = async (e) => {
        e.preventDefault()
        const id = e.target.value
        console.log(id)
        const data = await dispatch(makeFriend(id))
        history.push('/home')
        history.go(0)
    }

    return (
        <>
            <div className='testcontainer1'> Friends:
                {friends.map((id) => {
                    return (
                        <>
                            <Link to={`/users/${users[id].id}`}>{users[id]?.username}</Link>
                        </>

                    )
                })}
            </div>
            <div className='testcontainer1'> Friend Requests:
                {requester_user.map((id) => {
                    return (
                        <>
                            <div>{users[id]?.username}</div>
                            <button type='button' key={id} value={id} onClick={friendsAcceptedSubmit}>Accept</button>
                        </>
                    )
                })}
            </div>
            <div>

            </div>
        </>
    )
}

export default FriendsAccepted
