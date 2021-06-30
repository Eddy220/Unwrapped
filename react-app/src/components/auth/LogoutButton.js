import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };
  return <NavLink to='/' exact={true} activeClassName='active' onClick={onLogout}>SIGN OUT</NavLink>
  // return <button onClick={onLogout}>SIGN OUT</button>;
};

export default LogoutButton;
