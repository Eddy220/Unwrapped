
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const loggeduser = useSelector(state => state.session.user)

  if (loggeduser) {
    return (
      <nav>
        <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              MY FRIENDS
            </NavLink>
          </li>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              MY LISTS
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav>
        <ul>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
