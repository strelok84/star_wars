import React, { useState, useEffect } from "react";
import Loader from "../common/Loader/Loader";

function MainPage() {
  const [data, setData] = useState(null);
  let [isLoading, setLoading] = useState(true);

  useEffect(async () => {
    function request(url) {
      return fetch(url);
    }
    const url = "https://swapi.dev/api/";
    const response = await request(url);
    const data = await response.json();

    setData(data);
    setLoading(!isLoading);
  }, []);

  let count = 1;
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Номер</th>
              <th>Название</th>
              <th>API</th>
              <th>Ссылка</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((item, index) => (
              <tr key={index}>
                <td>{count++}</td>
                <td>{item}</td>
                <td>{data[item]}</td>
                <td>
                  <a href={`./${item}`}>{item}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MainPage;
