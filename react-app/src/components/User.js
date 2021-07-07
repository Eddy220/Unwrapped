import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './User.css'

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const current_user = useSelector((state) => state.session.user)

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  // console.log(userId, 'this is userId')
  // console.log(current_user.id, 'this is sessions user id')

  if (user) {
    let newbirthday = new Date(user.birthday)
    let newmonth = newbirthday.getMonth()
    let newday = newbirthday.getDate()
    let newyear = newbirthday.getFullYear()
    // let birthday = newdate.toString().slice(0,16)

    return (

      <div className='profile'>
        <div className='profileContainer'>
          <div>
            <img src={user.profile_image}></img>
          </div>
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Full name:</strong> {user.full_name}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Birthday:</strong> {newmonth + 1}-{newday + 1}-{newyear}
          </div>
          <div>
            <strong>About Me:</strong> {user.about_me}
          </div>
          { ( +userId === current_user.id) &&
          <NavLink to='/editprofile'> Edit Profile </NavLink>
          }
        </div>
      </div>
    );
  }
  else {
    return null
  }

}
export default User;
