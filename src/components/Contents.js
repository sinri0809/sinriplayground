import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { connectDB } from '../database';
// import './../style/home.scss';

const Contents = () => {
  const [contents, setContents] = useState([]); // unmounted error
  const contentsRef = collection(connectDB, "글");
  
  const [miniWindow, setMiniWindow] = useState(false);
  const [miniContent, setMiniContent] = useState({});
  
  console.log(miniWindow);
  // const [editMode, setEditmode] = useState(false);

  useEffect(() => {
    onSnapshot(contentsRef, (snaps) => setContents(snaps.docs.map((doc) => ({id: doc.id, ...doc.data()}))));
    // return () => setContents(contents);
  }, []);

  const onClickWindow = (index) => {
    setMiniWindow(true);
    const {title, text, date} = contents[index];
    setMiniContent({title, text, date});
  }

  return <section className='contents'>
    <div className="contents-title">
      <h2>Etude, Life</h2>
      <p>글, 메모, 기록</p>
    </div>
    
    <div className="contents-container">
    {
      contents.map((item, index) => {
        const {title, text, date} = item;
        return <button key={index} onClick={()=>onClickWindow(index)}>
          <h4>{title}</h4>
          <p>{text}</p>
          <p>{date}</p>
        </button>
      })
    }
    </div>

    {
      miniWindow &&
      <div className='miniwindow'>
        <div className='miniwindow-container'>
          <div className='btn-top'>
            <button>수정</button>
            <button onClick={()=>setMiniWindow(false)}>닫기</button>
          </div>
          <h4>{miniContent.title}</h4>
          <div className='text-area'>
            <p>{miniContent.text}</p>
          </div>
          <p>{miniContent.date}</p>
        </div>
      </div>
    }
  </section>
}

export default Contents;