import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import Loader from "../../common/Loader/Loader";
import male from "../../assets/img/male.svg";
import female from "../../assets/img/female.svg";
import "antd/dist/antd.css";
import "./people.scss";

import { Button, Layout } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
const { Header, Content,Footer } = Layout;

function People() {
  const [people, setPeople] = useState([]);
  const [isLoading, setLoading] = useState(true);
  let [page, setPage] = useState(1);
  const [maxpage, setMaxpage] = useState();

  useEffect(() => {
    const prevBtn = document.getElementById("prev");
    page === 1 ? (prevBtn.disabled = true) : (prevBtn.disabled = false);
    const nextBtn = document.getElementById("next");
    page === maxpage ? (nextBtn.disabled = true) : (nextBtn.disabled = false);
    
    async function request() {
      const url = `https://swapi.dev/api/people/?page=${page}`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setLoading((currentIsLoaded) => false);
        setPeople(data.results);
        setMaxpage(Math.ceil(data.count / 10));
      }
      console.log(people);
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
                  <th>Имя</th>
                  <th>Цвет кожи</th>
                  <th>Пол</th>
                  <th>Вес</th>
                  <th>Цвет глаз</th>
                  <th>Создано</th>
                  <th>Отредактировано</th>
                </tr>
              </thead>
              <tbody>
                {people.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.skin_color}</td>
                    <td>
                      {(() => {
                        switch (item.gender) {
                          case "male":
                            return (
                              <img
                                src={male}
                                className="gender"
                                alt="male"
                              ></img>
                            );
                          case "female":
                            return (
                              <img
                                src={female}
                                className="gender"
                                alt="female"
                              ></img>
                            );
                          default:
                            return "n/a";
                        }
                      })()}
                    </td>
                    <td>{item.mass}</td>
                    <td>{item.eye_color}</td>
                    <td>
                      <Moment format="YYYY/MM/DD">{item.created}</Moment>
                    </td>
                    <td>
                      <Moment format="YYYY/MM/DD">{item.edited}</Moment>
                    </td>
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

export default People;
