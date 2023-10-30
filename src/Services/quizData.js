import axios from 'axios'
export const updateStep = async (id, category,isCategoryCompleted, currentQuestion, selectedOptionId, timer) => {
    const response = await axios.get(`http://localhost:3000/users/${id}`);
    const userData = response.data;

    if (!userData.quizData[category]) {
        userData.quizData[category] = {
          isCompleted: isCategoryCompleted,
          step: {
            currentQuestion: currentQuestion + 1,
            time: timer,
          },
        };
      } else {
        userData.quizData[category].isCompleted = isCategoryCompleted;
        userData.quizData[category].step[currentQuestion + 1] = selectedOptionId;
        userData.quizData[category].step.time = timer;
      }
      await axios.patch(`http://localhost:3000/users/${id}`, userData);
      return true;
}
export const getStep = async (id, category, questions, setSelectedQuestion, setTimer, setSelectedOptionId) => {
  const response = await axios.get(`http://localhost:3000/users/${id}`)
  const userData = response.data;

  if (userData.quizData[category]) {
    const categoryData = userData.quizData[category];
    
    if (categoryData.isCompleted) {
      // Kullanıcı bu kategoriyi tamamlamışsa, baştan başlatın veya isteğinize göre işlem yapın.
    } else {
      // Kullanıcı bu kategoriyi daha önce başlatmışsa, kaldığı yerden devam etmelisiniz.
      const currentQuestion = categoryData.step.currentQuestion || 0;
      const timer = categoryData.step.time || 60;
      const selectedOptionId = categoryData.step[currentQuestion + 1]?.selectedOptionId || null; // Seçilen seçenek
      console.log(currentQuestion)
      console.log(timer)
      console.log(categoryData.step[currentQuestion + 1]?.selectedOptionId)
      // Şimdi bu bilgilere göre ilgili soruyu ve süreyi getirin
      const questionsForCategory = questions; // Bu, soruların tam listesi olmalı
  
      if (currentQuestion >= 0 && currentQuestion < questionsForCategory.length) {
        const selectedQuestion = questionsForCategory[currentQuestion];
        setSelectedQuestion(selectedQuestion);
        setTimer(timer);
        setSelectedOptionId(selectedOptionId);
      }
    }
  } 
  
}
