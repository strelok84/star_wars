import React, { useState, useEffect } from "react";
import Loader from "../common/Loader/Loader";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  useEffect(async () => {
    function request(url) {
      return fetch(url);
    }
    const url = "https://swapi.dev/api/vehicles/";
    const response = await request(url);
    const data = await response.json();
    console.log(data.results);
    setVehicles(data.results);
  }, []);

  return (
    <div>
        <a href='./'>Назад</a>
      <table>
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
          {vehicles.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.model}</td>
              <td>{item.vehicle_class}</td>
              <td>{item.cargo_capacity}</td>
              <td>{item.manufacturer}</td>
              <td>{item.crew}</td>
              <td>{item.passengers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vehicles;
