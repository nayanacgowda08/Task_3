import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const loadState = () => {
  try {
    const postData = localStorage.getItem("posts");
    return postData ? JSON.parse(postData) : undefined;
  } catch (e) {
    console.log("cound not load data from local storage", e);
    return undefined;
  }
};

const initialState = loadState() || [
  {
    id: "1",
    title: "First Post",
    content: "First Post Content",
    user: "1",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
    comments:[{
      id:'1',
      comment:"first comment",
      date:sub(new Date(), {minutes:5}.toISOString()),
      replies:[]
    }]
  },
  {
    id: "2",
    title: "Seecond Post",
    content: "Second Post Content",
    user: "3",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
    comments:[{
      id:'2',
      comment:"second comment",
      date:sub(new Date(), {minutes:10}.toISOString()),
      replies:[]
    }]
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload);
    },
    postUpdated(state, action) {
      const { id, title, content, user, date } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.content = content;
        existingPost.title = title;
        existingPost.user = user;
        existingPost.date = date;
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    commentAdded(state,action){
      const{postId,comment,date,id,replies} = action.payload
      const existingPost=state.find((post)=>post.id===postId)
      if(existingPost){
        existingPost.comments.push({id,comment,date,replies});
      }
    }
  },
});

export const { postAdded, postUpdated, reactionAdded ,commentAdded} = postSlice.actions;
export default postSlice.reducer;

//custom Hook
export const useSaveState = () => {
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    try {
      const postData = JSON.stringify(posts);
      localStorage.setItem("posts", postData);
    } catch (error) {
      console.log("error", error);
    }
  }, [posts]);
};
