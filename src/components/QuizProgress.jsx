import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { increaseCurrentQuestion, resetCurrentQuestion } from "../Store/currentQuestionSlice";
import { handleAsync } from "../utils/handleAsync";
import { updateScore } from "../Services/quiz";
import { getLastCondition, updateStep } from "../Services/quizData";


const QuizProgress = ({questions, currentQuestion, setCurrentQuestion} ) => {
  const { category } = useParams()
  const navigate = useNavigate()
  const id = sessionStorage.getItem("id")
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [isCategoryCompleted, setIsCategoryCompleted] = useState(false) 
  const [selectedOptionId, setSelectedOptionId] = useState(null)


  useEffect(() => async() => {
    const[lastCondition, lastConditionError] = await handleAsync(getLastCondition(id, category));
    lastConditionError && console.log(lastConditionError)
    
    if (lastCondition.remainingTime === null || lastCondition.remainingTime === undefined) {
      setTimer(60);
    } else {
      setTimer(lastCondition.remainingTime);
    }
    if (lastCondition.selectedOption !== null && lastCondition.selectedOption !== undefined) {
      setSelectedOptionId(lastCondition.selectedOption);
    }
  }, []);
  // (currentQuestion + 1 === questions.length ) && setIsCategoryCompleted(true)


  
  const handleNextStep = async () => {
    const selectedOption = questions[currentQuestion].options.find((option) => option.id === selectedOptionId);
    selectedOption && selectedOption.isAnswer 
    ? setScore(questions[currentQuestion].point)
    : setScore(0);
    if (currentQuestion + 1 === questions.length ) {
      navigate(`/${category}/scoreboard`);
      setCurrentQuestion(0)
      setIsCategoryCompleted(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setTimer(60);
      setSelectedOptionId(null)
    }
    console.log(score)
    try {
      await updateStep(id, category, score, isCategoryCompleted, currentQuestion, selectedOptionId);
    } catch (error) {
      console.error('Step değerleri patchlenirken hata oluştu', error);
    }
  }
  
  useEffect(() => {
    const interval = setInterval(async () => {
      setTimer((prevTimer) => prevTimer - 1);
      if (timer === 1) {
          
          await handleNextStep()
          // await handleAsync(updateStep(id, category, score, isCategoryCompleted, currentQuestion, selectedOptionId, timer))
          
          
    }}, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="optionSection">
      <ul>
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
    <div className="footerQuiz">
      <div className="timer">
      {timer}
      </div>
      <div >
      <button 
      className="nextQuestionBtn"
      onClick={ async () =>  {
        await handleNextStep()
        // await handleAsync(updateStep(id, category, score, isCategoryCompleted, currentQuestion, selectedOptionId, timer))
}}
      
    >
      {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next Question"}
      
    </button>
      </div>
    </div>
    </div>
  );
};

export default QuizProgress;
