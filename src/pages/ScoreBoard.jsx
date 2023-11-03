import React, {useEffect} from 'react'
import Result from '../components/Result'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../Store/authSlice'

function ScoreBoard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const previousPage = sessionStorage.getItem("previousPage");

    window.onpopstate = (event) => {
      if (event.type === "popstate") {
        if (previousPage) {
          navigate(previousPage);
        }
      }
    };
  }, [navigate]);
  return (
    <div className='container'>

      <Result />
      <div className="footerScoreboard">
        <button onClick={() => {
          dispatch(logout())
          navigate('/')}
        }
        >Log out</button>
        <button onClick={() => navigate('/categories/')}>Try Another Category</button>
      </div>
    </div>
  )
}

export default ScoreBoard