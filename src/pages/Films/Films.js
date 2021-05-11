import React, { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import "antd/dist/antd.css";
import { Button, Layout } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;

function Films() {
  const [films, setFilms] = useState([]);
  let [isLoading, setLoading] = useState(true);
  let [page, setPage] = useState(1);
  const [maxpage, setMaxpage] = useState();

  useEffect(() => {
    const prevBtn = document.getElementById("prev");
    page === 1 ? (prevBtn.disabled = true) : (prevBtn.disabled = false);
    const nextBtn = document.getElementById("next");
    page === maxpage ? (nextBtn.disabled = true) : (nextBtn.disabled = false);
    async function request() {
      const url = `https://swapi.dev/api/films/?page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setLoading((currentIsLoaded) => false);
        setFilms(data.results);
        setMaxpage(Math.ceil(data.count / 10));
      }
    }
    request();
    setLoading((currentIsLoaded) => (currentIsLoaded = false));
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

export default Films;
