import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";

const reactEmojis = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "♥️",
  rocket: "🚀",
  eyes: "👀",
};

const Reactions = ({ post }) => {

    // const dispatch = useDispatch();
    // const onReactionClick = (key)=>{
    //     dispatch(reactionAdded({postId:post.id, reaction:key}))
    // }
  return Object.entries(reactEmojis).map(([key, value]) => (
    <button
      key={key}
      type="button"
    //   onClick={()=>onReactionClick(key)}
      className="inline-lex px-2 py-1  rounded-md text-sm text-gray-700 font-medium ml-2 bg-white"
    >
      {value} <span className="ml-1 ">{post.reactions[key]}</span>{" "}
    </button>
  ));
};

export default Reactions;
