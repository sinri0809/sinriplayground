import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { authService, sinri } from '../database';
import AppRouter from './Router';
import styled from 'styled-components';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../user';

const Profile = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background-color: white;
`;
/**
 * * loading: 로딩 중일 때 true
 * * login: 로그인 상태를 Router -> User로 전달
 * * user: user정보를 전함 (로그인이 안돼있으면 default로 전달) 
 * @onAuthStateChanged : 계정 정보가 변할때 그 값을 반환하는 함수
 */

function App() {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let history = useHistory();
  const [loading, setLoadig] = useState(true);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});
  
  useEffect(() => {
    authService.onAuthStateChanged((userInfo) => {
      if(userInfo){
        setLogin(true);
        const { uid, displayName, photoURL } = userInfo;
        //type: 'user/userLogin', 
        dispatch(userLogin({
          send:"confirm",
          login: true,
          uid, displayName, photoURL
        }));
      }else{
        setLogin(false);
        // default user 설정
      }
      setLoadig(false);
      history.push('/');
    });
  }, []);

  useEffect(() => {
    setUser(state);
  }, [state])
  
  return <>
    <header>
    <div className="container">
      <nav>
        <mark>
          <Link to="/" title='home'>🏠</Link>
        </mark>
        <div>
          <button>🎼</button>
          <a target="_blank" className='go-cartoon'
            href="https://comic.naver.com/challenge/list?titleId=788320" rel="naverwebtoon noreferrer">
            🎬
          </a>
          {
            user.uid === sinri.id && // 관리자 일 때,
            <Link to="/content">upload</Link>
          }
          
          <Link to="/user" className='btn-user'>
            {user.uid === "visitor" && "Log In"}
            <Profile src={user.photoURL ?? "https://firebasestorage.googleapis.com/v0/b/sinriplayground.appspot.com/o/temp_profile.png?alt=media&token=8db0cfe8-2592-4f1e-acbf-0bd44e237bec"} alt="profile" />
          </Link>
        </div>
      </nav>
      <h1>Gallery</h1>
    </div>
    </header>
    {
      loading 
      ?<>
      <div className='loading-container'>
        <RefreshRoundedIcon className='loading' fontSize='large' htmlColor='rgba(140, 89, 255, 1)'/>
        <h5>즐거운 곳으로 가는 중...</h5>
      </div>
      </>
      :
      <AppRouter user={user} />
    }
  </>
}

export default App;
