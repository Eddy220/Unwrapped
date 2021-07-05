import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [full_name, setFullname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [profile_image, setProfileimage] = useState('');
  const [about_me, setAboutme] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, full_name, email, password, birthday, profile_image, about_me));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFullname = (e) => {
    setFullname(e.target.value)
  }

  const updateBirthday = (e) => {
    setBirthday(e.target.value)
  }

  const updateProfileimage = (e) => {
    setProfileimage(e.target.value)
  }

  const updateAboutme = (e) => {
    setAboutme(e.target.value)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signupFormContainer'>
    <form className='signupForm' onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='signupFormOuter'>
        <label className='signupLabel'>User Name</label>
        <input
          className='signupInput'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className='signupFormOuter'>
        <label className='signupLabel'>Full Name: </label>
        <input
          className='signupInput'
          type='text'
          name='full_name'
          onChange={updateFullname}
          value={full_name}
        ></input>
      </div>
      <div className='signupFormOuter'>
        <label className='signupLabel'>Email: </label>
        <input
          className='signupInput'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='signupFormOuter'>
        <label className='signupLabel'>Password: </label>
        <input
          className='signupInput'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className='signupFormOuter'>
        <label className='signupLabel'>Repeat Password: </label>
        <input
          className='signupInput'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className='signupFormOuter'>
        <label className='signupLabel'>Birthday: </label>
        <input
          className='signupInput'
          type='date'
          name='birthday'
          onChange={updateBirthday}
          value={birthday}
        ></input>
      </div>
      <div className='signupFormOuter'>
        <label className='signupLabel'>Profile Image: </label>
        <input
          className='loginInput'
          type='file'
          name='profile_image'
          onChange={updateProfileimage}
          value={profile_image}
        ></input>
      </div>
      <div className='signupFormOuter'>
        <label className='signupLabel'>About Me: </label>
        <textarea
          className='loginInput'
          type='text'
          name='about_me'
          onChange={updateAboutme}
          value={about_me}
          rows='3'
          cols='30'
        ></textarea>
      </div>
      <button className='navBtns'type='submit'>Sign Up </button>
    </form>
    </div>
  );
};

export default SignUpForm;
