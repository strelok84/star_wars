import React, { useState, useEffect, useReducer } from "react";
import Loader from "../../common/Loader/Loader";
import "antd/dist/antd.css";
import { Button, Layout } from "antd";
import {CaretDownOutlined} from '@ant-design/icons';
const { Header, Content } = Layout;


function Planets() {
  const [planets, setPlanets] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    let pages = 1;
    async function request() {
      const url = `https://swapi.dev/api/planets/?page=${pages}`;
      const response = await fetch(url);
      const data = await response.json();
      setPlanets((oldArray) => [...oldArray, ...data.results]);
      if (data["next"]) {
        pages++;
        request();
      }
      console.log(planets);
    }
    
    request();
    setLoading(currentIsLoaded=>!currentIsLoaded)
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
    <>
    <Layout>
      <Header>
      <Button href="./">Назад</Button>
      
      </Header>
      {isLoading?<Loader />:
      (<table>
        <thead>
          <tr>
            <th
              onClick={() => {
                byAlphField("name");
              }}
            >
              Имя
              <CaretDownOutlined />
            </th>
            <th
              onClick={() => {
                byAlphField("climate");
              }}
            >
              Климат
              <CaretDownOutlined />
            </th>
            <th
              onClick={() => {
                byNumberField("gravity");
              }}
            >
              Гравитация
              <CaretDownOutlined />
            </th>
            <th
              onClick={() => {
                byNumberField("rotation_period");
              }}
            >
              Продолжительность дня
              <CaretDownOutlined />
            </th>
            <th
              onClick={() => {
                byNumberField("orbital_period");
              }}
            >
              Продолжительность года
              <CaretDownOutlined />
            </th>
            <th
              onClick={() => {
                byNumberField("population");
              }}
            >
              Население
              <CaretDownOutlined />
            </th>
            <th
              onClick={() => {
                byAlphField("terrain");
              }}
            >
              Поверхность
              <CaretDownOutlined />
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
      </table>)}
      </Layout>
    </>
  );
}

export default Planets;
