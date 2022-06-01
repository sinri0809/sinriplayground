import React, { useEffect, useState } from 'react';
import { authService } from './data/database';
import { setLogin } from './data/user';
import { useDispatch } from 'react-redux';

import Header from './components/common/Header';
import AppRouter from './components/Router';
// import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

function App() {
  const [loading, setLoadig] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    // 계정 정보가 변했을 때,
    authService.onAuthStateChanged((userInfo) => {
      if (userInfo) {
        const { uid, displayName, photoURL } = userInfo;
        dispatch(setLogin({ uid, displayName, photoURL }));
      }

      setLoadig(false);
    });
  }, [dispatch]);

  return (<>
    {
      loading
        ? <div>loading</div>
        : <>
          <Header />
          <AppRouter />
        </>
    }
  </>)
}

export default App;