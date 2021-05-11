import React, { useState, useEffect, useReducer } from "react";
import Loader from "../../common/Loader/Loader";
import "antd/dist/antd.css";
import { Button, Layout } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer } = Layout;

function Planets() {
  const [planets, setPlanets] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [isLoading, setLoading] = useState(true);
  let [page, setPage] = useState(1);
  const [maxpage, setMaxpage] = useState();
  useEffect(() => {
    const prevBtn = document.getElementById("prev");
    page === 1 ? (prevBtn.disabled = true) : (prevBtn.disabled = false);
    const nextBtn = document.getElementById("next");
    page === maxpage ? (nextBtn.disabled = true) : (nextBtn.disabled = false);
    async function request() {
      const url = `https://swapi.dev/api/planets/?page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setLoading((currentIsLoaded) => false);
        setPlanets(data.results);
        setMaxpage(Math.ceil(data.count / 10));
      }
    }

    request();
  }, [page]);

  function byNumberField(field) {
    setPlanets(
      planets.sort((a, b) => {
        if (+a[field] > +b[field]) {
          return 1;
        }
        if (+a[field] < +b[field]) {
          return -1;
        }
        return 0;
      })
    );
    forceUpdate();
  }

  function byAlphField(field) {
    setPlanets(
      planets.sort((a, b) => {
        if (a[field] > b[field]) {
          return 1;
        }
        if (a[field] < b[field]) {
          return -1;
        }
        return 0;
      })
    );
    forceUpdate();
  }
  
  function prevPage() {
    if (page > 1) {
      setPage(--page);
    }
  }

  function nextPage() {
    if (page < maxpage) {
      setPage(++page);
    } else if (page === maxpage) {
    }
  }
  return (
    <>
      <Layout>
        <Header>
          <Button href="./">Назад</Button>
        </Header>
        <Content>
          {isLoading ? (
            <Loader />
          ) : (
            <table>
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
            </table>
          )}
        </Content>
        <Footer>
          <Button onClick={() => prevPage()} id="prev">
            <ArrowLeftOutlined />
          </Button>
          <Button onClick={() => nextPage()} id="next">
            <ArrowRightOutlined />
          </Button>
        </Footer>
      </Layout>
    </>
  );
}

export default Planets;
