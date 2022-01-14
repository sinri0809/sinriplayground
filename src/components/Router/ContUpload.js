/* eslint-disable */
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { connectDB } from "../../database";


const ContUpload = () => {
  const today = new Date();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [attach, setAttach] = useState("");
  
  const contSection = ["글", "사진", "그림"];
  const [section, setSection] = useState(contSection[0]);
  const contentsRef = collection(connectDB, String(section));
  
  const onTitle = (event) => setTitle(event.target.value);
  const onText = (event) => setText(event.target.value);
  
  const onClickSection = (index) => setSection(contSection[index]);

  const onSubmit = async (event) => {
    event.preventDefault();
    // getMonth : 0이 1월
    addDoc(contentsRef, {
      title,
      text,
      attach,
      date: `${today.getUTCFullYear()}-${today.getUTCMonth()+1}-${today.getUTCDate()}, ${today.getUTCHours()}:${today.getUTCMinutes()}`
    }).then((fulfilled) => {
      // console.log(fulfilled)
      setTitle("");
      setText("");
      window.alert("ok")
    })
  }


  return <section>
    <div className="container">

    <h3>게시글 업로드</h3>

    <ul>
      {
      contSection.map((item, index) => {
        return <li key={index}>
          <button onClick={() => onClickSection(index)}>{item}</button>
        </li>
      })
      }
    </ul>
    {section}
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="제목" maxLength={20} required 
        onChange={onTitle} value={title}
      />
      <input type="file" accept="image" name="picture" alt="이미지 첨부" 
        width="150px" height="150px"
      />
      <textarea onChange={onText} value={text} placeholder="내용" width="100%" ></textarea>
      <input type="submit" resize="vertical" />
    </form>

    </div>

  </section>
}


export default ContUpload;