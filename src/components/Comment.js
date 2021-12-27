import React, { useState, useEffect} from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { connectDB } from "../database";


const Comment = ({user}) => {
  const today = new Date();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const onChangeComment = (event) => setComment(event.target.value);
  const commentRef = collection(connectDB, "commentHome");
  
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(commentRef, {
      user: user.uid,
      userName: user.displayName,
      userProfile: user.photoURL,
      comment,
      date: `${today.getUTCFullYear()}-${today.getUTCMonth()+1}-${today.getUTCDate()}, ${today.getUTCHours()}:${today.getUTCMinutes()}`
    });
    setComment("");
  }
  console.log(user)
  useEffect(() => {
    // getDoc보다 snapshot으로 
    onSnapshot(commentRef, (snaps) => {
      const newComment = snaps.docs.map((doc) => ({...doc.data()}))
      setComments(newComment);
    })
    return () => {
    }
  }, [])

  return <section>
    <h3>Comment</h3>
    here is comment to sinri
    <form onSubmit={onSubmit}>
      <label>comment: </label>
      <input type="text" onChange={onChangeComment} value={comment} required />
      <input type="submit" value="방명록" />
    </form>
    <ul>
      {
        comments.map((item, index) => {
          return <li key={index}>
            {
              item.userProfile?
              <img src= {item.userProfile} width="50px" height="50px" alt="profile"/>
              :
              <p>.</p>
            }
            {item.userName}/
            {item.comment}/
            {item.date}
          </li>
        })
      }
    </ul>
  </section>
}

export default Comment;