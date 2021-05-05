import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
