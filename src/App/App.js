import "./App.css";
import { Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "../components/Navigation/Navigation";

const HomePageView = lazy(() =>
  import("../views/HomePageView.jsx" /* webpackChunkName: "HomePage" */)
);
const NotFoundPageView = lazy(() =>
  import("../views/NotFoundPageView.jsx" /* webpackChunkName: "NotFoundPage" */)
);
const SeachPageView = lazy(() =>
  import("../views/SeachPageView.jsx" /* webpackChunkName: "MoviesPage" */)
);
const DetailsMovieView = lazy(() =>
  import("../views/DetailsMovieView.jsx" /* webpackChunkName: "DetailsMovie" */)
);

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <Navigation></Navigation>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route path="/" exact>
              <HomePageView></HomePageView>
            </Route>
            <Route path="/movies" exact>
              <SeachPageView></SeachPageView>
            </Route>
            <Route path="/movies/:movieId">
              <DetailsMovieView></DetailsMovieView>
            </Route>
            <Route>
              <NotFoundPageView></NotFoundPageView>
            </Route>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
