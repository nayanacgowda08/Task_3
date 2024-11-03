import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../Components/posts/postSlice"
import userReducer from "../Components/users/userSlice"

const store = configureStore({
  reducer: {
    posts:postsReducer,
    users:userReducer,
  },
});

export default store;


