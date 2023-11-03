import axios from 'axios'

export const updateStep = async (id, category, score, isCategoryCompleted, currentQuestion, selectedOptionId, timer) => {
    const response = await axios.get(`http://localhost:4000/users/${id}`);
    const userData = response.data;
   
  if (!userData.quizData[category]) {

      userData.quizData[category] = {
        score: score,
        isCompleted: isCategoryCompleted,
        step: {
          1: null,
          // time: timer,
        },
      }
            await axios.put(`http://localhost:4000/users/${id}`, userData);

  }     else {     

          userData.quizData[category].score = score;
          userData.quizData[category].isCompleted = isCategoryCompleted;
          userData.quizData[category].step[currentQuestion + 1] = selectedOptionId;
          // userData.quizData[category].step.time = timer;
          await axios.patch(`http://localhost:4000/users/${id}`, userData);
    
   }   
      
}
export const isCatCompleted = async (id) => {
  const response = await axios.get(`http://localhost:4000/users/${id}/`)
  const categories = response.data.quizData
  const completedCat = []
  for(let category in categories) {
    categories[category].isCompleted && completedCat.push(category)
  }
  return completedCat
}


export const getLastQuestion = async (id, category) => {
  const response = await axios.get(`http://localhost:4000/users/${id}`)
  const userData = response.data;
  const categoryData = userData.quizData[category]
  var lastQuestion = '';

  if(categoryData) {

    for(var key in categoryData.step) {
      if (!isNaN (key)) {
        var questionNumber = parseInt (key)
        questionNumber > lastQuestion && (lastQuestion = questionNumber)
      }
    }
  }
  // var remainingTime = categoryData.step.time
  // const selectedOption = categoryData.step[lastQuestion]
  const currentQuestion = lastQuestion -1
  return currentQuestion

}

export const getLastCondition = async (id, category) => {
  const response = await axios.get(`http://localhost:4000/users/${id}`)
  const userData = response.data;
  const categoryData = userData.quizData[category]
  var lastQuestion = '';

  if(categoryData) {

    for(var key in categoryData.step) {
      if (!isNaN (key)) {
        var questionNumber = parseInt (key)
        questionNumber > lastQuestion && (lastQuestion = questionNumber)
        var selectedOption = categoryData.step[lastQuestion]
      }else if('time' in categoryData.step) {
        var remainingTime = categoryData.step.time
      }
    }

  }

  return {remainingTime, selectedOption}

}
