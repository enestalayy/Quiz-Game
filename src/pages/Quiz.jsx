import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NextButton from "../components/Quiz/NextButton";
import { useSelector } from "react-redux";
import axios from "axios";


function Quiz() {
  const category = useParams();
  const currentQuestion = useSelector((state) => state.currentQuestion.value)
  const userName = useSelector((state) => state.userName.value)
  const [questions, setQuestions] = useState([]);
  const [selectedOptionId, setSelectedOptionId] = useState(null)
  useEffect(() => {
    axios.get("http://localhost:3000/quiz?category=" + category)
      .then((response) => {
        setQuestions(response.data[category.category]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [category]);
console.log(userName)
  return (
    <div className="container">
        <h3>{userName}</h3>

      {questions?.length > 0 ? (
        <div className="questionPage">
          <div className="questionSection">
            <div className="progressBar">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="questionText">
              {questions[currentQuestion].question}
            </div>

          </div>
          
          <ul className="optionSection">
            {questions[currentQuestion].options.map((options) => (
              <li key={options.id} className="options">
                <label className="option" htmlFor="">
                  {options.option}
                <input
                  type="radio"
                  name="answer"
                  className="optionInput"
                  onChange={(() => setSelectedOptionId(options.id))}
                  // style={{ visibility: "hidden" }}
                /></label>
              </li>
            ))}
          </ul>
          
          <NextButton questions={questions} category={category} selectedOptionId={selectedOptionId} />

        </div>
      )
      : (<div>Loading...</div>)
    }
    </div>
  );
}

export default Quiz;
