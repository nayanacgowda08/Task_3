import React from 'react'
import { useSelector } from 'react-redux'

const PostAuthor = ({userId}) => {
    const user = useSelector((state)=>state.users.find((user)=>user.id===userId))
  return (
  <span className='font-semibold '>
    by {user ? user.name:"Unknown Author"}
  </span>
  )
}

export default PostAuthor