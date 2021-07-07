// Constants
const GET_USER = "user/GET_USER"

// Action Creators
const getUser = (payload) => ({
    type: GET_USER,
    payload
})


// Thunks
export const obtainUser = (id) => async (dispatch) => {
    const { id } = id
    const res = await fetch(`/api/users/${id}`)
    const data = await res.json()
    dispatch(getUser(data))
}

// Initial State

const initalState = {users: {}}


// Reducer

export default function reducer(state = initalState, action) {
    let newState;
    switch (action.type) {
        case GET_USER:
            newState = {...state}
            return newState
        default:
            return state;
    }
}
