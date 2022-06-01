/**
 * REDUX store
 */
import {
  userReducer,
  contentsReducer
} from './user';

import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
  reducer: {
    user: userReducer,
    contents: contentsReducer,
  },
});


export default store;