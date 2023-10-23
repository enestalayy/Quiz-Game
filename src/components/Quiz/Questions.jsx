import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Questions() {
  const navigate = useNavigate();
  const category = useParams()
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
    const yarak = Object.values(category)
    console.log(typeof yarak)

  useEffect(() => {
    fetch("http://localhost:3000/quiz?category=" + category)
    
      .then((res) => res.json())
      .then((data) => {
        console.log( data)
        setQuestions(data[category.category]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [category]); 

  

  

  return (
    <div className="container">
      <h1>Questions</h1>
      {questions.length > 0 && (
        <div className="question-section">
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className="question-text">
            {questions[currentQuestion].question}
          </div>
        </div>
      )}


      <h1>burası questions sayfası</h1>
    </div>
  );
}

export default Questions;
