import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { increaseCurrentQuestion } from "../../Store/currentQuestionSlice";
import axios from "axios";


const NextButton = ({questions, selectedOptionId} ) => {
  const category = useParams()
  const navigate = useNavigate()
  const currentQuestion = useSelector((state) => state.currentQuestion.value)
  const userName = useSelector((state) => state.userName.value)
  const [id, setId] = useState()
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(600);
  const [selectedOptionIsAnswer, setSelectedOptionIsAnswer] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    setSelectedOptionIsAnswer(false);
    questions[currentQuestion].options.map((option) => {
      if (option.id === selectedOptionId) {
        option.isAnswer && setSelectedOptionIsAnswer(true)
        console.log(option.isAnswer)
      }
    });
  }, [selectedOptionId]);

  const NextQuestion = (() => {
    axios.get(`http://localhost:3000/scoreboard?username=${userName}`)
    .then((response) => {
      setId(response.data[0].id)
    })
    .catch((error) => {
      console.log(error);
    })



    axios.patch(`http://localhost:3000/scoreboard/${id}`, {
    [category.category]: score
  })
.then((response) => {
  console.log(response.data);
})
.catch((error) => {
  console.log(error);
})

    if (currentQuestion + 1 === questions.length ) {
      navigate(`/${category.category}/scoreboard`);
      
    } else {
      dispatch(increaseCurrentQuestion());
      setTimer(60);
      
      }
    })

  useEffect(() => {
    selectedOptionIsAnswer &&
      setScore((prevScore) => prevScore + questions[currentQuestion].point);
    
  }, [selectedOptionIsAnswer]);

  


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
      onClick={() => NextQuestion()}
    >
      {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next Question"}
      
    </button>
      </div>
    </div>
  );
};

export default NextButton;
