// Constants
const GET_USER = "user/GET_USER"
const ADD_USER = "user/ADD_USER"

// Action Creators
const getUser = (payload) => ({
    type: GET_USER,
    payload
})

const addUser = (payload) => ({
    type: ADD_USER,
    payload
})

// Thunks
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

// Initial State

const initalState = {users: {}}


// Reducer

export default function reducer(state = initalState, action) {
    let newState;
    switch (action.type) {
        case GET_USER:
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        case ADD_USER:
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        default:
            return state;
    }
}
