/* eslint-disable */
import { collection, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connectDB } from '../database';
import ContDetail from './ContDetail';

const ContBox = styled.button`
  padding: 1em;
  margin: 1em 0;
  border: 2px solid lightslategrey;
  border-radius: 1em;
`;



const Contents = () => {
  const [miniCont, setMiniCont] = useState(false);
  const [content, setContents] = useState([]);
  const contentsRef = collection(connectDB, "글");
  
  const toggleState = (state) => setMiniCont(!state);
  useEffect(() => {
    onSnapshot(contentsRef, (snaps) => setContents(snaps.docs.map((doc) => ({id: doc.id, ...doc.data()}))));
  }, []);

  const onClickCont = (index) => {
    const {title, text, date} = content[index];
    toggleState(miniCont)
    console.log(text)
  }
  


  return <main>
    <h2>MasterPiece and Life</h2>
    <p>글, 메모, 기록</p>
    {
      miniCont &&
      <div className='test'>
        <div className='test2'>
          <button onClick={()=>toggleState(miniCont)}>닫기</button>
          <h4>제목</h4>
          <p>내용</p>
          <p>날짜</p>
        </div>
      </div>
    }
    <ContDetail></ContDetail>


    <div>
    {
      content.map((item, index) => {
        // console.log(item.id)
        return <ContBox key={index} onClick={()=>onClickCont(index)}>
          <h4>{item.title}</h4>
          <p>{item.text}</p>
          <p>{item.date}</p>
        </ContBox>
      })
    }
    </div>
  </main>
}


export default Contents;