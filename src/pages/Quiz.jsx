import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NextButton from "../components/Quiz/NextButton";
import { useDispatch,useSelector } from "react-redux";


function Quiz() {
  const category = useParams();
  const currentQuestion = useSelector((state) => state.currentQuestion.value)
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate()
  const [selectedOptionId, setSelectedOptionId] = useState(null)
console.log(category)
  useEffect(() => {
    fetch("http://localhost:3000/quiz?category=" + category)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data[category.category]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [category]);

  return (
    <div className="container">
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
                <label className="option" htmlFor="">{options.option}
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
