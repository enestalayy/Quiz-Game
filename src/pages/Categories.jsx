import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { handleAsync } from "../utils/handleAsync";
import { getCategories, getId } from "../Services/quiz.js";
import { isCatCompleted } from '../Services/quizData.js';

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
  }, [username]);
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
    </div>
  )
}

export default Categories