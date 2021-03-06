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
            let accepter = state.user.friends.incomingfriends[key].accepter_id
            let status = state.user.friends.incomingfriends[key].status
            let friend = state.user.friends.incomingfriends[key].requester_id
            if (status == true && friend != user.id) {
                friendsArray.push(friend)
            }
            if (status == true && accepter != user.id) {
                friendsArray.push(accepter)
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
            <div className='UpcomingDatesContainer'> Birthdays:
                {friends.map((id) => {
                    return (
                        <div className='UpcomingDates' key={id}>{users[id].full_name}: {users[id].birthday.toString().slice(4,16)}</div>
                    )
                })}
            </div>
        </>
    )
}


export default UpcomingDates
