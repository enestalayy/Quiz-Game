import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { handleAsync } from "../utils/handleAsync";
import { getCategories, getId } from "../Services/quiz.js";

function Categories() {
const navigate = useNavigate()
const [categories, setCategories] = useState([])
const userName = sessionStorage.getItem("username")


useEffect(() => {
  handleAsync(getCategories(setCategories))
  handleAsync(getId( userName ))
}, [userName]) 

  return (
    <div className='container categoriesPage'>
        <h3 className='usernameInfo'>Username: {userName}</h3>

        <h1>Categories</h1>
        <div className="categories">
            {categories.map((key) => 
                <button className='categoryButton' key={key} onClick={() => {
                  navigate('/quiz/' + key, {state: { category: key }})
                }}>{key}</button>
            )}
        </div>
    </div>
  )
}

export default Categories