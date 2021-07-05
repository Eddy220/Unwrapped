
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import './NavBar.css'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const NavBar = () => {
  const loggeduser = useSelector(state => state.session.user)

  if (loggeduser) {
    return (
      <div>
      <nav className='navbarLogged'>
        <div className='navBtnContainerLogged'>
        <a className='navLogoLinkLogged' href="/home"><div className='navLogo'>U N W R A P P E D</div></a>
          <NavLink to='/lists' exact={true} className='navBtnsLogged'>MY LISTS</NavLink>
          <NavLink to='/friends' exact={true} className='navBtnsLogged'>MY FRIENDS</NavLink>
          <LogoutButton/>
        </div>
      </nav>
        <div className='footer'>
          <div className='footerLinks'>
              <div className='footerName'>
              <a className='eddykim' href='https://github.com/Eddy220'>Eddy Kim</a></div>
              <a href='https://github.com/Eddy220/Unwrapped'>
                <FaGithub className='footerIcons'/>
              </a>
              <a href='https://www.linkedin.com/in/edward-kim-a97538215/'>
                <FaLinkedin className='footerIcons'/>
              </a>
            </div>
        </div>
          {/* <img className='Unwrapped © 2021'></img> */}
      </div>
    )
  } else {
    return (
      <div>
      <nav className='navbar'>
        <div className='navBtnContainer'>
        <a className='navLogoLink' href="/"><div className='navLogo'>U N W R A P P E D</div></a>
            <NavLink to='/login' exact={true} className='navBtns'>L O G I N</NavLink>
            <NavLink to='/sign-up' exact={true} className='navBtns'>S I G N U P</NavLink>
        </div>
      </nav>
      <div className='footer'>
          <div className='footerLinks'>
              <div className='footerName'>
              <a className='eddykim' href='https://github.com/Eddy220'>Eddy Kim</a></div>
              <a href='https://github.com/Eddy220/Unwrapped'>
                <FaGithub className='footerIcons'/>
              </a>
              <a href='https://www.linkedin.com/in/edward-kim-a97538215/'>
                <FaLinkedin className='footerIcons'/>
              </a>
            </div>
        </div>
          {/* <img className='Unwrapped © 2021'></img> */}
      </div>
    );
  }
}

export default NavBar;
