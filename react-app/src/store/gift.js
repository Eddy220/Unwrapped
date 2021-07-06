// Constants
const ADD_GIFT = "gift/ADD_GIFT"
const GET_GIFTS = "gift/GET_GIFTS"
const REMOVE_GIFT = "gift/REMOVE_GIFT"
const EDIT_GIFT = "gift/EDIT_GIFT"



// Action Creators
const addGift = (payload) => ({
    type: ADD_GIFT,
    payload
})

const getGifts = (payload) => ({
    type: GET_GIFTS,
    payload
})

const removeGift = (payload) => ({
    type: REMOVE_GIFT,
    payload
})

const editGift = (payload) => ({
    type: EDIT_GIFT,
    payload
})

// Thunks

export const obtainGifts = (id) => async (dispatch) => {
    const res = await fetch(`/api/gifts/${id}`)
    const data = await res.json()
    if (data.errors) {
        return data;
    }
    dispatch(getGifts(data))
}

export const makeGift = (payload) => async (dispatch) => {
    const { id, gift_name, gift_description, gift_link } = payload
    const res = await fetch(`/api/gifts/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            gift_name,
            gift_description,
            gift_link
        })
    })

    const data = await res.json();
    console.log(data, 'this is data')

    if (data.errors) {
        return data
    }

    dispatch(addGift(data))
}


export const deleteGift = (payload) => async (dispatch) => {
    const { list_id, gift_name, gift_description, gift_link, id } = payload
    const res = await fetch(`/api/gifts/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            list_id,
            gift_name,
            gift_description,
            gift_link
        })
    })

    const data = await res.json();
    if (data.errors) {
        return data
    }
    dispatch(removeGift(data))
}

export const updateGift = (payload) => async (dispatch) => {
    const { list_id, gift_name, gift_description, gift_link, id } = payload
    const res = await fetch(`/api/gifts/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            list_id,
            gift_name,
            gift_description,
            gift_link
        })
    })
    const data = await res.json();
    if (data.errors) {
        return data
    }
    dispatch(updateGift(data))
}


// Initial State
const initialState = {gifts: {}}




// Reducer
export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_GIFTS:
            newState = {...state}
            let updatedNewState = {}
            action.payload.gifts.forEach((gift) => {
                updatedNewState[gift.id] = gift
            })
            newState.gifts = updatedNewState
            return newState;
        case ADD_GIFT:
            newState = {...state}
            newState.gifts[action.payload.id] = action.payload
            return newState;
        case REMOVE_GIFT:
            newState = {...state}
            let giftState = newState.gifts
            delete giftState[action.payload.gifts]
            return newState;
        case EDIT_GIFT:
            newState = {...state}
            newState.gifts[action.payload.id] = action.payload
            return newState;
        default:
            return state;
    }
}
