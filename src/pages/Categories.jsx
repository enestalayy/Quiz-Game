import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
function Categories() {
const navigate = useNavigate()
const [categories, setCategories] = useState([])
useEffect(() => {
    fetch('http://localhost:3000/quiz/')
      .then((res) => res.json())
      .then((data) => {
        setCategories(Object.keys(data));
      })
      .catch((err) => {
        console.error(err);
      });
}, []) 
  return (
    <div className='container categoriesPage'>
        <h1>Categories</h1>
        <div className="categories">
            {categories.map((key) => 
            
                <button className='categoryButton' key={key} onClick={() => navigate('/quiz/' + key, {state: { category: key }})}>{key}</button>
            )}
        </div>
    </div>
  )
}

export default Categories