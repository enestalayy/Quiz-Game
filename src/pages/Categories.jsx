import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { handleAsync } from "../utils/handleAsync";
import { getCategories, getId } from "../Services/quiz.js";
import { isCatCompleted } from '../Services/quizData.js';
import LogoutButton from '../components/LogoutButton.jsx';
import {CgMoveRight} from 'react-icons/cg'

function Categories() {
const navigate = useNavigate()
const [categories, setCategories] = useState([])
const [isCompleted, setIsCompleted] = useState()
const username = sessionStorage.getItem("username")
sessionStorage.setItem("previousPage", window.location.pathname);

  useEffect(() => async () => {
      const [categories, categoriesError] = await handleAsync(getCategories());
      const [id, idError] = await handleAsync(getId(username));
      const [isCompleted, isCompletedError] = await handleAsync(isCatCompleted(id));
      categoriesError && console.error('Kategoriler alınırken hata oluştu', categoriesError);
      idError && console.error('Kullanıcı kimliği alınırken hata oluştu', idError);
      isCompletedError && console.error('Tamamlanan kategori alınırken hata oluştu', isCompletedError);
      setCategories(categories)
      id && sessionStorage.setItem("id", id)
      setIsCompleted(isCompleted)
      document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);

    const handleKeyDown = (e) => {
      e.key === 'Enter' && document.activeElement && document.activeElement.click();
    
      const handleArrowNavigation = (elements, key) => {
        const currentIndex = elements.findIndex((element) => element === document.activeElement);
        if (currentIndex === -1) {
          elements[0] && elements[0].focus();
        } else {
          const nextIndex = (currentIndex + (key === 'ArrowDown' ? 1 : -1) + elements.length) % elements.length;
          elements[nextIndex] && elements[nextIndex].focus();
        }
      };
    
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const categories = Array.from(document.getElementsByClassName('categoryButton'));
        handleArrowNavigation(categories, e.key);
      }
    
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const buttons = Array.from(document.getElementsByClassName('button'));
        handleArrowNavigation(buttons, e.key);
      }
    };
    

  const isCompletedCategory = (e) => isCompleted && isCompleted.includes(e)

  return (
    <div className='container categoriesPage'>
        <h3 className='usernameInfo'>Username: {username}</h3>
        <h1>Categories</h1>
        <div className="categories">
            {categories.map((key) =>
              <button className={`${isCompletedCategory(key) ? 'completedCategoryButton' : 'categoryButton'}`} key={key} onClick={() => {
                !isCompletedCategory(key) && navigate('/quiz/' + key, {state: { category: key }})
                }}>{isCompletedCategory(key) ? `${key} ✔` : key}</button>
            )}
        </div>
        <div className="footerCat">
        <LogoutButton className='button' />
        <button className='button' onClick={() => navigate('/math/scoreboard')}>View Scoreboard <CgMoveRight /></button>
        </div>
    </div>
  )
}

export default Categories