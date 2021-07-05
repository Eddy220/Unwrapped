import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './Login.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='loginFormContainer'>
    <form className="loginForm" onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='loginFormOuter'>
        <label classnName='loginLabel' htmlFor='email'>Email: </label>
        <input
          className='loginInput'
          name='email'
          type='text'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='loginFormOuter'>
        <label className='loginLabel' htmlFor='password'>Password: </label>
        <input
          className='loginInput'
          name='password'
          type='password'
          value={password}
          onChange={updatePassword}
        />
      </div>
      <button className='navBtns' type='submit'>Login</button>
    </form>
    </div>
  );
};

export default LoginForm;
