import React from 'react';

import Comment from './../Comment';
import Contents from "./../Contents";
import Music from '../Music';


const Home = () => {
  return <main className="container">
    <Comment />
    <Contents />
    <Music />
  </main>
}

export default Home;