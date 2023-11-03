import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuizProgress from "../components/QuizProgress";
import { useSelector } from "react-redux";
import { getQuestions } from "../Services/quiz";
import { handleAsync } from "../utils/handleAsync";
import { getLastQuestion, getStep } from "../Services/quizData";


function Quiz() {
  const id = sessionStorage.getItem('id')
  const {category} = useParams();
  const userName = sessionStorage.getItem("username")
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0)
  // const [remainingTime, setRemainingTime] = useState()
  useEffect(() => async() => {
    const[questions, questsError] = await handleAsync(getQuestions(category))
    const[quizData, quizDataError] = await handleAsync(getLastQuestion(id, category));

    questsError && console.log(questsError)
    quizDataError && console.log(quizDataError)
    setQuestions(questions)
    if (quizData.currentQuestion !== null && quizData.currentQuestion !== undefined) {
      setCurrentQuestion(quizData.currentQuestion);
    }

    // quizData.currentQuestion && setCurrentQuestion(quizData.currentQuestion)
    // setRemainingTime(quizData.remainingTime)
    // setSelectedOptionId(quizData.selectedOption)
  }, []);




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
              {
              questions[currentQuestion].question}

            </div>

          </div>
          
          {/* <ul className="optionSection">
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
          </ul> */}
          
          <QuizProgress
            questions={questions}
            category={category}
            setQuestions={setQuestions}

            // remainingTime={remainingTime}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            />

        </div>
      )
      : (<div>Loading...</div>)
    }
    </div>
  );
}

export default Quiz;
