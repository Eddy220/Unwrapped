// Constants
const GET_USER = "user/GET_USER"
const ADD_USER = "user/ADD_USER"
const GET_FRIENDS = "user/GET_FRIENDS"
const ADD_ACCEPTED = "user/ADD_ACCEPTED"
const GET_USERS = "user/GET_USERS"
const DELETE_FRIEND = "users/DELETE_FRIEND"

// Action Creators
const getUser = (payload) => ({
    type: GET_USER,
    payload
})

const addUser = (payload) => ({
    type: ADD_USER,
    payload
})

const getFriends = (payload) => ({
    type: GET_FRIENDS,
    payload
})

const addAccepted = (payload) => ({
    type: ADD_ACCEPTED,
    payload
})

const getUsers = (users) => ({
    type: GET_USERS,
    users: users
})

const delFriend = (payload) => ({
    type: DELETE_FRIEND,
    payload
})

// Thunks
export const getAllUsers = () => async(dispatch) => {
    const res = await fetch('/api/users/')
    const data = await res.json()
    dispatch(getUsers(data))
    return data
}

export const obtainUser = (payload) => async (dispatch) => {
    const { id } = payload
    const res = await fetch(`/api/users/search/${id}`)
    const data = await res.json()
    dispatch(getUser(data))
    return data
}

export const addFriend = (payload) => async (dispatch) => {
    const { id } = payload
    const res = await fetch(`/api/users/request/${id}`)
    const data = await res.json()
    dispatch(addUser(data))
    return data
}

export const obtainFriends = (payload) => async (dispatch) => {
    const res = await fetch('/api/users/getfriends')
    const data = await res.json()
    dispatch(getFriends(data))
    return data
}

export const makeFriend = (payload) => async (dispatch) => {
    const id = payload
    const res = await fetch(`/api/users/accepted/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data =  await res.json()
    dispatch(addAccepted(data))
    return data
}

export const deleteFriend = (payload) => async (dispatch) => {
    const id = payload
    const res = await fetch(`/api/users/accepted/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    dispatch(delFriend(data))
    return data;
}

// Initial State

const initalState = {friends: {}}


// Reducer

export default function reducer(state = initalState, action) {
    let newState;
    switch (action.type) {
        case GET_USER:
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        case GET_USERS:
            newState = {...state}
            action.users.users.forEach((user) => {
                newState[user.id] = user
            })
            return newState
        case ADD_USER:
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        case GET_FRIENDS:
            newState = {...state}
            newState.friends = {...action.payload}
            return newState
        case ADD_ACCEPTED:
            newState = {...state}
            newState.friends = {...state.friends, ...action.payload}
            return newState
        case DELETE_FRIEND:
            newState = {...state}
            let deleteState = newState.friends
            delete deleteState[action.payload.id]
            return newState;
        default:
            return state;
    }
}
