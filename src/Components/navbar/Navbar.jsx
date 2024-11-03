import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
   <nav>
    <section className='bg-purple-400 text-white font-semibold w-full p-2 flex justify-between items-center mb-4 h-16 '>
        <h1 className='text-3xl font-semibold'>React Redux Project</h1>
        <div className="navContent flex space-x-4">
            <div className="navLinks hover:underline text-xl">

              <Link to="/">Posts</Link>
            </div>
        </div>
    </section>
   </nav>
  )
}

export default Navbar
