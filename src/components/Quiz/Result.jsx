import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";



const Result = () => {
  const { category } = useParams();
  const [scoreboard, setScoreboard] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/scoreboard')
      .then((response) => {
        setScoreboard(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category]);

  return (
    <div>
      <h1>{category} Quiz Results</h1>
      <table> 
        <thead>
          <tr>
            <th>Username</th>
            <th>Point</th>
          </tr>
        </thead>
        <tbody>
          {scoreboard.map((item) => ( 
            <tr key={item.username}>
              <td>{item[category] &&
              item.username
              }</td>
              <td>{item[category]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
