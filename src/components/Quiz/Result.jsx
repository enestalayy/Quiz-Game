import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";



const Result = () => {
  const { category } = useParams();
  const [scoreboard, setScoreboard] = useState([]);
  useEffect(() => {
    axios.get('/scoreboard')
      .then((response) => {
        setScoreboard(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category]);
  console.log(scoreboard)

  return (
    <div className="container">
      <h1>{category} Quiz Results</h1>
      <table className="scoreboard-table"> 
        <thead>
          <tr>
            <th>Username</th>
            <th>Point</th>
          </tr>
        </thead>
        <tbody>
          {scoreboard[category].map((item) => ( // scoreboard dizisindeki her bir objeyi tablo satırına dönüştür
            <tr key={item.id}>
              <td>{item.username}</td>
              <td>{item.point}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
