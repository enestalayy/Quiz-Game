import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleAsync } from "../utils/handleAsync";
import { getLastCondition, updateLastCondition, updateStep } from "../Services/quizData";
import CommonInput from "./FormFields/CommonInput";

const QuizProgress = ({questions, currentQuestion, setCurrentQuestion} ) => {
  const { category } = useParams()
  const navigate = useNavigate()
  const id = sessionStorage.getItem("id")
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [isCategoryCompleted, setIsCategoryCompleted] = useState(false)
  const [selectedOptionId, setSelectedOptionId] = useState(null)
  const [selectedOptionIds, setSelectedOptionIds] = useState([])
  const type = questions[currentQuestion].type
  
  useEffect(() => async() => {
    const[lastCondition, lastConditionError] = await handleAsync(getLastCondition(id, category));
    lastConditionError && console.log(lastConditionError)
    if(lastCondition){
    if (lastCondition.remainingTime === null || lastCondition.remainingTime === undefined) {
      setTimer(60);
    } else {
      setTimer(lastCondition.remainingTime);
    }
    if (lastCondition.selectedOption !== null || lastCondition.selectedOption !== undefined) {
      typeof lastCondition.selectedOption === "number" && setSelectedOptionId(lastCondition.selectedOption)
      typeof lastCondition.selectedOption === "string" && setSelectedOptionId(parseInt(lastCondition.selectedOption))
      typeof lastCondition.selectedOption === "object" && setSelectedOptionIds(lastCondition.selectedOption)
    }
  }
  }, []);
  useEffect(() => {
    let newScore = 0;
  
    if (type === "radio") {
      const selectedOption = questions[currentQuestion].options.find((option) => option.id === selectedOptionId);
      if (selectedOption && selectedOption.isAnswer) {
        newScore = questions[currentQuestion].point;
      }
    } else if (type === "select") {
      const selectedOption = questions[currentQuestion].options.find((option) => option.id === parseInt(selectedOptionId));
      if (selectedOption && selectedOption.isAnswer) {
        newScore = questions[currentQuestion].point;
      } 
    } else if (type === "checkbox") {
      const selectedOptions = questions[currentQuestion].options.filter((option) => option.isAnswer);
      const correctSelectedOptionIds = selectedOptions.map((option) => option.id).sort();
      const selectedOptionIdsSorted = selectedOptionIds.sort();
      if (JSON.stringify(correctSelectedOptionIds) === JSON.stringify(selectedOptionIdsSorted)) {
        newScore = questions[currentQuestion].point;
      }
    }
  
    setScore(newScore);
  }, [selectedOptionId, selectedOptionIds]);
  
  const handleNextStep = async () => {
    try {
      await updateStep(id, category, score, isCategoryCompleted, currentQuestion, selectedOptionId, questions, selectedOptionIds);
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
        
          {
            type === "select"          
            ?
            <select
            name="answer"
            className="optionInput"
            onChange={((e) => setSelectedOptionId(e.target.value))}
            value={selectedOptionId || ''}
            >

              {questions[currentQuestion].options.map((option) => (
                <option key={option.id} value={option.id}>
                {option.option}
                </option>
              ))}
            </select>
            :
          questions[currentQuestion].options.map((options) => (
            
            <li key={options.id} className="options">
              
              (<label className={`option ${selectedOptionId === options.id ? 'selectedLabel' : 'option'}`} htmlFor={options.id}>
                {options.option}
                
              </label> 
              <CommonInput
                id= {options.id}
                type={type}
                name="answer"
                className="optionInput"
                checked= {type==="checkbox" ? selectedOptionIds.includes(options.id) :selectedOptionId === options.id}
                value={options.id}
                onChange={(e) => {
                  if (type === "checkbox") {
                    if (e.target.checked) {
                      setSelectedOptionIds((prev) => [...prev, options.id]);
                    } else {
                      setSelectedOptionIds((prev) => prev.filter((id) => id !== options.id));
                    }
                  } else {
                    setSelectedOptionId(e.target.checked ? options.id : null);
                  }
                }}
              />)
            </li>
          ))}
      </ul>
    <div className="footerQuiz">
    <button 
      className="nextQuestionBtn"
      onClick={ async () =>  {
        try {
          await updateLastCondition(id, category, currentQuestion, selectedOptionId, timer, selectedOptionIds);
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
