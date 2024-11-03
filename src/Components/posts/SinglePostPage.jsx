import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import Time from "./Time";
import ReactionButton from "./ReactionButton"
import PostActions from "./PostActions";
import Reactions from "./Reactions";

// '/post/123'
const SinglePostPage = () => {
  const { postId } = useParams();
  const posts = useSelector((state) => state.posts);
  const post = posts.find((post) => post.id === postId);

  if(!post){
    return (
        <section className="max-w-2xl mx-auto mt-10 p-4 text-center">
            <h2 className="text-2xl font-bold">Post not found!!!</h2>
        </section>
    )
  }

  return (
    <section className="max-w-2xl mx-auto mt-10 p-4">
        <article className="border border-gray-300 rounded-md p-4 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            
           

            <PostAuthor userId={post.user} />
            <Time timestamp={post.date} />
            <p className="text-gray-700 mb-4">{post.content}</p>
            <Reactions post={post} />
         <div className='border-t'>
         <PostActions post={post} />
         </div>
            <div>
              <Link 
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-8"
              to={`/editpost/${post.id}`}>Edit Post</Link>
            </div>
        </article>
    
    </section>
  );
};

export default SinglePostPage;
