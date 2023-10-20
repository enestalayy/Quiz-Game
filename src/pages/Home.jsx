import React from 'react'
import Login from '../components/Login'
function Home() {
  return (
    <div className='homePage'>
        <div className="quizGameLogo">
            <h3 className='logo'>Quiz Game</h3>
        </div>
        <Login />
    </div>
  )
}

export default Home
