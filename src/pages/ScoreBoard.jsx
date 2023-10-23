import React,{useState, useEffect} from 'react'

function ScoreBoard() {
  const [scores, setScores] = useState([]); // soruları tutacak state

  useEffect(() => {
      fetch('http://localhost:3000/scoreboard') // db.json dosyasının quiz arrayini fetch edin
          .then(res => res.json()) // gelen cevabı json formatına dönüştürün
          .then(data => {
              setScores(data); // state'i gelen veriyle güncelleyin
          })
          .catch(err => {
              // hata olması durumunda
              console.error(err);
          });
  }, []);
  console.log(scores[0].username)
  return (
    <div className='container loginContainer' key={scores.id}>
      {scores.map((user) => (
        <div key={user.id}>
          <h3>{user.username}</h3>
        </div>
      ))}
    </div>
  )
}

export default ScoreBoard