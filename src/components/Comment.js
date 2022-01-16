import React, { useState, useEffect} from "react";
import { addDoc, onSnapshot } from "firebase/firestore";
import { commentRef } from "../database";
import CommentCont from "./CommentCont";
import "./../style/home.scss";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useSelector } from "react-redux";

/**
 * * today : 오늘 날짜, 게시물 작성시 들어감
 * * comment : 작성하고 있는 댓글(방명록)이 들어감
 * * comments : 렌더링할 댓글 배열
 * * commentsData : 댓글 데이터 
 * * pageIndex : 페이지내이션 
 * @onSubmit : 댓글 정보 firebase에 저장하기, 로그인 안하면 댓글 못담.
 * @onArrowClick : 댓글 창 페이지 버튼 누를 때, 페이지내이션
 */

const Comment = () => {
  const state = useSelector(state => state.user);
  const [user, setUser] = useState({});
  
  const today = new Date();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  
  const commentsLen = Math.ceil(commentsData.length / 3);
  const pageNumbers = [];
  for (let i = 0; i < commentsLen; i++) {
    pageNumbers.push(
      <li key={i}>
        <button 
          className={i === pageIndex ? "focused" : ""}
          onClick={()=>setPageIndex(i)}
        >
        {i}</button></li>
    )
  }
  
  // console.log("viewed Comment"); // 이거 4번이나 찍힘...

  useEffect(() => {
    /**
     * ? getDoc()보다 onSnapshot()을 사용할 경우 실시간으로 상태를 확인한다.
     * id : doc.id를 넣어서 comment끼리 구분할 수 있도록
     */
    setUser(state);
    // 댓글 정보 불러오기
    onSnapshot(commentRef, (snaps) => {
      const freshComment = snaps.docs.map((doc) => ({id: doc.id, ...doc.data()}))
      freshComment.sort((a,b) => {
        const array_a = a.date.split(',')[0]; // 0: 0000-00-00, 1: 00:00
        const array_b = b.date.split(',')[0]; // 0: 0000-00-00, 1: 00:00
        if (array_a > array_b){
          return -1
        }else if(array_b > array_a){
          return 1
        }else{
          return 0
        }
      });
      setCommentsData(freshComment);
    });
    
  }, [state, pageIndex, commentsData]);

  // 댓글 pagination
  useEffect(() => {
    setComments(commentsData.slice(pageIndex*3, (pageIndex+1)*3))
  }, [commentsData, pageIndex])


  const onChangeComment = (event) => {
    if(user.uid === "visitor"){
      window.alert("please Log In");
    }
    setComment(event.target.value);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if(user.uid === "visitor"){
      window.alert("please Log In");
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

  const onArrowClick = (direct) => {
    if(direct === "left"){
      pageIndex > 0 &&
      setPageIndex(pageIndex-1)
    }else if(direct === "right"){
      pageIndex < commentsLen-1 &&
      setPageIndex(pageIndex + 1);
    }
  }

  return <section className="comment">
    <h3>😊🤗😀</h3>
    <form onSubmit={onSubmit}>
      <label>방명록: </label>
      <input type="text" maxLength={50} name="방명록" 
        onClick={()=>setComment("")}
        onChange={onChangeComment} value={comment} placeholder="hello to sinri" required />
      <input type="submit" value="등록" />
    </form>
    
    <ul>{
    comments.map((cont, index) => {
      return <li key={index} className="comment-list">
        <CommentCont cont={cont} user={user} />
      </li>
    })}</ul>

    <div className="pagination-container">
      <ol className="pagination">
        <li><button onClick={() => onArrowClick("left")} value={"left"} >
          <ArrowBackIosRoundedIcon />
          </button></li>

          {pageNumbers}

        <li><button onClick={() => onArrowClick("right")} value={"right"}>
          <ArrowForwardIosRoundedIcon />
          </button></li>
      </ol>
    </div>
  </section>
}

export default Comment;