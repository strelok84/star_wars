import React, { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import "antd/dist/antd.css";
import { Button, Layout } from "antd";
const { Header, Content } = Layout;

function Species() {
  const [species, setSpecies] = useState([]);
  let [isLoading, setLoading] = useState(true);
  useEffect( () => {
    let pages = 1;
    async function request() {      
      const url = `https://swapi.dev/api/species/?page=${pages}`;
      const response = await fetch(url)
      const data = await response.json()
      setSpecies((oldArray) => [...oldArray, ...data.results]);
      if (data["next"]) {
        pages++;
        request();
      }
      console.log(species);
    }    
    request()
    setLoading(currentIsLoaded=>!currentIsLoaded)
  }, []);

  return (
    <>
      <Layout>
      <Header>
      <Button href="./">Назад</Button>
      </Header>
      {isLoading?<Loader/>:  
      (<table>
        <thead>
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
      </table>)}
      </Layout>
    </>
  );
}

export default Species;
