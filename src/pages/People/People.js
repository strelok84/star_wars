import React, { useState, useEffect } from "react";
import Moment from "react-moment";

import male from "../../assets/img/male.svg";
import female from "../../assets/img/female.svg";
import "antd/dist/antd.css";
import "./people.scss";

import { Anchor, Layout } from "antd";
const { Link } = Anchor;
const { Header, Footer, Sider, Content } = Layout;

function People() {
  const [people, setPeople] = useState([]);

  useEffect(async () => {
    function request(url) {
      return fetch(url);
    }
    const url = "https://swapi.dev/api/people/";
    const response = await request(url);
    const data = await response.json();
    console.log(data.results);
    setPeople(data.results);
  }, []);

  return (
    <>
    <Layout>
      <Header >  
      <Anchor>
        <Link href="./" title="Назад" />
      </Anchor>
      </Header>
      <Content>
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
                      return <img src={male} className="gender"></img>;
                    case "female":
                      return <img src={female} className="gender"></img>;
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
     </Content>
    </Layout>  
    </>
  );
}

export default People;
