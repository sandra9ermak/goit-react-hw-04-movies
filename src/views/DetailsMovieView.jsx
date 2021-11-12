import { detailsAboutMovie } from "../service/api";
import { useEffect, useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { Route, useHistory, useLocation, useParams } from "react-router";
import { lazy, Suspense } from "react";
import s from "./Views.module.css";
import defaultImg from "../img/defaultImg.jpg";
import PropTypes from "prop-types";

const CastListView = lazy(() =>
  import("./CastListView.jsx" /* webpackChunkName: "CastList" */)
);
const ReviewsView = lazy(() =>
  import("./ReviewsView.jsx" /* webpackChunkName: "Reviews" */)
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

      {detailsOfMovies.map((item) => (
        <div key={item.id} className={s.movieDetailsDiv}>
          <div className={s.imgMovie}>
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : defaultImg
              }
              alt={item.title}
              width="280"
              height="400"
            />
          </div>
          <div>
            <h2 className={s.movieDetailsTitle}>
              {item.title} ({new Date(item.release_date).getFullYear()})
            </h2>
            {item.tagline && (
              <h3 className={s.movieDetailsTagline}>Tagline: {item.tagline}</h3>
            )}
            {!!item.vote_average && (
              <p className={s.movieDetailsScore}>
                User Score: {item.vote_average} ({item.vote_count} votes)
              </p>
            )}
            {item.overview && (
              <>
                <h3 className={s.movieDetailsOverviewTitle}>Overview</h3>
                <p className={s.movieDetailsOverview}>{item.overview}</p>
              </>
            )}
            {item.genres && (
              <h3 className={s.movieDetailsGenresTitle}>Genres</h3>
            )}
            <ul className={s.movieDetailsGenreList}>
              {item.genres.map((item) => (
                <li key={item.id} className={s.movieDetailsGenresItem}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

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
            <CastListView movieId={movieId} />
          </Route>
          <Route path={`${url}/review`}>
            <ReviewsView movieId={movieId} />
          </Route>
        </Suspense>
      </div>
    </section>
  );
};

export default DetailsMovieView;

DetailsMovieView.propTypes = {
  detailsOfMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      release_date: PropTypes.number.isRequired,
      tagline: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      vote_count: PropTypes.number.isRequired,
      overview: PropTypes.string.isRequired,
      genres: PropTypes.PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
    })
  ),
};
