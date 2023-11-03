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
export const updateScore = async (id, score, category,currentQuestion) => {
    const response = await axios.get(`http://localhost:4000/users/${id}`);
    const userData = response.data;

    const defaultCategoryData = {
        score: 0,
        step: null
    };

    if (!userData.scores[category]) {
        userData.scores[category] = { ...defaultCategoryData };
      }
    userData.scores[category].score += score;
    userData.scores[category].step = currentQuestion + 1;

    const updateResponse = await axios.patch(`http://localhost:4000/users/${id}`, userData);
    return updateResponse;
}

export const getScores = async (category, setScoreboard) => {
    const response = await axios.get(`http://localhost:4000/users`)
    const scoreboard = []
    response.data.forEach((user) => {
        if (user.scores[category] && user.scores[category].isFinished) {
          const score = user.scores[category].score;
          const username = user.username;
    
          scoreboard.push({ username, score });
        }
      });
    setScoreboard(scoreboard)
}

  
  
  