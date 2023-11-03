import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuizProgress from "../components/QuizProgress";
import { getQuestions } from "../Services/quiz";
import { handleAsync } from "../utils/handleAsync";
import { getLastQuestion} from "../Services/quizData";

function Quiz() {
  const id = sessionStorage.getItem('id')
  const {category} = useParams();
  const userName = sessionStorage.getItem("username")
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const progressText = (currentQuestion + 1) / questions.length

  useEffect(() => async() => {
    const[questions, questsError] = await handleAsync(getQuestions(category))
    const[lastQuestion, lastQuestionError] = await handleAsync(getLastQuestion(id, category));
    questsError && console.log(questsError)
    lastQuestionError && console.log(lastQuestionError)
    setQuestions(questions)
    if (lastQuestion !== null && lastQuestion !== undefined) {
      setCurrentQuestion(lastQuestion - 1);
    }
  }, []);

  return (
    <div className="container">
        <h3 className="usernameInfo">Username: {userName}</h3>
      {questions?.length > 0 ? (
        <div className="questionPage">
          <div className="questionSection">
            <div className="progressBar">
              <span className="progressOverlay" style={{width: `${progressText * 100}%`}}></span>
              <span className="progressText">Question {(currentQuestion + 1)}/{questions.length}</span>
            </div>
            <div className="questionText">
              {questions[currentQuestion].question}
            </div>
          </div>
          <QuizProgress
            questions={questions}
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
