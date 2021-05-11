import React, { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import "antd/dist/antd.css";
import { Button, Layout } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;

function Starships() {
  const [starships, setStarships] = useState([]);
  const [isLoading, setLoading] = useState(true);
  let [page, setPage] = useState(1);
  const [maxpage, setMaxpage] = useState();
  useEffect(() => {
    const prevBtn = document.getElementById("prev");
    page === 1 ? (prevBtn.disabled = true) : (prevBtn.disabled = false);
    const nextBtn = document.getElementById("next");
    page === maxpage ? (nextBtn.disabled = true) : (nextBtn.disabled = false);
    async function request() {
      const url = `https://swapi.dev/api/starships/?page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setLoading((currentIsLoaded) => false);
        setStarships(data.results);
        setMaxpage(Math.ceil(data.count / 10));
      }
    }
    request();
  }, [page]);

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

export default Starships;
