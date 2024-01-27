import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (

    <div>
      <div>Home</div>
      <Link to = "/Todo">Go to Todo App</Link>
    </div>
    
  )
}

export default Home