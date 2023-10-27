import React,{useState, useEffect} from 'react'
import Result from '../components/Quiz/Result'
// import axios from 'axios'
function ScoreBoard() {
  // const [scores, setScores] = useState([]);

  // useEffect(() => {
  //     axios.get('http://localhost:3000/scoreboard')
  //         .then(res => {
  //             console.log(res.data);
  //         })
  //         .catch(err => {
  //             console.error(err);
  //         });
  // }, []);
  return (
    <div className='container'>
      <div className="borderContainer">
        <Result />
      </div>
    </div>
  )
}

export default ScoreBoard