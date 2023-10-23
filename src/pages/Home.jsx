import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Questions from '../components/Quiz/Questions'
import Categories from '../components/Quiz/Categories'
import ScoreBoard from './ScoreBoard'
import Login from '../components/Login'


function Home() {
  return (
    <div className='homePage'>
        <div className="quizGameLogo">
            <h3 className='logo'>Quiz Game</h3>
        </div>

        
        <Routes>
        <Route path='' element={ <Login /> }></Route>
        <Route path='/categories' element={ <Categories /> }></Route>
        <Route path='/quiz/:category' element={ <Questions /> }></Route>
        <Route path='/scoreboard' element={<ScoreBoard/>}></Route>

      </Routes>
    </div>
  )
}

export default Home
