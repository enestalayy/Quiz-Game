import React, {useEffect} from 'react'
import Result from '../components/Result'
import { useNavigate } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton'
function ScoreBoard() {
  const navigate = useNavigate()
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [])
  const handleKeyDown = (e) => {
    e.key === 'Enter' && document.activeElement.click()
    if(e.key==='ArrowDown' || e.key==='ArrowUp'){

      const categories = Array.from(document.getElementsByTagName('select'))
      console.log(categories.options)
      let currentIndex = categories.findIndex((element) => element.value === document.activeElement);
      if (currentIndex === -1) {
        categories[0].focus();
        currentIndex = 0;
      } else {
        e.key!=='ArrowDown' || e.key!=='ArrowUp' && e.preventDefault()

        if( currentIndex > -1 && e.keyCode === 37 && e.keyCode === 39){
        }
        if (e.key === 'ArrowDown') {
          currentIndex = (currentIndex + 1) % categories.length;
        } else if (e.key === 'ArrowUp') {
          currentIndex = (currentIndex - 1 + categories.length) % categories.length;
        }
         categories[currentIndex].focus();
      }
    }    if(e.key==='ArrowRight' || e.key==='ArrowLeft'){
      const buttons = Array.from(document.getElementsByClassName('footerButton'))
      let currentIndex = buttons.findIndex((element) => element === document.activeElement);
      if (currentIndex === -1) {
        buttons[0].focus();
        currentIndex = 0;
      } else {
        if (e.key === 'ArrowRight') {
          currentIndex = (currentIndex + 1) % buttons.length;
        } else if (e.key === 'ArrowLeft') {
          currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        }
        buttons[currentIndex].focus();
      }
    }
  }
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

      <Result handleKeyDown={handleKeyDown} />
      <div className="footerScoreboard">
        <LogoutButton className='footerButton' />
        <button className='footerButton' onClick={() => navigate('/categories/')}>Try Another Category</button>
      </div>
    </div>
  )
}

export default ScoreBoard