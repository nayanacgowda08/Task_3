import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Navbar from './Components/navbar/Navbar'
import PostList from './Components/posts/PostList'
import AddNewPost from './Components/posts/AddNewPost'
import SinglePostPage from './Components/posts/SinglePostPage'
import EditPostForm from './Components/posts/EditPostForm'
import { useSaveState } from './Components/posts/postSlice'

const App = () => {
  useSaveState();
  return (
    <Router>

      <Navbar/>
      <div>
        <Routes>

          <Route path='/' element={<><AddNewPost/> <PostList/></>} />
          <Route path='/posts/:postId' element={<SinglePostPage/>} />
          <Route path='/editpost/:postId' element={<EditPostForm/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App