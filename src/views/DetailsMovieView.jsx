import { detailsAboutMovie } from "../service/api";
import { useEffect, useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { Route, useHistory, useLocation, useParams } from "react-router";
import { lazy, Suspense } from "react";
import s from "./Views.module.css";
import MovieDescription from "../components/MovieDescription/MovieDescription";

const MovieCast = lazy(() =>
  import("../components/MovieCast/MovieCast.jsx" /* webpackChunkName: "CastList" */)
);
const MovieReviews = lazy(() =>
  import("../components/MovieReviews/MovieReviews.jsx" /* webpackChunkName: "Reviews" */)
);

const DetailsMovieView = () => {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [detailsOfMovies, setDetailsOfMovies] = useState([]);

  useEffect(() => {
    detailsAboutMovie(movieId).then((results) => {
      setDetailsOfMovies([results]);
    });
  }, [movieId]);

  const history = useHistory();
  const location = useLocation();

  const buttonChange = () => {
    if (location.state) {
      history.push(location.state.from);
    } else {
      history.push("/");
    }
  };

  return (
    <section className={s.detailsSection}>
      <button onClick={buttonChange} className={s.btnGoBack}>
        Go back
      </button>
        <MovieDescription detailsOfMovies={detailsOfMovies} />
      <div className={s.infoDiv}>
        <p className={s.movieInfoTitle}>Additional information</p>
        <NavLink
          className={s.infoItem}
          activeClassName={s.activeLink}
          to={{
            pathname: `${url}/cast`,
            state: { ...location.state },
          }}
        >
          Cast
        </NavLink>
        <NavLink
          className={s.infoItem}
          activeClassName={s.activeLink}
          to={{
            pathname: `${url}/review`,
            state: { ...location.state },
          }}
        >
          Review
        </NavLink>
      </div>
      <div className={s.infoList}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Route path={`${url}/cast`}>
            <MovieCast movieId={movieId} />
          </Route>
          <Route path={`${url}/review`}>
            <MovieReviews movieId={movieId} />
          </Route>
        </Suspense>
      </div>
    </section>
  );
};

export default DetailsMovieView;
