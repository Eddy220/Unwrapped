import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router"
import { editUser } from "../store/session"
import './EditUser.css'

const EditUser = () => {
    let { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    console.log(user)
    const history = useHistory()
    const [username, setUsername] = useState(user?.username)
    const [full_name, setFullname] = useState(user?.full_name)
    const [email, setEmail] = useState(user?.email)
    const [profile_image, setProfileImage] = useState('')
    const [about_me, setAboutme] = useState(user?.about_me)

    const updateUsername = (event) => {
        setUsername(event.target.value)
    }

    const updateFullname = (event) => {
        setFullname(event.target.value)
    }

    const updateEmail = (event) => {
        setEmail(event.target.value)
    }

    const updateProfileImage = (event) => {
        setProfileImage(event.target.value)
    }

    const updateAboutme = (event) => {
        setAboutme(event.target.value)
    }

    const onEdit = async (event) => {
        event.preventDefault();
        let id = user.id
        await dispatch(editUser({id, username, full_name, email, profile_image, about_me}))

        history.push(`/users/${id}`)
    }

    useEffect(() => {

    }, [user])

    return (
        <>
        <div className='EditProfileContainer'></div>
            <form className='EditProfileForm' onSubmit={onEdit}>
                <div>
                    <label> Username </label>
                    <input
                    name="username"
                    value={username}
                    type="text"
                    onChange={updateUsername}
                    ></input>
                </div>
                <div>
                    <label> Full name </label>
                    <input
                    name="full_name"
                    value={full_name}
                    type="text"
                    onChange={updateFullname}
                    ></input>
                </div>
                <div>
                    <label> Email </label>
                    <input
                    name="email"
                    value={email}
                    type="text"
                    onChange={updateEmail}
                    ></input>
                </div>
                <div>
                    <label> Profile Image </label>
                    <input
                    name="profile_image"
                    value={profile_image}
                    type="file"
                    onChange={updateProfileImage}
                    ></input>
                </div>
                <div>
                    <label> Bio </label>
                    <input
                    name="about_me"
                    value={about_me}
                    type="text"
                    onChange={updateAboutme}
                    ></input>
                </div>
                <button type='submit'>Edit</button>
            </form>
        </>
    )
}



export default EditUser
