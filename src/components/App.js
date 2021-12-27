/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from '../database';
import AppRouter from './Router';


function App() {
  let history = useHistory();
  const [loading, setLoadig] = useState(true);
  const [login, setLogin] = useState('');

  const [user, setUser] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setLogin(true);
        setUser(user);
      }else{
        setLogin(false);
      }
      setLoadig(false);
      history.push('/');
    });
  }, [])

  return <>
  {
    loading 
    ?
    "loading"
    :
    <AppRouter login={login} user={user} />
  }
  </>
}

export default App;
