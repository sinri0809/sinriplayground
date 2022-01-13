import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connectDB } from "../database";

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
`;
/**
 * * edit: 편집 상태 on/off
 * * newComment: 새로운 입력 값 저장
 * @onEditComment (input)
 * * commentDoc: 각 댓글의 firebase id
 * @onUpload async : 댓글 수정 기능
 * @onDelete async : 댓글 삭제 기능
 */
const CommentCont = ({cont, user}) => {

  const { id, userProfile, comment, userName, date } = cont;
  const owner = user.uid === cont.user;

  const today = new Date();
  const [edit, setEdit] = useState(false);
  const [newComment, setNewComment] = useState(comment);
  const commentDoc = doc(connectDB, "commentHome", id);
  
  useEffect(() => {
    setNewComment("수정할 내용을 입력하세요");
  }, [])

  const onEditComment = (input) => {
    const {target: {value}} = input;
    setNewComment(value);
  }

  const onUpload = async () => {
    const ok = window.confirm("up loaded?")
    if(ok){
      await updateDoc(commentDoc, {
        comment: newComment,
        date: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}, ${today.getHours()}:${today.getMinutes()}`
      });
      setEdit(false);
    }
  }
  const onDelete = async () => {
    const ok = window.confirm("Delete your comment?");
    if(ok){
      await deleteDoc(commentDoc);
    }
  }

  return <>
  <div className="comment-profile">
    <Img src= {userProfile} alt="profile"/>
    <p className="profile-name">{userName}</p>
    {
      edit ? <input type="text" onClick={()=>setNewComment("")} value={newComment} onChange={onEditComment}/>
      :<p>{comment}</p>
    }
  </div>

  <div className="comment-detail">
    {
      owner && edit &&
      <div>
        <button onClick={onUpload}>확인</button>
        <button onClick={() => setEdit(false)}>취소</button>
      </div>
    }
    {
      owner && !edit && 
      <div>
        <button onClick={() => setEdit(true)}>수정</button>
        <button onClick={onDelete}>삭제</button>
      </div>
    }
    <p>{date}</p>
  </div>
  </>
}


export default CommentCont;