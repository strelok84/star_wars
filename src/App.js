import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import "./App.scss";
import Films from "./pages/Films/Films";
import People from "./pages/People/People";
import Planets from "./pages/Planets/Planets";
import Species from "./pages/Species/Species";
import Starships from "./pages/Starships/Starships";
import Vehicles from "./pages/Vehicles/Vehicles";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/films" component={Films} />
        <Route path="/people" component={People} />
        <Route path="/planets" component={Planets} />
        <Route path="/species" component={Species} />
        <Route path="/starships" component={Starships} />
        <Route path="/vehicles" component={Vehicles} />
        <Route exact path="/" component={MainPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
