import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Quiz from './Quiz'
import Categories from './Categories'
import ScoreBoard from './ScoreBoard'
import Register from '../components/Register'
import Auth from '../components/Auth'
import { isLoggedIn } from '../Store/authSlice'
import { useSelector } from 'react-redux'

function Home() {
  const userName = sessionStorage.getItem("username")
  const isLoggedIn = useSelector((state) => state.isLoggedIn)

  return (
    <div className='homePage'>
        <div className="quizGameLogo">
            <h3 className='logo'>Quiz Game</h3>
        </div>

        
        <Routes>
        {isLoggedIn ? (
          <Route path='/' element={<Categories />} />
        ) : (
          <Route path='/' element={<Register />} />
        )}
        <Route path='/categories' element={<Categories />} />
        <Route path='/Auth' element={<Auth />} />
        <Route path='/quiz/:category' element={ <Quiz /> }></Route>
        <Route path='/:category/scoreboard' element={<ScoreBoard/>}></Route>

      </Routes>
    </div>
  )
}

export default Home
