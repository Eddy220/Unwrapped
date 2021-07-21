import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { obtainGiftlists, postGiftlist, deleteGiftlist  } from '../../store/giftlist'
import './List.css'

const Giftlists = () => {
    const dispatch = useDispatch()
    const [list_name, setGiftlist] = useState('')
    const user = useSelector(state => state.session.user)
    let giftlists = useSelector(state => Object.values(state.giftlist.giftlists))
    // console.log(giftlists)
    // const [change, setChange] = useState(false)
    let { id } = useParams()

    const updateGiftlists = (event) => {
        setGiftlist(event.target.value)
    }

    const delGiftlist = async (event, giftlist) => {
        event.preventDefault()
        // console.log(giftlist)
        let id = giftlist.id
        await dispatch(deleteGiftlist({list_name, id}))
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const add = await dispatch(postGiftlist({list_name}))
    }

    useEffect(() => {
        const id = user.id
        dispatch(obtainGiftlists(id))
        // setChange(true)
    }, [dispatch])

    return (
        <>
        <div className='listPageContainer'>
            <div className='listContainer'>
                {/* <NavLink to='/' className='lists'> */}
                    {giftlists.slice(0,5).map((giftlist) =>
                        <div key={giftlist} className='listNameDelete'>
                            <NavLink to={`/gifts/${giftlist.id}`} className='listnames' >{giftlist.list_name} </NavLink>
                            <button className='deleteListBtn' onClick={(event)=> delGiftlist(event, giftlist)}>❌</button>
                        </div>
                    )}
                {/* </NavLink> */}
            </div>
            <div className='listsFormContainer'>
                <form className='listsForm' onSubmit={onSubmit}>
                    <div className='listsFormContainer'>
                        <label className='listsFormLabel'>START A NEW LIST ✏️</label>
                        <input
                        className='listsFormInput'
                        type='text'
                        value={list_name}
                        onChange={updateGiftlists}
                        >
                        </input>
                        <button className='listSubmitBtn'> SUBMIT </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Giftlists
