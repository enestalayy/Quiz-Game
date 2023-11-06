import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { handleAsync } from "../utils/handleAsync";
import { getCategories, getScores } from "../Services/quiz";
import SelectInput from "./FormFields/SelectInput";
import {BsSortAlphaDownAlt, BsSortAlphaDown, BsSortDownAlt, BsSortDown} from 'react-icons/bs'

const Result = () => {
  const [categories, setCategories] = useState([])
  const { category: defaultCategory } = useParams();
  const [category, setCategory] = useState(defaultCategory);
  const [scoreboard, setScoreboard] = useState([]);
  const userName = sessionStorage.getItem("username")
  const [sortOrder, setSortOrder] = useState('toLess')

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
  const compare = (a, b) => {
    if (sortOrder === 'asc') {
      return a.username.localeCompare(b.username, 'en');
    } else if (sortOrder === 'desc') {
      return b.username.localeCompare(a.username, 'en');
    } else if (sortOrder === 'toLess') {
      return b.score - a.score;
    } else if (sortOrder === 'toMore') {
      return a.score - b.score;
    }
  };
  const sortScoreboard = () => {
    const sorted = [...scoreboard].sort(compare);
    let rank = 1;
    sorted.forEach((item, index) => {
      if (sortOrder === 'toLess') {
        if (index > 0 && item.score !== sorted[index - 1].score) {
          rank = index + 1;
        }
        item.rank = rank;
      }
    });
    return sorted;
  };
  
  return (
    <div className="resultContainer">
      

      <label className="labelCat" htmlFor="category">

        <SelectInput
          id={category}
          name={category}
          options={categories}
          onChange={((e) => setCategory(e.target.value))}
          value={category}
          className="selectCat"
        />
      </label>
      <table className="scoreboardTable" > 
        

        <thead className="scoreboardHead">
          <tr className="scoreboardRowHead">
            <th className="scoreboardRank scoreboardHeadRank">
              Rank
            </th>
            <th className="scoreboardHeadPart">
              Username
              <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                {sortOrder === 'asc' ? <BsSortAlphaDown /> : <BsSortAlphaDownAlt />}
              </button>
            </th>
            <th className="scoreboardHeadPart">
              Point
              <button onClick={() => setSortOrder(sortOrder === 'toLess' ? 'toMore' : 'toLess')}>
                {sortOrder === 'toLess' ? <BsSortDown /> : <BsSortDownAlt />}
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="scoreboardBody">
          {sortScoreboard().map((item) => ( 
              <tr className="scoreboardRow " key={item.username} style= { {background: item.username === userName && "rgba(81, 160, 213)"}}>

                <td className="scoreboardRank">{item.rank}</td>
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
