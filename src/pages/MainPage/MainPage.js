import React from "react";
import Loader from "../common/Loader/Loader";

class MainPage extends React.Component {
  state = {
    data: null,
    isLoading: true,
  };

  async componentDidMount() {
    const url = "https://swapi.dev/api/";
    const response = await this.request(url);
    const data = await response.json();
    console.log(data);
    this.setState({
      isLoading: false,
      data: data,
    });
  }

  request = (url) => {
    return fetch(url);
  };

  render() {
    let count = 1;
    return (
      <div>
        {this.state.isLoading ? (
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
              {Object.keys(this.state.data).map((item,index) => (
                <tr key={index}>
                  <td>{count++}</td>
                  <td>{item}</td>
                  <td>{this.state.data[item]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default MainPage;
