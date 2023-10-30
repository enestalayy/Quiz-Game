import axios from 'axios'

export const getCategories = async (setCategories) => {
    const response = await axios.get('http://localhost:3000/quiz')
    return setCategories(Object.keys(response.data))
}


export const getQuestions = async (setQuestions, category) => {
    const response = await axios.get("http://localhost:3000/quiz?category=" + category)
    return setQuestions(response.data[category])
}

export const getId = async ( userName) => {
    const response = await axios.get(`http://localhost:3000/users?username=${userName}`)
    return sessionStorage.setItem("id", response.data[0].id)
}
export const updateScore = async (id, score, category) => {
    const response = await axios.get(`http://localhost:3000/users/${id}`);
    const userData = response.data;

    const defaultCategoryData = {
        score: 0,
    };

    if (!userData.scores[category]) {
        userData.scores[category] = { ...defaultCategoryData };
      }
    userData.scores[category].score += score;

    const updateResponse = await axios.patch(`http://localhost:3000/users/${id}`, userData);
    return updateResponse;
}

export const getScores = async (category, setScoreboard) => {
    const response = await axios.get('http://localhost:3000/users')
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

  
  
  