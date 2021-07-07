import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router"
import { updateGift } from "../../store/gift"
import "./EditGiftForm.css"

const EditGiftForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const gift = useSelector(state => state.gift.gifts)
    const [gift_name, setNewGiftName] = useState(gift?.gift_name)
    const [gift_description, setNewGiftDescription] = useState(gift?.gift_description)
    const [gift_link, setNewGiftLink] = useState(gift?.gift_link)
    // console.log(gift)
    const { id } = useParams()

    const updateNewGiftName = (event) => {
        setNewGiftName(event.target.value)
    }

    const updateNewGiftDescription = (event) => {
        setNewGiftDescription(event.target.value)
    }

    const updateNewGiftLink = (event) => {
        setNewGiftLink(event.target.value)
    }

    const onEdit = async (event) => {
        event.preventDefault();
        const gift_id = gift[id].id
        const giftlist_id = gift[id].list_id
        // console.log(gift_id)
        await dispatch(updateGift({gift_id, gift_name, gift_description, gift_link}))

        history.push(`/gifts/${giftlist_id}`)
    }

    useEffect(() => {

    }, [gift])

    return (
        <>
        <div className='EditGiftFormContainer'>
            <form className='EditGiftForm' onSubmit={onEdit}>
                <div>
                    <label> Gift Name </label>
                    <input
                    name="gift_name"
                    value={gift_name}
                    type="text"
                    onChange={updateNewGiftName}
                    ></input>
                </div>
                <div>
                    <label> Gift Description </label>
                    <input
                    name="gift_description"
                    value={gift_description}
                    type="text"
                    onChange={updateNewGiftDescription}
                    ></input>
                </div>
                <div>
                    <label> Gift Link </label>
                    <input
                    name="gift_link"
                    value={gift_link}
                    type="text"
                    onChange={updateNewGiftLink}
                    ></input>
                </div>
                <button type="submit"> Edit </button>
            </form>
        </div>
        </>
    )
}

export default EditGiftForm
