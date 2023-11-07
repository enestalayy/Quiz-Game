import React, {useEffect} from 'react'
import Result from '../components/Result'
import { useNavigate } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton'
function ScoreBoard() {
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
        <LogoutButton className='footerButton' />
        <button className='footerButton' onClick={() => navigate('/categories/')}>Try Another Category</button>
      </div>
    </div>
  )
}

export default ScoreBoard