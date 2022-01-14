import React from 'react';
import Comment from './../Comment';
import Contents from "./../Contents";


const Home = ({user}) => {
  return <div className="wrap">
    <div className="container">
      <Comment user={user} />
      <Contents />
    </div>
  </div>
}

export default Home;