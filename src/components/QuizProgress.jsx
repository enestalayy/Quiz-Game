import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { increaseCurrentQuestion, resetCurrentQuestion } from "../Store/currentQuestionSlice";
import { handleAsync } from "../utils/handleAsync";
import { updateScore } from "../Services/quiz";
import { updateStep } from "../Services/quizData";


const QuizProgress = ({questions, selectedOptionId, setSelectedOptionId} ) => {
  const { category } = useParams()
  const navigate = useNavigate()
  const currentQuestion = useSelector((state) => state.currentQuestion.value)
  const id = sessionStorage.getItem("id")
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [isCategoryCompleted, setIsCategoryCompleted] = useState(false) 


  useEffect(() => {
    setScore(0)
    const selectedOption = questions[currentQuestion].options.find((option) => option.id === selectedOptionId);
    if (selectedOption) {
      if (selectedOption.isAnswer) {
        setScore(questions[currentQuestion].point);
      } else {
        setScore(0);
      }
    }
    (currentQuestion + 1 === questions.length ) && setIsCategoryCompleted(true)
    handleAsync(updateStep(id, category,isCategoryCompleted, currentQuestion, selectedOptionId, timer))
  }, [selectedOptionId, currentQuestion, questions, category, id, isCategoryCompleted, timer]);

  
  const handleNextStep = () => {
    if (currentQuestion + 1 === questions.length ) {
      navigate(`/${category}/scoreboard`);
      dispatch(resetCurrentQuestion())
    } else {
      dispatch(increaseCurrentQuestion());
      setTimer(60);
      setSelectedOptionId(null)
    }
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
      if (timer === 1) {
        handleNextStep();
        handleAsync(updateScore(id, score, category, isCategoryCompleted))
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="footerQuiz">
      <div className="timer">
      {timer}
      </div>
      <div >
      <button 
      className="nextQuestionBtn"
      onClick={() => {
        handleNextStep()
        handleAsync(updateScore(id, score, category, isCategoryCompleted))
      }}
      
    >
      {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next Question"}
      
    </button>
      </div>
    </div>
  );
};

export default QuizProgress;
