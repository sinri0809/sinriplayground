/* eslint-disable */
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { connectDB } from "../../database";
import './../../style/upload.scss';


const ContUpload = () => {
  const today = new Date();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [attach, setAttach] = useState("");
  
  const contCategory = ["글", "사진", "그림"];
  const [category, setCategory] = useState(contCategory[0]);
  const contentsRef = collection(connectDB, String(category));
  
  const onTitle = (event) => setTitle(event.target.value);
  const onText = (event) => setText(event.target.value);
  
  const onClickCategory = (index) => setCategory(contCategory[index]);

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

  return <section className="container upload-container">
    <h3>게시글 업로드</h3>

    <button className="btn-dropdown">{category}🔻</button>
    <ul>
      {
      contCategory.map((item, index) => {
        return <li key={index}>
          <div onClick={() => onClickCategory(index)}>{item}</div>
        </li>
      })
      }
    </ul>

    <form className="upload-form" onSubmit={onSubmit}>
      <input type="text" placeholder="제목" maxLength={20} required autoFocus
        onChange={onTitle} value={title}
      />
      <input type="file" accept="image" name="picture" alt="이미지 첨부" 
        width="150px" height="150px"
      />
      <textarea onChange={onText} value={text} placeholder="내용" ></textarea>
      <div>
        <input type="submit" resize="vertical" />
      </div>
    </form>

  </section>
}


export default ContUpload;