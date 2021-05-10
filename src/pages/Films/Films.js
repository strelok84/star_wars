import React, { useState, useEffect } from "react";
import Loader from "../common/Loader/Loader";

function Films() {
  const [films, setFilms] = useState([]);
  useEffect(async () => {
    function request(url) {
      return fetch(url);
    }
    const url = "https://swapi.dev/api/films/";
    const response = await request(url);
    const data = await response.json();
    console.log(data.results);
    setFilms(data.results);
  }, []);

  return (
    <div>
        <a href='./'>Назад</a>
      <table>
        <thead>
          <tr>  
          <th>Название</th>
          <th>Режиссер</th>
          <th>Продюсер</th>
          <th>Дата выхода</th>
          </tr>
        </thead>
        <tbody>
          {films.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.director}</td>
              <td>{item.producer}</td>
              <td>{item.release_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Films;
