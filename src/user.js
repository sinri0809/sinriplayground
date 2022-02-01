/**
 * modern style of REDUX
 */
import { createSlice } from '@reduxjs/toolkit'

import { contentsRef } from './database';
import { getDocs } from 'firebase/firestore';

const getFromFirebase = async () => {
  const conts = await getDocs(contentsRef);
  console.log(conts);
}

const contentsSlice = createSlice({
  name: 'contents',
  initialState:{
    id: 0
  },
  reducers: {
    getContent(state, action){
      getFromFirebase();
      // onSnapshot(contentsRef, (snaps) => 
        // snaps.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    }
  }
})


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
      const { uid, displayName, photoURL} = action.payload;
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


export const userReducer = userSlice.reducer;
export const contentsReducer = contentsSlice.reducer;

export const { setLogin, todoToggled, todosLoading } = userSlice.actions;
export const { getContent } = contentsSlice.actions;