import React, {useEffect, useState} from "react"
import { useDispatch } from "react-redux"
import { addFriend } from "../../store/user"
import "./FriendRequest.css"


const FriendRequest = () => {
    const dispatch = useDispatch()
    const [request, setRequest] = useState()


    const updateRequest = (e) => {
        setRequest(e.target.value)
    }

    const onRequest = async (e) => {
        e.preventDefault()
        const id = request
        const data = await dispatch(addFriend({id}))
    }


    return (
        <>
            <input
            value={request}
            onChange={updateRequest}
            ></input>
            <button onClick={onRequest}>Add</button>
        </>
    )


}


export default FriendRequest
