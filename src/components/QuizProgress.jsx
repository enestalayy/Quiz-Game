import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleAsync } from "../utils/handleAsync";
import { getLastCondition, updateLastCondition, updateStep } from "../Services/quizData";

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
    if(lastCondition){
    if (lastCondition.remainingTime === null || lastCondition.remainingTime === undefined) {
      setTimer(60);
    } else {
      setTimer(lastCondition.remainingTime);
    }
    if (lastCondition.selectedOption !== null && lastCondition.selectedOption !== undefined) {
      setSelectedOptionId(lastCondition.selectedOption);
    }
  }
  }, []);

  useEffect(() => {
    const selectedOption = questions[currentQuestion].options.find((option) => option.id === selectedOptionId);
    selectedOption && selectedOption.isAnswer 
    ? setScore(questions[currentQuestion].point)
    : setScore(0);
  }, [selectedOptionId])

  const handleNextStep = async () => {
    try {
      await updateStep(id, category, score, isCategoryCompleted, currentQuestion, selectedOptionId, questions);
    } catch (error) {
      console.error('Step değerleri patchlenirken hata oluştu', error);
    }
    if (currentQuestion + 1 === questions.length ) {
      navigate(`/${category}/scoreboard`);
      setCurrentQuestion(0)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setTimer(60);
      setSelectedOptionId(null)
    }
  }
  
  useEffect(() => {
    (currentQuestion + 1 === questions.length ) && setIsCategoryCompleted(true)
    const interval = setInterval(async () => {
      setTimer((prevTimer) => prevTimer - 1);
      if (timer === 1) {
        await handleNextStep()
    }}, 1000);
    return () => clearInterval(interval);
  }, [timer]);
  
  return (
    <div >
      <ul className="optionSection">
            {questions[currentQuestion].options.map((options) => (
              <li key={options.id} className="options">
                <label className={`option ${selectedOptionId === options.id ? 'selectedLabel' : 'option'}`} htmlFor={options.id}>
                  {options.option}
                  
                </label>
                <input
                    id= {options.id}
                    type="radio"
                    name="answer"
                    className="optionInput"
                    checked= {selectedOptionId === options.id}
                    onChange={((e) => e.target.checked && setSelectedOptionId(options.id))}
                    onClick={((e) => e.target.checked && setSelectedOptionId(null))}
                    style={{ display: "none" }}
                  />
              </li>
            ))}
          </ul>
    <div className="footerQuiz">
    <button 
      className="nextQuestionBtn"
      onClick={ async () =>  {
        try {
          await updateLastCondition(id, category, currentQuestion, selectedOptionId, timer);
        } catch (error) {
          console.error("Last Condition değerleri güncellenirken hata oluştu", error);
        }
        navigate('/categories')
      }}     
      >
        Exit Quiz
    </button>
      <div className="timer">
      {timer}
      </div>

      <button 
      className="nextQuestionBtn"
      onClick={ async () =>  {
        await handleNextStep()
      }}     
      >
      {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next Question"}
      
    </button>

    </div>
    </div>
  );
};

export default QuizProgress;
