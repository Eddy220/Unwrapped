import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UpcomingDates.css'

const UpcomingDates = () => {
    const user = useSelector(state => state.session.user)
    const users = useSelector(state => state.user)
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

    const comingfriends = friends.map(friend => {
        return friend?.incomingfriends
    })


    return (
        <>
            <div> Upcoming Dates:
                {friends.map((id) => {
                    return (
                        <div>{users[id].birthday}</div>
                    )
                })}
            </div>
        </>
    )
}


export default UpcomingDates
