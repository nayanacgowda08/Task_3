import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import Time from './Time';
import ReactionButton from './ReactionButton';
import PostActions from './PostActions';
import Reactions from './Reactions';

const PostList = () => {
  const [expandedPosts, setExpandedPosts]=useState({});

  const toggleExpand = (postId)=>{
    setExpandedPosts((prev)=>({
      ...prev,[postId]:!prev[postId],
    }))
  }



  const posts = useSelector((state)=>state.posts);

  const orderedPosts = posts.slice().sort((a,b)=>b.date.localeCompare(a.date));
  return (
   <section className='max-w-2xl mx-auto mt-10 p-4'>
      <h2 className='text-2xl font-semibold mb-4'>Posts</h2>
      {orderedPosts.map((elem,ind)=>(
        <article 
        className='border border-gray-300 rounded-md p-4 mb-4 shadow-sm '
        key={ind}>
          <h3 className='text-xl font-semibold '>{elem.title}</h3>
          <PostAuthor userId={elem.user} />
          <Time timestamp={elem.date} /> 
          <p className='text-gray-700 mt-2 break-words mb-2'> {elem.content}</p>
          <Reactions post={elem} />
         <div className='border-t'>
         <PostActions post={elem} />
         </div>

          {/* /> */}
         
          <div className='mb-3  mt-4'>
                <Link
                className='inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4'
                  to={`/posts/${elem.id}`}>View Post </Link>
            </div>
        </article>
      ))}
   </section>
  )
}

export default PostList