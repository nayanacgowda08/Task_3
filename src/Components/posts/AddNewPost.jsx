import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postSlice";
import { nanoid } from "@reduxjs/toolkit";

const AddNewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const[userId,setUserId]=useState("")
  const dispatch = useDispatch();

  const users = useSelector((state)=>state.users); //lists all the users

  //dropdown
  const userOptions = users.map((user)=>(
    <option key={user.id} value={user.id}>{user.name}</option>
  ))

  const onSavePostClick = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content,
          user:userId,
          date:new Date().toISOString(),
          reactions:{
            thumbsUp:0, hooray:0, heart:0,rocket:0, eyes:0
        }
        })
      );
      setTitle("");
      setContent("");
      setUserId("")
    }
  };

  const onAuthorChanged = (e)=>{
    setUserId(e.target.value)
   
  }

  const canSave = Boolean(title) && Boolean(userId) && Boolean(content)

  return (
    <section className="max-w-lg mx-auto mt-10 p-4 border border-gray-200 rounded-md shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-4 ">Add New Post</h2>
      <form action="">
        <div className="mb-4">
          <label
            htmlFor="postTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Post Title:
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="postTitle"
            id="postTitle"
            className="border-2 mt-1 block w-full  border-gray-300 rounded-md  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4 ">
          <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="postAuthor">Author</label>
          <select 
          onChange={onAuthorChanged}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-r-indigo-500 focus:border-indigo-500 sm:text-sm"
          name="postAuthor" id="postAuthor" value={userId}>
            <option value=""></option>
            {userOptions}
          </select>
        </div>
        <div className="mb-4 ">
          {" "}
          <label
            htmlFor="postContent"
            className="block text-sm font-medium text-gray-700"
          >
            Post Content:
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            name="postContent"
            id="postContent"
            className="
            border mt-1 block border-gray-300 w-full rounded-md shadow-sm  focus:ring-indigo-500
             focus:border-indigo-500 sm:text-sm "
            rows="4"
            required
          />
        </div>
        <button
          onClick={onSavePostClick}
          className="w-full  py-2 px-4 border-transparent text-sm font-medium rounded-md text-white border bg-green-600
        hover:bg-green-700 
        "
        disabled={!canSave}
        >
          {" "}
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddNewPost;
