import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { connectDB } from "../data/database";


// import EditRoundedIcon from '@mui/icons-material/EditRounded';
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import CheckRoundedIcon from '@mui/icons-material/CheckRounded';


/**
 * * edit: 편집 상태 on/off
 * * newComment: 새로운 입력 값 저장
 * @onEditComment (input)
 * * commentDoc: 각 댓글의 firebase id
 * @onUpload async : 댓글 수정 기능
 * @onDelete async : 댓글 삭제 기능
 */
const CommentCont = ({ cont, user }) => {

  const { id, userProfile, comment, userName, date } = cont;
  const owner = user.uid === cont.user;

  const today = new Date();
  const [edit, setEdit] = useState(false);
  const [newComment, setNewComment] = useState(comment);
  const commentDoc = doc(connectDB, "commentHome", id);

  useEffect(() => {
    // setNewComment("수정할 내용을 입력하세요");
  }, [])

  const onEditComment = (input) => {
    const { target: { value } } = input;
    setNewComment(value);
  }

  const onUpload = async () => {
    const ok = window.confirm("up loaded?")
    if (ok) {
      await updateDoc(commentDoc, {
        comment: newComment,
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}, ${today.getHours()}:${today.getMinutes()}`
      });
      setEdit(false);
    }
  }
  const onDelete = async () => {
    const ok = window.confirm("Delete your comment?");
    if (ok) {
      await deleteDoc(commentDoc);
    }
  }

  return <>
    <div className="comment-detail">
      {/* <Img src={userProfile} alt="profile" /> */}
      <p className="profile-name">{userName}</p>
      {
        edit ? <input type="text" onClick={() => setNewComment("")}
          value={newComment} onChange={onEditComment} placeholder={comment} />
          : <p>{comment}</p>
      }
    </div>

    <div className="comment-edit">
      {
        owner && edit &&
        <div>
          <button onClick={onUpload}>
            {/* <CheckRoundedIcon /> */}
          </button>
          <button onClick={() => setEdit(false)}>
            {/* <CloseRoundedIcon /> */}
          </button>
        </div>
      }
      {
        owner && !edit &&
        <div>
          <button onClick={() => setEdit(true)}>
            {/* <EditRoundedIcon /> */}
          </button>
          <button onClick={onDelete}>
            {/* <DeleteRoundedIcon /> */}
          </button>
        </div>
      }
      <p>{date}</p>
    </div>
  </>
}


export default CommentCont;