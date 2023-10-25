import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { increaseCurrentQuestion } from "../../Store/currentQuestionSlice";
import axios from "axios";


const NextButton = ({questions, selectedOptionId} ) => {
  const category = useParams()
  const navigate = useNavigate()
  const currentQuestion = useSelector((state) => state.currentQuestion.value)
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(60);
  const [selectedOptionIsAnswer, setSelectedOptionIsAnswer] = useState(false);
  const [score, setScore] = useState(0);
  questions[currentQuestion].options.map((option) => {
    if (option.id === selectedOptionId) {
      setSelectedOptionIsAnswer(option.isAnswer);
    }
  });
  

useEffect(() => {
  selectedOptionIsAnswer &&
    setScore((prevScore) => prevScore + questions[currentQuestion].point);
  
}, [selectedOptionIsAnswer]);

  axios.post(`http://localhost:3000/quiz/${category.category}/scoreboard`, {
    point: score,
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });


  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    if (timer === 0) {
      dispatch(increaseCurrentQuestion());
      setTimer(60);
    }
    return () => clearInterval(interval);
  }, [timer]);


  return (
    <div className="footerQuiz">
      <div className="timer">
      {timer}
      </div>
      <div >
      <button 
      className="nextQuestionBtn"
      onClick={() => {
        
        if (currentQuestion + 1 === questions.length ) {
          navigate(`/${category.category}/scoreboard`);
        } else {
          dispatch(increaseCurrentQuestion());
          setTimer(60);
        }
      }}
    >
      {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next Question"}
      
    </button>
      </div>
    </div>
  );
};

export default NextButton;
