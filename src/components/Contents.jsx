/**
 * sinriplayground의 컨텐츠가 업로드 되는 곳 
 */
import React, { useState } from 'react';

// import { useSelector, useDispatch } from 'react-redux';
// import { getContent } from './../data/user';

import MiniWindow from './MiniWindow';


const Contents = () => {
  console.log("contents.js is called");

  // const dispatch = useDispatch();

  // const state = useSelector((state) => state.contents);
  const [contents, setContents] = useState([]);


  // useEffect(() => {
  //   dispatch(getContent());
  //   // console.log(state);
  // }, [])


  const [detail, setDetail] = useState({ open: false, });

  const onClickWindow = (open, index) => {
    if (open) {
      const { title, text, date } = contents[index];
      const newDetail = {
        ...detail,
        open,
        index,
        title,
        text,
        date
      }
      setDetail(newDetail);
      return;
    }

    else {
      const newDetail = {
        ...detail,
        open
      }
      setDetail(newDetail);
      return;
    }
  }

  return <section className='contents'>
    <div className="contents-title">
      <h2>Etude, Life</h2>
      <p>글, 메모, 기록</p>
    </div>

    <div className="contents-container">
      {
        contents.map((item, index) => {
          const { title, text, date } = item;

          return <button key={index} onClick={() => onClickWindow(true, index)}>
            <h4>{title}</h4>
            <p>{text}</p>
            <p>{date}</p>
          </button>
        })
      }
    </div>

    <MiniWindow detail={detail} onClickWindow={onClickWindow} />

  </section>
}

export default Contents;