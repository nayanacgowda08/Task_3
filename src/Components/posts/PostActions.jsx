import React, { useState } from "react";
import { GoThumbsup } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import ReactionButton from "./ReactionButton";
import { BiSolidSend } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { commentAdded } from "./postSlice";
import { nanoid } from "@reduxjs/toolkit";

const PostActions = ({ post }) => {
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [activeCommentBox, setActiveCommentBox] = useState(null);
  const [comment, setComment] = useState(""); 
  const dispatch = useDispatch()

  const handleOnMouseEnter = (postId) => {
    setHoveredPostId(postId);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setHoveredPostId(null);
    }, 200);
  };

  const toggleComment = (postId) => {
    setActiveCommentBox((prev) => (prev === postId ? null : postId));
  };

  const addComment = (postId, comment) => {
    console.log(comment);
    if(comment.trim()!==""){
      dispatch(commentAdded({
        postId,
        comment,
        date:new Date().toISOString(),
        id:nanoid(),
        replies:[]
      }))
    }
    // Reset comment input after submission
    setComment("");
  };



  return (
    <>
      <div className="flex relative items-center justify-between mt-2">
        <div
          className="flex space-x-1 items-center relative cursor-pointer"
          onMouseEnter={() => handleOnMouseEnter(post.id)}
          onMouseLeave={handleMouseLeave}
        >
          <GoThumbsup />
          <span className="text-sm text-gray-500">Like</span>
          {hoveredPostId === post.id && (
            <div className="flex absolute left-0 top-4 bg-white shadow-lg rounded-full border border-gray-300 z-10 p-1">
              <ReactionButton post={post} />
            </div>
          )}
        </div>
        <div
          className="flex space-x-1 items-center relative cursor-pointer"
          onClick={() => toggleComment(post.id)}
        >
          <FaRegComment />
          <span className="text-sm text-gray-500">Comment</span>
        </div>
        <div className="flex space-x-1 items-center relative cursor-pointer">
          <FaWhatsapp />
          <span className="text-sm text-gray-500">WhatsApp</span>
        </div>
        <div className="flex space-x-1 items-center relative cursor-pointer">
          <FaShare />
          <span className="text-sm text-gray-500">Share</span>
        </div>
      </div>
      {activeCommentBox === post.id && (
        <div className="mt-4">
          <div className="flex justify-center items-center border rounded-md">
            <input
              className="p-2 w-full focus:outline-none overflow-hidden"
              type="text"
              placeholder="Add a comment..."
              value={comment} // Use comment state directly
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addComment(post.id, e.target.value);
                }
              }}
            />
            <BiSolidSend 
            onClick={()=>addComment(post.id,comment)}
            className={comment?`text-blue-500` : `text-gray-500`} />
          </div>
        </div>
      )}
    </>
  );
};

export default PostActions;
