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
    const user = useSelector((state) => state.session.user)
    const [username, setUsername] = useState('')
    const [searchedUserid, setSearchedUserid] = useState(null)
    const [request, setRequest] = useState()
    const usersArray = Object.values(users)
    const [isLoaded, setIsLoaded] = useState(false)

    // console.log(usersArray)
    // console.log(Object.values(usersArray))

    // useEffect(() => {
    //     dispatch(getAllUsers())
    //     dispatch(obtainFriends())
    // },[dispatch])

    let searchedUser;

    const searchButton = async (e) => {
        e.preventDefault();

        let users = usersArray.slice(0,-1)

        searchedUser = users.filter(user => {
            let stringToCompare = user.username.toLowerCase()
            let searchedString = username.toLowerCase()

            if (stringToCompare.startsWith(searchedString)) {
                return true
            }
            else {
                return false
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

    useEffect(async () => {
        await dispatch(getAllUsers())
        await dispatch(obtainFriends())
    }, [dispatch])

    // useEffect(() => {
    //     if (user && users) {
    //         setIsLoaded(true)
    // }}, [users])

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
