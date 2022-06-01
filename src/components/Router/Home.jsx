import React from 'react';

import Comment from './../Comment';
import Contents from "./../Contents";
import Music from '../Music';
import TabEx from 'components/TabEx';


const Home = () => {
  return <main className="container">
    <TabEx />
    <Comment />
    <Contents />
    <Music />
  </main>
}

export default Home;