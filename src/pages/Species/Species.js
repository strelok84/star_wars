import React, { useState, useEffect } from "react";
import Loader from "../common/Loader/Loader";

function Species() {
  const [species, setSpecies] = useState([]);
  useEffect(async () => {
    function request(url) {
      return fetch(url);
    }
    const url = "https://swapi.dev/api/species/";
    const response = await request(url);
    const data = await response.json();
    console.log(data.results);
    setSpecies(data.results);
  }, []);

  return (
    <div>
        <a href='./'>Назад</a>
      <table>
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Средний рост</th>
            <th>Средняя продолжительность жизни</th>
            <th>Язык</th>
            <th>Цвет волос</th>
            <th>Цвет глаз</th>
            <th>Цвет кожи</th>
          </tr>
        </thead>
        <tbody>
          {species.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.average_height}</td>
              <td>{item.average_lifespan}</td>
              <td>{item.language}</td>
              <td>{item.hair_colors}</td>
              <td>{item.eye_colors}</td>
              <td>{item.skin_colors}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Species;
