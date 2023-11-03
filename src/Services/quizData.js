import axios from 'axios'

export const updateStep = async (id, category, score, isCategoryCompleted, currentQuestion, selectedOptionId, questions) => {
  const response = await axios.get(`http://localhost:4000/users/${id}`);
  const userData = response.data;
  if (!userData.quizData[category]) {
    userData.quizData[category] = {
      score: score,
      isCompleted: isCategoryCompleted,
      step: {
        1: selectedOptionId,
      },
      }
    await axios.put(`http://localhost:4000/users/${id}`, userData);
  }     else {     
          userData.quizData[category].score += score;
          userData.quizData[category].isCompleted = isCategoryCompleted;
          userData.quizData[category].step[currentQuestion + 1] = selectedOptionId;
          currentQuestion + 1 !== questions.length && (userData.quizData[category].step[currentQuestion + 2] = null)
          userData.quizData[category].step.time && delete userData.quizData[category].step.time;
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

export const updateLastCondition = async (id, category, currentQuestion, selectedOptionId, timer) => {
  const response = await axios.get(`http://localhost:4000/users/${id}`);
  const userData = response.data;
  if (!userData.quizData[category]) {
    userData.quizData[category] = {
      score: 0,
      isCompleted: false,
      step: {
        1: selectedOptionId,
        time: timer,
      },
      }
    await axios.put(`http://localhost:4000/users/${id}`, userData);
  }else {
    // userData.quizData[category].step = {
    //     time: timer,
    //   }
    userData.quizData[category].step[currentQuestion + 1] = selectedOptionId;
    userData.quizData[category].step.time = timer;
    await axios.patch(`http://localhost:4000/users/${id}`, userData);
   }     
}

export const getLastQuestion = async (id, category) => {
  const response = await axios.get(`http://localhost:4000/users/${id}`)
  const userData = response.data;
  const categoryData = userData.quizData[category]
  var lastQuestion = null;
  if (categoryData && categoryData.step) {
    const stepKeys = Object.keys(categoryData.step);
    
    if (stepKeys.length > 0) {
      // En büyük değere sahip adımı bul
      lastQuestion = Math.max(...stepKeys.filter(key => !isNaN(key)));
    }
  }
  return lastQuestion
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
      }else if('time' in categoryData.step) {
        var remainingTime = categoryData.step.time
        var selectedOption = categoryData.step[lastQuestion]
      }
    }

  }

  return {remainingTime, selectedOption}

}
