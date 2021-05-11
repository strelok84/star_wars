import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import Loader from "../../common/Loader/Loader";
import male from "../../assets/img/male.svg";
import female from "../../assets/img/female.svg";
import "antd/dist/antd.css";
import "./people.scss";

import { Button, Layout } from "antd";

const { Header, Content } = Layout;

function People() {
  const [people, setPeople] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    let pages = 1;
    async function request() {
      const url = `https://swapi.dev/api/people/?page=${pages}`;
      const response = await fetch(url);
      const data = await response.json();
      setPeople((oldArray) => [...oldArray, ...data.results]);
      if (data["next"]) {
        pages++;
        request();
      }
      console.log(people);
    }

    request();
    setLoading((currentIsLoaded) => !currentIsLoaded);
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
      </Layout>
    </>
  );
}

export default People;
