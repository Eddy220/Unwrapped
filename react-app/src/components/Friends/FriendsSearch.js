import React, { useState }from "react"
import { obtainUser } from "../../store/user"
import { useDispatch } from 'react-redux'
import "./FriendsSearch.css"

const FriendsSearch = () => {
    const dispatch = useDispatch()
    const [userId, setUserId] = useState()

    const searchUser = async (e) => {
        e.preventDefault();
        const id = userId

        const data = await dispatch(obtainUser({id}))
    }

    const searchInput = (e) => {
        setUserId(e.target.value)
    }

    return (
        <>
        <div className='SearchContainer'>
            <input
            value={userId}
            onChange={searchInput}
            ></input>
            <button onClick={searchUser}>Search</button>
        </div>
        </>
    )
}



export default FriendsSearch
