import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage/SplashPage';
import Giftlists from './components/List/List';
import Gifts from './components/IndividualGiftPage/IndividualGiftPage';
import GiftForm from './components/IndividualGiftPage/GiftForm';
import EditGiftForm from './components/IndividualGiftPage/EditGiftForm';
import { obtainGiftlists } from './store/giftlist';
import HomePage from './components/HomePage/HomePage';
import EditUser from './components/EditUser';
import FriendsSearch from './components/Friends/FriendsSearch'
import FriendsAccepted from './components/Friends/FriendsAccepted';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/friends' exact={true} >
          <FriendsSearch />
          {/* <FriendsAccepted /> */}
        </Route>
        <ProtectedRoute path='/home' exact={true} >
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/editprofile/:userId' exact={true} >
          <EditUser />
        </ProtectedRoute>
        <ProtectedRoute path='/lists' exact={true}>
          <Giftlists/>
        </ProtectedRoute>
        <ProtectedRoute path='/gifts/:id' exact={true}>
          <Gifts/>
        </ProtectedRoute>
        <ProtectedRoute path='/gifts/:id/giftform' exact={true}>
          <GiftForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/editgift/:id' exact={true}>
          <EditGiftForm/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
