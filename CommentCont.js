import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { connectDB } from "../database";

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
`;

const CommentCont = ({cont, user}) => {
  const today = new Date();
  const [edit, setEdit] = useState(false);
  const [newComment, setNewComment] = useState(cont.comment);
  const commentDoc = doc(connectDB, "commentHome", cont.id);
  
  const toggleEdit = (state) => !state;
  const onEditComment = (input) => {
    const {target: {value}} = input;
    setNewComment(value)
  }
  const onCancel = () => setEdit(toggleEdit(edit));
  const onUpload = async () => {
    setEdit(toggleEdit(edit));
    await updateDoc(commentDoc, {
      comment: newComment,
      date: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}, ${today.getHours()}:${today.getMinutes()}`
    })    
  }

  const onDelete = async () => {
    const ok = window.confirm("Delete your comment?");
    if(ok){
      await deleteDoc(commentDoc)
    }
  }
  return <>
  <div className="comment-profile">
   {
    cont.userProfile?<Img src= {cont.userProfile} alt="profile"/>
    :<Img src="https://firebasestorage.googleapis.com/v0/b/sinriplayground.appspot.com/o/temp_profile.png?alt=media&token=8db0cfe8-2592-4f1e-acbf-0bd44e237bec" alt="tempImage"/>
    }
    <p className="profile-name">{cont.userName}</p>
    {
    edit?<input type="text" value={newComment} onChange={onEditComment}/>
    :<p>{cont.comment}</p>
    }
  </div>

  <div className="comment-detail">
  {
    edit && user.uid === cont.user &&
    <div>
      <button onClick={onUpload}>확인</button>
      <button onClick={onCancel}>취소</button>
    </div>
  }
  {
    !edit && user.uid === cont.user && 
    <div>
      <button onClick={onUpload}>수정</button>
      <button onClick={onDelete}>삭제</button>
    </div>
  }
    <p>{cont.date}</p>
  </div>
  </>
}


export default CommentCont;