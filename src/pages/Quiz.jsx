import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuizProgress from "../components/QuizProgress";
import { useSelector } from "react-redux";
import { getQuestions } from "../Services/quiz";
import { handleAsync } from "../utils/handleAsync";
import { getStep } from "../Services/quizData";


function Quiz() {
  const id = sessionStorage.getItem('id')
  const {category} = useParams();
  const currentQuestion = useSelector((state) => state.currentQuestion.value)
  const userName = sessionStorage.getItem("username")
  const [questions, setQuestions] = useState([]);
  const [selectedOptionId, setSelectedOptionId] = useState(null)
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    handleAsync(getQuestions(setQuestions, category))
    

  }, [category, setSelectedQuestion, setTimer, setSelectedOptionId]);
  useEffect(() => {
    ;

    handleAsync(
      getStep(id, category, questions, setSelectedQuestion, setTimer, setSelectedOptionId)
    );
  }, [category]);
  useEffect(() => {
  }, [selectedOptionId, currentQuestion, questions]);
  console.log(selectedQuestion)
  return (
    <div className="container">
        <h3 className="usernameInfo">Username: {userName}</h3>

      {questions?.length > 0 ? (
        <div className="questionPage">
          <div className="questionSection">
            <div className="progressBar">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="questionText">
              {/* {questions[currentQuestion].question} */}
              {selectedQuestion
                ? selectedQuestion.question
                : "Loading..."}
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
                  checked= {selectedOptionId === options.id}
                  onChange={((e) => e.target.checked && setSelectedOptionId(options.id))}
                  // style={{ visibility: "hidden" }}
                /></label>
              </li>
            ))}
          </ul>
          
          <QuizProgress
            questions={questions}
            category={category}
            setQuestions={setQuestions}
            selectedOptionId={selectedOptionId}
            setSelectedOptionId={setSelectedOptionId}
            setTimer={setTimer}
            />

        </div>
      )
      : (<div>Loading...</div>)
    }
    </div>
  );
}

export default Quiz;
