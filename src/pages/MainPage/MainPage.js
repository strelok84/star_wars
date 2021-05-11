import React, { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";

import "antd/dist/antd.css";

import { Layout, Button } from "antd";
const { Content } = Layout;


function MainPage() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect((data) => {
    async function request(url) {
      const response = await fetch(url);
      const data = await response.json();      
      setData(data);
      console.log(data);
    }
    const url = "https://swapi.dev/api/";
    request(url);
    setLoading((currentIsLoaded) => !currentIsLoaded)
  }, []);

  let count = 1;
  return (
    <>
    <Layout>
      <Content>
      {isLoading?<Loader />: 
      (<table>
          <thead>
            <tr>
              <th>Номер</th>
              <th>Название</th>
              <th>API</th>
              <th></th>              
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((item, index) => (
              <tr key={index}>
                <td>{count++}</td>
                <td>{item}</td>
                <td>{data[item]}</td>
                <td>
                  <Button href={`./${item}`}>Открыть страницу</Button>
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

export default MainPage;
