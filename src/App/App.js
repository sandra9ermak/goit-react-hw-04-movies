import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import HomePageView from "../views/HomePageView";
import NotFoundPageView from "../views/NotFoundPageView";
import MoviesPageView from "../views/MoviesPageView";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Navigation></Navigation>
        <Switch>
          <Route path="/" exact>
            <HomePageView></HomePageView>
          </Route>
          <Route path="/movies" exact>
            <MoviesPageView></MoviesPageView>
          </Route>
          <Route>
            <NotFoundPageView></NotFoundPageView>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
