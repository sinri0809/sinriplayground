/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from '../database';
import AppRouter from './Router';
import styled from 'styled-components';
import { sinri } from "../database";
import { Link } from "react-router-dom";

const Profile = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: white;
`;

function App() {
  let history = useHistory();
  const [loading, setLoadig] = useState(true);
  const [login, setLogin] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    setLogin(false);
    authService.onAuthStateChanged((user) => {
      if(user){
        setLogin(true);
        setUser(user);
      }else{
        setLogin(false);
        setUser({
          uid : "visitor",
          displayName: "관객",
          photoURL: "https://firebasestorage.googleapis.com/v0/b/sinriplayground.appspot.com/o/temp_profile.png?alt=media&token=8db0cfe8-2592-4f1e-acbf-0bd44e237bec"
        })
      }
      setLoadig(false);
      history.push('/');
    });
  }, []);

  return <>
    <header>
    <div className="container">
      <nav>
        <mark>
          <Link to="/">🏠Fifty shades of sinri</Link>
        </mark>
        <div>
          {
            user.uid === sinri.id &&
            <Link to="/content">upload</Link>
          }
          <Link to="/user" className='btn-user'>
            {user.uid === "visitor" && "Log In"}
            <Profile src={user.photoURL} alt="profile" />
          </Link>
        </div>
      </nav>
      <div className='header-maindoor'>
        <p>sinri gallery📻</p>
      </div>
    </div>
    </header>
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
