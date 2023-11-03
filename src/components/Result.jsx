import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { handleAsync } from "../utils/handleAsync";
import { getCategories, getScores } from "../Services/quiz";
import SelectInput from "./FormFields/SelectInput";



const Result = () => {
  const [categories, setCategories] = useState([])
  const { category: defaultCategory } = useParams();
  const [category, setCategory] = useState(defaultCategory);
  const [scoreboard, setScoreboard] = useState([]);
  const userName = sessionStorage.getItem("username")
  
  useEffect(() => {
    const fetchData = async () => {
      const [categories, categoriesError] = await handleAsync(getCategories());
      categoriesError && console.error('Kategoriler alınırken hata oluştu', categoriesError);
      setCategories(categories);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const [scores, scoresError] = await handleAsync(getScores(category));
      scoresError && console.log('Score değerleri alınırken bir sorun oldu', scoresError);
      setScoreboard(scores);
    };

    fetchData();
  }, [category]);


  
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
