import React from 'react'
import Result from '../components/Result'
import { useNavigate } from 'react-router-dom'
function ScoreBoard() {
  const navigate = useNavigate()
  return (
    <div className='container'>

      <Result />
      <div className="footerScoreboard">
        <button onClick={() => 
          navigate('/')
          
        }
        >New Game</button>
        <button onClick={() => navigate('/categories/')}>Try Another Category</button>
      </div>
    </div>
  )
}

export default ScoreBoard