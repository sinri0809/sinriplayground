/**
 * modern style of REDUX
 */
import { createSlice } from '@reduxjs/toolkit'

const tempImg = "https://firebasestorage.googleapis.com/v0/b/sinriplayground.appspot.com/o/temp_profile.png?alt=media&token=8db0cfe8-2592-4f1e-acbf-0bd44e237bec";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    uid: "visitor",
    photoURL: tempImg,
    displayName: "visitor",
    login: false
  },
  reducers: {
    userLogin(state, action) {
      const {send, login, uid, displayName, photoURL} = action.payload;
      return {
        ...state,
        send, login, uid, displayName, photoURL
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


export const { userLogin, todoToggled, todosLoading } = userSlice.actions;

export default userSlice.reducer;