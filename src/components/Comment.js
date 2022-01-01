import React, { useState, useEffect} from "react";
import { addDoc, onSnapshot } from "firebase/firestore";
import { commentRef } from "../database";
import CommentCont from "./CommentCont";
import "./../style/home.scss";


const Comment = ({user}) => {
  const today = new Date();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const onChangeComment = (event) => {
    if(user.uid === "visitor"){
      window.alert("please Log In")
    }
    setComment(event.target.value);
  }
  
  useEffect(() => {
    // getDoc보다 snapshot으로 하면 실시간 업데이트 확인 가능 
    onSnapshot(commentRef, (snaps) => {
      // ID : comment 구분
      const newComment = snaps.docs.map((doc) => ({id: doc.id, ...doc.data()}))
      // newComment.sort((a,b) => {
      //   const array_a = a.date.split(',')[0];
      //   const array_b = b.date.split(',')[0];
      //   if (array_a > array_b){
      //     return -1
      //   }else if(array_b > array_a){
      //     return 1
      //   }else{
      //     return 0
      //   }
      // });
      // 나중에 next page button 만들기
      setComments(newComment.slice(0, 5));
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if(user.uid === "visitor"){
      window.alert("please Log In")
    }else{
      await addDoc(commentRef, {
        user: user.uid,
        userName: user.displayName,
        userProfile: user.photoURL,
        comment,
        date: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}, ${today.getHours()}:${today.getMinutes()}`
      });
    }
    setComment("");
  }

  return <section className="comment">
    <h3>Hello to sinri 😀</h3>
    <form onSubmit={onSubmit}>
      <label>comment: </label>
      <input type="text" onChange={onChangeComment} value={comment} required />
      <input type="submit" value="방명록" />
    </form>
    
    <ul>{
    comments.map((cont, index) => {
      return <li key={index} className="comment-list">
        <CommentCont cont={cont} user={user} />
      </li>
    })}</ul>
  </section>
}

export default Comment;