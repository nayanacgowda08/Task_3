import React, { useState } from "react";
import { GoThumbsup } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import ReactionButton from "./ReactionButton";
import { BiSolidSend } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { commentAdded, replyAdded } from "./postSlice";
import { nanoid } from "@reduxjs/toolkit";
import Time from "./Time";

const PostActions = ({ post }) => {
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [activeCommentBox, setActiveCommentBox] = useState(null);
  const [comment, setComment] = useState("");
  const[replyBox,setReplyBox]=useState(null)
  const[reply,setReply]=useState("")
  const dispatch = useDispatch();

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
    if (comment.trim() !== "") {
      dispatch(
        commentAdded({
          postId,
          comment,
          date: new Date().toISOString(),
          id: nanoid(),
          replies: [],
        })
      );
    }
    // Reset comment input after submission
    setComment("");
  };

  const toggleReply = (commentId)=>{
    setReplyBox((prev) => (prev === commentId ? null : commentId));
  }

  const addReply = (postId,commentId,reply)=>{
    console.log(reply);
    if(reply.trim()!==""){
        dispatch(replyAdded({
          postId,commentId,reply,date:new Date().toISOString(),id:nanoid()
        }))
    }
    setReply("");
    setActiveCommentBox(null);
    
  }

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
              onClick={() => addComment(post.id, comment)}
              className={comment ? `text-blue-500` : `text-gray-500`}
            />
          </div>

          <div className="mt-2">
            {post.comments?.map((comments, ind) => (
              <>
                <div
                  key={ind}
                  className="py-1 px-2 border rounded-xl text-gray-700 border-gray-300
              bg-gray-300
              "
                  style={{
                    display: "inline-block",
                  }}
                >
                  {comments.comment}
                </div>
                <div className="flex items-center space-x-4 mb-2">
                  <Time timestamp={comments.date} />
                
                <div className="text-sm cursor-pointer">Like</div>
                <div className="text-sm cursor-pointer" onClick={()=>toggleReply(comments.id)} >  Reply</div>
                </div>
                {replyBox===comments.id && 
            <div className="ml-10 flex justify-between items-center border rounded-md">
                  <input type="text" 
                  className="p-2 w-full focus:outline-none overflow-hidden"
                  placeholder="add a reply..." 
                  value={reply}
                  onKeyDown={(e)=>{
                    if(e.key==="Enter"){
                      addReply(post.id,comments.id,e.target.value)
                    }
                  }}
                  onChange={(e)=>setReply(e.target.value)}
                  />
                  <BiSolidSend
              onClick={() => addReply(post.id,comments.id, reply)}
              className={reply ? `text-blue-500` : `text-gray-500`}
            />
            </div>
          }

          {comments.replies?.map((reply,ind)=>(
            <div className="ml-10 ">
              <div className="py-1 px-2 border rounded-xl text-gray-700 border-gray-300
              bg-gray-300" style={{
                display: "inline-block",
              }}>
                {reply.reply}
              </div>
              <div className="flex items-center space-x-4 mb-2">
                <Time timestamp={reply.date} />
                <div className="text-sm cursor-pointer">
                  Like
                </div>
                <div className="text-sm cursor-pointer">
                  Reply
                </div>
              </div>
            </div>
          ))}
              </>
            ))}
          </div>
         
        </div>
      )}
    </>
  );
};

export default PostActions;
