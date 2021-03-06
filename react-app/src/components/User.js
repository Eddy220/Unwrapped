import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { obtainGiftlists } from '../store/giftlist';
import './User.css'
import Giftlists from './List/List';

function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false)
  const { userId }  = useParams();
  const current_user = useSelector((state) => state.session.user)
  let giftlists = useSelector(state => Object.values(state.giftlist.giftlists))


  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
      dispatch(obtainGiftlists(userId))
    })();
  }, [userId]);

  useEffect(() => {
    if (user) {
      setIsLoaded(true)
  }}, [user])

  // console.log(userId, 'this is userId')
  // console.log(current_user.id, 'this is sessions user id')

  if (user) {
    let newbirthday = new Date(user.birthday)
    let newmonth = newbirthday.getMonth()
    let newday = newbirthday.getDate()
    let newyear = newbirthday.getFullYear()
    // let birthday = newdate.toString().slice(0,16)

    return isLoaded && (
      <div className='profile'>
        <div className='profilePicContainer'>
          <img className='profilepic' src={user.profile_image}></img>
        </div>
        <div className='profileContainer'>
          <div className='profileLabelContainer'>
            <strong className='profileLabels'>Username:</strong> {user.username}
          </div>
          <div className='profileLabelContainer'>
            <strong className='profileLabels'>Full name:</strong> {user.full_name}
          </div>
          <div className='profileLabelContainer'>
            <strong className='profileLabels'>Email:</strong> {user.email}
          </div>
          <div className='profileLabelContainer'>
            <strong className='profileLabels'>Birthday:</strong> {newmonth + 1}-{newday + 1}-{newyear}
          </div>
          <div className='profileLabelContainer'>
            <strong className='profileLabels'>About Me:</strong> {user.about_me}
          </div>
          { ( +userId === current_user.id) &&
          <div className='editProfileBtnContainer'>
            <NavLink className='editProfileBtn'to={`/editprofile/${current_user.id}`}> Edit Profile </NavLink>
          </div>
          }
        </div>
        <div className='profileListContainer'>
        <div className='profileListContainerLabel'>Gift Lists:</div>
        {user.giftlists_rel.map((giftlist) =>
                        <div className='profileLists'>
                            <NavLink to={`/gifts/${giftlist.id}`} className='profileListNames' >{giftlist.list_name} </NavLink>
                        </div>
                    )}
        </div>
      </div>
    );
  }
  else {
    return null
  }

}
export default User;
