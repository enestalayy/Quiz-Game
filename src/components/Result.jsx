import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { handleAsync } from "../utils/handleAsync";
import { getCategories, getScores } from "../Services/quiz";
import { SelectInput } from "./FormFields";



const Result = () => {
  const [categories, setCategories] = useState([])
  const { category: defaultCategory } = useParams();
  const [category, setCategory] = useState(defaultCategory);
  const [scoreboard, setScoreboard] = useState([]);
  const userName = sessionStorage.getItem("username")
  
  useEffect(() => {
    handleAsync(getScores(category, setScoreboard))
  }, [category]);

  useEffect(() => {
    handleAsync(getCategories(setCategories));
  }, []);
  
  return (
    <div className="resultContainer">
      <h1>{category} Quiz Results</h1>

      <label>
        Select Category:{" "}
        <SelectInput
          id={category}
          name={category}
          options={categories}
          onChange={((e) => setCategory(e.target.value))}
          value={category}
        />
      </label>
      <table className="scoreboardTable" > 
        

        <thead className="scoreboardHead">
          <tr className="scoreboardRow">
            <th>Username</th>
            <th>Point</th>
          </tr>
        </thead>
        <tbody className="scoreboardBody">
          {scoreboard.map((item) => ( 


              <tr className="scoreboardRow" key={item.username} style= { {border: item.username === userName && "solid 2px red"}}>
                
                <td className="scoreboardRowPart">
                  {item.username}
                </td>
                <td className="scoreboardRowPart">{item.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
