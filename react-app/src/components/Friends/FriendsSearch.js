import React, { useEffect, useState }from "react"
import { obtainUser, getAllUsers, obtainFriends, addFriend } from "../../store/user"
import { useDispatch, useSelector } from 'react-redux'
import FriendsAccepted from './FriendsAccepted'
// import FriendRequest from './FriendRequest'
import "./FriendsSearch.css"
import { Link } from "react-router-dom"

const FriendsSearch = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => (state.user))
    const [username, setUsername] = useState('')
    const [searchedUserid, setSearchedUserid] = useState(null)
    const [request, setRequest] = useState()
    const usersArray = Object.values(users)

    // console.log(usersArray)
    // console.log(Object.values(usersArray))

    // useEffect(() => {
    //     dispatch(getAllUsers())
    //     dispatch(obtainFriends())
    // },[dispatch])

    let searchedUser;

    const searchButton = async (e) => {
        e.preventDefault();

        searchedUser = usersArray.filter(user => {
            if (user.username === username) {
                return user
            }
        })
        setSearchedUserid(searchedUser[0].id)
    }

    const requestButton = async (e) => {
        e.preventDefault();
        let id = searchedUserid
        const data = await dispatch(addFriend({id}))
        alert("Your request has been successfully sent!")
    }

    useEffect(() => {
        dispatch(obtainFriends())
    }, [dispatch])

    // console.log(searchedUser)
    // console.log(searchedUserid)

    return (
        <>
        <div className='Friends'>
            <div className='SearchOuter'>
                <div className='SearchContainerTitle'>Search for your Friends</div>
                <div className='SearchContainer'>
                    <input
                    className='SearchInput'
                    value={username}
                    onChange={e=> {setUsername(e.target.value)}}
                    ></input>
                    <button className='SearchButton'onClick={searchButton}>Search</button>
                    {searchedUserid && <Link className='SearchGoToProfile'to={`/users/${searchedUserid}`}>Go to {username}</Link>}
                    {searchedUserid && <button className='SearchRequest' onClick={requestButton}>Request Friend</button>}
                </div>
            </div>
        </div>
        <FriendsAccepted />
        </>
    )
}



export default FriendsSearch
