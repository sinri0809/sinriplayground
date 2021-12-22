/* eslint-disable */
import React, { useEffect, useState } from 'react';
import AppRouter from './Router';


function App() {
  // const [loading, setLoadig] = useState(true);
  const [loading, setLoadig] = useState(false);

  useEffect(() => {

  }, [])

  return <>
  {
    loading 
    ?
    "loading"
    :
    <AppRouter />
  }
  </>
}

export default App;
