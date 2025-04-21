import React from 'react'
import { useAuth } from '../context/AuthContext'

const Home = () => {
    const { user } = useAuth()
    console.log(user.username)
  return (
    <div>
      <h2>Welcome back, {user.username} 👋</h2>
    </div>
  )
}

export default Home
