import React, { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import "antd/dist/antd.css";
import { Button, Layout } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;

function Species() {
  const [species, setSpecies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  let [page, setPage] = useState(1);
  const [maxpage, setMaxpage] = useState();

  useEffect(() => {
    const prevBtn = document.getElementById("prev");
    page === 1 ? (prevBtn.disabled = true) : (prevBtn.disabled = false);
    const nextBtn = document.getElementById("next");
    page === maxpage ? (nextBtn.disabled = true) : (nextBtn.disabled = false);
    async function request() {
      const url = `https://swapi.dev/api/species/?page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setLoading((currentIsLoaded) => false);
        setSpecies(data.results);
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
              <thead className="table_head">
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

export default Species;
