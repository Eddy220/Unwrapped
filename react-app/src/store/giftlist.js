// Constants
const ADD_GIFTLIST = "giftlist/ADD_GIFTLIST"
const GET_GIFTLISTS = "giftlist/GET_GIFTLISTS"
const EDIT_GIFTLIST = "giftlist/EDIT_GIFTLIST"
const REMOVE_GIFTLIST = "giftlist/REMOVE_GIFTLIST"


// Action Creators
const addGiftlist = (payload) => ({
    type: ADD_GIFTLIST,
    payload
})

const getGiftlists = (payload) => ({
    type: GET_GIFTLISTS,
    payload
})

const editGiftlists = (payload) => ({
    type: EDIT_GIFTLIST,
    payload
})

const removeGiftlist = (payload) => ({
    type: REMOVE_GIFTLIST,
    payload
})



// Thunks

export const obtainGiftlists = (payload) => async (dispatch) => {
    const { id } = payload
    const res = await fetch('/api/giftlists/all/user')
    const data = await res.json()
    if (data.errors) {
        return data
    }
    console.log(data, 'hey yo')
    dispatch(getGiftlists(data))
}

export const postGiftlist = (payload) => async (dispatch) => {
    const { list_name } = payload
    const res = await fetch('/api/giftlists/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            list_name
        })
    })

    const data = await res.json()
    if (data.errors) {
        return data
    }
    dispatch(addGiftlist(data))
}


// Initial State
const initialState = {giftlists: {}}



// Reducer

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_GIFTLIST:
            newState = {...state}
            newState.giftlists = action.payload
            return newState
        case GET_GIFTLISTS:
            newState = {...state}
            action.payload.giftlists.forEach((giftlist) => {
                newState.giftlists[giftlist.id] = giftlist
            })
            return newState
        default:
            return state;
    }
}
