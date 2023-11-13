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
      const lastTime = lastCondition.remainingTime
    if (lastTime === null || lastTime === undefined) {
      setTimer(60);
    } else {
      setTimer(lastTime);
    }
    const lastOption = lastCondition.selectedOption
    if (lastOption !== null || lastOption !== undefined) {
      typeof lastOption === "number" && setSelectedOptionId(lastOption)
      typeof lastOption === "string" && setSelectedOptionId(parseInt(lastOption))
      typeof lastOption === "object" && setSelectedOptionIds(lastOption)
    }
  }
  document.addEventListener('keydown', handleKeyDown, true)
  return () => {
    document.removeEventListener('keydown', handleKeyDown, true);
  };  
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
  console.log(score)
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
      setSelectedOptionIds([])
      document.activeElement && document.activeElement.blur()
    }
  }
  const handleKeyDown = (e) => {
    e.preventDefault()
    if (e.key==='Enter') {
      document.activeElement.click();
    }
     else if (e.key === 'ArrowRight' || e.key==='ArrowLeft') {
      const buttons = Array.from(document.getElementsByTagName('button'));
      let currentIndex = buttons.findIndex((element) => element === document.activeElement);
      console.log(buttons)
      console.log(currentIndex)
      if (currentIndex === -1) {
        buttons[0].focus();
        currentIndex = 0;
      }
       else {
        if (e.key === 'ArrowRight') {
          currentIndex = (currentIndex + 1) % buttons.length;
        } else if (e.key === 'ArrowLeft') {
          currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        }
        buttons[currentIndex].focus();
      }
    }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const select = document.querySelector('select.optionInput');
        if(select && select !== null) {
          const options = Array.from(select.options)
          const currentInput = select.options.selectedIndex
        
        console.log(select.options.selectedIndex)
        let newIndex;
        if(e.key === 'ArrowDown'){
          newIndex = (currentInput + 1) % options.length
          
        } else if(e.key === 'ArrowUp') {
          newIndex = (currentInput - 1 + options.length) % options.length
        }
        setSelectedOptionId(newIndex)
      }else {
        const inputs = document.getElementsByTagName('input')
        const options = Array.from(inputs)
        let currentInput = options && options.findIndex((element) => element === document.activeElement);
        if(currentInput === -1){
          currentInput = e.key === 'ArrowDown' ? 0 : options.length - 1;
          options[currentInput] && options[currentInput].focus();
        } else if(e.key==='ArrowDown'){
          currentInput = (currentInput + 1) % options.length;
        }else if (e.key === 'ArrowUp') {
          currentInput = (currentInput - 1 + options.length) % options.length;
        }
        options[currentInput] && options[currentInput].focus()
      }
    }
  };
  useEffect(() => {
    (currentQuestion + 1 === questions.length ) && setIsCategoryCompleted(true)
    const interval = setInterval(async () => {
      setTimer((prevTimer) => prevTimer - 1 );
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
            className="optionInput optionSelect"
            onChange={((e) => setSelectedOptionId(e.target.value))}
            value={selectedOptionId || ''}
            >

              {questions[currentQuestion].options.map((option) => (
                <option className="optionSelect" key={option.id} value={option.id}>
                {option.option}
                </option>
              ))}
            </select>
            :
          questions[currentQuestion].options.map((options) => (
            
            <li key={options.id} className="options">
              
              <label
                className={`${
                  type === 'radio'
                    ? selectedOptionId === options.id
                      ? 'selectedLabel'
                      : 'option'
                    : type === 'checkbox'
                    ? selectedOptionIds.includes(options.id)
                      ? 'selectedLabel'
                      : 'option'
                    : ''
                }`}
                htmlFor={options.id}>
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
                onFocus={() => {
                  const labelElement = document.querySelector(`label[for="${options.id}"]`);
                  if (labelElement) {
                    labelElement.style.border = '2px solid magenta';
                  }else labelElement.style.border = 'none';
                }}
                onBlur={() => {
                  document.querySelector(':focus') && document.querySelector(':focus').blur()
                  const labelElement = document.querySelector(`label[for="${options.id}"]`);
                  if (selectedOptionId !== options.id) {
                    labelElement.style.border = 'none';
                  }
                }}

              />
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
