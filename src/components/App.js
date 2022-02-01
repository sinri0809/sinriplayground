import React, { useEffect, useState } from 'react';

import AppRouter from './Router';
import Header from './Header';

import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

import { authService } from '../database';
import { setLogin } from '../user';
import { useDispatch } from 'react-redux';

/**
 * * loading: 로딩 중일 때 true
 * useEffect @onAuthStateChanged : 계정 정보가 변할때 그 값을 반환하는 함수
 */

function App() {
  const [loading, setLoadig] = useState(true);

  console.log("app is called");
  // const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    authService.onAuthStateChanged((userInfo) => {
      if(userInfo){
        const { uid, displayName, photoURL} = userInfo;
        dispatch(setLogin({uid, displayName, photoURL}));
      }

      setLoadig(false);
      // 이거 문제가 생기는 거 같음
      // history.push('/');
    });
  }, [dispatch]);

  if(loading){
    return <div className='loading-container'>
      <RefreshRoundedIcon className='loading' fontSize='large' htmlColor='rgba(140, 89, 255, 1)'/>
      <h5>Gallery에 입장하고 계십니다.</h5>
    </div>
  }
  else{
    return <>
      <Header/>
      <AppRouter/>
    </>
  }
}

export default App;
