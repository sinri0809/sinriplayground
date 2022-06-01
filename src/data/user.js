import { createSlice } from '@reduxjs/toolkit'
import { getDocs } from 'firebase/firestore';

// FiresotreDatabase > content_prose
import { contentsRef } from './database';


// * 게시물 정보
const contentsSlice = createSlice({
  name: 'contents',
  initialState: {
    title: '제목',
    content: '내용',
    date: '0000-00-00'
  },
  reducers: {
    getContent(state, action) {

      // ! 작성하다가 만거 같음.
      const setContent = () => {
        getDocs(contentsRef)
          .then((conts) => {
            const arr = conts.docs.map((doc) => doc.data())
          })

      }

      return {
        ...state,
      }
    },
  }
})

// * 사용자 정보 
const userSlice = createSlice({
  name: 'user',
  initialState: {
    uid: "visitor",
    photoURL: "https://firebasestorage.googleapis.com/v0/b/sinriplayground.appspot.com/o/temp_profile.png?alt=media&token=8db0cfe8-2592-4f1e-acbf-0bd44e237bec",
    displayName: "visitor",
    login: false
  },
  reducers: {
    setLogin(state, action) {
      const { uid, displayName, photoURL } = action.payload;
      return {
        ...state,
        uid, displayName, photoURL
      }
    },
    todoToggled(state, action) {
      const todo = state.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    },
    todosLoading(state, action) {
      return {
        ...state,
        status: 'loading...'
      }
    }
  }
})

// * reducer
export const userReducer = userSlice.reducer;
export const contentsReducer = contentsSlice.reducer;

// * actions
export const { setLogin, todoToggled, todosLoading } = userSlice.actions;
export const { getContent } = contentsSlice.actions;