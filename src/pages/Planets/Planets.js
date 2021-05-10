import React, { useState, useEffect, useReducer } from "react";
import Loader from "../common/Loader/Loader";

function Planets() {
  const [planets, setPlanets] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(async () => {
    function request(url) {
      return fetch(url);
    }
    const url = "https://swapi.dev/api/planets/";
    const response = await request(url);
    const data = await response.json();
    console.log(data.results);
    setPlanets(data.results);
  }, []);

  function byNumberField(field) {
    setPlanets(
      planets.sort((a, b) => {
        return +a[field] > +b[field] ? 1 : -1;
      })
    );
    forceUpdate();
  }

  function byAlphField(field) {
    setPlanets(
      planets.sort((a, b) => {
        return a[field] > b[field] ? 1 : -1;
      })
    );
    forceUpdate();
  }

  return (
    <div>
        <a href='./'>Назад</a>
      <table>
        <thead>
          <tr>
            <th
              onClick={() => {
                byAlphField("name");
              }}
            >
              Имя
            </th>
            <th
              onClick={() => {
                byAlphField("climate");
              }}
            >
              Климат
            </th>
            <th
              onClick={() => {
                byNumberField("gravity");
              }}
            >
              Гравитация
            </th>
            <th
              onClick={() => {
                byNumberField("rotation_period");
              }}
            >
              Продолжительность дня
            </th>
            <th
              onClick={() => {
                byNumberField("orbital_period");
              }}
            >
              Продолжительность года
            </th>
            <th
              onClick={() => {
                byNumberField("population");
              }}
            >
              Население
            </th>
            <th
              onClick={() => {
                byAlphField("terrain");
              }}
            >
              Поверхность
            </th>
          </tr>
        </thead>
        <tbody>
          {planets.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.climate}</td>
              <td>{item.gravity}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.population}</td>
              <td>{item.terrain}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Planets;
