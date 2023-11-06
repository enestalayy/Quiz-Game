import axios from 'axios'

export const getCategories = async () => {
    const response = await axios.get(`http://localhost:4000/quiz`)
    return Object.keys(response.data)
}

export const getQuestions = async ( category) => {
    const response = await axios.get(`http://localhost:4000/quiz?category=` + category)
    return response.data[category]
}

export const getId = async ( userName) => {
    const response = await axios.get(`http://localhost:4000/users?username=${userName}`)
    return response.data[0].id
}



export const getScores = async (category) => {
    const response = await axios.get(`http://localhost:4000/users`)
    const scoreboard = []
    response.data.forEach((user) => {
        const categoryData = user.quizData[category]
        if (categoryData && categoryData.isCompleted) {
          const score = categoryData.score;
          const username = user.username;
          scoreboard.push({ username, score });
        } else return
      });
      return scoreboard
}

  
  
  