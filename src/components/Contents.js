/* eslint-disable */
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { connectDB } from '../database';

const Contents = () => {
  const [content, setContents] = useState([]);
  const contentsRef = collection(connectDB, "글");
  
  const [miniWindow, setMiniWindow] = useState(false);
  const [miniContent, setMiniContent] = useState({});

  useEffect(() => {
    onSnapshot(contentsRef, (snaps) => setContents(snaps.docs.map((doc) => ({id: doc.id, ...doc.data()}))));
  }, []);

  const onClickWindow = (index) => {
    setMiniWindow(true);
    const {title, text, date} = content[index];
    setMiniContent({title, text, date});
  }

  return <main>
    <div className="main-title">
      <h2>MasterPiece and Life</h2>
      <p>글, 메모, 기록</p>
    </div>
    {
      miniWindow &&
      <div className='miniwindow'>
        <div className='miniwindow-container'>
          <button onClick={() => setMiniWindow(false)}>닫기</button>
          {/* <button>수정</button> */}
          <h4>{miniContent.title}</h4>
          <p>{miniContent.text}</p>
          <p>{miniContent.date}</p>
        </div>
      </div>
    }
    <div className="contents">
    {
      content.map((item, index) => {
        const {title, text, date} = item;
        return <button key={index} onClick={()=>onClickWindow(index)}>
          <h4>{title}</h4>
          <p>{text}</p>
          <p>{date}</p>

        </button>
      })
    }
    </div>
  </main>
}

export default Contents;