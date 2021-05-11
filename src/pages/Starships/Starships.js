import React, { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import "antd/dist/antd.css";
import { Button, Layout } from "antd";
const { Header, Content } = Layout;

function Starships() {
  const [starships, setStarships] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    let pages = 1;
    async function request() {
      const url = `https://swapi.dev/api/starships/?page=${pages}`;
      const response = await fetch(url);
      const data = await response.json();
      setStarships((oldArray) => [...oldArray, ...data.results]);
      if (data["next"]) {
        pages++;
        request();
      }
      console.log(starships);
    }
    
    request();
    setLoading(currentIsLoaded=>!currentIsLoaded)
  }, []);

  return (
    <div>
     <Button href="./">Назад</Button>
      {isLoading?<Loader />:
      (<table>
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Модель</th>
            <th>Класс</th>
            <th>Грузоподьемность</th>
            <th>Производитель</th>
            <th>Экипаж</th>
            <th>Пассажиров</th>
          </tr>
        </thead>
        <tbody>
          {starships.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.model}</td>
              <td>{item.starship_class}</td>
              <td>{item.cargo_capacity}</td>
              <td>{item.manufacturer}</td>
              <td>{item.crew}</td>
              <td>{item.passengers}</td>
            </tr>
          ))}
        </tbody>
      </table>)}
    </div>
  );
}

export default Starships;
