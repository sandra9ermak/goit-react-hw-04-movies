import { useEffect, useState } from "react";
import { searchMovie } from "../service/api";
import { Link } from "react-router-dom";
import s from "./Views.module.css";
import { useHistory, useLocation } from "react-router";
import queryString from 'query-string';
import Notiflix from "notiflix";
import PropTypes from 'prop-types';

const MoviesPageView = () => {
  const [searchForm, setSearchForm] = useState("");
  const [inputQuery, setInputQuery] = useState("");
  const [movies, setMovies] = useState([]);
  // const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (searchForm) {
      searchMovie(inputQuery).then((results) => {
        if (results.length === 0) {
          return Notiflix.Notify.failure(`There is no results with ${inputQuery.toUpperCase()} request`);
        } else {
          setMovies(results);
        }
      });
    }
    }, [inputQuery, searchForm]);

   const submitSearchForm = (e) => {
    e.preventDefault();
    setSearchForm(inputQuery);
    if (inputQuery !== searchForm) {
      setMovies([]);
     }
     if (inputQuery.trim() === "") {
       return Notiflix.Notify.warning("Please enter something!");
     }
     history.push({ ...history.location, search: `?query=${inputQuery}` });
    //  console.log(location);
  };

  const handleChange = (e) => {
    setInputQuery(e.target.value);
  };

  return (
      <section className={s.form}>
        <form className={s.searchForm} onSubmit={submitSearchForm}>
        <input
          onChange={handleChange}
          className={s.inputForm}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search movies"
        />
      <button type="submit" className={s.searchButton}>Search
      </button>
      </form>
      <div>
        <ul className={s.searchList}>
                {!!movies.length && movies.map((item) => <li key={item.id} className={s.listItem}><Link to={`/movies/${item.id}`} className={s.linkItem}>{item.title}</Link></li>
            )}
            </ul>
      </div>
      </section>
    )
}

export default MoviesPageView;

MoviesPageView.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired
        }))
}