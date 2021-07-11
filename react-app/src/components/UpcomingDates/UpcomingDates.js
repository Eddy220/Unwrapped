import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UpcomingDates.css'

const UpcomingDates = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session.user)
    const users = useSelector(state => state.user)
    const friends = useSelector(state => {
        if (state.user.friends.incomingfriends) {
        let friendsArray = []
        Object.keys(state.user.friends.incomingfriends).map((key) => {
            let status = state.user.friends.incomingfriends[key].status
            let friend = state.user.friends.incomingfriends[key].requester_id
            if (status == true) {
                friendsArray.push(friend)
            }
        })
        return friendsArray
    }
    })

    useEffect(() => {
        if (Object.keys(users).length > 2 && friends) {
            setIsLoaded(true)
    }}, [users, friends])


    return isLoaded && (
        <>
            <div> Upcoming Dates:
                {friends.map((id) => {
                    return (
                        <div key={id}>{users[id].birthday}</div>
                    )
                })}
            </div>
        </>
    )
}


export default UpcomingDates
