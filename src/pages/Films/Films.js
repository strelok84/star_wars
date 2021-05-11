import React, { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";

import "antd/dist/antd.css";

import { Button, Layout } from "antd";
const { Header, Content } = Layout;

function Films() {
  const [films, setFilms] = useState([]);
  let [isLoading, setLoading] = useState(true);
  useEffect(() => {
    let pages = 1;
    async function request() {
      const url = `https://swapi.dev/api/films/?page=${pages}`;
      const response = await fetch(url);
      const data = await response.json();
      setFilms((oldArray) => [...oldArray, ...data.results]);
      if (data["next"]) {
        pages++;
        request();
      }
    }
    request();
    setLoading((currentIsLoaded) => (currentIsLoaded = false));
  }, []);

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
      </Layout>
    </>
  );
}

export default Films;
